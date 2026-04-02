import type { Metadata } from 'next';
import { FounderPageContent } from './founder-page-content';

export const metadata: Metadata = {
  title: 'Founder | National Ex Servicemen Party',
  description:
    'Learn about the founder of the National Ex Servicemen Party, his journey, and mission for veterans and the public.',
};

export default function FounderPage() {
  return <FounderPageContent />;
}

