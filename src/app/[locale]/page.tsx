import { getProducts } from '@/lib/data';
import Hero from '@/components/organisms/Hero';
import ProductCard from '@/components/molecules/ProductCard';
import { Metadata } from 'next';

// Define the props type directly here
type PageProps = {
  params: { locale: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = params;
  return {
    title: locale === 'tr' ? 'Ana Sayfa' : 'Home',
    description:
      locale === 'tr'
        ? 'Klasik, altın tokalı ve kanvas kemerlerimizi keşfedin.'
        : 'Discover our collection of classic, gold buckle and canvas belts.',
  };
}

export default async function Page({ params }: PageProps) {
  const { locale } = params;
  const products = await getProducts(locale);
  return (
    <div>
      <Hero />
      <section id="products" className="container mx-auto px-4 py-12 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </div>
  );
}