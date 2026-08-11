import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Product } from '../data';
import { ProductCardImage } from './ProductCardImage';
import { IconWhatsApp } from './SocialBrandIcons';
import { waUrl } from '../site';

export function BestSellers({ products }: { products: Product[] }) {
  const items = products.filter((p) => p.isBestSeller);
  const trackRef = useRef<HTMLDivElement | null>(null);

  if (items.length === 0) return null;

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>('[data-card]');
    const step = (card?.offsetWidth ?? 288) + 24;
    track.scrollBy({ left: step * direction, behavior: 'smooth' });
  };

  return (
    <section className="bg-gray-50 py-16" aria-labelledby="mais-vendidos-titulo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center rounded-full bg-[#8cc63f]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-ink">
              Os favoritos dos clientes
            </span>
            <h2 id="mais-vendidos-titulo" className="mt-3 text-3xl font-bold text-gray-900">
              Produtos mais vendidos
            </h2>
          </div>

          <div className="hidden shrink-0 gap-2 md:flex">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Ver produto anterior"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm outline-none transition-colors hover:border-brand-ink hover:text-brand-ink focus-visible:ring-2 focus-visible:ring-brand-ink/50"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Ver próximo produto"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm outline-none transition-colors hover:border-brand-ink hover:text-brand-ink focus-visible:ring-2 focus-visible:ring-brand-ink/50"
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        className="hide-scrollbar flex snap-x snap-proximity gap-6 overflow-x-auto scroll-smooth px-4 pb-2 sm:px-6 lg:px-8"
      >
        {items.map((product) => (
          <article
            key={product.id}
            data-card
            className="flex w-72 shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
          >
            <ProductCardImage product={product} />
            <div className="mt-4 flex flex-1 flex-col">
              <span className="mb-2 text-xs font-bold uppercase tracking-wider text-brand-ink">
                {product.category}
              </span>
              <h3 className="mb-4 text-lg font-bold leading-tight text-gray-900">
                {product.name}
              </h3>
              <a
                href={waUrl(`Olá! Gostaria de solicitar um orçamento para: ${product.name}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto flex items-center justify-center gap-2 rounded-full bg-brand-ink px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-ink-hover"
              >
                <IconWhatsApp className="h-4 w-4" />
                Solicitar orçamento
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
