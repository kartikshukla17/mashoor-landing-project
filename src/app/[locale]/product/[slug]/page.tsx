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
  const { locale, slug } = params;
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
      type: 'product',
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
  const { locale, slug } = params;
  const product = await getProductBySlug(slug, locale);
  if (!product) {
    notFound();
  }
  // Return early if still undefined to satisfy TypeScript
  if (!product) return null;

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
      <div className="flex-1">
        <Image
          src={product.image}
          alt={product.name}
          width={640}
          height={480}
          className="w-full rounded-lg object-cover"
        />
      </div>
      <div className="flex-1 space-y-4">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-gray-600 dark:text-gray-400">{product.description}</p>
        <p className="text-xl font-semibold">
          {product.price} {product.currency}
        </p>
        {/* Add-to-favourites button is a client component so we encapsulate it */}
        <AddToFavouriteButton product={product} />
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
    </div>
  );
}