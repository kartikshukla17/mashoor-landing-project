"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/hooks/useFavorites';
import { addFavorite, removeFavorite } from '@/store/favoritesSlice';
import type { ProductTranslated } from '@/types/product';
import { useTranslation } from '@/hooks/useTranslation';

interface Props {
  product: ProductTranslated;
}

export default function ProductCard({ product }: Props) {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.items);
  const isFav = favorites.some((item) => item.id === product.id);
  const { locale, t } = useTranslation();

  // Determine the current locale from the hook.  Compose a link accordingly.
  const href = `/${locale}/product/${product.slug}`;

  return (
    <motion.article
      whileHover={{ scale: 1.03 }}
      className="rounded-lg overflow-hidden border bg-white dark:bg-primary shadow transition-transform"
    >
      <Link href={href} prefetch={false} className="block">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={300}
          className="w-full h-64 object-cover"
        />
      </Link>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          {t('product_label_price')}: {product.price} {product.currency}
        </p>
        <button
          onClick={() => {
            if (isFav) dispatch(removeFavorite(product.id));
            else dispatch(addFavorite(product));
          }}
          className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
        >
          {isFav ? t('remove_favorite') : t('add_favorite')}
        </button>
      </div>
    </motion.article>
  );
}