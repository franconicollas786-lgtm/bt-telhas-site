import { useEffect, useState } from 'react';
import { products as fallbackProducts } from './data';
import { fetchCatalog, type Catalog } from './catalogApi';

const FALLBACK_CATEGORIES: Catalog['categories'] = [
  'Forros', 'Telhas', 'Ripados e Painéis', 'Rodapés', 'Acabamentos', 'Acessórios e Diversos',
];

const FALLBACK: Catalog = {
  categories: FALLBACK_CATEGORIES,
  products: fallbackProducts,
  settings: {},
};

/**
 * Busca produtos/categorias/textos do painel admin. Se a API falhar (fora do ar,
 * CORS, etc.), cai de volta pros dados fixos em data.ts — o site nunca fica em branco.
 */
export function useCatalog(): { catalog: Catalog; loading: boolean } {
  const [catalog, setCatalog] = useState<Catalog>(FALLBACK);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    console.log('[useCatalog] useEffect disparado, buscando API...');
    fetchCatalog()
      .then((data) => {
        console.log('[useCatalog] API retornou', data.products.length, 'produtos');
        if (!cancelled && data.products.length > 0) setCatalog(data);
      })
      .catch((err) => {
        console.error('[useCatalog] fetch falhou:', err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { catalog, loading };
}
