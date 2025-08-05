import { getProducts } from '@/lib/data';

export const dynamic = 'force-static';

export async function GET() {
  const locales = ['en', 'tr'];
  const productsByLocale = await Promise.all(locales.map((l) => getProducts(l)));
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  let urls = '';
  locales.forEach((locale) => {
    urls += `<url><loc>${siteUrl}/${locale}</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>`;
    urls += `<url><loc>${siteUrl}/${locale}/favorites</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>`;
  });
  locales.forEach((locale, idx) => {
    const products = productsByLocale[idx];
    products.forEach((product) => {
      urls += `<url><loc>${siteUrl}/${locale}/product/${product.slug}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`;
    });
  });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}