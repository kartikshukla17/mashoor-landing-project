"use client";

import { useAppDispatch, useAppSelector } from '@/hooks/useFavorites';
import { addFavorite, removeFavorite } from '@/store/favoritesSlice';
import { useTranslation } from '@/hooks/useTranslation';
import type { ProductTranslated } from '@/types/product';

interface Props {
  product: ProductTranslated;
}

/**
 * A client component that toggles a product in the favourites list.  It uses Redux
 * to persist state across pages and reads translation strings via `useTranslation()`.
 */
export default function AddToFavouriteButton({ product }: Props) {
  const dispatch = useAppDispatch();
  const favourites = useAppSelector((state) => state.favorites.items);
  const isFav = favourites.some((item) => item.id === product.id);
  const { t } = useTranslation();
  return (
    <button
      onClick={() => {
        if (isFav) dispatch(removeFavorite(product.id));
        else dispatch(addFavorite(product));
      }}
      className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
    >
      {isFav ? t('remove_favorite') : t('add_favorite')}
    </button>
  );
}