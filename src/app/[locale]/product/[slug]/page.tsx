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
  
  // More specific check for a valid image URL
  const hasValidImage = product.image && product.image !== '<url>';
  
  const imageMetadata = hasValidImage ? {
    images: [
      {
        url: product.image,
        width: 1200,
        height: 630,
      },
    ],
  } : {};

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      type: 'article',
      ...imageMetadata,
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: hasValidImage ? [product.image] : [],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const product = await getProductBySlug(slug, locale);

  if (!product) {
    notFound();
  }

  // More specific check for a valid image URL
  const hasValidImage = product.image && product.image !== '<url>';

  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Image Section */}
        <div className="space-y-4">
          {hasValidImage ? (
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg">
              <Image
                src={product.image}
                alt={product.name}
                width={640}
                height={640}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          ) : (
            <div className="aspect-square bg-gray-50 dark:bg-gray-800 flex items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-600">
              <div className="text-center">
                <svg className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-400 dark:text-gray-500 font-medium">No image available</span>
              </div>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              {product.name}
            </h1>
            
            <div className="text-2xl font-semibold text-gray-900 dark:text-white">
              {product.price} <span className="text-lg text-gray-600 dark:text-gray-400">{product.currency}</span>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Description</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <AddToFavouriteButton product={product} />
          </div>
        </div>
      </div>

      {/* Schema.org JSON-LD - Preserved exactly as original */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            description: product.description,
            image: hasValidImage ? product.image : '',
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