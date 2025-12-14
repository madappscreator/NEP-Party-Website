import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function About() {
  return (
    <section id="about" className="container py-12 md:py-24">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
        <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">
          A Party Forged in Service
        </h2>
        <p className="max-w-3xl text-muted-foreground md:text-xl/relaxed">
          The National Ex-Servicemen Party (NEP) was founded by veterans of the Indian Armed Forces to bring the ethos of military service—discipline, integrity, and a nation-first ideology—into the heart of Indian politics. We are committed to good governance, social justice, and economic development for every citizen.
        </p>
        <Button asChild variant="outline">
          <Link href="/#manifesto">
            Read Our Manifesto
          </Link>
        </Button>
      </div>
    </section>
  );
}
