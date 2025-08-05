"use client";

import Image from 'next/image';
import { useTranslation } from '@/hooks/useTranslation';
import Button from '@/components/atoms/Button';

export default function Hero() {
  const { t, locale } = useTranslation();
  return (
    <section className="relative overflow-hidden bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto flex flex-col md:flex-row items-center px-4 py-16 gap-8">
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">
            {t('welcome')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
            {locale === 'tr'
              ? 'El işçiliğiyle hazırlanmış premium kemerler koleksiyonumuzla tarzınıza zarafet katın.'
              : 'Elevate your style with our handcrafted collection of premium belts.'}
          </p>
          <a
            href={`/${locale}/#products`}
            className="inline-block rounded bg-primary text-secondary px-6 py-3 font-medium hover:bg-primary/90"
          >
            {locale === 'tr' ? 'Ürünleri Keşfet' : 'Shop Now'}
          </a>
        </div>
        <div className="flex-1 relative h-80 w-full md:h-96">
          <Image
            src="https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            alt="Hero background"
            fill
            className="object-cover rounded-lg shadow"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}