import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Header, Footer } from '@/components/SiteChrome';
import { site } from '@/lib/content';
import { asset } from '@/lib/paths';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — Product Design Leader`, template: `%s — ${site.name}` },
  description: site.description,
  applicationName: 'Fieldnotes Portfolio',
  authors: [{ name: site.name }],
  icons: { icon: asset('/icon.svg'), apple: asset('/icon.svg') },
  openGraph: {
    type: 'website',
    title: `${site.name} — Product Design Leader`,
    description: site.description,
    images: [{ url: asset('/og.webp'), width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.name,
    description: site.description,
    images: [asset('/og.webp')],
  },
  manifest: asset('/site.webmanifest'),
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#0c0b09' };

const themeScript = `(function(){try{var t=localStorage.getItem('fieldnotes-theme');document.documentElement.dataset.theme=t==='light'?'light':'dark'}catch(e){document.documentElement.dataset.theme='dark'}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
