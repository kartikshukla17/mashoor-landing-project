import type { Metadata } from 'next';

// Predefine the supported locales so Next can statically generate pages for each one
export const generateStaticParams = async () => {
  return ['en', 'tr'].map((lng) => ({ locale: lng }));
};

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Pass through children unmodified.  Locale handling occurs in hooks and components.
  return <>{children}</>;
}