import type { Metadata } from 'next';
import { PresidentPageContent } from './president-page-content';

export const metadata: Metadata = {
  title: 'President | National Ex Servicemen Party',
  description: 'Learn about the National President of the National Ex Servicemen Party, his journey, leadership, and vision for the nation.',
};

export default function PresidentPage() {
  return <PresidentPageContent />;
}
