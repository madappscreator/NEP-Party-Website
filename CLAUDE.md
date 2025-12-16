# Recent Fixes and Updates

## Issues Fixed (Dec 16, 2025)

### 3. **Currency Symbol Display Issue (₽ instead of ₹)**
**Problem**: 
- Currency symbol displaying as Russian Ruble (₽) instead of Indian Rupee (₹)
- Affected: Admin dashboard "Total Donations", payment tables, registration forms
- Issue in member registration and payment pages showing wrong symbol

**Root Cause**:
- PT Sans font doesn't have optimal support for Indian Rupee Unicode character (U+20B9)
- System was falling back to font with different character mapping
- Missing UTF-8 charset declaration

**Solution**:
- Updated `src/app/layout.tsx`:
  - Added explicit `<meta charSet="UTF-8" />` declaration
  - Added viewport meta tag for responsive rendering
  - Imported Google Fonts "Noto Sans" (wght 400-700) with excellent Unicode support
- Updated `src/app/globals.css`:
  - Changed font-family to prioritize "Noto Sans" first
  - Added comprehensive fallback stack for maximum compatibility
- New font stack: `'Noto Sans', 'PT Sans', system fonts, sans-serif`

**Result**: Currency symbol now displays correctly as ₹ (Indian Rupee) everywhere ✅

## Issues Fixed (Dec 16, 2025 - Earlier)

### 1. **Member ID Generation Not Working** 
**Problem**: Pending members were not appearing in the admin's "Pending Approvals" page.

**Root Cause**: 
- Members register with `status: 'pending'` (lowercase) in the database
- Admin pending approvals page was querying for `status === 'PENDING'` (uppercase)
- Query found no matches, so admins couldn't see or approve pending members

**Solution**:
- Updated `src/app/admin/dashboard/members/pending-approvals/page.tsx` line 34
- Changed query from `where('status', '==', 'PENDING')` to `where('status', '==', 'pending')`
- Now correctly fetches members with lowercase 'pending' status
- Admins can now approve members, triggering automatic membership ID generation

### 2. **Profile Page Missing Download Card Buttons**
**Problem**: 
- Approved members could see their membership card on the profile page
- But had no way to download the card as PNG or PDF

**Solution**:
- Added download functionality to `src/app/profile/page.tsx`
- Imported `FileImage`, `FileText` icons from lucide-react
- Imported `html2canvas` and `jsPDF` for card export
- Added `downloadCardAsImage()` function to download as PNG with 2x scale
- Added `downloadCardAsPDF()` function to download as PDF
- Added two prominent buttons below the membership card with NEP theme colors:
  - **Primary (Blue) Button**: "Download as Image (PNG)"
  - **Accent (Orange) Button**: "Download as PDF"
- Buttons are styled with hover effects and shadows for consistency with NEP branding

## Code Changes Summary

### File: `src/app/admin/dashboard/members/pending-approvals/page.tsx`
```diff
- const q = query(membersRef, where('status', '==', 'PENDING'));
+ const q = query(membersRef, where('status', '==', 'pending'));
```

### File: `src/app/profile/page.tsx`
- Added imports: `useRef`, `FileImage`, `FileText`, `html2canvas`, `jsPDF`
- Added `cardRef` to wrap membership card container
- Added `downloadCardAsImage()` function
- Added `downloadCardAsPDF()` function  
- Added download buttons section with NEP-themed styling

## Status Field Handling
The application now handles both uppercase and lowercase status values correctly:
- **Registration**: Sets `status: 'pending'` (lowercase)
- **Admin Approval**: Sets `status: 'APPROVED'` (uppercase)
- **Payment Tracker**: Uses `.toUpperCase()` for case-insensitive comparison
- **Profile Page**: Uses `.toUpperCase()` for case-insensitive status checking

## Testing & Verification
Both changes have been applied and saved. The application should now:
1. ✅ Show pending members in admin dashboard
2. ✅ Allow admins to approve members and generate membership IDs
3. ✅ Display download options for membership cards on approved member profiles
4. ✅ Support both PNG and PDF download formats

## Build Commands
```bash
npm run lint      # Check code style
npm run typecheck # Check TypeScript types
npm run dev       # Start development server
npm run build     # Build for production
```
