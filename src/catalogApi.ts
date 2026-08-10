import type { Category, Product } from './data';

const API_URL = import.meta.env.VITE_API_URL ?? 'https://bttelhas-admin.axismarketing.app';

export interface CatalogSettings {
  hero_title?: string;
  hero_subtitle?: string;
  hero_image?: string;
  logo_image?: string;
  whatsapp_number?: string;
}

export interface Catalog {
  categories: Category[];
  products: Product[];
  settings: CatalogSettings;
}

export async function fetchCatalog(): Promise<Catalog> {
  const res = await fetch(`${API_URL}/api/catalog`);
  if (!res.ok) throw new Error(`Falha ao carregar catálogo (${res.status})`);
  const data = await res.json();
  return {
    categories: data.categories.map((c: { name: string }) => c.name as Category),
    products: data.products,
    settings: data.settings ?? {},
  };
}
