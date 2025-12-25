
import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { cn } from '@/lib/utils';
import { Header } from '@/app/components/layout/header';
import { Footer } from '@/app/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { TopBar } from './components/layout/top-bar';
import { LanguageProvider } from '@/context/language-context';
import { FirebaseClientProvider } from '@/firebase';

export const metadata: Metadata = {
  title: 'National Ex Servicemen Party',
  description:
    'The official digital platform for the National Ex-Servicemen Party (NEP). A political party for military veterans, servicemen, and all proud citizens of India. Join us, support our cause, and help build a stronger nation.',
  keywords: [
    'National Ex Servicemen Party',
    'NEP',
    'NEP Party',
    'Ex-servicemen political party India',
    'Indian politics',
    'ex-servicemen rights',
    'Military',
    'Servicemen',
    'National',
    'Party',
    'veterans',
    'Indian Armed Forces',
    'political party for veterans',
    'join Indian political party'
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="facebook-domain-verification" content="8dxprjogex601opk3samk0xo2qg506" />
        <link rel="icon" href="/NEP Flag.jpg" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=Noto+Sans:wght@400;500;600;700&family=Noto+Serif+Tamil:wght@400;500;600;700&family=Noto+Serif+Malayalam:wght@400;500;600;700&family=Noto+Serif+Devanagari:wght@400;500;600;700&family=Noto+Serif+Telugu:wght@400;500;600;700&family=Noto+Serif+Kannada:wght@400;500;600;700&subset=latin,latin-ext,tamil,malayalam,devanagari,telugu,kannada&display=swap"
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
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
