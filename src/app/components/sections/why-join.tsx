'use client';

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useLanguage } from "@/context/language-context";
import { WHY_JOIN_POINTS } from "@/lib/constants";
import * as Icons from "lucide-react";

export function WhyJoin() {
    const { t } = useLanguage();
    const renderIcon = (name: keyof typeof Icons) => {
        const Icon = Icons[name] as React.ElementType;
        if (!Icon) return null;
        return <Icon className="w-8 h-8 text-primary" />;
    };

  return (
    <section id="why-join" className="container py-12 md:py-24">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 text-center mb-12">
        <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">
          {t('why_join_title')}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {WHY_JOIN_POINTS.map((point) => (
          <Card key={point.title} className="bg-background hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-col items-start gap-4">
               <div className="bg-primary/10 p-3 rounded-full">
                 {renderIcon(point.icon)}
               </div>
              <div>
                <CardTitle>{t(`why_join_${point.title.toLowerCase().replace(/ /g, '_').replace(/-/, '_')}_title`)}</CardTitle>
                <CardDescription className="mt-2 text-base">
                  {t(`why_join_${point.title.toLowerCase().replace(/ /g, '_').replace(/-/, '_')}_desc`)}
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
