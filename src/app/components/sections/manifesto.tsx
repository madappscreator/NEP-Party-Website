import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MANIFESTO_POINTS } from "@/lib/constants";
import * as Icons from "lucide-react";

export function Manifesto() {

    const renderIcon = (name: keyof typeof Icons) => {
        const Icon = Icons[name] as React.ElementType;
        if (!Icon) return null;
        return <Icon className="w-10 h-10 text-primary" />;
    };

  return (
    <section id="manifesto" className="container py-12 md:py-24 bg-muted/40 rounded-lg">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center mb-12">
        <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Our Pledge to the Nation
        </h2>
        <p className="max-w-3xl text-muted-foreground md:text-xl/relaxed">
          We are committed to a future built on security, prosperity, and justice for all. These are our core promises.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {MANIFESTO_POINTS.map((point) => (
          <Card key={point.title} className="bg-background hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                {renderIcon(point.icon)}
              </div>
              <div>
                <CardTitle>{point.title}</CardTitle>
                <CardDescription className="mt-2 text-base">
                  {point.description}
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
