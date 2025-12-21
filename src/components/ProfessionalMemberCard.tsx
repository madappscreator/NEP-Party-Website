'use client';

import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download, FileImage, FileText } from 'lucide-react';

interface MemberProfile {
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
  dateOfBirth?: string;
}

interface ProfessionalMemberCardProps {
  member: MemberProfile;
  partnerName?: string;
  partyTagline?: string;
  partySlogan?: string;
  presidentName?: string;
  presidentTitle?: string;
  presidentPhotoUrl?: string;
  partyAddress?: string;
  partyPhone?: string;
  partyWebsite?: string;
  partyEmail?: string;
  netajiPhotoUrl?: string;
  partyLogoUrl?: string;
}

const ProfessionalMemberCard: React.FC<ProfessionalMemberCardProps> = ({
  member,
  partnerName = 'தமிழ்நாட்டு அனைத்திந்திய கட்சி',
  partyTagline = 'உறுப்பினர் அட்டை',
  partySlogan = 'நெறியாக, நல்லாக, நயமாக',
  presidentName = 'ஆ. சயந்தன்',
  presidentTitle = 'தலைமை ஒருங்கிணைப்பாளர்',
  presidentPhotoUrl = '/president-2.jpg',
  partyAddress = 'சென்னை, தமிழ்நாடு, இந்தியா',
  partyPhone = '044-43840484',
  partyWebsite = 'www.namtamiliar.org',
  partyEmail = 'info@namtamiliar.org',
  netajiPhotoUrl = '/netaji.jpg',
  partyLogoUrl = '/NEP Flag.jpg',
}) => {
  const cardFrontRef = useRef<HTMLDivElement>(null);
  const cardBackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // CR80 dimensions: 85.6mm × 54mm = 324 × 204 pixels at 96DPI
  // We'll use 720px × 420px for better rendering, then scale down
  const CARD_WIDTH = 720;
  const CARD_HEIGHT = 420;

  const QRData = {
    member_id: member.membershipId,
    name: member.name,
    district: member.district,
    mobile: member.phone,
  };

  const downloadAsImage = async (side: 'front' | 'back') => {
    const ref = side === 'front' ? cardFrontRef : cardBackRef;
    if (!ref.current) return;

    try {
      const canvas = await html2canvas(ref.current, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
      });

      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `${member.membershipId}-card-${side}.png`;
      link.click();
    } catch (err) {
      console.error('Error downloading card:', err);
    }
  };

  const downloadBothSidesAsPDF = async () => {
    if (!cardFrontRef.current || !cardBackRef.current) return;

    try {
      const canvasFront = await html2canvas(cardFrontRef.current, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
      });

      const canvasBack = await html2canvas(cardBackRef.current, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
      });

      const pdf = new jsPDF('l', 'mm', 'A4');
      const imgFront = canvasFront.toDataURL('image/png');
      const imgBack = canvasBack.toDataURL('image/png');

      pdf.addImage(imgFront, 'PNG', 10, 10, 190, 120);
      pdf.addImage(imgBack, 'PNG', 10, 140, 190, 120);

      pdf.save(`${member.membershipId}-membership-card.pdf`);
    } catch (err) {
      console.error('Error downloading PDF:', err);
    }
  };

  return (
    <div ref={containerRef} className="flex flex-col gap-8 p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl">
      {/* Controls */}
      <div className="flex gap-3 justify-center flex-wrap">
        <button
          onClick={() => downloadAsImage('front')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <FileImage size={18} /> Download Front
        </button>
        <button
          onClick={() => downloadAsImage('back')}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          <FileImage size={18} /> Download Back
        </button>
        <button
          onClick={downloadBothSidesAsPDF}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          <FileText size={18} /> Download PDF
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 justify-center">
        {/* ===== FRONT SIDE ===== */}
        <div
          ref={cardFrontRef}
          style={{
            width: `${CARD_WIDTH}px`,
            height: `${CARD_HEIGHT}px`,
            background: 'linear-gradient(135deg, #fafaf5 0%, #f5f3f0 100%)',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
            fontFamily: '"Noto Serif Tamil", "Catamaran", serif',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* TOP SECTION - Netaji + Party Name */}
          <div
            style={{
              background: 'linear-gradient(135deg, #dc143c 0%, #ff6b35 50%, #fff3cd 100%)',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              borderBottom: '3px solid #8B0000',
              minHeight: '90px',
            }}
          >
            {/* Netaji Photo */}
            <div
              style={{
                width: '60px',
                height: '70px',
                borderRadius: '4px',
                overflow: 'hidden',
                border: '2px solid white',
                flexShrink: 0,
                backgroundColor: '#e8d5c4',
              }}
            >
              <img
                src={netajiPhotoUrl}
                alt="Netaji"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'sepia(0.8) grayscale(0.3)',
                }}
              />
            </div>

            {/* Party Name - Tamil */}
            <div style={{ flex: 1 }}>
              <h1
                style={{
                  margin: '0',
                  fontSize: '22px',
                  fontWeight: '900',
                  color: '#8B0000',
                  textShadow: '1px 1px 2px rgba(255,255,255,0.5)',
                  letterSpacing: '2px',
                }}
              >
                {partnerName}
              </h1>
              <p
                style={{
                  margin: '4px 0 0 0',
                  fontSize: '12px',
                  color: '#fff',
                  fontWeight: '600',
                  textShadow: '1px 1px 1px rgba(0,0,0,0.3)',
                }}
              >
                {partyTagline}
              </p>
            </div>
          </div>

          {/* MEMBER SECTION */}
          <div
            style={{
              display: 'flex',
              padding: '20px',
              gap: '20px',
              flex: 1,
            }}
          >
            {/* Left: Member Photo */}
            <div
              style={{
                width: '140px',
                height: '160px',
                borderRadius: '8px',
                border: '4px solid #dc143c',
                overflow: 'hidden',
                backgroundColor: '#fff9e6',
                boxShadow: 'inset 0 0 5px rgba(220, 20, 60, 0.2)',
                flexShrink: 0,
              }}
            >
              <img
                src={member.photoUrl || '/user-placeholder.jpg'}
                alt="Member"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>

            {/* Center: Member Details - Tamil */}
            <div style={{ flex: 1, fontSize: '13px', color: '#222', lineHeight: '1.8' }}>
              <h3
                style={{
                  margin: '0 0 12px 0',
                  fontSize: '16px',
                  fontWeight: '900',
                  color: '#dc143c',
                  textTransform: 'uppercase',
                  borderBottom: '2px solid #ff6b35',
                  paddingBottom: '6px',
                }}
              >
                உறுப்பினர் விவரங்கள்
              </h3>

              <div style={{ marginBottom: '8px' }}>
                <span style={{ fontWeight: '600', color: '#333' }}>பெயர்:</span>
                <p style={{ margin: '2px 0 0 0', fontSize: '14px', fontWeight: '700', color: '#8B0000' }}>
                  {member.name}
                </p>
              </div>

              <div style={{ marginBottom: '6px' }}>
                <span style={{ fontWeight: '600' }}>தந்தை/பாதுகாவலர்:</span>{' '}
                <span>{member.fatherName || '-'}</span>
              </div>

              <div style={{ marginBottom: '6px' }}>
                <span style={{ fontWeight: '600' }}>மாவட்டம்:</span> <span>{member.district || '-'}</span>
              </div>

              <div style={{ marginBottom: '6px' }}>
                <span style={{ fontWeight: '600' }}>உறுப்பினை எண்:</span> <span>{member.membershipId}</span>
              </div>

              <div style={{ marginBottom: '6px' }}>
                <span style={{ fontWeight: '600' }}>தொலைபேசி:</span> <span>{member.phone}</span>
              </div>

              {member.wing && (
                <div style={{ marginBottom: '6px' }}>
                  <span style={{ fontWeight: '600' }}>பிரிவு:</span> <span>{member.wing}</span>
                </div>
              )}
            </div>
          </div>

          {/* BOTTOM STRIP - Party Logo + Slogan */}
          <div
            style={{
              background: 'linear-gradient(90deg, #8B0000 0%, #dc143c 50%, #ff6b35 100%)',
              color: 'white',
              padding: '12px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              borderTop: '2px solid #fff',
            }}
          >
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '4px',
                overflow: 'hidden',
                backgroundColor: 'white',
                flexShrink: 0,
              }}
            >
              <img
                src={partyLogoUrl}
                alt="Party Logo"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  padding: '4px',
                }}
              />
            </div>
            <div>
              <p
                style={{
                  margin: '0',
                  fontSize: '13px',
                  fontWeight: '700',
                  color: '#fff9e6',
                  letterSpacing: '1px',
                }}
              >
                {partySlogan}
              </p>
            </div>
          </div>
        </div>

        {/* ===== BACK SIDE ===== */}
        <div
          ref={cardBackRef}
          style={{
            width: `${CARD_WIDTH}px`,
            height: `${CARD_HEIGHT}px`,
            background: 'linear-gradient(135deg, #f5f3f0 0%, #fafaf5 100%)',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
            fontFamily: '"Noto Serif Tamil", "Catamaran", serif',
            display: 'flex',
            position: 'relative',
          }}
        >
          {/* LEFT: QR CODE */}
          <div
            style={{
              width: '180px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #fff9e6 0%, #fffbf0 100%)',
              borderRight: '3px dashed #dc143c',
              padding: '20px',
            }}
          >
            <div
              style={{
                backgroundColor: 'white',
                padding: '12px',
                borderRadius: '8px',
                border: '2px solid #dc143c',
                boxShadow: '0 4px 12px rgba(220, 20, 60, 0.2)',
              }}
            >
              <QRCodeSVG
                value={JSON.stringify(QRData)}
                size={120}
                level="H"
                includeMargin={true}
                fgColor="#8B0000"
                bgColor="#ffffff"
              />
            </div>
            <p
              style={{
                margin: '8px 0 0 0',
                fontSize: '11px',
                fontWeight: '600',
                color: '#8B0000',
                textAlign: 'center',
              }}
            >
              உறுப்பினை ID
            </p>
          </div>

          {/* CENTER: PARTY DETAILS + MEMBER ADDRESS */}
          <div
            style={{
              flex: 1,
              padding: '20px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {/* Party Details */}
            <div style={{ marginBottom: '12px' }}>
              <h4
                style={{
                  margin: '0 0 10px 0',
                  fontSize: '14px',
                  fontWeight: '900',
                  color: '#8B0000',
                  borderBottom: '2px solid #dc143c',
                  paddingBottom: '6px',
                }}
              >
                கட்சி விவரங்கள்
              </h4>
              <p style={{ margin: '4px 0', fontSize: '12px', color: '#333' }}>
                <strong>கட்சி:</strong> {partnerName}
              </p>
              <p style={{ margin: '4px 0', fontSize: '12px', color: '#333' }}>
                <strong>முகவரி:</strong> {partyAddress}
              </p>
              <p style={{ margin: '4px 0', fontSize: '12px', color: '#333' }}>
                <strong>தொலைபேசி:</strong> {partyPhone}
              </p>
              <p style={{ margin: '4px 0', fontSize: '12px', color: '#333' }}>
                <strong>வலைத்தளம்:</strong> {partyWebsite}
              </p>
              <p style={{ margin: '4px 0', fontSize: '12px', color: '#333' }}>
                <strong>மின்னஞ்சல்:</strong> {partyEmail}
              </p>
            </div>

            {/* Member Address */}
            <div>
              <h4
                style={{
                  margin: '0 0 10px 0',
                  fontSize: '14px',
                  fontWeight: '900',
                  color: '#8B0000',
                  borderBottom: '2px solid #dc143c',
                  paddingBottom: '6px',
                }}
              >
                உறுப்பினை முகவரி
              </h4>
              <p style={{ margin: '4px 0', fontSize: '12px', color: '#333' }}>
                <strong>பெயர்:</strong> {member.name}
              </p>
              <p style={{ margin: '4px 0', fontSize: '12px', color: '#333' }}>
                <strong>மாவட்டம்:</strong> {member.district}
              </p>
              {member.state && (
                <p style={{ margin: '4px 0', fontSize: '12px', color: '#333' }}>
                  <strong>மாநிலம்:</strong> {member.state}
                </p>
              )}
              <p style={{ margin: '4px 0', fontSize: '12px', color: '#333' }}>
                <strong>தொலைபேசி:</strong> {member.phone}
              </p>
            </div>
          </div>

          {/* RIGHT: PRESIDENT AUTHORITY SECTION */}
          <div
            style={{
              width: '160px',
              background: 'linear-gradient(135deg, #8B0000 0%, #dc143c 100%)',
              color: 'white',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderLeft: '3px solid #ff6b35',
            }}
          >
            {/* President Photo */}
            <div
              style={{
                width: '120px',
                height: '100px',
                borderRadius: '6px',
                overflow: 'hidden',
                border: '3px solid white',
                backgroundColor: '#333',
              }}
            >
              <img
                src={presidentPhotoUrl}
                alt="President"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>

            {/* Signature placeholder */}
            <div
              style={{
                width: '100%',
                textAlign: 'center',
                marginTop: '8px',
                paddingTop: '8px',
                borderTop: '2px solid rgba(255,255,255,0.5)',
              }}
            >
              <p style={{ margin: '4px 0', fontSize: '9px', fontStyle: 'italic' }}>
                (signature)
              </p>
            </div>

            {/* President Details */}
            <div style={{ textAlign: 'center', fontSize: '10px' }}>
              <p style={{ margin: '4px 0 0 0', fontWeight: '700' }}>
                {presidentName}
              </p>
              <p style={{ margin: '2px 0 0 0', fontSize: '9px', opacity: 0.9 }}>
                {presidentTitle}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Print Specifications Info */}
      <div
        style={{
          background: 'white',
          padding: '16px',
          borderRadius: '12px',
          border: '2px solid #e5e7eb',
          fontSize: '12px',
          color: '#666',
          textAlign: 'center',
        }}
      >
        <p>
          <strong>Print Specifications:</strong> CR80 (85.6mm × 54mm) | 300 DPI | CMYK | Rounded corners (4-6mm) | 3mm Bleed Margin
        </p>
      </div>
    </div>
  );
};

export default ProfessionalMemberCard;
