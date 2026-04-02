'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/language-context';
import { Button } from '@/components/ui/button';

type StatePresidentProfileClientProps = {
  i18nKey: string;
  image: string;
};

export default function StatePresidentProfileClient({ i18nKey, image }: StatePresidentProfileClientProps) {
  const { t } = useLanguage();
  const stateName = t(`${i18nKey}.name`);
  const roleTitle = t(`${i18nKey}.title`);
  const presidentName = t(`${i18nKey}.president`);
  const description = t(`${i18nKey}.description`);
  const aboutParas = (t(`${i18nKey}.about`) as unknown as string[]) || [];
  const visionPoints = (t(`${i18nKey}.vision`) as unknown as string[]) || [];

  return (
    <div className="bg-background py-12">
      <div className="container">
        <Link href="/state-presidents" className="inline-block text-sm font-medium text-primary hover:underline">
          ← {t('state_presidents.back_to_list')}
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Image src={image} alt={stateName} width={360} height={360} className="rounded-xl object-cover" />
          </div>

          <div className="lg:col-span-4 space-y-4">
            <h1 className="text-3xl font-bold">{roleTitle}</h1>
            <p className="text-xl font-semibold text-primary">{stateName}</p>
            <p className="text-lg text-muted-foreground">{presidentName}</p>
            <p className="text-base leading-relaxed">{description}</p>

            {aboutParas.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">{t('state_presidents.founder_profile')}</h2>
                {aboutParas.map((para, index) => (
                  <p key={`about-${index}`} className="text-muted-foreground leading-relaxed">{para}</p>
                ))}
              </div>
            )}

            {visionPoints.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">{t('state_presidents.vision_mission')}</h2>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  {visionPoints.map((point, index) => (
                    <li key={`vision-${index}`}>{point}</li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <Button asChild>
                <Link href="/state-presidents">{t('state_presidents.back_to_list')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
