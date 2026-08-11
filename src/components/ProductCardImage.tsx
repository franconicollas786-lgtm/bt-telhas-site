import { useState } from 'react';
import { ImageOff } from 'lucide-react';
import type { Product } from '../data';
import { resolveProductImageUrl } from '../productImages';

type Props = {
  product: Product;
  expanded?: boolean;
};

export function ProductCardImage({ product, expanded = false }: Props) {
  const [failed, setFailed] = useState(false);
  const src = resolveProductImageUrl(product);

  if (failed) {
    return (
      <div
        className="flex aspect-[4/3] items-center justify-center rounded-xl bg-gray-100 text-gray-400"
        role="img"
        aria-label={`Sem imagem: ${product.name}`}
      >
        <ImageOff className="h-10 w-10" strokeWidth={1.25} aria-hidden />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-gray-100 transition-all duration-200 ${
        expanded ? 'aspect-[16/11]' : 'aspect-[4/3]'
      }`}
    >
      <img
        src={src}
        alt={product.name}
        className="h-full w-full object-cover transition-transform duration-150 group-hover:scale-[1.03]"
        decoding="async"
        loading="lazy"
        onError={() => setFailed(true)}
      />
      <img
        src="/logo.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-2 top-2 h-10 w-auto opacity-45 md:h-12"
        decoding="async"
        loading="lazy"
      />
    </div>
  );
}
