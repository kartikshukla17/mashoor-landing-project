import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { Metadata } from 'next';
import { getProducts, getProductBySlug } from '@/lib/data';
import AddToFavouriteButton from '@/components/molecules/AddToFavouriteButton';

interface PageProps {
  params: { locale: string; slug: string };
}

// Pre-generate all product slugs for each locale
export async function generateStaticParams() {
  const locales = ['en', 'tr'];
  const params: Array<{ locale: string; slug: string }> = [];
  for (const locale of locales) {
    const products = await getProducts(locale);
    products.forEach((product) => {
      params.push({ locale, slug: product.slug });
    });
  }
  return params;
}

// Create dynamic metadata for SEO and social sharing
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = await getProductBySlug(slug, locale);
  if (!product) {
    return {};
  }
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      type: 'article',
      images: [
        {
          url: product.image,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const product = await getProductBySlug(slug, locale);
  if (!product) {
    notFound();
  }
  // Return early if still undefined to satisfy TypeScript
  if (!product) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Image Section */}
            <div className="relative group">
              <div className="aspect-square overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-2xl shadow-gray-200/50 dark:shadow-gray-900/50 ring-1 ring-gray-200/50 dark:ring-gray-700/50">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={640}
                  height={640}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-pink-400 to-orange-500 rounded-full opacity-20 blur-xl"></div>
            </div>

            {/* Product Details Section */}
            <div className="space-y-8">
              {/* Header */}
              <div className="space-y-4">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                  Featured Product
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent leading-tight">
                  {product.name}
                </h1>
              </div>

              {/* Description */}
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                  {product.description}
                </p>
              </div>

              {/* Price */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border border-gray-200 dark:border-gray-600">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                    {product.price}
                  </span>
                  <span className="text-xl font-medium text-gray-600 dark:text-gray-400">
                    {product.currency}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Free shipping included
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-4">
                <AddToFavouriteButton product={product} />
                
                {/* Additional product info */}
                <div className="grid grid-cols-2 gap-4 pt-6">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">In Stock</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Ready to ship</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">Authentic</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Verified quality</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            description: product.description,
            image: product.image,
            offers: {
              '@type': 'Offer',
              priceCurrency: product.currency,
              price: product.price,
              availability: 'https://schema.org/InStock',
            },
          }),
        }}
      />
    </div>
  );
}