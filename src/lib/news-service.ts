import { db, storage } from '@/lib/firebase';
import { 
  collection, 
  getDocs, 
  getDoc,
  addDoc, 
  updateDoc,
  deleteDoc, 
  doc, 
  query, 
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

const NEWS_COLLECTION = 'news_articles';

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  imageUrl: string;
  imageHint: string;
  videoUrl: string; // YouTube video URL
  author: string;
  category: string;
  tags: string[];
  published: boolean;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Extract YouTube video ID from various URL formats
 */
export function extractYouTubeVideoId(url: string): string | null {
  if (!url) return null;

  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/ // Just the video ID
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

/**
 * Get YouTube embed URL from video URL or ID
 */
export function getYouTubeEmbedUrl(url: string): string | null {
  const videoId = extractYouTubeVideoId(url);
  if (!videoId) return null;
  return `https://www.youtube.com/embed/${videoId}`;
}

/**
 * Fetch all news articles from Firestore
 */
export async function getNewsArticles(publishedOnly: boolean = false): Promise<NewsArticle[]> {
  try {
    let snapshot;
    try {
      const q = query(
        collection(db, NEWS_COLLECTION),
        orderBy('createdAt', 'desc')
      );
      snapshot = await getDocs(q);
    } catch (indexError) {
      console.warn('Fetching without order:', indexError);
      snapshot = await getDocs(collection(db, NEWS_COLLECTION));
    }
    
    let articles = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate?.() || new Date(),
      publishedAt: doc.data().publishedAt?.toDate?.() || null,
    })) as NewsArticle[];
    
    if (publishedOnly) {
      articles = articles.filter(a => a.published);
    }
    
    return articles.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  } catch (error) {
    console.error('Error fetching news articles:', error);
    return [];
  }
}

/**
 * Fetch a single news article by ID
 */
export async function getNewsArticle(articleId: string): Promise<NewsArticle | null> {
  try {
    const docRef = doc(db, NEWS_COLLECTION, articleId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() || new Date(),
        updatedAt: data.updatedAt?.toDate?.() || new Date(),
        publishedAt: data.publishedAt?.toDate?.() || null,
      } as NewsArticle;
    }
    return null;
  } catch (error) {
    console.error('Error fetching news article:', error);
    return null;
  }
}

/**
 * Create a new news article
 */
export async function createNewsArticle(
  article: Omit<NewsArticle, 'id' | 'createdAt' | 'updatedAt'>,
  customDate?: Date
): Promise<string> {
  try {
    // Use custom date if provided, otherwise use current timestamp
    const articleDate = customDate ? Timestamp.fromDate(customDate) : Timestamp.now();

    const docRef = await addDoc(collection(db, NEWS_COLLECTION), {
      ...article,
      createdAt: articleDate,
      updatedAt: Timestamp.now(),
      publishedAt: article.published ? articleDate : null,
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating news article:', error);
    throw error;
  }
}

/**
 * Update an existing news article
 */
export async function updateNewsArticle(
  articleId: string,
  data: Partial<Omit<NewsArticle, 'id' | 'createdAt'>>,
  customDate?: Date
): Promise<void> {
  try {
    const docRef = doc(db, NEWS_COLLECTION, articleId);
    const updateData: any = {
      ...data,
      updatedAt: Timestamp.now(),
    };

    // Handle custom date - update both createdAt and publishedAt
    if (customDate) {
      const customTimestamp = Timestamp.fromDate(customDate);
      updateData.createdAt = customTimestamp;
      if (data.published) {
        updateData.publishedAt = customTimestamp;
      }
    } else if (data.published) {
      // Set publishedAt if being published for the first time (no custom date)
      const existing = await getNewsArticle(articleId);
      if (existing && !existing.publishedAt) {
        updateData.publishedAt = Timestamp.now();
      }
    }

    await updateDoc(docRef, updateData);
  } catch (error) {
    console.error('Error updating news article:', error);
    throw error;
  }
}

/**
 * Delete a news article
 */
export async function deleteNewsArticle(articleId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, NEWS_COLLECTION, articleId));
  } catch (error) {
    console.error('Error deleting news article:', error);
    throw error;
  }
}

/**
 * Upload news image to Firebase Storage
 */
export async function uploadNewsImage(articleId: string, file: File): Promise<string> {
  try {
    const fileName = `${Date.now()}-${file.name}`;
    const storageRef = ref(storage, `news/${articleId}/${fileName}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error('Error uploading news image:', error);
    throw error;
  }
}

