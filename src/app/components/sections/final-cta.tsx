import { Button } from "@/components/ui/button";
import Link from "next/link";

export function FinalCta() {
    return (
        <section id="final-cta" className="py-20 text-white" style={{background: 'linear-gradient(to right, #6B7F2A, #FF7A00)'}}>
            <div className="container text-center space-y-6">
                <h2 className="text-4xl font-headline font-bold">Ready to Join the Movement?</h2>
                <p className="text-lg max-w-2xl mx-auto text-white/80">Be part of a historic political movement led by those who served the nation.</p>
                <Button asChild size="lg" style={{backgroundColor: '#FF7A00'}} className="text-white hover:opacity-90">
                    <Link href="/register">Register Now</Link>
                </Button>
            </div>
        </section>
    )
}
