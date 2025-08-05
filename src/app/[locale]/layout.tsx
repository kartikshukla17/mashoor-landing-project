import '@/app/globals.css';
import { Inter } from 'next/font/google';
import Providers from '@/components/providers/Providers';
import Header from '@/components/organisms/Header';
import Footer from '@/components/organisms/Footer';

const inter = Inter({ subsets: ['latin'] });

// This metadata can be moved here from the old root layout
export const metadata = {
  title: {
    default: 'Mashur Landing',
    template: '%s · Mashur ',
  },
  description: 'Mashur landing page built with Next.js 15.',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={params.locale}>
      <body className={inter.className}>
        <Providers>
          <Header />
          <main className="min-h-screen flex flex-col">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}