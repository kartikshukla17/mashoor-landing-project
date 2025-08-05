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
  
  // This check handles both missing image properties and the invalid placeholder URL
  const hasValidImage = product.image && product.image !== '<url>';

  return (
    <Link href={href} prefetch={false} className="block group">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ 
          scale: 1.02,
          y: -8,
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
        }}
        transition={{ 
          duration: 0.3,
          ease: "easeOut"
        }}
        className="relative rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col backdrop-blur-sm border border-gray-100 dark:border-gray-700"
      >
        {/* Gradient Overlay for Premium Look */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 dark:to-white/5 pointer-events-none z-10" />
        
        {/* Favorite Button - Floating */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            
            if (isFav) {
              dispatch(removeFavorite(product.id));
            } else {
              dispatch(addFavorite(product));
            }
          }}
          className={`absolute top-4 right-4 z-20 w-10 h-10 rounded-full backdrop-blur-md transition-all duration-300 flex items-center justify-center ${
            isFav 
              ? 'bg-red-500/90 text-white shadow-lg shadow-red-500/25' 
              : 'bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 shadow-lg'
          }`}
        >
          <svg 
            className={`w-5 h-5 transition-transform duration-200 ${isFav ? 'scale-110' : ''}`} 
            fill={isFav ? 'currentColor' : 'none'} 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={isFav ? 0 : 2} 
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
            />
          </svg>
        </motion.button>

        {/* Image Section */}
        <div className="relative w-full h-64 overflow-hidden">
          {hasValidImage ? (
            <>
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {/* Image Overlay for Better Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
              <div className="text-center">
                <svg className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">No Image</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Content Section */}
        <div className="p-6 flex flex-col flex-grow relative z-10">
          <h3 className="font-bold text-xl mb-3 text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {product.name}
          </h3>
          
          {/* Price Section with Enhanced Styling */}
          <div className="flex items-center mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t('product_label_price')}
              </span>
              <div className="h-1 w-1 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            </div>
            <div className="ml-2">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {product.price}
              </span>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300 ml-1">
                {product.currency}
              </span>
            </div>
          </div>

          {/* Action Area */}
          <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                {isFav ? t('remove_favorite') : t('add_favorite')}
              </span>
              <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
                <span className="text-sm font-medium group-hover:underline">View Details</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Shine Effect on Hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
        </div>
      </motion.article>
    </Link>
  );
}