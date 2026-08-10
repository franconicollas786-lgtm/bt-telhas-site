import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import type { Category, Product } from '../data';
import { useCatalog } from '../useCatalog';
import {
  ShoppingCart,
  ChevronRight,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Clock,
  Search,
  MessageCircle,
  Plus,
  Minus,
  Trash2,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Seo } from '../components/Seo';
import { IconWhatsApp } from '../components/SocialBrandIcons';
import { ProductCardImage } from '../components/ProductCardImage';
import { BestSellers } from '../components/BestSellers';
import {
  ADDRESS_SCHEMA,
  GOOGLE_MAPS_URL,
  SITE_NAME,
  SITE_URL,
  SITE_DESCRIPTION,
  waUrl,
  waUrlWithProductLines,
  WHATSAPP_NUMBER,
  PRICE_CONSULT_LABEL,
} from '../site';

type CatalogItem = {
  id: string;
  name: string;
  description?: string;
  category: Category;
  variants: Product[];
};

const PRODUCT_GROUPS: { id: string; name: string; productIds: string[] }[] = [
  { id: 'g-portas-sanfonadas', name: 'Portas sanfonadas', productIds: ['ad8', 'ad9', 'ad10', 'ad11', 'ad12', 'ad13'] },
  { id: 'g-emenda-h', name: 'Emenda H', productIds: ['ac5', 'ac7', 'ac21', 'ac30'] },
  { id: 'g-manta-brasilit', name: 'Manta adesiva Brasilit', productIds: ['ad22', 'ad23', 'ad24'] },
  { id: 'g-telha-colonial-plan', name: 'Telha Colonial [2,42 x 0,88]', productIds: ['t9', 't10', 't13'] },
  { id: 'g-acabamento-u', name: 'Acabamento U', productIds: ['ac17', 'ac19'] },
  { id: 'g-acabamento-u-cor', name: 'Acabamento U cor', productIds: ['ac4', 'ac6'] },
  { id: 'g-acabamento-u-madeira', name: 'Acabamento U madeirado', productIds: ['ac10', 'ac11'] },
  { id: 'g-chapas-pt', name: 'Chapas PT ecológicas', productIds: ['ad1', 'ad2'] },
  { id: 'g-cumeeira-central', name: 'Cumeeira Central Articulada', productIds: ['t15', 't16'] },
  { id: 'g-emenda-h-madeira', name: 'Emenda H madeirada', productIds: ['ac9', 'ac13'] },
  { id: 'g-fechamento', name: 'Fechamento', productIds: ['ac24', 'ac26'] },
  { id: 'g-painel-ripado-eva', name: 'Painel Ripado EVA - Autocolante', productIds: ['r1', 'r2'] },
  { id: 'g-rodape-auto-colante', name: 'Rodapé - Autocolante', productIds: ['ro1', 'ro2'] },
  { id: 'g-telha-translucida-leitosa', name: 'Telha translúcida de PVC (leitosa)', productIds: ['t5', 't6'] },
];

const GROUP_LOOKUP = PRODUCT_GROUPS.reduce<Record<string, { id: string; name: string }>>((acc, group) => {
  group.productIds.forEach((productId) => {
    acc[productId] = { id: group.id, name: group.name };
  });
  return acc;
}, {});

const GOOGLE_REVIEWS = [
  { name: 'Marília Rosa', date: '7 de mai. de 2026', color: 'bg-[#EA4335]', text: 'Muito obrigado pela atenção, foi ótimo fazer a compra com vcs! Super indico, os rapazes da entrega estão de parabéns, são muito rápidos.' },
  { name: 'Lucasantos DuBoM', date: '14 de mai. de 2026', color: 'bg-[#8cc63f]', text: 'Produtos de alta qualidade e boa durabilidade. Sempre comprei aqui e indico para todos!' },
  { name: 'Jacira Armond', date: '23 de mai. de 2026', color: 'bg-[#34A853]', text: 'São todos maravilhosos, principalmente os rapazes da entrega do carro branco — top, nota mil!' },
  { name: 'Luiz Fernando Ba', date: '9 de abr. de 2026', color: 'bg-[#4285F4]', text: 'Estou bem satisfeita com o atendimento do vendedor Fernando, agilidade na entrega do material, o forro é lindo e superou minhas expectativas.' },
  { name: 'Denilson Queiroz', date: '21 de abr. de 2026', color: 'bg-[#FBBC05]', text: 'Ótima experiência!! Empresa com preço justo, atendimento cordial, entrega rápida. São extremamente profissionais em tudo o que fazem.' },
  { name: 'Cristian Gastao', date: '18 de mar. de 2026', color: 'bg-[#EA4335]', text: 'Melhor preço que achei na região e olha que rodei fazendo orçamento. Ótimo atendimento. Tudo muito rápido desde o atendimento, pagamento e conferência. Top!' },
  { name: 'Bruno Alencar', date: '4 de fev. de 2026', color: 'bg-[#4285F4]', text: 'Atendimento top! Fui bem recebido desde o primeiro contato. Muito obrigado à equipe da entrega — o Adonias muito disposto a me ajudar a guardar o material. Entrega muito rápida!' },
  { name: 'Alan Rodrigues', date: '16 de fev. de 2026', color: 'bg-[#34A853]', text: 'Produto (forro) de qualidade e ótimo atendimento!! Ficou excelente no meu contêiner da praia em Monte Alto, Arraial do Cabo. Obrigado pela atenção!' },
];

export default function HomePage() {
  const location = useLocation();
  const { catalog } = useCatalog();
  const { products, categories, settings } = catalog;
  const [activeCategory, setActiveCategory] = useState<Category>('Forros');
  const [catalogSearch, setCatalogSearch] = useState('');
  const [availabilitySelection, setAvailabilitySelection] = useState<string[]>([]);
  const [expandedProductId, setExpandedProductId] = useState<string | null>(null);
  const [selectedVariantByItem, setSelectedVariantByItem] = useState<Record<string, string>>({});
  const [productQuantities, setProductQuantities] = useState<Record<string, number>>({});
  const [cartItems, setCartItems] = useState<Record<string, number>>({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const productsSectionRef = useRef<HTMLElement | null>(null);
  const hasShownWhatsAppHintRef = useRef(false);
  const inactivityTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const department = params.get('departamento');
    if (!department) return;

    const categoryByDepartment: Record<string, Category> = {
      telhas: 'Telhas',
      forros: 'Forros',
      ripados: 'Ripados e Painéis',
      rodapes: 'Rodapés',
      acabamentos: 'Acabamentos',
      acessorios: 'Acessórios e Diversos',
    };

    const next = categoryByDepartment[department];
    if (next) setActiveCategory(next);
  }, [location.search]);

  const filteredProducts = useMemo(() => {
    const q = catalogSearch.trim().toLowerCase();

    const matchesQuery = (p: Product) => {
      if (!q) return true;
      const name = p.name.toLowerCase();
      const desc = (p.description ?? '').toLowerCase();
      const cat = p.category.toLowerCase();
      return name.includes(q) || desc.includes(q) || cat.includes(q);
    };

    // Com busca ativa: todos os produtos que coincidem (qualquer categoria).
    if (q) {
      return products
        .filter(matchesQuery)
        .sort((a, b) => {
          const byCat = a.category.localeCompare(b.category, 'pt-BR');
          if (byCat !== 0) return byCat;
          return a.name.localeCompare(b.name, 'pt-BR');
        });
    }

    // Sem busca: apenas a categoria selecionada na aba.
    return products.filter((p) => p.category === activeCategory);
  }, [activeCategory, catalogSearch, products]);

  const filteredCatalogItems = useMemo<CatalogItem[]>(() => {
    const grouped = new Map<string, CatalogItem>();

    filteredProducts.forEach((product) => {
      const groupMeta = GROUP_LOOKUP[product.id];
      if (!groupMeta) {
        grouped.set(product.id, {
          id: product.id,
          name: product.name,
          description: product.description,
          category: product.category,
          variants: [product],
        });
        return;
      }

      const existing = grouped.get(groupMeta.id);
      if (existing) {
        existing.variants.push(product);
        return;
      }

      grouped.set(groupMeta.id, {
        id: groupMeta.id,
        name: groupMeta.name,
        description: product.description,
        category: product.category,
        variants: [product],
      });
    });

    return Array.from(grouped.values()).map((item) => ({
      ...item,
      variants: item.variants.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR')),
    }));
  }, [filteredProducts]);
  const offerRibbonItemIds = useMemo(() => {
    if (filteredCatalogItems.length === 0) return new Set<string>();

    const shuffled = [...filteredCatalogItems]
      .map((item) => item.id)
      .sort(() => Math.random() - 0.5);
    const minHighlighted = Math.max(1, Math.ceil(filteredCatalogItems.length * 0.2));
    return new Set(shuffled.slice(0, minHighlighted));
  }, [filteredCatalogItems]);

  const toggleAvailabilityProduct = useCallback((id: string) => {
    setAvailabilitySelection((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }, []);

  const clearAvailabilitySelection = useCallback(() => {
    setAvailabilitySelection([]);
  }, []);

  const getProductQuantity = useCallback(
    (productId: string) => {
      return productQuantities[productId] ?? 1;
    },
    [productQuantities],
  );

  const updateProductQuantity = useCallback((productId: string, nextQty: number) => {
    const safeQty = Math.max(1, Math.floor(nextQty));
    setProductQuantities((prev) => ({ ...prev, [productId]: safeQty }));
  }, []);

  const addToCart = useCallback((productId: string) => {
    setCartItems((prev) => {
      const qty = productQuantities[productId] ?? 1;
      return { ...prev, [productId]: (prev[productId] ?? 0) + qty };
    });
  }, [productQuantities]);

  const changeCartItemQuantity = useCallback((productId: string, delta: number) => {
    setCartItems((prev) => {
      const current = prev[productId] ?? 0;
      const next = current + delta;
      if (next <= 0) {
        const updated = { ...prev };
        delete updated[productId];
        return updated;
      }
      return { ...prev, [productId]: next };
    });
  }, []);

  const removeCartItem = useCallback((productId: string) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      delete updated[productId];
      return updated;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartItems({});
  }, []);

  const openAvailabilityWhatsApp = useCallback(() => {
    if (availabilitySelection.length === 0) return;
    const names = products
      .filter((p) => availabilitySelection.includes(p.id))
      .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
      .map((p) => p.name);
    const url = waUrlWithProductLines(
      'Olá! Gostaria de *consultar disponibilidade* dos seguintes produtos:',
      names,
      'Podem me informar prazos e estoque?',
    );
    // Mesma aba: em mobile, pop-up / target=_blank costuma falhar ou “voltar” para o site.
    window.location.assign(url);
  }, [availabilitySelection]);
  const getActiveVariant = useCallback(
    (item: CatalogItem) => {
      const selectedId = selectedVariantByItem[item.id];
      return item.variants.find((variant) => variant.id === selectedId) ?? item.variants[0]!;
    },
    [selectedVariantByItem],
  );
  const cartItemsCount = useMemo(
    () => Object.values(cartItems).reduce((sum: number, itemQty: number) => sum + itemQty, 0),
    [cartItems],
  );
  const cartEntries = useMemo(
    () =>
      Object.entries(cartItems)
        .map(([productId, qty]) => {
          const product = products.find((p) => p.id === productId);
          if (!product) return null;
          return { product, qty };
        })
        .filter((entry): entry is { product: Product; qty: number } => entry !== null)
        .sort((a, b) => a.product.name.localeCompare(b.product.name, 'pt-BR')),
    [cartItems],
  );
  useEffect(() => {
    const section = productsSectionRef.current;
    if (!section) return;

    const clearInactivityTimeout = () => {
      if (inactivityTimeoutRef.current !== null) {
        window.clearTimeout(inactivityTimeoutRef.current);
        inactivityTimeoutRef.current = null;
      }
    };

    const hideHint = () => {
      window.dispatchEvent(new CustomEvent('catalog-whatsapp-hint', { detail: { visible: false } }));
    };

    const onInteraction = () => {
      clearInactivityTimeout();
      hideHint();
      hasShownWhatsAppHintRef.current = true;
    };

    const startInactivityTimer = () => {
      if (hasShownWhatsAppHintRef.current) return;
      clearInactivityTimeout();
      inactivityTimeoutRef.current = window.setTimeout(() => {
        window.dispatchEvent(new CustomEvent('catalog-whatsapp-hint', { detail: { visible: true } }));
        hasShownWhatsAppHintRef.current = true;
      }, 10000);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          startInactivityTimer();
        } else {
          clearInactivityTimeout();
          hideHint();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(section);
    section.addEventListener('pointerdown', onInteraction);
    section.addEventListener('keydown', onInteraction);
    section.addEventListener('input', onInteraction);

    return () => {
      observer.disconnect();
      clearInactivityTimeout();
      hideHint();
      section.removeEventListener('pointerdown', onInteraction);
      section.removeEventListener('keydown', onInteraction);
      section.removeEventListener('input', onInteraction);
    };
  }, []);

  const openCartWhatsApp = useCallback(() => {
    if (cartEntries.length === 0) return;
    const lines = cartEntries.map(({ product, qty }) => `${product.name} — ${qty} ${product.unit}`);
    const url = waUrlWithProductLines(
      'Olá! Gostaria de *consultar disponibilidade* dos itens do meu carrinho:',
      lines,
      'Podem me informar prazos e estoque?',
    );
    window.location.assign(url);
  }, [cartEntries]);

  const structuredData = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'WholesaleStore',
      name: SITE_NAME,
      url: SITE_URL,
      telephone: `+${WHATSAPP_NUMBER}`,
      description:
        'Referência em forros, telhas e painéis ripados na Região dos Lagos.',
      priceRange: 'Consulte',
      areaServed: { '@type': 'Country', name: 'Brasil' },
      address: ADDRESS_SCHEMA,
      sameAs: [GOOGLE_MAPS_URL],
    }),
    [],
  );

  return (
    <>
      <Seo
        title={SITE_NAME}
        description={SITE_DESCRIPTION}
        path="/"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
      <div className={`fixed top-24 right-4 z-[120] sm:top-28 sm:right-6 transition-opacity ${cartItemsCount === 0 ? 'opacity-30 hover:opacity-70' : 'opacity-100'}`}>
        <button
          type="button"
          onClick={() => setIsCartOpen((prev) => !prev)}
          className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-700 text-white shadow-md transition-transform hover:scale-105 hover:bg-gray-600"
          aria-label="Abrir carrinho"
          aria-expanded={isCartOpen}
          aria-controls="painel-carrinho"
        >
          <ShoppingCart className="h-4 w-4" aria-hidden />
          {cartItemsCount > 0 ? (
            <span className="absolute -right-1 -top-1 min-w-4 rounded-full bg-[#8cc63f] px-1 py-0.5 text-center text-[10px] font-bold leading-none text-white">
              {cartItemsCount}
            </span>
          ) : null}
        </button>
      </div>

      <AnimatePresence>
        {isCartOpen ? (
          <motion.aside
            id="painel-carrinho"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            className="fixed top-40 right-4 z-[120] w-[min(92vw,390px)] rounded-2xl border border-gray-200 bg-white p-4 shadow-2xl sm:right-6"
          >
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-base font-bold text-gray-900">Carrinho</h2>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                aria-label="Fechar carrinho"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>

            {cartEntries.length === 0 ? (
              <p className="rounded-xl border border-dashed border-gray-200 bg-gray-50 px-3 py-6 text-center text-sm text-gray-600">
                Seu carrinho está vazio.
              </p>
            ) : (
              <>
                <div className="max-h-72 space-y-2 overflow-auto pr-1">
                  {cartEntries.map(({ product, qty }) => (
                    <div key={product.id} className="rounded-xl border border-gray-100 bg-gray-50 p-3">
                      <p className="text-sm font-semibold text-gray-900">{product.name}</p>
                      <p className="mt-0.5 text-xs text-gray-600">{PRICE_CONSULT_LABEL}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="inline-flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => changeCartItemQuantity(product.id, -1)}
                            className="rounded-md border border-gray-300 bg-white p-1.5 text-gray-700"
                            aria-label={`Diminuir ${product.name}`}
                          >
                            <Minus className="h-3.5 w-3.5" aria-hidden />
                          </button>
                          <span className="min-w-8 text-center text-sm font-bold text-gray-800">{qty}</span>
                          <button
                            type="button"
                            onClick={() => changeCartItemQuantity(product.id, 1)}
                            className="rounded-md border border-gray-300 bg-white p-1.5 text-gray-700"
                            aria-label={`Aumentar ${product.name}`}
                          >
                            <Plus className="h-3.5 w-3.5" aria-hidden />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeCartItem(product.id)}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-3.5 w-3.5" aria-hidden />
                          Remover
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={clearCart}
                    className="flex-1 rounded-xl border border-gray-300 px-3 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    Limpar
                  </button>
                  <button
                    type="button"
                    onClick={openCartWhatsApp}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-3 py-2.5 text-sm font-bold text-white hover:bg-[#20bd5a]"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden />
                    Enviar no WhatsApp
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        ) : null}
      </AnimatePresence>

      <section className="relative min-h-[480px] overflow-hidden bg-gray-900 lg:min-h-[680px]">
        <img
          src={settings.hero_image || '/hero-image.png'}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[70%_35%] lg:object-right"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#061206]/90 via-[#061206]/55 to-[#061206]/10 lg:from-[#061206]/85 lg:via-[#061206]/30 lg:to-transparent" aria-hidden />

        <div className="relative z-10 flex min-h-[552px] flex-col justify-between px-6 pb-4 pt-8 lg:min-h-[680px] lg:px-16 lg:py-12">

          {/* TOPO: Badge + Headline + subheadline */}
          <div className="w-full lg:max-w-[50%]">
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center lg:justify-start"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-[#8cc63f]/30 bg-[#8cc63f]/10 px-3 py-1.5 backdrop-blur-sm sm:px-4 sm:py-2">
                <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8cc63f] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#8cc63f] sm:h-2.5 sm:w-2.5" />
                </span>
                <span className="text-xs font-semibold text-[#8cc63f] sm:text-sm">Atendimento disponível agora</span>
              </div>
            </motion.div>

            <motion.h1
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-6xl xl:text-7xl"
            >
              {settings.hero_title || 'Forros, telhas e painéis em PVC para sua obra.'}
            </motion.h1>

            <motion.p
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 text-base leading-relaxed text-white/80 sm:mt-4 sm:text-lg lg:max-w-xl lg:text-xl"
            >
              {settings.hero_subtitle || 'Entrega rápida, preço justo e atendimento de qualidade para Cabo Frio e Região dos Lagos.'}
            </motion.p>
          </div>

          {/* BAIXO: Botões + Trust indicators */}
          <div className="w-full lg:max-w-[50%]">
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
            >
              <a
                href={waUrl('Olá! Gostaria de falar com a BT Telhas.')}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-1/2 items-center justify-center gap-1 rounded-full bg-[#8cc63f] px-2 py-3.5 text-xs font-semibold text-white shadow-lg shadow-[#8cc63f]/20 transition-all hover:bg-[#7ab332] active:scale-95 sm:w-auto sm:gap-2 sm:px-7 sm:text-base"
              >
                <IconWhatsApp className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
                Falar no WhatsApp
              </a>
              <Link
                to="/#produtos"
                className="inline-flex w-1/2 items-center justify-center gap-1 rounded-full bg-white px-2 py-3.5 text-xs font-semibold text-gray-900 shadow-lg transition-all hover:bg-gray-100 active:scale-95 sm:w-auto sm:gap-2 sm:px-7 sm:text-base"
              >
                Conhecer produtos
              </Link>
            </motion.div>
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-6"
            >
              <div className="flex flex-col items-center gap-1.5 text-center sm:flex-row sm:gap-2 sm:text-left">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#8cc63f]/10">
                  <Truck className="h-4 w-4 text-[#8cc63f]" aria-hidden />
                </div>
                <span className="text-xs leading-tight text-white/70 sm:text-sm">Entrega rápida</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 text-center sm:flex-row sm:gap-2 sm:text-left">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#8cc63f]/10">
                  <ShieldCheck className="h-4 w-4 text-[#8cc63f]" aria-hidden />
                </div>
                <span className="text-xs leading-tight text-white/70 sm:text-sm">Materiais de qualidade</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 text-center sm:flex-row sm:gap-2 sm:text-left">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#8cc63f]/10">
                  <MessageCircle className="h-4 w-4 text-[#8cc63f]" aria-hidden />
                </div>
                <span className="text-xs leading-tight text-white/70 sm:text-sm">Atendimento personalizado</span>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      <section className="border-y border-gray-100 bg-gray-50 py-12" id="sobre" aria-labelledby="sobre-titulo">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="sobre-titulo" className="sr-only">
            Por que escolher a {SITE_NAME}
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#8cc63f]/30 hover:shadow-xl hover:shadow-[#8cc63f]/15">
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#8cc63f]/0 via-[#8cc63f]/0 to-[#8cc63f]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden
              />
              <div className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-[#8cc63f] transition-transform duration-300 group-hover:scale-110">
                <Truck className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="relative mb-2 text-lg font-bold text-gray-900">Entrega express na Região dos Lagos</h3>
              <p className="relative text-sm text-gray-600">Entrega para Cabo Frio, Arraial, São Pedro, Araruama e Iguaba Grande em tempo recorde.</p>
            </div>
            <div className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#8cc63f]/30 hover:shadow-xl hover:shadow-[#8cc63f]/15">
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#8cc63f]/0 via-[#8cc63f]/0 to-[#8cc63f]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden
              />
              <div className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-[#8cc63f] transition-transform duration-300 group-hover:scale-110">
                <CheckCircle2 className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="relative mb-2 text-lg font-bold text-gray-900">Qualidade garantida</h3>
              <p className="relative text-sm text-gray-600">Trabalhamos apenas com as melhores marcas e produtos normatizados.</p>
            </div>
            <div className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#8cc63f]/30 hover:shadow-xl hover:shadow-[#8cc63f]/15">
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#8cc63f]/0 via-[#8cc63f]/0 to-[#8cc63f]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden
              />
              <div className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-[#8cc63f] transition-transform duration-300 group-hover:scale-110">
                <Clock className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="relative mb-2 text-lg font-bold text-gray-900">Orçamento rápido</h3>
              <p className="relative text-sm text-gray-600">Retornamos seu orçamento em menos de 30 minutos.</p>
            </div>
          </div>
        </div>
      </section>

      <BestSellers products={products} />

      <section
        id="produtos"
        ref={productsSectionRef}
        className={`bg-white py-20 ${availabilitySelection.length > 0 ? 'pb-32 md:pb-36' : ''}`}
        aria-labelledby="catalogo-titulo"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center md:mb-12">
            <h2 id="catalogo-titulo" className="mb-4 text-3xl font-bold text-gray-900">
              Nosso catálogo
            </h2>
            {cartItemsCount > 0 ? (
              <p className="mb-4 inline-flex items-center rounded-full bg-green-50 px-4 py-1.5 text-sm font-semibold text-green-800">
                <ShoppingCart className="mr-2 h-4 w-4" aria-hidden />
                {cartItemsCount} item(ns) no carrinho
              </p>
            ) : null}

            <div className="mx-auto mb-8 mt-4 max-w-2xl">
              <label htmlFor="catalogo-busca" className="sr-only">
                Buscar produtos no catálogo
              </label>
              <div className="relative">
                <Search
                  className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                  aria-hidden
                />
                <input
                  id="catalogo-busca"
                  type="search"
                  value={catalogSearch}
                  onChange={(e) => setCatalogSearch(e.target.value)}
                  placeholder="Buscar em todo o catálogo..."
                  autoComplete="off"
                  className="w-full rounded-full border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-base text-gray-900 shadow-sm outline-none transition-all placeholder:text-gray-400 focus:border-[#8cc63f] focus:bg-white focus:ring-2 focus:ring-[#8cc63f]/25"
                />
              </div>
            </div>
          </div>

          {catalogSearch.trim() ? (
            <p className="mb-6 rounded-xl border border-[#8cc63f]/30 bg-green-50/80 px-4 py-3 text-center text-sm text-gray-700 md:text-left">
              Mostrando resultados em <strong className="text-gray-900">todas as categorias</strong> para “
              {catalogSearch.trim()}”. Apague o campo de busca para voltar a navegar só pelas abas.
            </p>
          ) : null}

          <div
            className="hide-scrollbar mb-8 flex justify-start gap-2 overflow-x-auto pb-4 md:justify-center"
            role="tablist"
            aria-label="Categorias de produtos"
          >
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={activeCategory === category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                  activeCategory === category
                    ? 'bg-[#8cc63f] text-white shadow-md shadow-[#8cc63f]/20'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {filteredCatalogItems.length === 0 ? (
                <p
                  key="empty"
                  className="col-span-full rounded-2xl border border-dashed border-gray-200 bg-gray-50 py-14 text-center text-gray-600"
                >
                  Nenhum produto encontrado
                  {catalogSearch.trim() ? (
                    <>
                      {' '}
                      para “<span className="font-medium text-gray-900">{catalogSearch.trim()}</span>”.
                    </>
                  ) : (
                    '.'
                  )}{' '}
                  Ajuste o termo de busca ou limpe o campo para filtrar por categoria nas abas acima.
                </p>
              ) : (
                filteredCatalogItems.map((item) => {
                  const activeVariant = getActiveVariant(item);
                  const isSelected = availabilitySelection.includes(activeVariant.id);
                  const isExpanded = expandedProductId === item.id;
                  const currentQty = getProductQuantity(activeVariant.id);
                  const hasOfferRibbon = offerRibbonItemIds.has(item.id);

                  return (
                    <motion.article
                      key={item.id}
                      layout
                      initial={false}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      onClick={(event) => {
                        const target = event.target as HTMLElement;
                        if (target.closest('button, input, label, a, select, option, textarea')) return;
                        setExpandedProductId((prev) => (prev === item.id ? null : item.id));
                      }}
                      className={`group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:shadow-md ${
                        isSelected
                          ? 'border-[#8cc63f] ring-2 ring-[#8cc63f]/40'
                          : 'border-gray-100'
                      }`}
                    >
                      <div className="relative p-5 pb-0">
                        <div className="absolute right-3 top-3 z-10">
                          <label className="flex cursor-pointer select-none items-center gap-2 rounded-full bg-white/95 px-3 py-2 text-xs font-semibold text-gray-800 shadow-md ring-1 ring-gray-200 backdrop-blur-sm transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#8cc63f] has-[:checked]:bg-[#8cc63f] has-[:checked]:text-white">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleAvailabilityProduct(activeVariant.id)}
                              className="h-4 w-4 shrink-0 rounded border-gray-300 text-[#8cc63f] focus:ring-[#8cc63f]"
                            />
                            <span>Selecionar</span>
                          </label>
                        </div>
                        <ProductCardImage product={activeVariant} expanded={isExpanded} />
                      </div>
                      <div className="relative flex flex-1 flex-col p-5 pt-4">
                        <div className="mb-2 text-xs font-bold tracking-wider text-[#8cc63f] uppercase">{item.category}</div>
                        <h3 className="mb-2 text-lg leading-tight font-bold text-gray-900">{item.name}</h3>
                        {activeVariant.description ? (
                          <p className="mb-4 line-clamp-2 text-sm text-gray-500">{activeVariant.description}</p>
                        ) : null}
                        {hasOfferRibbon ? (
                          <div className="relative mt-auto flex min-h-[2.25rem] w-full items-center justify-center overflow-visible pt-4">
                            <span className="pointer-events-none absolute left-1/2 top-1/2 w-[min(380%,100vw)] max-w-none -translate-x-1/2 -translate-y-1/2 -rotate-[6deg] whitespace-nowrap border border-[#6f9c31] bg-[#8cc63f] px-10 py-1 text-center text-[10px] font-extrabold tracking-wider text-white uppercase shadow-md">
                              super promoção
                            </span>
                          </div>
                        ) : null}
                      </div>
                      <div className="mt-auto border-t border-gray-50 p-5 pt-4">
                        <a
                          href={waUrl(`Olá! Gostaria de solicitar um orçamento para: ${activeVariant.name}`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#8cc53b] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#7ab332]"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <IconWhatsApp className="h-4 w-4" />
                          Solicitar orçamento
                        </a>
                      </div>

                      <AnimatePresence initial={false}>
                        {isExpanded ? (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.18 }}
                            className="overflow-hidden border-t border-gray-100 bg-gray-50/70 p-4"
                          >
                            {item.variants.length > 1 ? (
                              <div>
                                <label className="mb-1 block text-sm font-semibold text-gray-700" htmlFor={`variant-${item.id}`}>
                                  Variação (tamanho/cor)
                                </label>
                                <select
                                  id={`variant-${item.id}`}
                                  value={activeVariant.id}
                                  onChange={(event) =>
                                    setSelectedVariantByItem((prev) => ({ ...prev, [item.id]: event.target.value }))
                                  }
                                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-[#8cc63f]/35"
                                >
                                  {item.variants.map((variant) => (
                                    <option key={variant.id} value={variant.id}>
                                      {variant.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            ) : null}
                            <div className="flex items-center justify-between gap-3">
                              <span className="text-sm font-semibold text-gray-700">Quantidade</span>
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => updateProductQuantity(activeVariant.id, currentQty - 1)}
                                  className="h-9 w-9 rounded-full border border-gray-300 bg-white text-lg font-bold text-gray-700"
                                  aria-label={`Diminuir quantidade de ${activeVariant.name}`}
                                >
                                  -
                                </button>
                                <span className="min-w-10 text-center text-base font-bold text-gray-900">{currentQty}</span>
                                <button
                                  type="button"
                                  onClick={() => updateProductQuantity(activeVariant.id, currentQty + 1)}
                                  className="h-9 w-9 rounded-full border border-gray-300 bg-white text-lg font-bold text-gray-700"
                                  aria-label={`Aumentar quantidade de ${activeVariant.name}`}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => addToCart(activeVariant.id)}
                              className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-[#8cc63f] px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-[#7ab332]"
                            >
                              Adicionar ao carrinho
                            </button>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>

                    </motion.article>
                  );
                })
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {availabilitySelection.length > 0 ? (
          <motion.div
            key="availability-bar"
            role="region"
            aria-label="Consulta de disponibilidade"
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="fixed inset-x-0 bottom-0 z-[100] border-t border-gray-200 bg-white px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-8px_32px_rgba(0,0,0,0.12)]"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
              <p className="text-center text-sm text-gray-600 sm:text-left">
                <span className="font-bold text-gray-900">{availabilitySelection.length}</span>{' '}
                {availabilitySelection.length === 1 ? 'produto selecionado' : 'produtos selecionados'}
              </p>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end sm:gap-3">
                <button
                  type="button"
                  onClick={clearAvailabilitySelection}
                  className="order-2 rounded-full px-4 py-2 text-sm font-medium text-gray-500 underline-offset-2 hover:text-gray-800 hover:underline sm:order-1"
                >
                  Limpar seleção
                </button>
                <button
                  type="button"
                  onClick={openAvailabilityWhatsApp}
                  className="order-1 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#25D366]/30 transition-transform hover:bg-[#20bd5a] active:scale-[0.98] sm:order-2 sm:px-8"
                >
                  <MessageCircle className="h-5 w-5 shrink-0" aria-hidden />
                  Consultar disponibilidade no WhatsApp
                </button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <section id="avaliacoes" className="bg-gray-50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Cabeçalho */}
          <div className="mb-10 flex flex-col items-center text-center">
            <h2 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Nossas avaliações
            </h2>
            <div className="mt-3 flex gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="h-8 w-8 fill-[#F9AB00]" viewBox="0 0 24 24" aria-hidden>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <p className="mt-3 text-base text-gray-600">
              <strong className="text-gray-900">4,9</strong> · Com base em <strong className="text-gray-900">230 avaliações</strong>
            </p>
            <div className="mt-2 flex items-center gap-1.5 text-sm text-gray-400">
              <span>avaliado no</span>
              <span className="text-xl font-bold leading-none" aria-label="Google">
                <span className="text-[#4285F4]">G</span>
                <span className="text-[#EA4335]">o</span>
                <span className="text-[#FBBC05]">o</span>
                <span className="text-[#4285F4]">g</span>
                <span className="text-[#34A853]">l</span>
                <span className="text-[#EA4335]">e</span>
              </span>
            </div>
          </div>

          {/* Carrossel de cards */}
          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4">
            {GOOGLE_REVIEWS.map((review, i) => (
              <article
                key={i}
                className="min-w-[272px] max-w-[272px] shrink-0 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${review.color}`}
                    aria-hidden
                  >
                    {review.name[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-gray-900">{review.name}</p>
                    <p className="text-xs text-gray-400">{review.date}</p>
                  </div>
                </div>
                <div className="mb-3 flex gap-0.5" aria-label="5 estrelas">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="h-4 w-4 fill-[#F9AB00]" viewBox="0 0 24 24" aria-hidden>
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="line-clamp-4 text-sm leading-relaxed text-gray-600">{review.text}</p>
              </article>
            ))}
          </div>

          {/* Link para Google */}
          <div className="mt-8 text-center">
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:border-[#8cc63f] hover:text-[#8cc63f]"
            >
              Ver todas as avaliações no Google
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
