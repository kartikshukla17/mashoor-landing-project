import products from '@/data/products.json';
import categories from '@/data/categories.json';

import type { Product, ProductTranslated } from '@/types/product';

/**
 * Return a list of products with their name and description translated for the given locale.
 */
export async function getProducts(locale: string): Promise<ProductTranslated[]> {
  return (products as unknown as Product[]).map((p) => ({
    ...p,
    name: (p.name as any)[locale] ?? (p.name as any).en,
    description: (p.description as any)[locale] ?? (p.description as any).en,
  }));
}

/**
 * Find a single product by slug and return its translated fields.  Returns null if not found.
 */
export async function getProductBySlug(
  slug: string,
  locale: string,
): Promise<ProductTranslated | null> {
  const product = (products as unknown as Product[]).find((p) => p.slug === slug);
  if (!product) return null;
  return {
    ...product,
    name: (product.name as any)[locale] ?? (product.name as any).en,
    description:
      (product.description as any)[locale] ?? (product.description as any).en,
  };
}

/**
 * Return a list of category names translated for the given locale.
 */
export async function getCategories(locale: string) {
  return (categories as any).map((c: any) => ({
    ...c,
    name: c.name[locale] ?? c.name.en,
  }));
}