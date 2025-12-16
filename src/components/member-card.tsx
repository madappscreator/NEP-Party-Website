'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { FileImage, FileText, User } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { QRCodeSVG } from 'qrcode.react';

// Define the shape of the member data
interface MemberData {
  membershipId: string;
  name: string;
  fatherName: string | null;
  phone: string;
  photoUrl: string | null;
  district: string;
  membershipType: string;
  membershipValidUntil: string | null;
}

// Define the props for the component
interface MemberCardProps {
  member: MemberData;
  t: (key: string) => string;
}

export default function MemberCard({ member, t }: MemberCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const getMembershipLabel = (type: string) => {
    const labels: Record<string, string> = {
      'BASIC': t('membership.BASIC') || 'Basic Membership',
      'LIFETIME_2000': t('membership.LIFETIME_2000') || 'Lifetime Membership',
      'LIFETIME_5000': t('membership.LIFETIME_5000') || 'Lifetime Premium',
      'LIFETIME_10000': t('membership.LIFETIME_10000') || 'Lifetime Patron',
    };
    return labels[type] || type;
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return 'LIFETIME';
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return 'LIFETIME';
      return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch (e) {
      return 'LIFETIME';
    }
  };

  const downloadCardAsImage = async () => {
    if (!cardRef.current) return;
    try {
      const canvas = await html2canvas(cardRef.current, { useCORS: true, allowTaint: true, scale: 2 });
      const link = document.createElement('a');
      link.download = `NEP-Membership-Card-${member.membershipId}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error("Error downloading card as image:", err);
    }
  };

  const downloadCardAsPDF = async () => {
    if (!cardRef.current) return;
    try {
      const canvas = await html2canvas(cardRef.current, { useCORS: true, allowTaint: true, scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'px', format: [canvas.width, canvas.height] });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`NEP-Membership-Card-${member.membershipId}.pdf`);
    } catch (err) {
      console.error("Error downloading card as PDF:", err);
    }
  };

  return (
    <div className="mt-6">
      <div ref={cardRef} style={{ display: 'flex', flexDirection: 'column', gap: '24px', margin: '0 auto', width: 'fit-content', background: 'white', padding: '1rem', border: '1px solid #eee', borderRadius: '12px' }}>
        {/* FRONT SIDE */}
        <div style={{ width: '720px', height: '420px', borderRadius: '15px', background: '#ffffff', position: 'relative', boxShadow: '0 0 15px rgba(0,0,0,0.1)', overflow: 'hidden', fontFamily: 'Inter, sans-serif' }}>
          <div style={{ background: '#31ADE5', color: 'white', display: 'flex', alignItems: 'center', padding: '12px 20px', gap: '15px' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
              <img src="/nep-flag.jpg" alt="NEP Flag" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', letterSpacing: '1px' }}>{t('card.partyName')}</h2>
              <p style={{ margin: '2px 0', fontSize: '12px', opacity: 0.9 }}>{t('card.regdUnder')}</p>
            </div>
          </div>
          <div style={{ display: 'flex', padding: '18px', gap: '20px' }}>
            <div style={{ width: '130px', height: '160px', borderRadius: '8px', border: '3px solid #6B732A', overflow: 'hidden', backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {member.photoUrl ? <img src={member.photoUrl} alt="Member" style={{ width: '100%', height: '100%', objectFit: 'cover', crossOrigin: 'anonymous' }} /> : <User size={60} style={{ color: '#9ca3af' }} />}
            </div>
            <div style={{ flex: 1, fontSize: '14px', color: '#333' }}>
              <h3 style={{ color: '#FF7A00', marginBottom: '8px', fontSize: '16px', fontWeight: 'bold' }}>★ {t('card.identityCard') || 'IDENTITY CARD'} ★</h3>
              <p style={{ margin: '6px 0' }}><strong>{t('card.membershipId')}:</strong> {member.membershipId}</p>
              <p style={{ margin: '6px 0' }}><strong>{t('card.name')}:</strong> {member.name}</p>
              <p style={{ margin: '6px 0' }}><strong>{t('card.fatherNameLabel')}:</strong> {member.fatherName || '-'}</p>
              <p style={{ margin: '6px 0' }}><strong>{t('card.phone')}:</strong> {member.phone}</p>
              <p style={{ margin: '6px 0' }}><strong>{t('card.district')}:</strong> {member.district}</p>
              <div style={{ marginTop: '12px', width: '80px', height: '80px', backgroundColor: '#ffffff', padding: '4px', borderRadius: '4px', border: '1px solid #ddd' }}>
                <QRCodeSVG value={`https://www.allindianep.com/verify?id=${member.membershipId}`} size={72} level="M" />
              </div>
            </div>
            <div style={{ textAlign: 'center', flexShrink: 0 }}>
              <div style={{ width: '95px', height: '120px', borderRadius: '50%', border: '3px solid #31ADE5', overflow: 'hidden', margin: '0 auto' }}>
                <img src="/president-new.jpg" alt="President" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <p style={{ marginTop: '5px', fontSize: '12px', fontWeight: 'bold', color: '#333' }}>{t('card.partyPresident') || 'Party President'}</p>
            </div>
          </div>
          <div style={{ background: '#6B732A', color: 'white', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', fontSize: '13px', position: 'absolute', bottom: 0, left: 0, right: 0 }}>
            <p style={{ margin: 0 }}><b>{t('card.membershipType')}:</b> {getMembershipLabel(member.membershipType)}</p>
            <p style={{ margin: 0 }}><b>{t('card.validUntil')}:</b> {formatDate(member.membershipValidUntil)}</p>
          </div>
        </div>

        {/* BACK SIDE */}
        <div style={{ width: '720px', height: '420px', borderRadius: '15px', background: 'linear-gradient(135deg, #31ADE5 0%, #6B732A 100%)', color: '#ffffff', padding: '20px', position: 'relative', boxShadow: '0 0 15px rgba(0,0,0,0.1)', overflow: 'hidden', fontFamily: 'Inter, sans-serif' }}>
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: 'bold', letterSpacing: '2px', color: '#FFD700' }}>★ {t('card.memberDeclaration')} ★</h4>
          </div>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.15)', padding: '16px', borderRadius: '10px', marginBottom: '16px' }}>
            <p style={{ fontSize: '12px', lineHeight: '1.7', textAlign: 'justify' }}>{t('card.declarationText')}</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '30px' }}>
            <div style={{ flex: 1 }}>
              <h5 style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '10px', textTransform: 'uppercase', color: '#FFD700' }}>{t('card.headOffice')}</h5>
              <div style={{ fontSize: '12px', lineHeight: '1.6' }}>
                <p style={{ fontWeight: '600' }}>{t('card.partyNameLocal')}</p>
                <p>A4, Vishwaa Pride Apartment, Nookampalayam Main Road,</p>
                <p>Perumbakkam, Chennai - 600100</p>
                <p>{t('card.tamilNaduIndia')}</p>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <h5 style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '10px', textTransform: 'uppercase', color: '#FFD700' }}>{t('card.contactInfo') || 'Contact Information'}</h5>
              <div style={{ fontSize: '12px', lineHeight: '1.8' }}>
                <p><span style={{ opacity: 0.8 }}>{t('card.contact')}:</span> +91 91761 01115, +91 91761 02229</p>
                <p><span style={{ opacity: 0.8 }}>{t('card.email')}:</span> allindianep@gmail.com</p>
                <p><span style={{ opacity: 0.8 }}>{t('card.website')}:</span> www.allindianep.com</p>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', paddingTop: '16px', borderTop: '2px dashed rgba(255,255,255,0.4)' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '150px', borderBottom: '2px solid #ffffff', marginBottom: '6px', height: '40px' }}></div>
              <p style={{ fontSize: '11px', opacity: 0.9 }}>{t('card.memberSignature')}</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '150px', borderBottom: '2px solid #ffffff', marginBottom: '6px', height: '40px' }}></div>
              <p style={{ fontSize: '11px', opacity: 0.9 }}>{t('card.authorizedSignature')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 my-8">
        <p className="text-gray-600 font-semibold text-lg">{t('card.downloadAs') || 'Download your card as:'}</p>
        <div className="flex gap-4 flex-wrap justify-center">
          <button onClick={downloadCardAsImage} className="bg-primary hover:bg-primary/90 text-white font-semibold flex items-center gap-2 px-6 py-3 rounded-lg transition shadow-md">
            <FileImage size={20} />
            {t('card.downloadImage') || 'Download as Image (PNG)'}
          </button>
          <button onClick={downloadCardAsPDF} className="bg-accent hover:bg-accent/90 text-white font-semibold flex items-center gap-2 px-6 py-3 rounded-lg transition shadow-md">
            <FileText size={20} />
            {t('card.downloadPDF') || 'Download as PDF'}
          </button>
        </div>
      </div>
    </div>
  );
}
