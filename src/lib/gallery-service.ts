import { db, storage } from '@/lib/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, query, orderBy, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import type { Album } from '@/lib/types';

const GALLERY_COLLECTION = 'gallery';

export interface GalleryAlbum {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  coverImageHint: string;
  media: Array<{
    type: 'image' | 'video';
    url: string;
    alt: string;
    hint: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Fetch all gallery albums from Firestore
 */
export async function getGalleryAlbums(): Promise<Album[]> {
  try {
    // Try with orderBy first, fall back to unordered if index not available
    let snapshot;
    try {
      const q = query(
        collection(db, GALLERY_COLLECTION),
        orderBy('createdAt', 'desc')
      );
      snapshot = await getDocs(q);
    } catch (indexError: any) {
      // If index error, fetch without ordering
      console.warn('Firestore index not available, fetching without order:', indexError.message);
      snapshot = await getDocs(collection(db, GALLERY_COLLECTION));
    }

    const albums = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Album[];

    // Sort client-side if we couldn't order in query
    return albums.sort((a, b) => {
      const dateA = a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt?.seconds * 1000 || 0);
      const dateB = b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt?.seconds * 1000 || 0);
      return dateB.getTime() - dateA.getTime();
    });
  } catch (error) {
    console.error('Error fetching gallery albums:', error);
    return [];
  }
}

/**
 * Fetch a single gallery album by ID
 */
export async function getGalleryAlbum(albumId: string): Promise<Album | null> {
  try {
    const docRef = doc(db, GALLERY_COLLECTION, albumId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Album;
    }
    return null;
  } catch (error) {
    console.error('Error fetching gallery album:', error);
    return null;
  }
}

/**
 * Create a new gallery album
 */
export async function createGalleryAlbum(
  album: Omit<GalleryAlbum, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, GALLERY_COLLECTION), {
      ...album,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating gallery album:', error);
    throw error;
  }
}

/**
 * Update an existing gallery album
 */
export async function updateGalleryAlbum(
  albumId: string,
  data: Partial<Omit<GalleryAlbum, 'id' | 'createdAt'>>
): Promise<void> {
  try {
    const docRef = doc(db, GALLERY_COLLECTION, albumId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating gallery album:', error);
    throw error;
  }
}

/**
 * Upload image to Firebase Storage
 */
export async function uploadGalleryImage(
  albumId: string,
  file: File
): Promise<string> {
  try {
    const fileName = `${Date.now()}-${file.name}`;
    const storageRef = ref(storage, `gallery/${albumId}/${fileName}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

/**
 * Delete gallery album
 */
export async function deleteGalleryAlbum(albumId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, GALLERY_COLLECTION, albumId));
  } catch (error) {
    console.error('Error deleting gallery album:', error);
    throw error;
  }
}

/**
 * Delete image from storage
 */
export async function deleteGalleryImage(imageUrl: string): Promise<void> {
  try {
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
}

