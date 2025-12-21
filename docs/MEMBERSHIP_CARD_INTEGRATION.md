# 🔗 Membership Card Integration Guide

Complete guide to integrating the professional membership card system into your application.

---

## 📦 Installation & Setup

### Step 1: Install Dependencies

```bash
npm install html2canvas jspdf qrcode.react
# or
yarn add html2canvas jspdf qrcode.react
# or
pnpm add html2canvas jspdf qrcode.react
```

### Step 2: Import Components

```tsx
import ProfessionalMemberCard from '@/components/ProfessionalMemberCard';
import { 
  exportCardAsPNG,
  exportCardAsPDF,
  validateMembershipData 
} from '@/lib/membership-card-utils';
```

### Step 3: Update TypeScript Types (if needed)

Add member profile types to your types file:

```typescript
// src/lib/types.ts
export interface MemberProfile {
  membershipId: string;
  name: string;
  fatherName: string | null;
  phone: string;
  photoUrl: string | null;
  district: string;
  state?: string;
  constituency?: string;
  wing?: string;
  membershipType: string;
  membershipValidUntil: string | null;
}
```

---

## 🔌 Integration Scenarios

### Scenario 1: Standalone Card Preview

Display a card for a single member with download options:

```tsx
// pages/member/[id]/card.tsx
import ProfessionalMemberCard from '@/components/ProfessionalMemberCard';
import { useRouter } from 'next/router';

export default function MemberCardPage() {
  const router = useRouter();
  const { id } = router.query;

  const memberData = {
    membershipId: id,
    name: 'உறுப்பினர் பெயர்',
    fatherName: 'தந்தை பெயர்',
    phone: '9876543210',
    photoUrl: '/member-photo.jpg',
    district: 'சென்னை',
    wing: 'மகளிர் பிரிவு',
    membershipType: 'சாதாரண உறுப்பினர்',
    membershipValidUntil: '2025-12-31',
  };

  return (
    <div className="container py-10">
      <h1>Member Card - {memberData.membershipId}</h1>
      <ProfessionalMemberCard member={memberData} />
    </div>
  );
}
```

### Scenario 2: Integrated with Member Profile

Show card alongside member details:

```tsx
// components/MemberProfile.tsx
import ProfessionalMemberCard from '@/components/ProfessionalMemberCard';
import { useMember } from '@/hooks/useMember';

export default function MemberProfile({ memberId }: { memberId: string }) {
  const { member, loading, error } = useMember(memberId);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Member Details */}
      <div className="card">
        <h2>{member.name}</h2>
        <p>District: {member.district}</p>
        <p>Phone: {member.phone}</p>
        {/* More details... */}
      </div>

      {/* Membership Card */}
      <div>
        <ProfessionalMemberCard member={member} />
      </div>
    </div>
  );
}
```

### Scenario 3: Batch Card Generation

Generate cards for multiple members:

```tsx
// pages/admin/batch-generate-cards.tsx
import ProfessionalMemberCard from '@/components/ProfessionalMemberCard';
import { useState } from 'react';

export default function BatchCardGeneration() {
  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const handleBatchDownload = async () => {
    // Implementation for batch download
    // Generate PDF with multiple members
  };

  return (
    <div className="container py-10">
      <h1>Batch Card Generation</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <div key={member.membershipId} className="border rounded-lg p-4">
            <ProfessionalMemberCard member={member} />
            <button
              onClick={() => setSelectedMembers([...selectedMembers, member.membershipId])}
              className="mt-4 btn btn-primary w-full"
            >
              Select
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={handleBatchDownload}
        className="mt-8 btn btn-success"
      >
        Download Selected Cards (PDF)
      </button>
    </div>
  );
}
```

### Scenario 4: Dynamic Member Form with Live Preview

Form that updates card in real-time:

```tsx
// components/MemberCardPreview.tsx
import ProfessionalMemberCard from '@/components/ProfessionalMemberCard';
import { useState } from 'react';
import { validateMembershipData } from '@/lib/membership-card-utils';

interface FormData {
  membershipId: string;
  name: string;
  fatherName: string;
  phone: string;
  photoUrl: string;
  district: string;
  wing: string;
}

export default function MemberCardPreview() {
  const [formData, setFormData] = useState<FormData>({
    membershipId: '',
    name: '',
    fatherName: '',
    phone: '',
    photoUrl: '',
    district: '',
    wing: '',
  });

  const [errors, setErrors] = useState<string[]>([]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);

    // Validate on change
    const validation = validateMembershipData(updated);
    setErrors(validation.errors);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Form */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Membership ID</label>
          <input
            type="text"
            value={formData.membershipId}
            onChange={(e) => handleInputChange('membershipId', e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Name (Tamil)</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">District</label>
          <input
            type="text"
            value={formData.district}
            onChange={(e) => handleInputChange('district', e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {errors.length > 0 && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
            {errors.map((err, i) => <p key={i}>• {err}</p>)}
          </div>
        )}
      </div>

      {/* Live Preview */}
      <div className="sticky top-4">
        <ProfessionalMemberCard
          member={{
            ...formData,
            membershipType: 'সাধারণ সদস্য',
            membershipValidUntil: null,
            state: 'தமிழ்நாடு',
            constituency: '',
          } as any}
        />
      </div>
    </div>
  );
}
```

### Scenario 5: Card with Photo Upload

```tsx
// components/MemberCardWithUpload.tsx
import ProfessionalMemberCard from '@/components/ProfessionalMemberCard';
import { useState, useRef } from 'react';

export default function MemberCardWithUpload() {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const memberData = {
    membershipId: '13303846289',
    name: 'உறுப்பினர் பெயர்',
    fatherName: 'தந்தை பெயர்',
    phone: '9876543210',
    photoUrl,
    district: 'சென்னை',
    wing: 'மகளிர் பிரிவு',
    membershipType: 'சாதாரண உறுப்பினர்',
    membershipValidUntil: '2025-12-31',
  };

  return (
    <div className="space-y-6">
      <div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="btn btn-primary"
        >
          Upload Member Photo
        </button>
        {photoUrl && <p className="text-green-600 mt-2">✓ Photo uploaded</p>}
      </div>

      <ProfessionalMemberCard member={memberData} />
    </div>
  );
}
```

---

## 🔌 API Integration

### Fetch Member Data

```tsx
// hooks/useMember.ts
import { useState, useEffect } from 'react';

export function useMember(memberId: string) {
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await fetch(`/api/members/${memberId}`);
        if (!response.ok) throw new Error('Failed to fetch member');
        const data = await response.json();
        setMember(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [memberId]);

  return { member, loading, error };
}
```

### API Endpoint for Card Data

```typescript
// pages/api/members/[id]/card.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  try {
    // Fetch from database
    const member = await db.member.findUnique({
      where: { membershipId: id as string },
    });

    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    res.status(200).json({
      membershipId: member.id,
      name: member.name,
      fatherName: member.fatherName,
      phone: member.phone,
      photoUrl: member.photoUrl,
      district: member.district,
      state: member.state,
      wing: member.wing,
      membershipType: member.membershipType,
      membershipValidUntil: member.validUntil,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
```

---

## 🎯 Advanced Usage

### Custom Styling with Tailwind

```tsx
<div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg">
  <div className="text-center mb-8">
    <h1 className="text-3xl font-bold text-slate-900">
      Member Identification Card
    </h1>
  </div>

  <ProfessionalMemberCard member={memberData} />

  <div className="mt-8 flex justify-center gap-4">
    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
      Download as PNG
    </button>
    <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
      Download as PDF
    </button>
  </div>
</div>
```

### Error Boundary Wrapper

```tsx
// components/MemberCardErrorBoundary.tsx
import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  memberId: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class MemberCardErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    console.error('Member card error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded">
          <h2>Error loading membership card</h2>
          <p>{this.state.error?.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### Print Handler

```tsx
// hooks/usePrint.ts
import { useRef } from 'react';

export function usePrint() {
  const elementRef = useRef<HTMLDivElement>(null);

  const print = () => {
    if (!elementRef.current) return;

    const printWindow = window.open('', '', 'height=600,width=800');
    if (!printWindow) return;

    printWindow.document.write('<html><head><title>Print</title></head><body>');
    printWindow.document.write(elementRef.current.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  return { elementRef, print };
}
```

---

## 🗄️ Database Schema

### Member Collection (MongoDB example)

```javascript
{
  _id: ObjectId,
  membershipId: String, // Unique
  name: String,         // Tamil
  fatherName: String,
  phone: String,        // Unique
  photoUrl: String,
  district: String,
  state: String,
  constituency: String,
  wing: String,
  membershipType: String,
  membershipValidUntil: Date,
  dateOfBirth: Date,
  address: String,
  email: String,
  createdAt: Date,
  updatedAt: Date,
  status: Enum, // 'ACTIVE', 'INACTIVE', 'PENDING'
}
```

### Prisma Schema

```prisma
model Member {
  id                    String   @id @default(cuid())
  membershipId          String   @unique
  name                  String
  fatherName            String?
  phone                 String   @unique
  photoUrl              String?
  district              String
  state                 String?
  constituency          String?
  wing                  String?
  membershipType        String
  membershipValidUntil  DateTime?
  createdAt             DateTime @default(now())
  updatedAt             DateTime @updatedAt
  status                String   @default("ACTIVE")

  @@index([membershipId])
  @@index([phone])
}
```

---

## 🧪 Testing

### Unit Tests

```typescript
// __tests__/membership-card-utils.test.ts
import { validateMembershipData, formatIndianPhoneNumber } from '@/lib/membership-card-utils';

describe('Membership Card Utilities', () => {
  describe('validateMembershipData', () => {
    it('should validate correct member data', () => {
      const data = {
        membershipId: '123',
        name: 'Test Name',
        phone: '9876543210',
        district: 'Chennai',
      };
      const { isValid } = validateMembershipData(data);
      expect(isValid).toBe(true);
    });

    it('should reject missing required fields', () => {
      const data = {
        membershipId: '',
        name: '',
        phone: '',
        district: '',
      };
      const { isValid, errors } = validateMembershipData(data);
      expect(isValid).toBe(false);
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe('formatIndianPhoneNumber', () => {
    it('should format 10-digit phone number', () => {
      const result = formatIndianPhoneNumber('9876543210');
      expect(result).toBe('+91 98765 43210');
    });
  });
});
```

---

## 📋 Deployment Checklist

- [ ] Install dependencies: `npm install`
- [ ] Verify TypeScript compilation: `npm run build`
- [ ] Test card preview page: `npm run dev`
- [ ] Check responsive design on mobile
- [ ] Test PNG export functionality
- [ ] Test PDF export functionality
- [ ] Verify QR code generation and scanning
- [ ] Test Tamil font rendering
- [ ] Check print styles
- [ ] Verify image loading (CORS)
- [ ] Test with sample member data
- [ ] Review accessibility with screen reader
- [ ] Optimize image sizes
- [ ] Set up error tracking (Sentry, LogRocket)
- [ ] Configure CDN for static assets
- [ ] Deploy to production environment

---

## 🚀 Performance Tips

1. **Lazy load images:** Use Next.js Image component
2. **Memoize components:** Use `React.memo` for preview card
3. **Debounce form inputs:** Reduce re-renders
4. **Optimize canvas rendering:** Use appropriate scale factor
5. **Cache API responses:** Use SWR or React Query
6. **Minify CSS:** Production build optimization
7. **Compress images:** JPEG quality 85-90%

---

## 🔐 Security Best Practices

1. **Validate server-side:** Don't trust client-side validation
2. **Sanitize inputs:** Use DOMPurify for any user content
3. **Secure QR data:** Don't encode sensitive information
4. **CORS headers:** Configure properly on image endpoints
5. **Rate limiting:** Protect export endpoints
6. **Authentication:** Require login for member cards
7. **Authorization:** Only show own card or admin-only cards

---

## 📞 Troubleshooting

### Canvas Memory Issues

```tsx
// Dispose canvas properly
const canvas = await html2canvas(element);
const context = canvas.getContext('2d');
context?.clearRect(0, 0, canvas.width, canvas.height);
```

### Font Loading Delays

```tsx
// Preload Tamil font
<link
  rel="preload"
  href="https://fonts.googleapis.com/css2?family=Noto+Serif+Tamil:wght@400;700;900"
  as="style"
/>
```

### QR Code Size Issues

```tsx
// Ensure minimum QR code size
<QRCodeSVG
  value={data}
  size={128} // Minimum 100px recommended
  level="H"
/>
```

---

**Document Version:** 1.0  
**Last Updated:** December 2025  
**Status:** Production Ready ✅
