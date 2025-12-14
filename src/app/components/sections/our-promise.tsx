import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { OUR_PROMISE_POINTS } from "@/lib/constants";
import * as Icons from "lucide-react";

export function OurPromise() {

    const renderIcon = (name: keyof typeof Icons) => {
        const Icon = Icons[name] as React.ElementType;
        if (!Icon) return null;
        return <Icon className="w-10 h-10 text-primary" />;
    };

  return (
    <section id="promise" className="container py-12 md:py-24">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center mb-12">
        <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Our Promise
        </h2>
        <p className="max-w-3xl text-muted-foreground md:text-xl/relaxed">
          Focused, practical policies to strengthen communities and empower veterans.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {OUR_PROMISE_POINTS.map((point) => (
          <Card key={point.title} className="bg-background hover:shadow-lg transition-shadow text-center items-center">
            <CardHeader className="flex flex-col items-center gap-4">
              <div className="bg-primary/10 p-4 rounded-full">
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
