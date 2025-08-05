"use client";

import { usePathname } from 'next/navigation';
import en from '@/locales/en.json';
import tr from '@/locales/tr.json';

/**
 * Small i18n helper that derives the locale from the current pathname (e.g. `/en/product/...`).
 * It exposes a `t` function to translate keys.  If a key is missing the key itself
 * will be returned.
 */
export function useTranslation() {
  const pathname = usePathname();
  // Extract the locale from the first segment of the path.  Defaults to 'en'
  const segment = pathname?.split('/')?.[1];
  const locale = segment === 'tr' ? 'tr' : 'en';
  const messages = locale === 'tr' ? (tr as Record<string, string>) : (en as Record<string, string>);
  const t = (key: string) => {
    return messages[key] ?? key;
  };
  return { locale, t };
}