
'use client';

import * as React from 'react';
import { useUser, useFirestore, useMemoFirebase } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';
import { User, QrCode, Download, Send, AlertTriangle, ShieldCheck, Clock } from 'lucide-react';

// This would come from your firestore document
interface MemberProfile {
    id: string;
    name: string;
    fatherName: string;
    gender: string;
    dateOfBirth: string;
    mobileNumber: string;
    state: string;
    district: string;
    constituency: string;
    membershipId?: string; // e.g., NEP-2025-100001
    status: 'pending' | 'active' | 'rejected';
    paymentStatus: 'pending' | 'approved' | 'failed';
}

export default function ProfilePage() {
    const { user, isUserLoading, auth } = useUser();
    const firestore = useFirestore();
    const [profile, setProfile] = React.useState<MemberProfile | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const [notFound, setNotFound] = React.useState(false);

    React.useEffect(() => {
        if (isUserLoading) {
            return;
        }

        if (!user) {
            setIsLoading(false);
            setError("You must be logged in to view this page.");
            return;
        }

        const fetchProfile = async () => {
            setIsLoading(true);
            try {
                const memberDocRef = doc(firestore, 'members', user.uid);
                const docSnap = await getDoc(memberDocRef);

                if (docSnap.exists()) {
                    setProfile({ id: docSnap.id, ...docSnap.data() } as MemberProfile);
                    setNotFound(false);
                } else {
                    setNotFound(true);
                }
            } catch (err) {
                console.error("Error fetching profile:", err);
                setError("Failed to fetch your profile. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();

    }, [user, isUserLoading, firestore]);
    
    const handleLogout = () => {
        auth?.signOut();
    }

    if (isLoading || isUserLoading) {
        return <ProfileSkeleton />;
    }

    if (error) {
        return (
            <div className="container py-24 text-center">
                <Alert variant="destructive" className="max-w-md mx-auto">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
                <Button asChild className="mt-4">
                    <Link href="/login">Go to Login</Link>
                </Button>
            </div>
        );
    }
    
    if (notFound) {
         return (
            <div className="container py-24 text-center">
                <Card className="max-w-md mx-auto">
                    <CardHeader>
                        <CardTitle>No Membership Found</CardTitle>
                        <CardDescription>
                            We couldn't find a membership record associated with your mobile number.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground">Please complete your registration to become a member of the National Ex-Servicemen Party.</p>
                        <Button asChild>
                            <Link href="/register">Register Now</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
         )
    }

    if (!profile) {
        return <ProfileSkeleton />; // Should ideally not be reached if logic is correct
    }
    
    const isApproved = profile.status === 'active' && profile.paymentStatus === 'approved';

    return (
        <div className="container py-12 md:py-20">
            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                        <div>
                            <CardTitle className="text-3xl">Welcome, {profile.name}</CardTitle>
                            <CardDescription>Here is your membership profile and status.</CardDescription>
                        </div>
                         <Button variant="outline" size="sm" onClick={handleLogout}>Logout</Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-8">
                    {!isApproved && <StatusAlert status={profile.status} paymentStatus={profile.paymentStatus} />}

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <h3 className="font-semibold text-lg flex items-center gap-2"><User /> Personal Information</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div><p className="text-muted-foreground">Full Name</p><p className="font-medium">{profile.name}</p></div>
                                <div><p className="text-muted-foreground">Father's Name</p><p className="font-medium">{profile.fatherName}</p></div>
                                <div><p className="text-muted-foreground">Gender</p><p className="font-medium capitalize">{profile.gender}</p></div>
                                <div><p className="text-muted-foreground">Date of Birth</p><p className="font-medium">{profile.dateOfBirth}</p></div>
                                <div className="col-span-2"><p className="text-muted-foreground">Contact Number</p><p className="font-medium">{profile.mobileNumber}</p></div>
                                <div className="col-span-2"><p className="text-muted-foreground">Location</p><p className="font-medium">{profile.district}, {profile.state}</p></div>
                            </div>
                        </div>

                         <div className="space-y-6">
                            <h3 className="font-semibold text-lg flex items-center gap-2"><ShieldCheck /> Membership Details</h3>
                            {isApproved ? (
                                <div className="p-4 rounded-lg bg-green-50 border border-green-200 text-center space-y-4">
                                    <p className="text-sm text-green-700">Your membership is active!</p>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Membership ID</p>
                                        <p className="font-bold text-xl text-green-800 tracking-wider">{profile.membershipId}</p>
                                    </div>
                                    <Card className="bg-white">
                                        <CardHeader>
                                            <CardTitle className="text-base">Your Digital Card</CardTitle>
                                        </CardHeader>
                                        <CardContent className="flex flex-col items-center gap-4">
                                            <div className="p-2 border rounded-md bg-muted">
                                                <QrCode className="h-20 w-20" />
                                            </div>
                                            <div className="flex gap-2 w-full">
                                                <Button className="flex-1"><Download className="mr-2 h-4 w-4"/> Download PDF</Button>
                                                <Button variant="outline" className="flex-1"><Send className="mr-2 h-4 w-4"/>Resend to Email</Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            ) : (
                                <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-center space-y-2">
                                     <p className="text-sm text-muted-foreground">Membership ID</p>
                                     <p className="font-medium text-amber-700">Will be generated upon approval.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function StatusAlert({ status, paymentStatus }: { status: string, paymentStatus: string }) {
    let title = "Status: Pending";
    let description = "Your application is under review. Please wait for the admin to approve your registration and payment.";
    let icon = <Clock className="h-4 w-4" />;
    
    if (status === 'rejected') {
        title = "Status: Application Rejected";
        description = "Unfortunately, your application was not approved. Please contact support for more information.";
    } else if (paymentStatus === 'pending') {
        title = "Status: Payment Verification Pending";
        description = "Your registration details are complete, but we are still verifying your payment. This usually takes a few hours.";
    }

    return (
        <Alert className="bg-amber-50 border-amber-200 text-amber-800 [&>svg]:text-amber-800">
            {icon}
            <AlertTitle className="font-bold">{title}</AlertTitle>
            <AlertDescription>{description}</AlertDescription>
        </Alert>
    );
}

function ProfileSkeleton() {
    return (
        <div className="container py-12 md:py-20">
            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <Skeleton className="h-8 w-64" />
                    <Skeleton className="h-4 w-80" />
                </CardHeader>
                <CardContent className="space-y-8">
                     <Skeleton className="h-12 w-full" />
                     <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                             <Skeleton className="h-6 w-48" />
                             <div className="grid grid-cols-2 gap-4">
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-full col-span-2" />
                             </div>
                        </div>
                         <div className="space-y-6">
                            <Skeleton className="h-6 w-48" />
                            <Skeleton className="h-48 w-full" />
                         </div>
                     </div>
                </CardContent>
            </Card>
        </div>
    )
}
