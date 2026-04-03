import { Helmet } from 'react-helmet-async';
import { useSiteSettings } from '@/hooks/use-site-settings';

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
  jsonLd?: Record<string, unknown>;
}

const FALLBACK_NAME = 'اینتل‌بریجز';
const FALLBACK_TAGLINE = 'پل کسب‌وکار ایرانی با دنیا';
const BASE_URL = 'https://intlbridges.ir';
const FALLBACK_DESC = 'اینتل‌بریجز: تحول دیجیتال کسب‌وکارهای ایرانی برای ورود به بازارهای جهانی. سیستم‌های پرداخت، فروشگاه آنلاین، لجستیک و حضور دیجیتال بین‌المللی.';
const FALLBACK_OG = `${BASE_URL}/og-image.jpg`;

export default function SEO({ title, description, path = '', ogImage, jsonLd }: SEOProps) {
  const { settings } = useSiteSettings();

  const siteName = settings.site_name || FALLBACK_NAME;
  const tagline = settings.site_tagline || FALLBACK_TAGLINE;
  const defaultDesc = settings.site_description || FALLBACK_DESC;
  const defaultOg = settings.og_image_url || FALLBACK_OG;
  const keywords = settings.meta_keywords || '';

  const fullTitle = title ? `${title} — ${siteName}` : `${siteName} — ${tagline}`;
  const desc = description || defaultDesc;
  const url = `${BASE_URL}${path}`;
  const img = ogImage || defaultOg;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      {keywords && <meta name="keywords" content={keywords} />}

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="fa_IR" />
      <meta property="og:site_name" content={siteName} />

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
