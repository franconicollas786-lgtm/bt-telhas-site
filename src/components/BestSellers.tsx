import type { Product } from '../data';
import { ProductCardImage } from './ProductCardImage';
import { IconWhatsApp } from './SocialBrandIcons';
import { waUrl } from '../site';

export function BestSellers({ products }: { products: Product[] }) {
  const items = products.filter((p) => p.isBestSeller);

  if (items.length === 0) return null;

  return (
    <section className="bg-gray-50 py-16" aria-labelledby="mais-vendidos-titulo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <span className="inline-flex items-center rounded-full bg-[#8cc63f]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#6f9c31]">
            Os favoritos dos clientes
          </span>
          <h2 id="mais-vendidos-titulo" className="mt-3 text-3xl font-bold text-gray-900">
            Produtos mais vendidos
          </h2>
        </div>
      </div>

      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
        <div className="marquee-track flex w-max gap-6 px-4">
          {[...items, ...items].map((product, i) => (
            <article
              key={`${product.id}-${i}`}
              className="flex w-72 shrink-0 flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <ProductCardImage product={product} />
              <div className="mt-4 flex flex-1 flex-col">
                <span className="mb-2 text-xs font-bold uppercase tracking-wider text-[#8cc63f]">
                  {product.category}
                </span>
                <h3 className="mb-4 text-lg font-bold leading-tight text-gray-900">
                  {product.name}
                </h3>
                <a
                  href={waUrl(`Olá! Gostaria de solicitar um orçamento para: ${product.name}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto flex items-center justify-center gap-2 rounded-full bg-[#8cc63f] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#7ab332]"
                >
                  <IconWhatsApp className="h-4 w-4" />
                  Solicitar orçamento
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
