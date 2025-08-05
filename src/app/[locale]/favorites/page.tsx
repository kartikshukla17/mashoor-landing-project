"use client";

import { useAppSelector } from '@/hooks/useFavorites';
import { useTranslation } from '@/hooks/useTranslation';
import ProductCard from '@/components/molecules/ProductCard';

export default function FavoritesPage() {
  const favourites = useAppSelector((state) => state.favorites.items);
  const { t, locale } = useTranslation();
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6">{t('favorites_title')}</h1>
      {favourites.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">{t('favorites_empty')}</p>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {favourites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}