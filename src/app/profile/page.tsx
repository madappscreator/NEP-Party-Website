'use client';

import { useEffect, useMemo } from 'react';
// Correctly import only the existing exports
import { useFirebase, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { User, ShieldCheck, Hourglass, AlertTriangle, Edit } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import MemberCard from '@/components/member-card';

interface MemberProfile {
  name: string;
  fatherName: string | null;
  phone: string;
  photoUrl: string | null;
  district: string;
  state: string;
  membershipType: string;
  membershipId: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  membershipValidUntil: string | null;
}

export default function ProfilePage() {
  // Destructure firestore from the useFirebase hook
  const { auth, user, firestore } = useFirebase();
  const router = useRouter();
  const { t } = useLanguage();

  const memberRef = useMemo(() => 
    // Use the firestore instance to create the doc reference
    user ? doc(firestore, 'members', user.uid) : null
  , [user, firestore]);

  const { data: member, loading, error } = useDoc<MemberProfile>(memberRef);

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
            <p>{t('profile.noProfile')}</p>
            <button onClick={() => router.push('/register')} className="btn-primary mt-4">
                {t('profile.registerNow')}
            </button>
        </div>
    );
  }

  const getStatusBanner = () => {
    switch (member.status) {
      case 'APPROVED':
        return (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 flex items-center gap-4">
            <ShieldCheck className="w-8 h-8" />
            <div>
              <p className="font-bold">{t('profile.statusApproved')}</p>
              <p>{t('profile.approvedMessage')}</p>
            </div>
          </div>
        );
      case 'PENDING':
        return (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 flex items-center gap-4">
            <Hourglass className="w-8 h-8" />
            <div>
              <p className="font-bold">{t('profile.statusPending')}</p>
              <p>{t('profile.pendingMessage')}</p>
            </div>
          </div>
        );
      case 'REJECTED':
        return (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 flex items-center gap-4">
            <AlertTriangle className="w-8 h-8" />
            <div>
              <p className="font-bold">{t('profile.statusRejected')}</p>
              <p>{t('profile.rejectedMessage')}</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4 md:p-8 max-w-4xl">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">{t('profile.title')}</h1>
          <button onClick={() => auth.signOut()} className="btn-secondary">
            {t('profile.logout')}
          </button>
        </header>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {getStatusBanner()}
          
          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 flex flex-col items-center">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary bg-gray-200 flex items-center justify-center">
                    {member.photoUrl ? (
                        <img src={member.photoUrl} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                        <User className="w-20 h-20 text-gray-400" />
                    )}
                </div>
                <button onClick={() => router.push('/profile/edit')} className="mt-4 btn-sm btn-outline flex items-center gap-2">
                  <Edit size={14}/> {t('profile.editProfile')}
                </button>
            </div>

            <div className="md:col-span-2 text-gray-700">
                <h2 className="text-2xl font-bold text-primary mb-4">{member.name}</h2>
                <div className="space-y-3">
                    <p><strong>{t('profile.membershipId')}:</strong> {member.membershipId}</p>
                    <p><strong>{t('profile.fatherName')}:</strong> {member.fatherName || 'N/A'}</p>
                    <p><strong>{t('profile.phone')}:</strong> {member.phone}</p>
                    <p><strong>{t('profile.district')}:</strong> {member.district}</p>
                    <p><strong>{t('profile.state')}:</strong> {member.state}</p>
                    <p><strong>{t('profile.membershipType')}:</strong> <span className="font-semibold text-primary">{member.membershipType}</span></p>
                </div>
            </div>
          </div>

          {/* Conditionally render the MemberCard if status is APPROVED */}
          {member.status === 'APPROVED' && (
            <div className="p-6 md:p-8 border-t border-gray-200">
              <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">{t('profile.yourCard')}</h3>
              <MemberCard member={member} t={t} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
