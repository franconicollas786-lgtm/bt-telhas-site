/** URL canônica (sem barra final). Ajuste se o domínio de produção for outro. */
export const SITE_URL = 'https://www.bttelhaspvc.com.br';

export const SITE_NAME = 'BT Telhas';

/** Descrição principal do site (SEO e Open Graph). */
export const SITE_DESCRIPTION =
  'Referência em forros, telhas e painéis ripados na Região dos Lagos.';

/** Imagem Open Graph / compartilhamento (JPG — melhor compatibilidade no WhatsApp). */
export const OG_IMAGE_PATH = '/og-image.jpg';
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
/** Incremente após trocar a imagem OG para forçar novo preview no WhatsApp/Facebook. */
export const OG_IMAGE_VERSION = '3';

export function absoluteOgImageUrl(siteUrl: string = SITE_URL): string {
  return `${siteUrl}${OG_IMAGE_PATH}?v=${OG_IMAGE_VERSION}`;
}

/** Número completo com DDI, sem símbolos (WhatsApp / wa.me). */
export const WHATSAPP_NUMBER = '5522997489911';

export const PHONE_DISPLAY = '+55 22 99748-9911';

/** Texto exibido no lugar de preços no catálogo. */
export const PRICE_CONSULT_LABEL = 'Consulta via WhatsApp';

/** Endereço físico (exibição e Google Maps). */
export const ADDRESS_FULL =
  'Estr. dos Búzios, 2 - Quadra 4 - Porto do Carro, Cabo Frio - RJ, 28922-000';

/** Perfil oficial no Google Maps / Google Meu Negócio (link de compartilhamento). */
export const GOOGLE_MAPS_URL = 'https://share.google/ab0QPqbqp0hhhckFC';

/** Dados estruturados (schema.org) — alinhado ao endereço físico. */
export const ADDRESS_SCHEMA = {
  '@type': 'PostalAddress' as const,
  streetAddress: 'Estr. dos Búzios, 2 - Quadra 4 - Porto do Carro',
  addressLocality: 'Cabo Frio',
  addressRegion: 'RJ',
  postalCode: '28922-000',
  addressCountry: 'BR',
};

/** Link público do perfil no Instagram. */
export const SOCIAL_INSTAGRAM_URL = 'https://www.instagram.com/bttelhas/';

/** Link público da página no Facebook. */
export const SOCIAL_FACEBOOK_URL = 'https://www.facebook.com/Bttelhaspvc/?locale=pt_BR';

export const SOCIAL_INSTAGRAM_FALLBACK = 'https://www.instagram.com/';
export const SOCIAL_FACEBOOK_FALLBACK = 'https://www.facebook.com/';

export function instagramHref(): string {
  return SOCIAL_INSTAGRAM_URL.trim() || SOCIAL_INSTAGRAM_FALLBACK;
}

export function facebookHref(): string {
  return SOCIAL_FACEBOOK_URL.trim() || SOCIAL_FACEBOOK_FALLBACK;
}

export function waUrl(text?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  if (!text?.trim()) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
}

/** Limite seguro do tamanho total da URL (navegadores / WhatsApp podem falhar acima disso). */
const WA_ME_URL_MAX_CHARS = 1900;

/**
 * Monta link wa.me com texto pré-preenchido, encurtando a lista se a URL passar do limite.
 */
export function waUrlWithProductLines(intro: string, productNames: string[], outro: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  const buildBody = (names: string[]) => [intro, '', ...names.map((n) => `• ${n}`), '', outro].join('\n');

  let names = productNames.map((n) => (n.length > 350 ? `${n.slice(0, 347)}…` : n));

  while (true) {
    const body = buildBody(names);
    const url = `${base}?text=${encodeURIComponent(body)}`;
    if (url.length <= WA_ME_URL_MAX_CHARS) return url;
    if (names.length > 0) {
      names = names.slice(0, -1);
      continue;
    }
    const fallback = `${intro}\n\n_(Lista muito longa para o link — cite os itens ou envie print.)_\n\n${outro}`;
    return `${base}?text=${encodeURIComponent(fallback)}`;
  }
}
