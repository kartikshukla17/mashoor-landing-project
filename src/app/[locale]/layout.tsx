import '@/app/globals.css';
import { Inter } from 'next/font/google';
import Providers from '@/components/providers/Providers';
import Header from '@/components/organisms/Header';
import Footer from '@/components/organisms/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    default: 'Mashur Landing',
    template: '%s · Mashur ',
  },
  description: 'Mashur landing page built with Next.js 15.',
};
export async function generateStaticParams() {
  // Declare supported locales so Next.js doesn’t infer an async type for params
  return [{ locale: 'en' }, { locale: 'tr' }];
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } =  params;
  return (
    <html lang={locale}>
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