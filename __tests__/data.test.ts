import { getProducts } from '@/lib/data';

describe('data helpers', () => {
  it('returns Turkish translations', async () => {
    const products = await getProducts('tr');
    expect(products[0].name).toBe('Klasik Deri Kemer');
  });
  it('falls back to English when locale missing', async () => {
    const products = await getProducts('fr');
    expect(products[0].name).toBe('Classic Leather Belt');
  });
});