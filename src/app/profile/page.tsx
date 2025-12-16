'use client';

import { useEffect, useMemo, useRef } from 'react';
// Correctly import only the existing exports
import { useFirebase, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { User, ShieldCheck, Hourglass, AlertTriangle, Edit, FileImage, FileText } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import MemberCard from '@/components/member-card';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface MemberProfile {
  name: string;
  fatherName: string | null;
  phone: string;
  mobileNumber?: string;
  photoUrl: string | null;
  district: string;
  state: string;
  membershipType: string;
  membershipId: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'pending' | 'active' | 'rejected';
  paymentStatus?: string;
  membershipValidUntil: string | null;
}

export default function ProfilePage() {
  // Destructure firestore from the useFirebase hook
  const { auth, user, firestore } = useFirebase();
  const router = useRouter();
  const { t } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);

  const memberRef = useMemo(() => 
    // Use the firestore instance to create the doc reference
    user ? doc(firestore, 'members', user.uid) : null
  , [user, firestore]);

  const { data: member, loading, error } = useDoc<MemberProfile>(memberRef);

  const downloadCardAsImage = async () => {
    try {
      const cardElement = cardRef.current?.querySelector('[class*="card"]') || cardRef.current;
      if (!cardElement) return;
      const canvas = await html2canvas(cardElement as HTMLElement, { useCORS: true, allowTaint: true, scale: 2 });
      const link = document.createElement('a');
      link.download = `NEP-Membership-Card-${member?.membershipId || 'card'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error("Error downloading card as image:", err);
    }
  };

  const downloadCardAsPDF = async () => {
    try {
      const cardElement = cardRef.current?.querySelector('[class*="card"]') || cardRef.current;
      if (!cardElement) return;
      const canvas = await html2canvas(cardElement as HTMLElement, { useCORS: true, allowTaint: true, scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'px', format: [canvas.width, canvas.height] });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`NEP-Membership-Card-${member?.membershipId || 'card'}.pdf`);
    } catch (err) {
      console.error("Error downloading card as PDF:", err);
    }
  };

  useEffect(() => {
    if (!user && !loading) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">{t('common.loading')}...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">Error: {error.message}</div>;
  }

  if (!member) {
    return (
        <div className="text-center py-10">
            <p>{t('profile_noProfile')}</p>
            <button onClick={() => router.push('/register')} className="btn-primary mt-4">
                {t('profile_registerNow')}
            </button>
        </div>
    );
  }

  const getStatusBanner = () => {
    const status = member.status?.toUpperCase();
    switch (status) {
      case 'APPROVED':
      case 'ACTIVE':
        return (
          <div className="bg-gradient-to-r from-secondary to-primary border-l-4 border-primary text-white p-4 md:p-6 flex items-center gap-4 rounded-lg shadow-lg">
            <ShieldCheck className="w-8 h-8 flex-shrink-0" />
            <div>
              <p className="font-bold text-lg">{t('profile_statusApproved')}</p>
              <p className="text-sm opacity-90">{t('profile_approvedMessage')}</p>
            </div>
          </div>
        );
      case 'PENDING':
        return (
          <div className="bg-gradient-to-r from-yellow-500 to-accent border-l-4 border-accent text-white p-4 md:p-6 flex items-center gap-4 rounded-lg shadow-lg">
            <Hourglass className="w-8 h-8 flex-shrink-0" />
            <div>
              <p className="font-bold text-lg">{t('profile_statusPending')}</p>
              <p className="text-sm opacity-90">{t('profile_pendingMessage')}</p>
            </div>
          </div>
        );
      case 'REJECTED':
        return (
          <div className="bg-gradient-to-r from-red-600 to-red-500 border-l-4 border-red-700 text-white p-4 md:p-6 flex items-center gap-4 rounded-lg shadow-lg">
            <AlertTriangle className="w-8 h-8 flex-shrink-0" />
            <div>
              <p className="font-bold text-lg">{t('profile_statusRejected')}</p>
              <p className="text-sm opacity-90">{t('profile_rejectedMessage')}</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto p-4 md:p-8 max-w-5xl">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{t('profile_title')}</h1>
            <p className="text-gray-600 mt-1">{t('profile_subtitle') || 'Manage your membership details'}</p>
          </div>
          <button onClick={() => auth.signOut()} className="px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-lg font-medium transition shadow-md">
            {t('profile_logout')}
          </button>
        </header>

        {/* Status Banner */}
        {getStatusBanner()}

        {/* Membership Card Section - Full Width */}
        {(member.status?.toUpperCase() === 'APPROVED' || member.status?.toUpperCase() === 'ACTIVE') && (
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-xl overflow-hidden mt-6 p-8 border border-primary/20">
            <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-8">{t('profile_yourCard')}</h2>
            <div className="flex justify-center mb-8" ref={cardRef}>
              <MemberCard member={{ ...member, phone: member.mobileNumber || member.phone }} t={t} />
            </div>
            <div className="flex justify-center gap-4 flex-wrap">
              <button 
                onClick={downloadCardAsImage} 
                className="bg-primary hover:bg-primary/90 text-white font-semibold flex items-center gap-2 px-6 py-3 rounded-lg transition shadow-md"
              >
                <FileImage size={20} />
                {t('card.downloadImage') || 'Download as Image (PNG)'}
              </button>
              <button 
                onClick={downloadCardAsPDF} 
                className="bg-accent hover:bg-accent/90 text-white font-semibold flex items-center gap-2 px-6 py-3 rounded-lg transition shadow-md"
              >
                <FileText size={20} />
                {t('card.downloadPDF') || 'Download as PDF'}
              </button>
            </div>
          </div>
        )}

        {/* Member Details Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mt-8 p-8 border-t-4 border-primary">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">{t('profile_memberDetails')}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column - Photo and Edit */}
            <div className="flex flex-col items-center justify-start">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-primary bg-gray-200 flex items-center justify-center shadow-lg ring-4 ring-primary/20">
                {member.photoUrl ? (
                  <img src={member.photoUrl} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-24 h-24 text-gray-400" />
                )}
              </div>
              <button onClick={() => router.push('/profile/edit')} className="mt-6 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium flex items-center gap-2 transition shadow-md">
                <Edit size={18}/> {t('profile_editProfile')}
              </button>
            </div>

            {/* Right Columns - Details */}
            <div className="md:col-span-2">
              <div className="space-y-6">
                <div className="pb-4 border-b-2 border-primary/20">
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{t('profile_name')}</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">{member.name}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-4 rounded-lg border border-primary/20">
                    <p className="text-xs font-bold text-gray-600 uppercase tracking-wider">{t('profile_membershipId')}</p>
                    <p className="text-lg font-bold text-primary mt-2">{member.membershipId || <span className="text-accent">Pending Approval</span>}</p>
                  </div>
                  <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 p-4 rounded-lg border border-secondary/20">
                    <p className="text-xs font-bold text-gray-600 uppercase tracking-wider">{t('profile_membershipType')}</p>
                    <p className="text-lg font-bold text-secondary mt-2">{member.membershipType}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-3 border-l-4 border-primary bg-gray-50 rounded">
                    <p className="text-xs font-semibold text-gray-500 uppercase">{t('profile_fatherName')}</p>
                    <p className="text-lg font-semibold text-gray-800 mt-1">{member.fatherName || 'N/A'}</p>
                  </div>
                  <div className="p-3 border-l-4 border-secondary bg-gray-50 rounded">
                    <p className="text-xs font-semibold text-gray-500 uppercase">{t('profile_phone')}</p>
                    <p className="text-lg font-semibold text-gray-800 mt-1">{member.phone}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-3 border-l-4 border-accent bg-gray-50 rounded">
                    <p className="text-xs font-semibold text-gray-500 uppercase">{t('profile_district')}</p>
                    <p className="text-lg font-semibold text-gray-800 mt-1">{member.district}</p>
                  </div>
                  <div className="p-3 border-l-4 border-primary bg-gray-50 rounded">
                    <p className="text-xs font-semibold text-gray-500 uppercase">{t('profile_state')}</p>
                    <p className="text-lg font-semibold text-gray-800 mt-1">{member.state}</p>
                  </div>
                </div>

                {member.membershipValidUntil && (
                  <div className="bg-gradient-to-r from-secondary to-green-600 text-white p-4 rounded-lg">
                    <p className="text-xs font-bold uppercase tracking-wider opacity-90">{t('profile_validUntil')}</p>
                    <p className="text-xl font-bold mt-2">{new Date(member.membershipValidUntil).toLocaleDateString('en-IN')}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
