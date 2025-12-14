import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, QrCode } from "lucide-react";
import Link from "next/link";
import Image from 'next/image';

export function BecomeMember() {
    return (
        <section id="become-member" className="bg-secondary text-secondary-foreground py-20">
            <div className="container grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <h2 className="text-4xl font-headline font-bold">Become a Member</h2>
                    <p className="text-lg text-secondary-foreground/80">
                        Register online with phone OTP and a minimum contribution to receive your digital NEP membership card and benefits.
                    </p>
                    <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-secondary">
                        <Link href="/register">Register Now</Link>
                    </Button>
                </div>
                <div className="flex justify-center">
                   <Card className="bg-white text-foreground max-w-sm w-full p-6 rounded-xl shadow-2xl relative overflow-hidden">
                       <div className="absolute top-0 right-0 h-24 w-24 bg-primary/10 rounded-bl-full"></div>
                       <CardHeader className="flex-row justify-between items-start">
                           <div>
                                <CardTitle className="text-primary">NEP Digital Card</CardTitle>
                                <p className="text-sm text-muted-foreground">National Ex-Servicemen Party</p>
                           </div>
                           <User className="w-8 h-8 text-primary"/>
                       </CardHeader>
                       <CardContent className="mt-4 space-y-4">
                           <div className="flex items-center gap-4">
                               <Image 
                                 src="https://picsum.photos/seed/member/80/80" 
                                 alt="Sample Member"
                                 width={80}
                                 height={80}
                                 className="rounded-full border-4 border-primary/20"
                                 data-ai-hint="portrait man"
                                />
                               <div>
                                   <p className="font-bold text-lg">Sample Member</p>
                                   <p className="text-muted-foreground">NEP-2025-100001</p>
                                   <p className="text-xs mt-1">Valid Until: 06 Dec 2026</p>
                               </div>
                           </div>
                           <div className="flex justify-end">
                                <QrCode className="w-16 h-16 text-muted-foreground/50"/>
                           </div>
                       </CardContent>
                   </Card>
                </div>
            </div>
        </section>
    )
}
