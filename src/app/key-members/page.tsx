import type { Metadata } from 'next';
import { KeyMembersPageContent } from './key-members-page-content';

export const metadata: Metadata = {
  title: 'Key Members | National Ex Servicemen Party',
  description: 'Meet our key members - influential leaders driving NEP initiatives across the nation.',
};

export default function KeyMembersPage() {
  return <KeyMembersPageContent />;
}

