import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WINGS_DATA } from "@/lib/constants";
import Link from 'next/link';
import * as Icons from 'lucide-react';

export default function WingsPage() {
  const renderIcon = (name: keyof typeof Icons) => {
    const Icon = Icons[name] as React.ElementType;
    if (!Icon) return null;
    return <Icon className="w-10 h-10 text-primary" />;
  };

  return (
    <>
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20 md:py-24">
        <div className="container text-center">
          <h1 className="text-4xl font-headline font-bold md:text-5xl lg:text-6xl">
            Our Wings
          </h1>
          <p className="mt-4 text-lg md:text-xl text-primary-foreground/80 max-w-3xl mx-auto">
            Since the general public has equal rights and responsibilities, NEP provides dedicated wings for all professions and communities. Members can join the wing that best represents their profession, service background, or social interest.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-24 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WINGS_DATA.map((wing) => (
              <Card key={wing.name} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      {renderIcon(wing.icon)}
                    </div>
                    <CardTitle className="text-xl">{wing.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="text-base text-muted-foreground">
                    {wing.description}
                  </CardDescription>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button asChild className="w-full" style={{backgroundColor: '#FF7A00'}}>
                    <Link href="/register">Join This Wing</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

       <section className="py-20 bg-muted">
            <div className="container text-center space-y-6">
                <h2 className="text-3xl font-headline font-bold">Ready to Make a Difference?</h2>
                <p className="text-lg max-w-2xl mx-auto text-muted-foreground">
                    Those who wish to take responsibility in the above wings or become members are encouraged to register and contribute to nation-building.
                </p>
                <Button asChild size="lg" style={{backgroundColor: '#FF7A00'}} className="text-white hover:opacity-90">
                    <Link href="/register">Join a Wing Now</Link>
                </Button>
            </div>
        </section>
    </>
  );
}
