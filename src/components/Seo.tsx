import { Helmet } from 'react-helmet-async';
import { SITE_NAME, SITE_URL, OG_IMAGE_WIDTH, OG_IMAGE_HEIGHT, absoluteOgImageUrl } from '../site';

type SeoProps = {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
  /** Não define link canônico (útil em páginas de erro). */
  omitCanonical?: boolean;
  /** Caminho absoluto no site para og:image, ex: /og-image.jpg */
  ogImagePath?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
};

export function Seo({
  title,
  description,
  path = '',
  noIndex,
  omitCanonical,
  ogImagePath,
  ogImageWidth = OG_IMAGE_WIDTH,
  ogImageHeight = OG_IMAGE_HEIGHT,
}: SeoProps) {
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
  const url = `${SITE_URL}${path}`;
  const ogImage =
    ogImagePath?.startsWith('http') ? ogImagePath : ogImagePath ? `${SITE_URL}${ogImagePath}` : absoluteOgImageUrl();

  return (
    <Helmet prioritizeSeoTags>
      <html lang="pt-BR" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {!omitCanonical ? <link rel="canonical" href={url} /> : null}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content={String(ogImageWidth)} />
      <meta property="og:image:height" content={String(ogImageHeight)} />
      <meta property="og:image:alt" content={SITE_NAME} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      {noIndex ? <meta name="robots" content="noindex, nofollow" /> : <meta name="robots" content="index, follow" />}
    </Helmet>
  );
}
