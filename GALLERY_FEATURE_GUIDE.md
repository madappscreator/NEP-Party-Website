# Gallery Feature - Admin Guide

## Overview
The Gallery feature allows admins to manage photo albums and media content through the admin dashboard. Images are stored in Firebase Storage and metadata is stored in Firestore.

## Accessing Gallery Management

1. Log in to admin dashboard at `/admin`
2. Click "Gallery" in the left sidebar
3. You'll see all existing albums

## Creating a New Album

### Step 1: Start Creation
- Click "New Album" button
- You'll be taken to the creation form

### Step 2: Enter Album Details
- **Album Name**: Give your album a descriptive name (e.g., "Party Rally 2024")
- **Description**: Add details about the album (optional)

### Step 3: Upload Images
- Click the upload area or drag and drop images
- Multiple images can be uploaded at once
- Supported formats: JPG, PNG, WebP, GIF, SVG
- Images are automatically uploaded to Firebase Storage

### Step 4: Save Album
- Click "Save Album" button
- Album will be created and you'll be redirected to gallery list

## Managing Albums

### View Albums
- Gallery page shows all albums in a grid layout
- Each album displays:
  - Cover image (first uploaded image)
  - Album name
  - Description
  - Edit and Delete buttons

### Edit Album
- Click "Edit" button on any album
- Modify name, description, or add more images
- Changes are saved automatically

### Delete Album
- Click the trash icon on any album
- Confirm deletion
- Album and all its images will be removed

## Technical Details

### File Structure
```
src/
├── lib/
│   └── gallery-service.ts          # Firestore operations
├── app/admin/dashboard/
│   └── gallery/
│       ├── page.tsx                # Gallery list
│       ├── album-form.tsx          # Form component
│       └── new/
│           └── page.tsx            # Create new album
```

### Firestore Collection
- **Collection**: `gallery`
- **Fields**:
  - `name`: string
  - `description`: string
  - `coverImage`: string (URL)
  - `coverImageHint`: string
  - `media`: array of objects
  - `createdAt`: timestamp
  - `updatedAt`: timestamp

### Firebase Storage
- **Path**: `gallery/{albumId}/{fileName}`
- Images are organized by album ID
- Automatic cleanup when album is deleted

## Troubleshooting

### Images not uploading
- Check Firebase Storage rules allow authenticated uploads
- Verify file size is reasonable (< 10MB)
- Check browser console for errors

### Album not appearing
- Refresh the page
- Check Firestore has the document
- Verify user has admin permissions

### Slow performance
- Reduce image file sizes before upload
- Use optimized image formats (WebP)
- Check internet connection

## Best Practices

1. **Image Optimization**
   - Compress images before uploading
   - Use WebP format for better compression
   - Recommended size: 1920x1080 or smaller

2. **Album Organization**
   - Use descriptive names
   - Add meaningful descriptions
   - Group related images in same album

3. **Cover Images**
   - First uploaded image becomes cover
   - Choose a representative image
   - Ensure good quality for thumbnail

4. **Naming Conventions**
   - Use clear, descriptive names
   - Include date if relevant
   - Avoid special characters

## Future Enhancements

- [ ] Bulk upload with progress tracking
- [ ] Image cropping and editing
- [ ] Album sorting and filtering
- [ ] Image captions and metadata
- [ ] Video support
- [ ] Album sharing and permissions

