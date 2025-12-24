import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register - National Ex Servicemen Party',
  description: 'Join the National Ex-Servicemen Party today.',
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
