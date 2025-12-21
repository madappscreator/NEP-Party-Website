# Multi-Language Membership Card System

## Overview

The membership card system has been completely redesigned to support **5 regional Indian languages** while maintaining a consistent professional appearance using the party's theme colors (Sky Blue and Olive Green).

## Supported Languages

| Language | Code | Script | Font |
|----------|------|--------|------|
| Tamil | `ta` | Tamil | Noto Serif Tamil |
| Malayalam | `ml` | Malayalam | Noto Serif Malayalam |
| Hindi | `hi` | Devanagari | Noto Serif Devanagari |
| Telugu | `te` | Telugu | Noto Serif Telugu |
| Kannada | `kn` | Kannada | Noto Serif Kannada |

## Design System

### Color Palette (Party Theme)

- **Sky Blue**: `#0066CC` - Primary color for header and right sections
- **Olive Green**: `#556B2F` - Secondary color for body and middle sections
- **White**: `#FFFFFF` - Background and text clarity
- **Black**: `#000000` - Borders and text emphasis
- **Light Gray**: `#F5F5F5` - Photo background
- **Dark Gray**: `#333333` - Body text and details

### Card Dimensions

- **Physical Format**: CR80 (85.6mm × 54mm)
- **Web Rendering**: 720px × 420px @ 96 DPI
- **Print Ready**: 300 DPI, CMYK capable
- **Aspect Ratio**: 1.586:1

## Card Structure

### Front Side
```
┌─────────────────────────────────────┐
│ [Sky Blue Header]                   │
│ Party Name | Motto                  │
├─────────────────────────────────────┤
│ [Olive Green Body]                  │
│ Logo | Member Info | Photo          │
├─────────────────────────────────────┤
│ [White Footer]                      │
│ Valid Member Status                 │
└─────────────────────────────────────┘
```

### Back Side
```
┌─────────────────────────────────────┐
│ [QR Code] │ [Party Details] │ [Pres]│
│ Sky Blue  │ Olive Green     │ Sky Bl│
│           │                 │ ue    │
│ QR Encodes│ Party Info      │ Pres. │
│ Member ID │ Contact Details │ Photo │
│ Name      │ Address         │ Auth  │
│ District  │ Website         │ orty  │
│ Mobile    │                 │       │
└─────────────────────────────────────┘
```

## File Structure

### Translation Files
All translation files are located in `src/locales/`

```
src/locales/
├── card-ta.json    # Tamil translations
├── card-ml.json    # Malayalam translations
├── card-hi.json    # Hindi translations
├── card-te.json    # Telugu translations
└── card-kn.json    # Kannada translations
```

### Translation File Format
```json
{
  "partyName": "...",
  "partyNameEn": "...",
  "memberCard": "...",
  "memberName": "...",
  "wing": "...",
  "district": "...",
  "memberId": "...",
  "mobile": "...",
  "validMember": "...",
  "partyDetails": "...",
  "memberAddress": "...",
  "address": "...",
  "website": "...",
  "contact": "...",
  "presidentSignature": "...",
  "presidentName": "...",
  "presidentTitle": "...",
  "motto": "..."
}
```

### Component Files

**Main Component**: `src/components/MultiLanguageMemberCard.tsx`
- Renders both front and back sides
- Handles language-specific font rendering
- Provides PNG and PDF export functionality
- QR code generation with member data + language parameter

**Showcase Page**: `src/app/membership-card-showcase/page.tsx`
- Language selection UI (5 buttons)
- Member data input form
- Real-time card preview
- Design specifications display

## Using the Component

### Import
```typescript
import MultiLanguageMemberCard from '@/components/MultiLanguageMemberCard';
import cardTa from '@/locales/card-ta.json';
import cardMl from '@/locales/card-ml.json';
// ... import other languages
```

### Props Interface
```typescript
interface MultiLanguageMemberCardProps {
  member: MemberData;           // Member information
  language: Language;           // 'ta' | 'ml' | 'hi' | 'te' | 'kn'
  translations: TranslationData; // Language-specific text
  partyLogoUrl?: string;        // Optional party logo image
  presidentPhotoUrl?: string;   // Optional president photo
  partyWebsite?: string;        // Party website URL
  partyEmail?: string;          // Party email address
  partyPhone?: string;          // Party phone number
}
```

### Member Data Structure
```typescript
interface MemberData {
  membershipId: string;
  name: string;
  wing: string;
  district: string;
  phone: string;
  photoUrl: string | null;
  state?: string;
  address?: string;
  presidentName?: string;
  partyAddress?: string;
}
```

### Basic Usage
```tsx
import MultiLanguageMemberCard from '@/components/MultiLanguageMemberCard';
import cardTa from '@/locales/card-ta.json';

export default function MyCard() {
  const memberData = {
    membershipId: '13303846289',
    name: 'உண்ணக்கொய தொல்மகை',
    wing: 'மகளிர் பிரிவு',
    district: 'சென்னை',
    phone: '9876543210',
    photoUrl: null,
  };

  return (
    <MultiLanguageMemberCard
      member={memberData}
      language="ta"
      translations={cardTa}
      partyWebsite="www.namtamiliar.org"
      partyEmail="info@namtamiliar.org"
      partyPhone="044-43840484"
    />
  );
}
```

## Language Switching

The showcase page implements language switching through a button group:

```tsx
const [language, setLanguage] = useState<Language>('ta');

<Button
  onClick={() => setLanguage('ml')}
  variant={language === 'ml' ? 'default' : 'outline'}
>
  Malayalam
</Button>
```

## Export Functionality

### PNG Export
- Exports front and back sides separately
- Filename format: `{memberId}-card-front-{language}.png`
- Example: `13303846289-card-front-ta.png`

### PDF Export
- Combines both sides into single PDF
- Filename format: `{memberId}-card-{language}.pdf`
- Example: `13303846289-card-ta.pdf`
- Print-ready: 300 DPI, CMYK compatible

## QR Code Data

The QR code encodes the following JSON structure:
```json
{
  "member_id": "13303846289",
  "name": "உண்ணக்கொய தொல்மகை",
  "district": "சென்னை",
  "mobile": "9876543210",
  "language": "ta"
}
```

This allows QR code scanners to:
- Verify member identity
- Retrieve member information
- Determine card language for appropriate rendering

## Font Loading

All language-specific fonts are loaded via Google Fonts in `src/app/layout.tsx`:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Noto+Serif+Tamil:wght@400;500;600;700&family=Noto+Serif+Malayalam:wght@400;500;600;700&family=Noto+Serif+Devanagari:wght@400;500;600;700&family=Noto+Serif+Telugu:wght@400;500;600;700&family=Noto+Serif+Kannada:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

Font weights available: 400, 500, 600, 700

## Adding a New Language

To add support for a new language:

### Step 1: Create Translation File
Create `src/locales/card-{lang-code}.json` with all required keys:
```json
{
  "partyName": "...",
  "memberCard": "...",
  // ... all 19 keys
}
```

### Step 2: Update Component
In `MultiLanguageMemberCard.tsx`, update the Language type:
```typescript
type Language = 'ta' | 'ml' | 'hi' | 'te' | 'kn' | 'new_lang';
```

Add font mapping:
```typescript
const LANGUAGE_FONTS: Record<Language, string> = {
  // ...
  new_lang: "'Appropriate Font Family', serif",
};
```

### Step 3: Update Showcase Page
In `src/app/membership-card-showcase/page.tsx`:

Add import:
```typescript
import cardNewLang from '@/locales/card-new_lang.json';
```

Update translations object:
```typescript
const translations: Record<Language, any> = {
  // ...
  new_lang: cardNewLang,
};
```

Update language names:
```typescript
const languageNames: Record<Language, string> = {
  // ...
  new_lang: 'New Language (नाम)',
};
```

### Step 4: Add Font Loading
In `src/app/layout.tsx`, add the font to the Google Fonts URL.

## Showcase Page Features

The membership card showcase page includes:

1. **Language Selector**: 5 buttons for quick language switching
2. **Live Preview**: Real-time card rendering in both sides
3. **Member Data Form**: Editable fields for all member information
4. **Design Specifications**: Display of technical specifications
5. **Export Options**: Download cards as PNG or PDF (built into component)

### Accessing the Showcase
Navigate to `/membership-card-showcase` to see the full interface.

## Technical Stack

- **Framework**: Next.js 14+ with TypeScript
- **Rendering**: React Server Components with dynamic client import
- **QR Code**: qrcode.react library
- **Image Export**: html2canvas
- **PDF Export**: jsPDF
- **Styling**: Tailwind CSS
- **Fonts**: Google Fonts (Noto Serif family)
- **UI Components**: Custom shadcn/ui components

## Best Practices

1. **Always provide translations**: Missing translations will render as empty strings
2. **Test all languages**: Verify layout works with different text lengths
3. **Use consistent naming**: Follow the template key names for new languages
4. **Font fallbacks**: Ensure fallback fonts are specified
5. **QR code content**: Keep member data minimal for readable QR codes
6. **Export quality**: Ensure images are 300 DPI for print

## Future Enhancements

- [ ] Add English language support
- [ ] Implement language auto-detection based on browser
- [ ] Add custom card templates
- [ ] Implement bulk card generation
- [ ] Add digital signature support
- [ ] Create card distribution system
- [ ] Add member database integration
- [ ] Implement version control for card designs

## Troubleshooting

**Issue**: Languages not rendering properly
- **Solution**: Ensure Google Fonts are loaded (check browser dev tools Network tab)

**Issue**: QR code too large/small
- **Solution**: Adjust QR code size in MultiLanguageMemberCard component

**Issue**: Text overflow on some languages
- **Solution**: Adjust font size or layout dimensions for that specific language

**Issue**: Export not working
- **Solution**: Ensure html2canvas and jsPDF are installed: `npm install html2canvas jspdf`

## Support

For questions or issues related to the multi-language card system, refer to:
- Component file: `src/components/MultiLanguageMemberCard.tsx`
- Showcase page: `src/app/membership-card-showcase/page.tsx`
- Translation files: `src/locales/card-*.json`
