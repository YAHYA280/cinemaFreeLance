import type { Metadata, Viewport } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import StickyRegisterButton from '@/components/layout/StickyRegisterButton';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0a0a0a',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://alkarama.ma'),
  title: {
    default: 'جمعية الكرامة للمسرح والسينما | Al-Karama Theatre & Cinema Association',
    template: '%s | جمعية الكرامة',
  },
  description: 'جمعية الكرامة للمسرح والسينما بسيدي البرنوصي، الدار البيضاء. نادي سينمائي، عروض مسرحية، تكوينات فنية. Association Al-Karama pour le Theatre et le Cinema a Sidi Bernoussi, Casablanca.',
  keywords: [
    'جمعية الكرامة',
    'مسرح',
    'سينما',
    'نادي سينمائي',
    'البرنوصي',
    'الدار البيضاء',
    'Al-Karama',
    'Theatre',
    'Cinema',
    'Cine-club',
    'Casablanca',
    'Sidi Bernoussi',
    'Morocco',
    'Maroc',
  ],
  authors: [{ name: 'Association Al-Karama' }],
  creator: 'Association Al-Karama pour le Theatre et le Cinema',
  publisher: 'Association Al-Karama',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'ar_MA',
    alternateLocale: 'fr_MA',
    url: 'https://alkarama.ma',
    siteName: 'جمعية الكرامة | Al-Karama Association',
    title: 'جمعية الكرامة للمسرح والسينما',
    description: 'الكرامة.. جسر بين سحر الخشبة وعمق الشاشة',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Al-Karama Theatre & Cinema Association',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'جمعية الكرامة للمسرح والسينما',
    description: 'الكرامة.. جسر بين سحر الخشبة وعمق الشاشة',
    images: ['/og-image.jpg'],
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=Tajawal:wght@300;400;500;700;800&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen bg-[var(--color-black-rich)] text-[var(--color-white-off)]">
        <LanguageProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <StickyRegisterButton />
        </LanguageProvider>
      </body>
    </html>
  );
}
