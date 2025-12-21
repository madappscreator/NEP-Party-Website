# 🎴 Professional Membership ID Card – Design Implementation Guide

## 📋 Overview

This document describes the professional membership card design implemented for the Tamil Nadu based political party, following the official specifications for CR80 format identity cards.

---

## 🟥 CARD SPECIFICATIONS

### Physical Dimensions
- **Format:** CR80 (Standard ID Card)
- **Size:** 85.6 mm × 54 mm
- **Orientation:** Horizontal
- **Aspect Ratio:** 1.586:1
- **Render Size:** 720px × 420px (for web/digital preview)

### Print Specifications
- **DPI:** 300 DPI (minimum)
- **Color Mode:** CMYK
- **Finish:** PVC / Matte preferred
- **Bleed Margin:** 3mm on all sides
- **Corner Radius:** 4-6mm rounded corners
- **Layers:** Both sides (Front & Back)

### Theme & Colors
| Element | Primary Color | Secondary Color | Accent |
|---------|---------------|-----------------|--------|
| Headers | Red (#dc143c) | Saffron (#ff6b35) | White |
| Borders | Dark Red (#8B0000) | Gold | - |
| Footer Strip | Deep Red Gradient | - | - |
| Text | Dark (#222, #333) | Red (#dc143c) | - |
| Background | Off-white (#fafaf5) | Light (#f5f3f0) | Textured |

### Typography
- **Headings:** Noto Serif Tamil, Catamaran (Bold 700-900)
- **Body Text:** Noto Serif Tamil (Regular 400)
- **Size Hierarchy:**
  - Party Name: 22px (Bold)
  - Section Headers: 16px (Bold)
  - Details: 13-14px
  - Small Text: 11-12px

---

## 🟢 FRONT SIDE LAYOUT

### Section 1: TOP HEADER (90px height)
```
┌─────────────────────────────────────────────────────┐
│ [Netaji Photo] │  PARTY NAME (TAMIL)              │
│   (60×70px)    │  சயந்தன் கட்சி                  │
│                │  உறுப்பினர் அட்டை                │
└─────────────────────────────────────────────────────┘
```

**Elements:**
- **Left:** Netaji Subhas Chandra Bose photo (monochrome/sepia, 60×70px)
- **Center/Right:** Party name in bold Tamil (22px), tagline (12px)
- **Background:** Linear gradient (Red → Saffron → Light Gold)
- **Border:** 3px solid dark red bottom border

### Section 2: MEMBER INFORMATION (280px height)
```
┌──────────────┬──────────────────────────────────┐
│              │ Member Name (Bold Red)           │
│   Member     │ Father/Guardian Name             │
│   Photo      │ District                         │
│ (140×160px)  │ Membership ID                    │
│              │ Mobile Number                    │
│              │ Wing (Optional)                  │
└──────────────┴──────────────────────────────────┘
```

**Left Panel:**
- Member photo in yellow/light background (140×160px)
- Border: 4px solid red
- Shadow: inset red glow

**Right Panel:**
- Section header "உறுப்பினர் விவரங்கள்" (Tamil)
- Member name displayed in bold red (14px)
- Other details in regular text (13px)
- Line height: 1.8 for clarity

### Section 3: BOTTOM STRIP (50px height)
```
┌──────────┬─────────────────────────────────┐
│ [Logo]   │ நெறியாக, நல்லாக, நயமாக       │
│(50×50px) │ (Party Slogan - Tamil)         │
└──────────┴─────────────────────────────────┘
```

**Elements:**
- Left: Party logo (50×50px, white background)
- Right: Party slogan in bold Tamil (13px)
- Background: Deep red gradient
- Border: 2px white top border

---

## 🔵 BACK SIDE LAYOUT

### Section 1: LEFT PANEL - QR CODE (180px width)

```
┌─────────────┐
│             │
│  ┌───────┐  │
│  │ QR    │  │
│  │ CODE  │  │
│  └───────┘  │
│ உறுப்பினை ID │
└─────────────┘
```

**QR Code Data (JSON):**
```json
{
  "member_id": "13303846289",
  "name": "Member Full Name",
  "district": "District Name",
  "mobile": "XXXXXXXXXX"
}
```

**Specifications:**
- Size: 120×120px
- Format: QR Code Level H (30% error correction)
- Colors: Dark red (#8B0000) on white
- Border: 2px solid red, 12px padding
- Background: Light yellow gradient (#fff9e6)
- Dashed border separator (right): 3px #dc143c

### Section 2: CENTER PANEL - PARTY & MEMBER INFO (360px width)

**Top Section - Party Details:**
```
கட்சி விவரங்கள்
────────────────
கட்சி: தமிழ்நாட்டு அனைத்திந்திய கட்சி
முகவரி: சென்னை, தமிழ்நாடு, இந்தியா
தொலைபேசி: 044-43840484
வலைத்தளம்: www.namtamiliar.org
மின்னஞ்சல்: info@namtamiliar.org
```

**Bottom Section - Member Address:**
```
உறுப்பினை முகவரி
────────────────
பெயர்: Member Full Name
மாவட்டம்: District Name
மாநிலம்: State Name
தொலைபேசி: XXXXXXXXXX
```

**Specifications:**
- Font size: 12px body, 14px headers
- Header color: Dark red (#8B0000)
- Text color: Dark gray (#333)
- Border: 2px solid red (bottom of headers)
- Padding: 20px overall, 10px between sections
- Left border: 3px dashed red

### Section 3: RIGHT PANEL - AUTHORITY SECTION (160px width)

```
┌───────────────────┐
│                   │
│  ┌─────────────┐  │
│  │ President   │  │
│  │   Photo     │  │
│  └─────────────┘  │
│                   │
│  (signature)      │
│                   │
│ President Name    │
│ Title (Tamil)     │
└───────────────────┘
```

**Elements:**
- President photo: 120×100px with white border (3px)
- Signature area: Placeholder with italicized "(signature)" text
- Name: Bold, 10px
- Title: 9px, reduced opacity
- Background: Linear gradient (Dark Red to Red)
- Border: 3px solid saffron (left side)
- Text color: White

---

## 📐 DIMENSIONS & SPACING

### Card Layout Grid
```
Total Width: 720px
Total Height: 420px

Front Side:
├── Header: 90px height
├── Body: 280px height (with photo + details)
└── Footer: 50px height

Back Side:
├── Left (QR): 180px width
├── Center (Info): 360px width
└── Right (Authority): 160px width
```

### Padding & Margins
- Card padding: 16-20px (all sides)
- Section gaps: 12-20px
- Text line-height: 1.8
- Photo borders: 3-4px
- Element shadows: 0 4px 12px rgba(220, 20, 60, 0.2)

---

## 🎨 COLOR PALETTE

### Primary Colors
```
Dark Red:       #8B0000
Red:            #dc143c
Saffron:        #ff6b35
White:          #ffffff
Off-white:      #fafaf5
Light Beige:    #f5f3f0
Yellow Bg:      #fff9e6
Light Gradient: #fffbf0
```

### Accent Colors
```
Gold/Yellow:    #FFD700
Dark Gray:      #333 / #222
Medium Gray:    #666
Light Gray:     #9ca3af
Border Gray:    #e5e7eb
```

### Gradients
```
Header Gradient:   Red → Saffron → Light Gold
Footer Gradient:   Dark Red → Red → Saffron
Right Panel Grad:  Dark Red → Red
President Section: Deep Red → Medium Red
```

---

## 🖨️ EXPORT & PRINTING GUIDELINES

### Web Export
- **Format:** PNG (transparent background)
- **DPI:** 96 DPI (for screen)
- **Scale:** 2-3x for print preparation
- **Quality:** Maximum (for image export)

### Print Export
- **Format:** PDF (print-ready)
- **DPI:** 300 DPI minimum
- **Color Mode:** CMYK
- **Bleed:** 3mm on all sides
- **File Size:** Optimized for print service

### Printing Recommendations
1. **Material:** PVC card stock or premium matte paper
2. **Finish:** Matte or satin (reduces glare)
3. **Corner Rounding:** 4-6mm radius
4. **Lamination:** Optional (glossy or matte)
5. **QR Code Testing:** Verify scannability before bulk print
6. **Color Proof:** Request CMYK proof before production
7. **Quantity:** Minimum 100 cards recommended

---

## 🧠 AI GENERATION PROMPT (Optional)

If regenerating the card design using AI tools (Midjourney, DALL·E, etc.):

> "Design a professional Indian political party membership ID card in horizontal layout (85.6×54mm). 
> 
> **Front side:** Include Netaji Subhas Chandra Bose portrait on top left in sepia tones, bold Tamil party name, member photo on right with yellow background, neatly aligned member details in Tamil language, party logo and slogan in bottom red strip, red and saffron color theme with gold accents.
> 
> **Back side:** QR code on left in white box, party details (name, address, contact, website) in Tamil in center, member address section, president photo with signature area on right in dark red panel, authoritative and official style.
> 
> Style: Professional, official, high-resolution, print-ready at 300 DPI, CMYK color mode, rounded corners, suitable for physical card production."

---

## 🚀 IMPLEMENTATION FEATURES

### Component Props

```typescript
interface ProfessionalMemberCardProps {
  member: {
    membershipId: string;
    name: string;
    fatherName: string | null;
    phone: string;
    photoUrl: string | null;
    district: string;
    state?: string;
    wing?: string;
  };
  partnerName?: string;         // Party name in Tamil
  partyTagline?: string;        // Subtitle (e.g., "உறுப்பினர் அட்டை")
  partySlogan?: string;         // Slogan in Tamil
  presidentName?: string;
  presidentTitle?: string;      // Title in Tamil
  presidentPhotoUrl?: string;
  partyAddress?: string;
  partyPhone?: string;
  partyWebsite?: string;
  partyEmail?: string;
  netajiPhotoUrl?: string;      // Netaji photo URL
  partyLogoUrl?: string;        // Party logo URL
}
```

### Export Functions
- **Download Front as PNG:** High-quality image export
- **Download Back as PNG:** Separate back side export
- **Download Both as PDF:** Combined PDF for printing
- **Print-Ready Mode:** Automatic 3mm bleed, 300 DPI scaling

---

## 📱 Responsive Features

- Cards display side-by-side on desktop (lg screens and up)
- Stacked vertically on mobile devices
- Editable member information in sidebar
- Real-time card preview updates
- Full-screen print mode compatible

---

## 🔐 Data Security

The QR code encodes only essential information:
- Member ID
- Full Name
- District
- Phone Number

No sensitive data (address, date of birth) is encoded in QR code.

---

## ✅ Quality Checklist

Before printing:
- [ ] All text is in correct Tamil font
- [ ] QR code scans correctly
- [ ] Photo quality is minimum 300×240px
- [ ] Colors match CMYK profile
- [ ] Bleed margins are correct (3mm)
- [ ] No text extends beyond safe area (5mm from edge)
- [ ] Logo is high-resolution (min 300 DPI)
- [ ] Font licensing is commercial-use approved
- [ ] Print service supports CMYK + rounded corners

---

## 📞 Support & Customization

For customization:
1. Edit component props to change party details
2. Update member data dynamically from database
3. Modify colors in gradient definitions
4. Replace placeholder images (Netaji, logo, president)
5. Adjust font sizes for different text lengths

All components are React-based and support dynamic data binding.

---

**Document Version:** 1.0  
**Last Updated:** December 2025  
**Design Format:** CR80 (85.6×54mm)  
**Print Ready:** 300 DPI CMYK
