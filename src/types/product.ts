export interface Product {
  id: string;
  slug: string;
  name: Record<string, string>;
  description: Record<string, string>;
  price: number;
  currency: string;
  image: string;
}

// A translated version of a product where name and description are plain strings
export interface ProductTranslated extends Omit<Product, 'name' | 'description'> {
  name: string;
  description: string;
}