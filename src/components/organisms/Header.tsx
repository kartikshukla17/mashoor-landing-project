"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from '@/components/atoms/ThemeToggle';
import { useAppSelector } from '@/hooks/useFavorites';

function LocaleSwitcher() {
  const pathname = usePathname();
  const segments = pathname.split('/');
  const currentLocale = segments[1] === 'tr' ? 'tr' : 'en';
  const otherLocale = currentLocale === 'en' ? 'tr' : 'en';
  // Rebuild the path with the other locale
  const newPath = '/' + [otherLocale, ...segments.slice(2)].join('/');
  return (
    <Link href={newPath} className="ml-4 text-sm hover:underline">
      {currentLocale === 'en' ? 'Türkçe' : 'English'}
    </Link>
  );
}

export default function Header() {
  const favoritesCount = useAppSelector((state) => state.favorites.items.length);
  const pathname = usePathname();
  const segments = pathname.split('/');
  const locale = segments[1] === 'tr' ? 'tr' : 'en';
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-primary/80 backdrop-blur border-b">
      <nav className="container mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-4">
          <Link href={`/${locale}`} className="text-xl font-bold">
            Calvero
          </Link>
          <LocaleSwitcher />
        </div>
        <div className="flex items-center space-x-4">
          <Link href={`/${locale}/favorites`} className="relative text-sm hover:underline">
            Favourites
            {favoritesCount > 0 && (
              <span className="ml-1 inline-flex items-center justify-center rounded-full bg-red-500 text-white text-xs w-5 h-5">
                {favoritesCount}
              </span>
            )}
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}