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

  const href = `/${locale}/product/${product.slug}`;
  
  // This check handles both missing image properties and invalid placeholder URLs
  const hasValidImage = product.image && product.image !== '<url>';

  return (
    <Link href={href} prefetch={false} className="block group">
      <motion.article
        whileHover={{ scale: 1.03 }}
        className="rounded-lg overflow-hidden border bg-white dark:bg-primary shadow transition-transform h-full flex flex-col"
      >
        {/* Image Section */}
        {hasValidImage ? (
          <div className="relative w-full h-64">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
        
        {/* Content Section */}
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="font-semibold text-lg mb-1 group-hover:underline">{product.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {t('product_label_price')}: {product.price} {product.currency}
          </p>
          <div className="mt-auto">
            <button
              onClick={(e) => {
                // Stop the click from propagating to the parent Link component
                e.stopPropagation();
                e.preventDefault();
                
                if (isFav) {
                  dispatch(removeFavorite(product.id));
                } else {
                  dispatch(addFavorite(product));
                }
              }}
              className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline relative z-10"
            >
              {isFav ? t('remove_favorite') : t('add_favorite')}
            </button>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}