
import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Header } from '@/app/components/layout/header';
import { Footer } from '@/app/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { TopBar } from './components/layout/top-bar';
import { LanguageProvider } from '@/context/language-context';
import { FirebaseClientProvider } from '@/firebase';

export const metadata: Metadata = {
  title: 'NEP Digital Platform | National Ex-Servicemen Party',
  description:
    'The official digital platform for the National Ex-Servicemen Party (NEP). Join us, support our cause, and help build a stronger India. For ex-servicemen and all proud citizens.',
  keywords:
    'National Ex Servicemen Party, Ex-servicemen political party India, NEP, Indian politics, ex-servicemen rights',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/NEP Flag.jpg" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased'
        )}
      >
        <FirebaseClientProvider>
          <LanguageProvider>
            <div className="relative flex min-h-dvh flex-col bg-background">
              <TopBar />
              <Header />
              <main className="flex-1 pt-10">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </LanguageProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
