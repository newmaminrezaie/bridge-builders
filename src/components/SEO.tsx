import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
  jsonLd?: Record<string, unknown>;
}

const SITE_NAME = 'اینتل‌بریجز';
const BASE_URL = 'https://intlbridges.ir';
const DEFAULT_DESC = 'اینتل‌بریجز: تحول دیجیتال کسب‌وکارهای ایرانی برای ورود به بازارهای جهانی. سیستم‌های پرداخت، فروشگاه آنلاین، لجستیک و حضور دیجیتال بین‌المللی.';
const DEFAULT_OG = `${BASE_URL}/og-image.jpg`;

export default function SEO({ title, description, path = '', ogImage, jsonLd }: SEOProps) {
  const fullTitle = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — پل کسب‌وکار ایرانی با دنیا`;
  const desc = description || DEFAULT_DESC;
  const url = `${BASE_URL}${path}`;
  const img = ogImage || DEFAULT_OG;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="fa_IR" />
      <meta property="og:site_name" content={SITE_NAME} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={img} />

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}
