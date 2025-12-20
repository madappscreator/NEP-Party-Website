
import React from 'react';
import { useLanguage } from '@/context/language-context';
import { QRCodeSVG } from 'qrcode.react';


interface MemberProfile {
  name: string;
  fatherName: string | null;
  phone: string;
  mobileNumber?: string;
  photoUrl: string | null;
  district: string;
  state: string;
  constituency: string;
  membershipType: string;
  membershipId: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'pending' | 'active' | 'rejected';
  paymentStatus?: string;
  membershipValidUntil: string | null;
}

interface NewMemberCardProps {
  member: MemberProfile;
}

const NewMemberCard: React.FC<NewMemberCardProps> = ({ member }) => {
  const { t } = useLanguage();

  return (
    <div className="nep-card" style={{ fontFamily: 'Inter, sans-serif' }}>
      <link rel="stylesheet" href="/membership-card.css" />

      {/* FRONT SIDE */}
      <div className="card-front">
        <div className="card-header">
          <img src="/NEP Flag.jpg" className="flag-logo" alt="NEP Flag" />
          <div className="header-text">
            <h2>NATIONAL EX SERVICEMEN PARTY</h2>
            <p>Regd. Under Political Party Act</p>
          </div>
        </div>

        <div className="card-body">
          <div className="photo-box">
            <img src={member.photoUrl || '/president-2.jpg'} alt="Member Photo" />
          </div>

          <div className="details">
            <h3>★ IDENTITY CARD ★</h3>
            <p><strong>MEMBERSHIP ID:</strong> {member.membershipId || 'PENDING'}</p>
            <p><strong>NAME:</strong> {member.name}</p>
            <p><strong>S/O / D/O:</strong> {member.fatherName || 'N/A'}</p>
            <p><strong>PHONE:</strong> {member.phone}</p>
            <p><strong>DISTRICT:</strong> {member.district}</p>
            <p><strong>CONSTITUENCY:</strong> {member.constituency}</p>
          </div>

          <div className="right-panel">
              <div className="president-box">
                <img src="/NEP President.jpg" alt="President Photo" />
                <p>Party President</p>
              </div>
               <div className="qr">
                  <QRCodeSVG value={`NEP:${member.membershipId}`} size={64} />
              </div>
          </div>
        </div>

        <div className="card-footer">
          <p><b>MEMBERSHIP TYPE:</b> {member.membershipType}</p>
          <p><b>VALID UNTIL:</b> {member.membershipValidUntil ? new Date(member.membershipValidUntil).toLocaleDateString('en-IN') : 'N/A'}</p>
        </div>
      </div>

      {/* BACK SIDE - Declaration */}
      <div className="card-back mt-6" style={{ background: 'linear-gradient(135deg, #31ADE5 0%, #6B732A 100%)', color: '#fff', padding: '18px', borderRadius: '12px' }}>
        <div className="declaration-header text-center mb-3">
          <h4 style={{ color: '#FFD700' }}>★ Member Declaration ★</h4>
        </div>
        <div className="declaration-text" style={{ backgroundColor: 'rgba(255,255,255,0.12)', padding: '12px', borderRadius: '8px' }}>
          <p style={{ fontSize: '12px', lineHeight: 1.6 }}>{t('card.declarationText') || 'I hereby declare that the information provided is true and correct to the best of my knowledge.'}</p>
        </div>

        <div className="back-info mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h5 style={{ color: '#FFD700', fontWeight: 700 }}>{t('card.headoffice') || 'Head Office'}</h5>
            <p style={{ fontWeight: 600 }}>{t('card.partyNameLocal') || 'National Ex-Servicemen Party'}</p>
            <p>A4, Vishwaa Pride Apartment,</p>
            <p>Nookampalayam Main Road, Perumbakkam, Chennai - 600100</p>
            <p>{t('card.address') || 'Tamil Nadu, India'}</p>
          </div>
          <div>
            <h5 style={{ color: '#FFD700', fontWeight: 700 }}>{t('card.contactInfo') || 'Contact Information'}</h5>
            <p>{t('card.contact') || 'Contact'}: +91 91761 01115, +91 91761 02229</p>
            <p>{t('card.email') || 'Email'}: allindianep@gmail.com</p>
            <p>{t('card.website') || 'Website'}: www.allindianep.com</p>
          </div>
        </div>

        <div className="signatures mt-6 flex justify-between items-end">
          <div className="text-center">
            <div style={{ width: 180, borderBottom: '2px solid rgba(255,255,255,0.8)', height: 30 }}></div>
            <p style={{ fontSize: 12 }}>Member Signature</p>
          </div>
          <div className="text-center">
            <div style={{ width: 180, borderBottom: '2px solid rgba(255,255,255,0.8)', height: 30 }}></div>
            <p style={{ fontSize: 12 }}>Authorized Signature</p>
          </div>
        </div>      </div>
    </div>
  );
};

export default NewMemberCard;