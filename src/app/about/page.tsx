import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InfinityIcon, Star, Target, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <FounderSection />
      <OurStory />
      <VisionMission />
      <CoreValues />
      <StatsStrip />
    </>
  );
}

function AboutHero() {
  return (
    <section className="bg-gradient-to-r from-primary to-secondary text-white py-20 md:py-32">
      <div className="container text-center">
        <h1 className="text-4xl font-headline font-bold md:text-5xl lg:text-6xl">
          About Us
        </h1>
        <p className="mt-4 text-lg md:text-xl text-primary-foreground/80">
          National Ex Servicemen Party
        </p>
      </div>
    </section>
  );
}

function FounderSection() {
  return (
    <section className="py-12 md:py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl">Founder President</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <div className="relative">
                <Image
                    src="/NEP President.jpg"
                    alt="Founder President — Lion. Dr. Suresh Babu K"
                    width={350}
                    height={350}
                    className="rounded-lg object-cover shadow-xl"
                    data-ai-hint="portrait man leader"
                />
                <Badge className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-lg px-4 py-2">National President</Badge>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Lion. Dr. Suresh Babu</h3>
            <p className="text-muted-foreground text-lg">
                Born and raised in Ranipet district of Tamil Nadu, with patriotism flowing in his blood, he formulated his own unique ideology and joined the Indian Army as a warrior.
            </p>
            <p className="text-muted-foreground text-lg">
                 Through rigorous training, discipline, and hard work, he served the nation with distinction across various departments, including DRDO. In 2017, he founded the Ex-Servicemen Association in Kanchipuram. In 2019, he expanded the movement by forming the state-level federation named “Indian Ex-Tri Services and Paramilitary Forces Welfare Federation, Tamil Nadu.”
            </p>
            <div className="border-l-4 border-primary pl-4 py-2 mt-6">
                <p className="text-xl font-medium italic text-foreground">
                    He is committed to voicing the rights of all sections of society beyond caste and religion, and resolved to unite farmers, workers, general public, and ex-servicemen under one national movement.
                </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


function OurStory() {
    return (
        <section className="py-12 md:py-24 bg-muted">
            <div className="container grid md:grid-cols-2 gap-12 items-center">
                <div className="flex justify-center">
                     <Image
                        src="https://picsum.photos/seed/story/600/400"
                        alt="Our Story"
                        width={600}
                        height={400}
                        className="rounded-lg object-cover shadow-xl"
                        data-ai-hint="Indian crowd meeting"
                    />
                </div>
                 <div className="space-y-6">
                    <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl">Our Story</h2>
                    <p className="text-muted-foreground md:text-lg">
                        For the first time in Indian history, a political party was founded in Tamil Nadu by ex-servicemen under the name National Ex-Servicemen Party (NEP).
                    </p>
                     <p className="text-muted-foreground md:text-lg">
                        NEP is not only for ex-servicemen, but for the entire general public. The party welcomes every citizen who wishes to serve the nation with discipline, integrity, and commitment.
                    </p>
                     <p className="text-muted-foreground md:text-lg">
                        The first official introduction of the party was held on 14 December 2023 at the Chepauk Journalists Association, marking the beginning of a new people-centric political movement.
                    </p>
                    <Button asChild size="lg" style={{backgroundColor: '#FF7A00'}}>
                        <Link href="/register">Join Party</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}

function VisionMission() {
    return (
        <section className="py-12 md:py-24 bg-background">
            <div className="container grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl">Our Vision</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground text-lg">
                            To build an India where every citizen enjoys equal rights, equal opportunities, and a dignified life. We envision a society governed by those who have already proven their dedication to the nation through service and sacrifice.
                        </p>
                    </CardContent>
                </Card>
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl">Our Mission</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground text-lg">
                            To bring discipline, integrity, and service-oriented governance into Indian politics. NEP aims to unite all sections of society under one banner to fight for justice, inclusive development, and national prosperity.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}

function CoreValues() {
    const values = [
        { title: 'Discipline', description: 'Military-grade discipline in governance and public administration.' },
        { title: 'Integrity', description: 'Honest, transparent, and accountable leadership at all levels.' },
        { title: 'Equality', description: 'Equal rights, justice, and dignity for every citizen of India.' },
        { title: 'Service', description: 'Dedicated service to the people and the nation above personal interest.' },
    ];
    return (
        <section className="py-12 md:py-24 bg-muted">
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl">Our Core Values</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map(value => (
                        <Card key={value.title} className="text-center items-center p-6">
                            <CardTitle>{value.title}</CardTitle>
                            <CardContent className="p-0 mt-2">
                                <p className="text-muted-foreground">{value.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

function StatsStrip() {
    const stats = [
        { value: '22', label: 'Wings', icon: <Users/> },
        { value: '37', label: 'Districts', icon: <Target/> },
        { value: '2024', label: 'Founded', icon: <Star/> },
        { value: '∞', label: 'Dedication', icon: <InfinityIcon/> }
    ];
    return (
        <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
            <div className="container grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {stats.map(stat => (
                    <div key={stat.label} className="flex flex-col items-center">
                        <div className="flex items-center gap-2">
                            {stat.icon}
                            <p className="text-4xl font-bold">{stat.value}</p>
                        </div>
                        <p className="text-lg text-primary-foreground/80 mt-1">{stat.label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
