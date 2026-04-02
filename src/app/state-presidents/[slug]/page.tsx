import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import StatePresidentProfileClient from './StatePresidentProfileClient';

type ProfileSlug = 'andhra-pradesh' | 'tamil-nadu';

type StatePresidentProfile = {
  i18nKey: string;
  image: string;
};

const profiles: Record<ProfileSlug, StatePresidentProfile> = {
  'andhra-pradesh': {
    i18nKey: 'state_presidents.andhra',
    image: '/Andra_president.jpeg',
  },
  'tamil-nadu': {
    i18nKey: 'state_presidents.tamil',
    image: '/president.jpg',
  },
};

export function generateMetadata({ params }: { params: { slug: ProfileSlug } }): Metadata {
  const profile = profiles[params.slug];
  if (!profile) return { title: 'State President | NEP' };
  return {
    title: `${profile.i18nKey} | NEP`,
    description: 'Read about state presidents advancing NEP local leadership and aims.',
  };
}

export function generateStaticParams() {
  return Object.keys(profiles).map((slug) => ({ slug }));
}

export default function StatePresidentProfilePage({ params }: { params: { slug: ProfileSlug } }) {
  const profile = profiles[params.slug];
  if (!profile) {
    notFound();
  }

  return <StatePresidentProfileClient i18nKey={profile.i18nKey} image={profile.image} />;
}
