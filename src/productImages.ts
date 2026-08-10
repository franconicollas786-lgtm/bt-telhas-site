import type { Category, Product } from './data';

const Q = '?auto=format&fit=crop&w=800&q=80';

/**
 * Imagens ilustrativas por categoria (Unsplash — URLs testadas).
 * Várias fotos por categoria; o produto escolhe uma com base no id (menos repetição no grid).
 */
const CATEGORY_IMAGES: Record<Category, readonly string[]> = {
  Telhas: [
    `https://images.unsplash.com/photo-1564013799919-ab600027ffc6${Q}`,
    `https://images.unsplash.com/photo-1600585154340-be6161a56a0c${Q}`,
    `https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8${Q}`,
    `https://images.unsplash.com/photo-1600607687939-ce8a6c25118c${Q}`,
    `https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3${Q}`,
    `https://images.unsplash.com/photo-1484154218962-a197022b5858${Q}`,
  ],
  Forros: [
    `https://images.unsplash.com/photo-1615529328331-f8917597711f${Q}`,
    `https://images.unsplash.com/photo-1631679706909-1844bbd07221${Q}`,
    `https://images.unsplash.com/photo-1618221195710-dd6b41faaea6${Q}`,
    `https://images.unsplash.com/photo-1600210492486-724fe5c67fb0${Q}`,
    `https://images.unsplash.com/photo-1600607687644-c7171b42498f${Q}`,
    `https://images.unsplash.com/photo-1600585154526-990dced4db0d${Q}`,
  ],
  'Ripados e Painéis': [
    `https://images.unsplash.com/photo-1503602642458-232111445657${Q}`,
    `https://images.unsplash.com/photo-1589939705384-5185137a7f0f${Q}`,
    `https://images.unsplash.com/photo-1503387762-592deb58ef4e${Q}`,
    `https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3${Q}`,
    `https://images.unsplash.com/photo-1615529328331-f8917597711f${Q}`,
  ],
  Rodapés: [
    `https://images.unsplash.com/photo-1618221195710-dd6b41faaea6${Q}`,
    `https://images.unsplash.com/photo-1589939705384-5185137a7f0f${Q}`,
    `https://images.unsplash.com/photo-1600210492486-724fe5c67fb0${Q}`,
    `https://images.unsplash.com/photo-1484154218962-a197022b5858${Q}`,
  ],
  Acabamentos: [
    `https://images.unsplash.com/photo-1631679706909-1844bbd07221${Q}`,
    `https://images.unsplash.com/photo-1615529328331-f8917597711f${Q}`,
    `https://images.unsplash.com/photo-1589939705384-5185137a7f0f${Q}`,
    `https://images.unsplash.com/photo-1600585154526-990dced4db0d${Q}`,
    `https://images.unsplash.com/photo-1600607687644-c7171b42498f${Q}`,
    `https://images.unsplash.com/photo-1618221195710-dd6b41faaea6${Q}`,
  ],
  'Acessórios e Diversos': [
    `https://images.unsplash.com/photo-1504148455328-c376907d081c${Q}`,
    `https://images.unsplash.com/photo-1581092918056-0c4c3acd3789${Q}`,
    `https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1${Q}`,
    `https://images.unsplash.com/photo-1621905251918-48416bd8575a${Q}`,
    `https://images.unsplash.com/photo-1503387762-592deb58ef4e${Q}`,
    `https://images.unsplash.com/photo-1600585154340-be6161a56a0c${Q}`,
  ],
};

function hashId(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) {
    h = (Math.imul(31, h) + id.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

export function resolveProductImageUrl(product: Product): string {
  if (product.imageUrls?.length) {
    return product.imageUrls[0]!.trim();
  }
  if (product.imageUrl?.trim()) return product.imageUrl.trim();
  const pool = CATEGORY_IMAGES[product.category];
  const idx = hashId(product.id) % pool.length;
  return pool[idx] ?? pool[0];
}
