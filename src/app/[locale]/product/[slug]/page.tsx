import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { Metadata } from 'next';
import { getProducts, getProductBySlug } from '@/lib/data';
import AddToFavouriteButton from '@/components/molecules/AddToFavouriteButton';

// Define the props type directly here
type PageProps = {
  params: { locale: string; slug: string };
};

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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = params;
  const product = await getProductBySlug(slug, locale);

  if (!product) {
    return {};
  }
  
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
  const { locale, slug } = params;
  const product = await getProductBySlug(slug, locale);

  if (!product) {
    notFound();
  }

  const hasValidImage = product.image && product.image !== '<url>';

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
      <div className="flex-1">
        {hasValidImage ? (
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={480}
            className="w-full rounded-lg object-cover"
          />
        ) : (
          <div className="w-full h-96 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-lg">
            <span className="text-gray-500">No Image Available</span>
          </div>
        )}
      </div>
      <div className="flex-1 space-y-4">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-gray-600 dark:text-gray-400">{product.description}</p>
        <p className="text-xl font-semibold">
          {product.price} {product.currency}
        </p>
        <AddToFavouriteButton product={product} />
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
    </div>
  );
}