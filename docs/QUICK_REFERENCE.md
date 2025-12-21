# 🎯 Membership Card - Quick Reference Guide

A rapid-access guide for the most common tasks and information.

---

## 🚀 Quick Start (2 Minutes)

### View the Card
```bash
npm run dev
# Open: http://localhost:3000/membership-card-showcase
```

### Import Component
```tsx
import ProfessionalMemberCard from '@/components/ProfessionalMemberCard';
```

### Use Component
```tsx
<ProfessionalMemberCard
  member={{
    membershipId: 'ID123',
    name: 'Member Name',
    fatherName: 'Father Name',
    phone: '9876543210',
    photoUrl: '/photo.jpg',
    district: 'District',
    wing: 'Wing Name',
    membershipType: 'Member Type',
    membershipValidUntil: '2025-12-31',
  }}
/>
```

---

## 📐 Card Dimensions

```
Physical:     85.6mm × 54mm (CR80)
Web:          720px × 420px
Aspect Ratio: 1.586:1
Print DPI:    300 minimum
Color Mode:   CMYK
```

---

## 🎨 Color Palette

```
Primary Red:     #dc143c
Dark Red:        #8B0000
Saffron:         #ff6b35
White:           #ffffff
Off-white:       #fafaf5
```

---

## 📁 File Locations

```
Component:    src/components/ProfessionalMemberCard.tsx
Utils:        src/lib/membership-card-utils.ts
Styles:       src/styles/membership-card-professional.css
Showcase:     src/app/membership-card-showcase/page.tsx
Docs:         docs/membership-card-*.md
```

---

## 💾 Export Functions

### PNG Export
```tsx
import { exportCardAsPNG } from '@/lib/membership-card-utils';

await exportCardAsPNG(element, 'filename');
```

### PDF Export
```tsx
import { exportCardAsPDF } from '@/lib/membership-card-utils';

await exportCardAsPDF(frontElement, backElement, 'filename');
```

### High-Res Export
```tsx
import { exportCardAsHighResImage } from '@/lib/membership-card-utils';

await exportCardAsHighResImage(element, 'filename', 300);
```

---

## ✅ Validation

```tsx
import { validateMembershipData } from '@/lib/membership-card-utils';

const { isValid, errors } = validateMembershipData(memberData);
```

---

## 📝 Component Props Cheat Sheet

| Prop | Type | Default | Required |
|------|------|---------|----------|
| member | MemberProfile | - | ✅ |
| partnerName | string | Default party name | ❌ |
| partySlogan | string | Default slogan | ❌ |
| presidentName | string | Default name | ❌ |
| presidentTitle | string | Default title | ❌ |
| presidentPhotoUrl | string | Default photo | ❌ |
| partyAddress | string | Default address | ❌ |
| partyPhone | string | Default phone | ❌ |
| partyWebsite | string | Default website | ❌ |
| partyEmail | string | Default email | ❌ |

---

## 🔤 Tamil Text Constants

```typescript
import { TAMIL_TEXT } from '@/lib/membership-card-utils';

TAMIL_TEXT.MEMBERSHIP_ID        // "உறுப்பினை எண்"
TAMIL_TEXT.NAME                 // "பெயர்"
TAMIL_TEXT.DISTRICT             // "மாவட்டம்"
TAMIL_TEXT.PHONE                // "தொலைபேசி"
TAMIL_TEXT.MEMBER_DETAILS       // "உறுப்பினர் விவரங்கள்"
TAMIL_TEXT.PARTY_DETAILS        // "கட்சி விவரங்கள்"
TAMIL_TEXT.MEMBER_ADDRESS       // "உறுப்பினை முகவரி"
```

---

## 🎨 Card Sections

### Front Side
```
Header (90px)     → Netaji + Party Name
Body (280px)      → Member Photo + Details
Footer (50px)     → Logo + Slogan
```

### Back Side
```
Left (180px)      → QR Code
Center (360px)    → Party & Member Info
Right (160px)     → President Authority
```

---

## 📦 Dependencies

```json
{
  "html2canvas": "^1.4.1",
  "jspdf": "^2.5.0",
  "qrcode.react": "^1.0.0"
}
```

---

## 🖨️ Print Settings

| Setting | Value |
|---------|-------|
| Paper Size | CR80 (85.6×54mm) |
| Resolution | 300 DPI |
| Color Mode | CMYK |
| Margins | 0mm (auto-bleed) |
| Quality | Best |
| Finish | Matte or Satin |

---

## 🔍 Responsive Breakpoints

```
Desktop: ≥1024px    → Side-by-side
Tablet:  768-1024px → Scaled
Mobile:  <768px     → Stacked
```

---

## ⚡ Performance Tips

1. Use `React.memo()` for preview components
2. Lazy load images with `next/image`
3. Debounce form inputs
4. Cache API responses
5. Optimize image sizes

---

## 🐛 Common Issues & Fixes

### Issue: Tamil text not rendering
**Fix:** Check if Noto Serif Tamil font is loaded
```css
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+Tamil:wght@400;700;900');
```

### Issue: QR code not scanning
**Fix:** Increase size (min 100×100px) and verify contrast

### Issue: Photo quality poor on print
**Fix:** Use minimum 300×360px image size

### Issue: Canvas memory error
**Fix:** Reduce scale factor or use memory-efficient export

---

## 📞 Quick Links

| Resource | Location |
|----------|----------|
| Component | `src/components/ProfessionalMemberCard.tsx` |
| Showcase | `/membership-card-showcase` |
| Design Specs | `docs/membership-card-design-spec.md` |
| README | `docs/MEMBERSHIP_CARD_README.md` |
| Integration | `docs/MEMBERSHIP_CARD_INTEGRATION.md` |
| Assets | `docs/ASSETS_AND_IMAGES.md` |

---

## 🧪 Test Data

```typescript
const testMember = {
  membershipId: '13303846289',
  name: 'கிரிஸ்து வில்லிலையம் தேவி',
  fatherName: 'ஒதையாடல்',
  phone: '9876543210',
  photoUrl: '/test-photo.jpg',
  district: 'சென்னை',
  wing: 'மகளிர் பிரிவு',
  membershipType: 'சாதாரண உறுப்பினர்',
  membershipValidUntil: '2025-12-31',
};
```

---

## 🎯 Common Tasks

### Display a Card
```tsx
import ProfessionalMemberCard from '@/components/ProfessionalMemberCard';

<ProfessionalMemberCard member={memberData} />
```

### Download as PNG
```tsx
const ref = useRef();
await exportCardAsPNG(ref.current, 'card-name');
```

### Validate Data
```tsx
const result = validateMembershipData(formData);
if (!result.isValid) console.log(result.errors);
```

### Format Phone
```tsx
const formatted = formatIndianPhoneNumber('9876543210');
// Result: "+91 98765 43210"
```

### Format Date
```tsx
const formatted = formatDateIndian('2025-12-31');
// Result: "31-Dec-2025"
```

---

## 📱 Responsive Usage

### Desktop (Two Column)
```tsx
<div className="grid grid-cols-2 gap-8">
  <FormSection />
  <ProfessionalMemberCard member={memberData} />
</div>
```

### Mobile (Stacked)
```tsx
<div className="flex flex-col gap-4">
  <FormSection />
  <ProfessionalMemberCard member={memberData} />
</div>
```

---

## 🔐 Security Checklist

- ✅ Validate all inputs
- ✅ Sanitize dynamic content
- ✅ Use HTTPS for image URLs
- ✅ Implement CORS properly
- ✅ Require authentication
- ✅ Log sensitive operations
- ✅ Encrypt at rest

---

## 📊 Configuration

### Card Colors
```typescript
const colors = {
  primary: '#dc143c',
  dark: '#8B0000',
  accent: '#ff6b35',
  bg: '#fafaf5',
};
```

### Font Sizes
```typescript
const sizes = {
  partyName: 22,
  header: 16,
  memberName: 14,
  detail: 13,
  body: 12,
  small: 11,
};
```

---

## 🚀 Deployment Checklist

- [ ] Install dependencies
- [ ] Test showcase page
- [ ] Verify exports work
- [ ] Check responsive design
- [ ] Test Tamil rendering
- [ ] Verify QR scanning
- [ ] Test image loading
- [ ] Check print quality
- [ ] Run tests
- [ ] Build successfully
- [ ] Deploy to production

---

## 📞 Support

**For full documentation:**
- Check `/docs` folder
- Review component comments
- Read TypeScript interfaces
- See integration examples

**For issues:**
- Check INTEGRATION_GUIDE.md troubleshooting
- Review utility function documentation
- Examine showcase page implementation

---

## 🎯 Version Info

- **Version:** 1.0
- **Status:** Production Ready ✅
- **Last Updated:** December 2025
- **Node Version:** 16+
- **React Version:** 18+
- **Next.js Version:** 14+

---

**Quick Reference v1.0** | Last Updated: December 2025 | Status: ✅ Complete
