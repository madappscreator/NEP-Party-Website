
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
          <p><strong>MEMBERSHIP ID:</strong> {member.membershipId}</p>
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
  );
};

export default NewMemberCard;
