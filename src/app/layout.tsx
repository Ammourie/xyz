import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { getPortfolioData } from '@/lib/data';
import { Language } from '@/types/portfolio';
import { isLanguage } from './page';

const inter = Inter({
  subsets: ['latin', 'latin-ext'], // Add latin-ext for better language support
  variable: '--font-inter',
  display: 'swap', // Improves loading performance
});

export const metadata: Metadata = {
  title: 'Darkfolio',
  description: 'A dark-themed portfolio for a Flutter developer.',
};

export default async function RootLayout({
  children,
  searchParams
}: Readonly<{
  children: React.ReactNode;
  searchParams?: { [key: string]: string | string[] | undefined };
}>) {

  const lang = isLanguage(searchParams?.lang) ? searchParams.lang : 'en' as Language;

  // Support multiple RTL languages if needed in the future
  const rtlLanguages: Language[] = ['ar'];
  const dir = rtlLanguages.includes(lang) ? 'rtl' : 'ltr';

  await getPortfolioData(lang);

  return (
    <html lang={lang} dir={dir} className={`${inter.variable} dark`}>
      <body
        className={`font-body antialiased ${dir === 'rtl' ? 'rtl' : 'ltr'}`}
        suppressHydrationWarning={true}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}