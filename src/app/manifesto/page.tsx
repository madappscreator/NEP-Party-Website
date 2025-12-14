import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MANIFESTO_POINTS } from "@/lib/constants";
import * as Icons from "lucide-react";

export default function ManifestoPage() {
  const renderIcon = (name: keyof typeof Icons) => {
    const Icon = Icons[name] as React.ElementType;
    if (!Icon) return null;
    return <Icon className="w-8 h-8 text-primary" />;
  };

  return (
    <>
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20 md:py-24">
        <div className="container text-center">
          <h1 className="text-4xl font-headline font-bold md:text-5xl lg:text-6xl">
            Our Manifesto
          </h1>
          <p className="mt-4 text-lg md:text-xl text-primary-foreground/80">
            Building a Better India for All
          </p>
        </div>
      </section>

      <section className="py-12 md:py-24 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {MANIFESTO_POINTS.map((point, index) => (
              <Card key={point.title} className="bg-white shadow-lg hover:shadow-xl transition-shadow border-t-4 border-primary">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    {renderIcon(point.icon)}
                    <span className="text-sm font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-xl mb-2">{point.title}</CardTitle>
                  <CardDescription className="text-base text-muted-foreground">
                    {point.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}