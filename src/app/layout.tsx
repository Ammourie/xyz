import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { getPortfolioData } from '@/lib/data';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Darkfolio',
  description: 'A dark-themed portfolio for a Flutter developer.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getPortfolioData();
  const theme = data.theme || {};
  const primary = theme.primaryColor || '300 100% 25%';
  const background = theme.backgroundColor || '0 0% 20%';
  const accent = theme.accentColor || '180 100% 50%';

  return (
    <html lang="en" className={`${inter.variable} dark`} style={{
      '--primary': primary,
      '--background': background,
      '--accent': accent,
    } as React.CSSProperties}>
      <head />
      <body 
        className="font-body antialiased"
        suppressHydrationWarning={true}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
