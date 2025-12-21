# 📸 Membership Card - Assets & Images Guide

## Required Images & Assets

This document outlines all the images and assets needed for the membership card system to function properly.

---

## 📋 Asset Checklist

### 1. **Netaji Subhas Chandra Bose Photo**
- **Location:** Reference in `ProfessionalMemberCard.tsx` as `netajiPhotoUrl`
- **Recommended Path:** `/public/netaji.jpg` or `/public/netaji-bose.jpg`
- **Specifications:**
  - **Size on Card:** 60×70px
  - **Recommended File Size:** 150×200px (min)
  - **Format:** JPG or PNG
  - **Color Mode:** Can be color or grayscale
  - **Effect:** Will be rendered with sepia(0.8) + grayscale(0.3) filter
  - **Quality:** High resolution (96+ DPI)

**Purpose:** Top-left header of front side card  
**Status:** Essential ✅

---

### 2. **Member Photo**
- **Location:** Member data `photoUrl` property
- **Recommended Path:** `/public/members/[memberid].jpg`
- **Specifications:**
  - **Size on Card:** 140×160px
  - **Recommended File Size:** 300×360px (min)
  - **Format:** JPG or PNG
  - **Style:** Passport-style photo
  - **Background:** Plain (preferably white or light color)
  - **Quality:** High resolution (≥300 DPI)
  - **Aspect Ratio:** Vertical/Portrait orientation

**Guidelines:**
- Head should occupy 50-70% of image
- Plain background (no shadows)
- Good lighting (no harsh shadows)
- Face must be in focus
- No hats, sunglasses, or accessories
- Professional appearance
- Neutral expression preferred

**Purpose:** Left side of front card  
**Status:** Essential ✅

---

### 3. **Party Logo**
- **Location:** Reference as `partyLogoUrl`
- **Recommended Path:** `/public/NEP Flag.jpg` (already in project)
- **Specifications:**
  - **Size on Card:** 50×50px
  - **Recommended File Size:** 200×200px (min)
  - **Format:** PNG (transparent), JPG, or SVG
  - **Color Mode:** RGB or CMYK
  - **Quality:** Vector preferred (SVG) or high-res raster
  - **Background:** For raster: white or transparent

**Guidelines:**
- Should be recognizable at small size (50px)
- Include all essential logo elements
- No text (name already shown separately)
- Works on white background
- High contrast for visibility

**Recommended Logo Options:**
- Party flag/symbol
- Party emblem
- Party monogram
- Party acronym

**Purpose:** Bottom-left of front card  
**Status:** Essential ✅

---

### 4. **President Photo**
- **Location:** Reference as `presidentPhotoUrl`
- **Recommended Path:** `/public/president-2.jpg` (already in project)
- **Specifications:**
  - **Size on Card:** 120×100px
  - **Recommended File Size:** 300×250px (min)
  - **Format:** JPG or PNG
  - **Style:** Professional headshot
  - **Background:** Neutral or blurred
  - **Pose:** Formal, leadership-oriented
  - **Attire:** Professional clothing
  - **Quality:** High resolution (≥300 DPI)

**Guidelines:**
- Professional appearance essential
- Clear facial features
- Good lighting
- Formal dress code
- Trustworthy expression
- No distracting elements
- Suitable for official documents

**Purpose:** Right side of back card  
**Status:** Essential ✅

---

## 📐 Image Size Reference Chart

```
Asset                 Display Size    Min File Size    Recommended
─────────────────────────────────────────────────────────────────────
Netaji Photo          60×70px         150×200px       300×400px
Member Photo          140×160px       300×360px       600×720px
Party Logo            50×50px         200×200px       400×400px
President Photo       120×100px       300×250px       600×500px
```

---

## 🎨 Image Format Recommendations

### JPEG Compression
```
Quality Level: 85-92
Compression:   Progressive JPEG
Optimization:  TinyJPG or ImageOptim
File Size:     Should not exceed 500KB per image
```

### PNG Format
```
Type:          PNG-8 or PNG-24 (if transparency needed)
Compression:   Use pngquant or ImageOptim
Optimization:  Remove metadata, optimize palette
File Size:     Should not exceed 300KB per image
```

### SVG Format (Recommended for Logo)
```
Format:        SVG (scalable vector graphics)
File Size:     Typically < 50KB
Benefits:      Perfect scaling, no pixelation
Advantage:     Ideal for logos & icons
```

---

## 📂 Recommended Project Structure

```
public/
├── netaji-bose.jpg              # Netaji Subhas photo
├── party-logo.svg               # Party logo (vector)
├── president.jpg                # President official photo
└── members/                      # Member photos
    ├── 13303846289.jpg
    ├── 13303846290.jpg
    └── ...
```

---

## 🔄 Image Upload/Management Systems

### For Member Photos
Consider implementing:

```typescript
// types/image.ts
interface MemberPhotoUpload {
  memberId: string;
  photoFile: File;
  uploadedAt: Date;
  url: string;
  verified: boolean;
}

// pages/api/upload/member-photo.ts
export default async function handler(req, res) {
  const { memberId } = req.query;
  const file = req.files.photo;

  // Validate image
  if (!isValidMemberPhoto(file)) {
    return res.status(400).json({ error: 'Invalid photo' });
  }

  // Upload to storage (AWS S3, Azure Blob, etc.)
  const url = await uploadToStorage(file, `members/${memberId}.jpg`);

  // Save URL to database
  await db.member.update({
    where: { membershipId: memberId },
    data: { photoUrl: url }
  });

  res.status(200).json({ url });
}
```

### Image Validation

```typescript
// lib/image-validation.ts
function validateMemberPhoto(file: File): boolean {
  // Check file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) return false;

  // Check file type
  if (!['image/jpeg', 'image/png'].includes(file.type)) return false;

  // Check dimensions (must be portrait)
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const isPortrait = img.height > img.width;
      const isMinSize = img.width >= 300 && img.height >= 360;
      resolve(isPortrait && isMinSize);
    };
    img.src = URL.createObjectURL(file);
  });
}
```

---

## 🌐 CDN & Optimization

### Image Delivery Optimization

```tsx
import Image from 'next/image';

// Optimized member photo
<Image
  src={member.photoUrl}
  alt="Member Photo"
  width={140}
  height={160}
  priority={true}
  quality={90}
  loader={({ src, width }) => `${src}?w=${width}&q=90`}
/>
```

### CDN Configuration
- Use CDN for all image serving
- Enable image compression on CDN
- Configure appropriate cache headers
- Use responsive image sizes

---

## 📸 Photo Guidelines

### Member Photos - Best Practices

✅ **DO:**
- Use natural lighting
- Simple, plain background
- Head centered in frame
- Clear face/features
- Professional appearance
- Recent photo (within 6 months)
- Neutral expression
- Looking directly at camera
- No accessories/hats
- Proper file format

❌ **DON'T:**
- Use group photos
- Include other people
- Use very old photos
- Sunglasses or hats
- Heavy makeup/filters
- Studio backdrops
- Partial/cropped faces
- Low resolution
- Dark/unclear images
- Suspicious expressions

### Size & Framing
```
┌────────────────────┐
│                    │
│      [Head]        │
│    [Shoulders]     │
│     [Neck Tie]     │
│                    │
│                    │
└────────────────────┘
Head: 50-70% of image
Shoulders: 20-30%
Space: 5-10% top/sides
```

---

## 🔒 Privacy & Security

### Image Storage Best Practices

✅ Encrypt images at rest  
✅ Use HTTPS for transmission  
✅ Implement access control  
✅ Set expiration for temporary URLs  
✅ Log all access attempts  
✅ Use CDN for distribution  
✅ Backup original images  
✅ Delete old/unused images  

### Data Retention
- Keep member photos for card validity period
- Archive old versions for 2-3 years
- Delete upon member departure
- Comply with GDPR/privacy laws

---

## 🚀 Implementation Checklist

- [ ] Netaji photo placed in `/public/netaji-bose.jpg`
- [ ] Party logo placed in `/public/party-logo.svg` (or jpg)
- [ ] President photo placed in `/public/president.jpg`
- [ ] Member photo upload system implemented
- [ ] Image validation functions created
- [ ] CDN configured for image delivery
- [ ] Image optimization setup
- [ ] Access controls implemented
- [ ] Privacy measures in place
- [ ] Backup strategy established
- [ ] Image size verified (all formats)
- [ ] CORS configured for image loading
- [ ] Print quality verified (300 DPI)

---

## 📦 Asset Delivery Example

### For Production Deployment

```bash
# Directory structure
public/
├── netaji-bose.jpg (300×400px, 50KB)
├── party-logo.svg (optimized, <20KB)
├── president.jpg (600×500px, 80KB)
└── members/
    ├── default-avatar.jpg (200×240px)
    └── ...

# Environment configuration
NEXT_PUBLIC_IMAGE_DOMAIN=cdn.example.com
IMAGE_UPLOAD_PATH=/images/members/
MEMBER_PHOTO_MAX_SIZE=5242880
```

---

## 🎬 Demo Images (Temporary for Testing)

For testing without real member photos:

```typescript
// lib/demo-images.ts
export const DEMO_IMAGES = {
  netaji: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Subhas_Chandra_Bose%2C_1943.jpg/440px-Subhas_Chandra_Bose%2C_1943.jpg',
  defaultMemberPhoto: '/default-member.jpg',
  partyLogo: 'https://via.placeholder.com/200/dc143c/ffffff?text=Party+Logo',
  defaultPresident: '/default-president.jpg',
};

// Usage in development
const memberPhoto = member.photoUrl || DEMO_IMAGES.defaultMemberPhoto;
```

---

## 📋 Assets Inventory

| Asset | Status | Location | Size | Format |
|-------|--------|----------|------|--------|
| Netaji Photo | ✅ Optional* | `/public/netaji-bose.jpg` | 300×400 | JPG |
| Party Logo | ✅ Required | `/public/party-logo.svg` | Varies | SVG/JPG |
| President Photo | ✅ Optional* | `/public/president.jpg` | 600×500 | JPG |
| Member Photos | ✅ Required | `/public/members/[id].jpg` | 300×360+ | JPG |
| Default Avatar | ⚠️ Recommended | `/public/default-member.jpg` | 300×360 | JPG |

*Optional = Has fallback; Required = Must be provided

---

## 🎯 Next Steps

1. **Gather Assets**
   - Collect Netaji photo
   - Get party logo
   - Obtain president photo

2. **Prepare Images**
   - Resize to specifications
   - Optimize file sizes
   - Convert to appropriate formats

3. **Upload to Project**
   - Place in `/public/` directory
   - Update file paths in component props

4. **Test Display**
   - Preview card with real images
   - Check quality and sizing
   - Verify print output

5. **Deploy**
   - Configure CDN if using
   - Set up member photo upload system
   - Test with production environment

---

**Document Version:** 1.0  
**Last Updated:** December 2025  
**Status:** Ready for Implementation ✅
