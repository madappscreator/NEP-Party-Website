import type { Metadata } from 'next';
import { StatePresidentsPageContent } from './state-presidents-page-content';

export const metadata: Metadata = {
  title: 'State Presidents | National Ex Servicemen Party',
  description: 'Meet our state presidents leading NEP across India, dedicated ex-servicemen driving local initiatives.',
};

export default function StatePresidentsPage() {
  return <StatePresidentsPageContent />;
}

