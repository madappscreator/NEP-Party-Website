'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import cardTa from '@/locales/card-ta.json';
import cardMl from '@/locales/card-ml.json';
import cardHi from '@/locales/card-hi.json';
import cardTe from '@/locales/card-te.json';
import cardKn from '@/locales/card-kn.json';

// Dynamic import to avoid SSR issues
const MultiLanguageMemberCard = dynamic(() => import('@/components/MultiLanguageMemberCard'), {
  ssr: false,
});

type Language = 'ta' | 'ml' | 'hi' | 'te' | 'kn';

const translations: Record<Language, any> = {
  ta: cardTa,
  ml: cardMl,
  hi: cardHi,
  te: cardTe,
  kn: cardKn,
};

const languageNames: Record<Language, string> = {
  ta: 'Tamil (தமிழ்)',
  ml: 'Malayalam (മലയാളം)',
  hi: 'Hindi (हिंदी)',
  te: 'Telugu (తెలుగు)',
  kn: 'Kannada (ಕನ್ನಡ)',
};

export default function MembershipCardShowcase() {
  const [language, setLanguage] = useState<Language>('ta');
  const [memberData, setMemberData] = useState({
    membershipId: '13303846289',
    name: 'கிரிஸ்து வில்லிலையம் தேவி',
    wing: 'மகளிர் பிரிவு',
    phone: '9876543210',
    photoUrl: null as string | null,
    district: 'சென்னை',
    state: 'தமிழ்நாடு',
    address: 'சென்னை, தமிழ்நாடு',
    presidentName: 'ஆ. சயந்தன்',
    partyAddress: 'சென்னை, தமிழ்நாடு, இந்தியா',
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 py-12">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            தமிழ்நாட்டு அனைத்திந்திய கட்சி உறுப்பினர் அட்டை
          </h1>
          <p className="text-lg text-slate-600">Professional Membership Card Design</p>
          <p className="text-sm text-slate-500 mt-2">
            CR80 Format | 85.6mm × 54mm | Print Ready 300 DPI
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Card Preview */}
          <div className="lg:col-span-2">
            <Card className="h-full shadow-xl">
              <CardHeader>
                <CardTitle>Card Preview - {languageNames[language]}</CardTitle>
                <CardDescription>Both sides in CR80 format (720×420px)</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-8">
                {/* Language Selector */}
                <div className="flex flex-wrap gap-2">
                  {Object.entries(languageNames).map(([lang, name]) => (
                    <Button
                      key={lang}
                      variant={language === lang ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setLanguage(lang as Language)}
                      className="text-xs"
                    >
                      {name}
                    </Button>
                  ))}
                </div>

                {/* Card Preview */}
                <div className="border-2 border-gray-300 rounded-lg overflow-auto bg-gray-50 p-4">
                  <MultiLanguageMemberCard
                    member={memberData}
                    language={language}
                    translations={translations[language]}
                    partyLogoUrl="/NEP Flag.jpg"
                    presidentPhotoUrl="/NEP President.jpg"
                    partyWebsite="www.namtamiliar.org"
                    partyEmail="info@namtamiliar.org"
                    partyPhone="044-43840484"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Form Controls */}
          <div className="lg:col-span-1">
            <Card className="shadow-xl sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg">Member Data</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 max-h-[600px] overflow-y-auto">
                <div>
                  <Label className="text-xs font-semibold">Membership ID</Label>
                  <Input
                    value={memberData.membershipId}
                    onChange={(e) =>
                      setMemberData({ ...memberData, membershipId: e.target.value })
                    }
                    className="text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold">Name</Label>
                  <Input
                    value={memberData.name}
                    onChange={(e) =>
                      setMemberData({ ...memberData, name: e.target.value })
                    }
                    className="text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold">Wing (Optional)</Label>
                  <Input
                    value={memberData.wing}
                    onChange={(e) =>
                      setMemberData({ ...memberData, wing: e.target.value })
                    }
                    className="text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold">Phone</Label>
                  <Input
                    value={memberData.phone}
                    onChange={(e) =>
                      setMemberData({ ...memberData, phone: e.target.value })
                    }
                    className="text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold">District</Label>
                  <Input
                    value={memberData.district}
                    onChange={(e) =>
                      setMemberData({ ...memberData, district: e.target.value })
                    }
                    className="text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold">State</Label>
                  <Input
                    value={memberData.state}
                    onChange={(e) =>
                      setMemberData({ ...memberData, state: e.target.value })
                    }
                    className="text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold">Address</Label>
                  <Textarea
                    value={memberData.address}
                    onChange={(e) =>
                      setMemberData({ ...memberData, address: e.target.value })
                    }
                    className="text-sm h-20"
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold">President Name</Label>
                  <Input
                    value={memberData.presidentName}
                    onChange={(e) =>
                      setMemberData({ ...memberData, presidentName: e.target.value })
                    }
                    className="text-sm"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Specifications Card */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Design Specifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Size</h3>
                <p className="text-sm text-blue-700">85.6 × 54 mm (CR80)</p>
                <p className="text-xs text-blue-600 mt-1">720 × 420 px @ 96 DPI</p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">Colors</h3>
                <p className="text-sm text-green-700">Sky Blue #0066CC</p>
                <p className="text-sm text-green-700">Olive Green #556B2F</p>
                <p className="text-xs text-green-600 mt-1">White | Black</p>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-2">Print Settings</h3>
                <p className="text-sm text-purple-700">300 DPI | CMYK | 3mm Bleed</p>
                <p className="text-xs text-purple-600 mt-1">PVC/Matte Finish</p>
              </div>

              <div className="p-4 bg-indigo-50 rounded-lg">
                <h3 className="font-semibold text-indigo-900 mb-2">Languages</h3>
                <p className="text-sm text-indigo-700">5 Languages Supported</p>
                <p className="text-xs text-indigo-600 mt-1">Tamil, Malayalam, Hindi, Telugu, Kannada</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-sky-50 to-blue-50 rounded-lg border-l-4 border-sky-600">
              <h3 className="font-semibold text-sky-900 mb-2">Front Side Elements</h3>
              <ul className="text-sm text-sky-700 space-y-1">
                <li>✓ Party Name & Motto (Sky Blue Header)</li>
                <li>✓ Party Logo</li>
                <li>✓ Member Photo with Light Gray Background</li>
                <li>✓ Member Details (Name, Wing, District, ID)</li>
                <li>✓ Validity Status (Olive Green Footer)</li>
              </ul>
            </div>

            <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-yellow-50 rounded-lg border-l-4 border-green-600">
              <h3 className="font-semibold text-green-900 mb-2">Back Side Elements</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>✓ QR Code (Left - Sky Blue Section)</li>
                <li>✓ Party Details (Middle - Olive Green Section)</li>
                <li>✓ Member Address (Center)</li>
                <li>✓ President Photo & Authority (Right - Sky Blue Section)</li>
                <li>✓ Contact Information & Website</li>
              </ul>
            </div>

            <div className="mt-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border-l-4 border-amber-600">
              <h3 className="font-semibold text-amber-900 mb-2">Multi-Language Support</h3>
              <ul className="text-sm text-amber-700 space-y-1">
                <li>✓ Template-Based: Single layout for all languages</li>
                <li>✓ Language-Specific Fonts: Proper character rendering</li>
                <li>✓ Translations: Complete UI text for each language</li>
                <li>✓ Export: Language code in filename (e.g., card-front-ta.png)</li>
                <li>✓ QR Data: Includes language parameter for future scanning</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
