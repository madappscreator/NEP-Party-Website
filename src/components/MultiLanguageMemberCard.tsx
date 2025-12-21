'use client';

import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download, Globe } from 'lucide-react';

// Language types
type Language = 'ta' | 'ml' | 'hi' | 'te' | 'kn';

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

interface TranslationData {
  partyName: string;
  partyNameEn: string;
  memberCard: string;
  memberName: string;
  wing: string;
  district: string;
  memberId: string;
  mobile: string;
  validMember: string;
  partyDetails: string;
  memberAddress: string;
  address: string;
  website: string;
  contact: string;
  presidentSignature: string;
  presidentName: string;
  presidentTitle: string;
  motto: string;
}

interface MultiLanguageMemberCardProps {
  member: MemberData;
  language: Language;
  translations: TranslationData;
  partyLogoUrl?: string;
  presidentPhotoUrl?: string;
  partyWebsite?: string;
  partyEmail?: string;
  partyPhone?: string;
}

// Color scheme from party theme
const PARTY_COLORS = {
  skyBlue: '#0066CC',
  oliveGreen: '#556B2F',
  white: '#FFFFFF',
  black: '#000000',
  lightGray: '#F5F5F5',
  darkGray: '#333333',
};

// Font mapping based on language
const LANGUAGE_FONTS: Record<Language, string> = {
  ta: "'Noto Serif Tamil', serif",
  ml: "'Noto Serif Malayalam', serif",
  hi: "'Noto Serif Devanagari', serif",
  te: "'Noto Serif Telugu', serif",
  kn: "'Noto Serif Kannada', serif",
};

const MultiLanguageMemberCard: React.FC<MultiLanguageMemberCardProps> = ({
  member,
  language,
  translations,
  partyLogoUrl = '/NEP Flag.jpg',
  presidentPhotoUrl = '/NEP President.jpg',
  partyWebsite = 'www.namtamiliar.org',
  partyEmail = 'info@namtamiliar.org',
  partyPhone = '044-43840484',
}) => {
  const cardFrontRef = useRef<HTMLDivElement>(null);
  const cardBackRef = useRef<HTMLDivElement>(null);

  const CARD_WIDTH = 720;
  const CARD_HEIGHT = 420;

  const QRData = {
    member_id: member.membershipId,
    name: member.name,
    district: member.district,
    mobile: member.phone,
    language: language,
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
      link.download = `${member.membershipId}-card-${side}-${language}.png`;
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

      pdf.save(`${member.membershipId}-card-${language}.pdf`);
    } catch (err) {
      console.error('Error downloading PDF:', err);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl">
      {/* Download Controls */}
      <div className="flex gap-3 justify-center flex-wrap">
        <button
          onClick={() => downloadAsImage('front')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Download size={18} /> Front
        </button>
        <button
          onClick={() => downloadAsImage('back')}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          <Download size={18} /> Back
        </button>
        <button
          onClick={downloadBothSidesAsPDF}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          <Download size={18} /> PDF
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 justify-center">
        {/* ===== FRONT SIDE ===== */}
        <div
          ref={cardFrontRef}
          style={{
            width: `${CARD_WIDTH}px`,
            height: `${CARD_HEIGHT}px`,
            background: PARTY_COLORS.white,
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
            fontFamily: LANGUAGE_FONTS[language],
            display: 'flex',
            flexDirection: 'column',
            border: `1px solid ${PARTY_COLORS.darkGray}`,
          }}
        >
          {/* HEADER - Sky Blue */}
          <div
            style={{
              background: PARTY_COLORS.skyBlue,
              color: PARTY_COLORS.white,
              padding: '14px 16px',
              textAlign: 'center',
              borderBottom: `2px solid ${PARTY_COLORS.oliveGreen}`,
            }}
          >
            <h1
              style={{
                margin: '0',
                fontSize: '18px',
                fontWeight: '700',
                letterSpacing: '1px',
                lineHeight: '1.3',
              }}
            >
              {translations.partyName}
            </h1>
            <p
              style={{
                margin: '4px 0 0 0',
                fontSize: '11px',
                opacity: 0.95,
                fontWeight: '500',
              }}
            >
              {translations.motto}
            </p>
          </div>

          {/* BODY - Olive Green Section */}
          <div
            style={{
              background: PARTY_COLORS.oliveGreen,
              color: PARTY_COLORS.white,
              display: 'flex',
              padding: '14px 16px',
              gap: '12px',
              flex: 1,
              alignItems: 'stretch',
            }}
          >
            {/* Logo */}
            <div
              style={{
                width: '60px',
                height: '120px',
                borderRadius: '6px',
                overflow: 'hidden',
                backgroundColor: PARTY_COLORS.white,
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
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

            {/* Member Info */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ marginBottom: '6px' }}>
                <p style={{ margin: '0', fontSize: '10px', opacity: 0.85, fontWeight: '500' }}>
                  {translations.memberCard}
                </p>
              </div>
              <h2
                style={{
                  margin: '0 0 6px 0',
                  fontSize: '15px',
                  fontWeight: '700',
                  lineHeight: '1.2',
                }}
              >
                {member.name}
              </h2>
              <div style={{ fontSize: '11px', lineHeight: '1.5', opacity: 0.9 }}>
                <p style={{ margin: '2px 0' }}>
                  <span style={{ fontWeight: '600' }}>{translations.wing}:</span> {member.wing}
                </p>
                <p style={{ margin: '2px 0' }}>
                  <span style={{ fontWeight: '600' }}>{translations.district}:</span> {member.district}
                </p>
                <p style={{ margin: '2px 0' }}>
                  <span style={{ fontWeight: '600' }}>{translations.memberId}:</span> {member.membershipId}
                </p>
                <p style={{ margin: '2px 0' }}>
                  <span style={{ fontWeight: '600' }}>{translations.mobile}:</span> {member.phone}
                </p>
              </div>
            </div>

            {/* Member Photo */}
            <div
              style={{
                width: '100px',
                height: '120px',
                borderRadius: '6px',
                overflow: 'hidden',
                backgroundColor: PARTY_COLORS.lightGray,
                flexShrink: 0,
                border: `2px solid ${PARTY_COLORS.white}`,
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
          </div>

          {/* FOOTER - White with Black Border */}
          <div
            style={{
              background: PARTY_COLORS.white,
              color: PARTY_COLORS.darkGray,
              padding: '8px 16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '10px',
              borderTop: `2px solid ${PARTY_COLORS.black}`,
              fontWeight: '500',
            }}
          >
            <span>{translations.validMember}</span>
            <span>2025</span>
            <span>▢ {translations.memberId}</span>
          </div>
        </div>

        {/* ===== BACK SIDE ===== */}
        <div
          ref={cardBackRef}
          style={{
            width: `${CARD_WIDTH}px`,
            height: `${CARD_HEIGHT}px`,
            background: PARTY_COLORS.white,
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
            fontFamily: LANGUAGE_FONTS[language],
            display: 'flex',
            border: `1px solid ${PARTY_COLORS.darkGray}`,
          }}
        >
          {/* LEFT: QR Code */}
          <div
            style={{
              width: '140px',
              background: PARTY_COLORS.skyBlue,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '12px',
              borderRight: `2px solid ${PARTY_COLORS.black}`,
            }}
          >
            <div
              style={{
                backgroundColor: PARTY_COLORS.white,
                padding: '8px',
                borderRadius: '6px',
                border: `2px solid ${PARTY_COLORS.oliveGreen}`,
              }}
            >
              <QRCodeSVG
                value={JSON.stringify(QRData)}
                size={100}
                level="H"
                includeMargin={true}
                fgColor={PARTY_COLORS.darkGray}
                bgColor={PARTY_COLORS.white}
              />
            </div>
            <p
              style={{
                margin: '6px 0 0 0',
                fontSize: '9px',
                color: PARTY_COLORS.white,
                fontWeight: '600',
                textAlign: 'center',
              }}
            >
              {translations.memberId}
            </p>
          </div>

          {/* MIDDLE: Details */}
          <div
            style={{
              flex: 1,
              background: PARTY_COLORS.oliveGreen,
              color: PARTY_COLORS.white,
              padding: '12px 14px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              fontSize: '10px',
              lineHeight: '1.4',
            }}
          >
            {/* Party Details */}
            <div>
              <h4
                style={{
                  margin: '0 0 6px 0',
                  fontSize: '11px',
                  fontWeight: '700',
                  borderBottom: `1px solid ${PARTY_COLORS.white}`,
                  paddingBottom: '4px',
                }}
              >
                {translations.partyDetails}
              </h4>
              <p style={{ margin: '2px 0' }}>📍 {member.partyAddress || 'Chennai, TN'}</p>
              <p style={{ margin: '2px 0' }}>🌐 {partyWebsite}</p>
              <p style={{ margin: '2px 0' }}>📞 {partyPhone}</p>
            </div>

            {/* Member Address */}
            <div>
              <h4
                style={{
                  margin: '0 0 6px 0',
                  fontSize: '11px',
                  fontWeight: '700',
                  borderBottom: `1px solid ${PARTY_COLORS.white}`,
                  paddingBottom: '4px',
                }}
              >
                {translations.memberAddress}
              </h4>
              <p style={{ margin: '2px 0' }}>{member.name}</p>
              <p style={{ margin: '2px 0' }}>{member.district}, {member.state || 'India'}</p>
            </div>
          </div>

          {/* RIGHT: Authority */}
          <div
            style={{
              width: '140px',
              background: PARTY_COLORS.skyBlue,
              color: PARTY_COLORS.white,
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderLeft: `2px solid ${PARTY_COLORS.black}`,
            }}
          >
            {/* President Photo */}
            <div
              style={{
                width: '90px',
                height: '80px',
                borderRadius: '4px',
                overflow: 'hidden',
                border: `2px solid ${PARTY_COLORS.white}`,
                backgroundColor: PARTY_COLORS.white,
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

            {/* Signature Area */}
            <div
              style={{
                width: '100%',
                textAlign: 'center',
                fontSize: '8px',
                borderTop: `1px dashed ${PARTY_COLORS.white}`,
                paddingTop: '6px',
              }}
            >
              <p style={{ margin: '0', fontStyle: 'italic' }}>signature</p>
            </div>

            {/* President Info */}
            <div style={{ textAlign: 'center', fontSize: '9px', fontWeight: '600' }}>
              <p style={{ margin: '2px 0' }}>{member.presidentName || 'President'}</p>
              <p style={{ margin: '0', fontSize: '8px', opacity: 0.85 }}>{translations.presidentTitle}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div
        style={{
          background: 'white',
          padding: '12px',
          borderRadius: '8px',
          border: `1px solid ${PARTY_COLORS.skyBlue}`,
          fontSize: '11px',
          color: PARTY_COLORS.darkGray,
          textAlign: 'center',
        }}
      >
        <p style={{ margin: '0' }}>
          <strong>Card Format:</strong> CR80 (85.6×54mm) | <strong>Language:</strong> {language.toUpperCase()}
        </p>
      </div>
    </div>
  );
};

export default MultiLanguageMemberCard;
