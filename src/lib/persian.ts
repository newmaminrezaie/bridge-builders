// Persian numeral conversion
const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

export function toPersianNum(num: number | string): string {
  return String(num).replace(/\d/g, (d) => persianDigits[parseInt(d)]);
}

// Format price in Persian
export function formatPricePersian(price: number): string {
  const formatted = price.toLocaleString('fa-IR');
  return formatted;
}

// Service data
export interface ServiceInfo {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
  features: string[];
  targetAudience: string[];
  timeline: string;
  packages: {
    name: string;
    price: string;
    features: string[];
  }[];
}

export const services: ServiceInfo[] = [
  {
    id: 'payment',
    slug: 'payment',
    title: 'سیستم‌های پرداخت بین‌المللی',
    shortTitle: 'پرداخت بین‌المللی',
    description: 'اتصال به Stripe، PayPal، Wise، SWIFT و درگاه‌های رمزارز. دریافت پرداخت از سراسر جهان. صدور صورتحساب چند ارزی.',
    icon: 'CreditCard',
    features: [
      'اتصال به Stripe و PayPal',
      'پرداخت‌های SWIFT بین‌المللی',
      'درگاه رمزارز',
      'صورتحساب چند ارزی',
      'سیستم POS بین‌المللی',
      'گزارشات مالی تحلیلی',
    ],
    targetAudience: ['فروشگاه‌های آنلاین', 'شرکت‌های صادراتی', 'فریلنسرها و مشاوران', 'استارتاپ‌ها'],
    timeline: '۲ تا ۴ هفته',
    packages: [
      { name: 'استارتر', price: '۱۵,۰۰۰,۰۰۰ تومان', features: ['یک درگاه پرداخت', 'صورتحساب تک ارزی', 'پشتیبانی ایمیلی'] },
      { name: 'حرفه‌ای', price: '۳۵,۰۰۰,۰۰۰ تومان', features: ['سه درگاه پرداخت', 'صورتحساب چند ارزی', 'پشتیبانی اختصاصی', 'گزارشات پیشرفته'] },
      { name: 'سازمانی', price: 'تماس بگیرید', features: ['تمام درگاه‌ها', 'سفارشی‌سازی کامل', 'مدیر پروژه اختصاصی', 'SLA تضمینی'] },
    ],
  },
  {
    id: 'ecommerce',
    slug: 'ecommerce',
    title: 'فروشگاه آنلاین جهانی',
    shortTitle: 'فروشگاه آنلاین',
    description: 'ساخت یا ارتقای فروشگاه آنلاین با Shopify، WooCommerce یا سفارشی. لیست محصولات چندزبانه، چک‌اوت بین‌المللی.',
    icon: 'ShoppingCart',
    features: [
      'طراحی فروشگاه Shopify/WooCommerce',
      'لیست محصولات چندزبانه',
      'چک‌اوت بین‌المللی',
      'محاسبه مالیات هر کشور',
      'بازیابی سبد خرید رها شده',
      'اتصال به مارکت‌پلیس‌های جهانی',
    ],
    targetAudience: ['تولیدکنندگان', 'برندهای ایرانی', 'صنایع دستی و هنری', 'صادرکنندگان'],
    timeline: '۴ تا ۸ هفته',
    packages: [
      { name: 'استارتر', price: '۲۰,۰۰۰,۰۰۰ تومان', features: ['فروشگاه تک زبانه', 'تا ۱۰۰ محصول', 'پشتیبانی ایمیلی'] },
      { name: 'حرفه‌ای', price: '۵۰,۰۰۰,۰۰۰ تومان', features: ['فروشگاه چندزبانه', 'محصولات نامحدود', 'بازیابی سبد خرید', 'SEO پیشرفته'] },
      { name: 'سازمانی', price: 'تماس بگیرید', features: ['سفارشی‌سازی کامل', 'اتصال به ERP', 'مدیر پروژه', 'SLA تضمینی'] },
    ],
  },
  {
    id: 'shipping',
    slug: 'shipping',
    title: 'لجستیک و حمل‌ونقل بین‌المللی',
    shortTitle: 'لجستیک بین‌المللی',
    description: 'اتصال به DHL، FedEx، UPS، Aramex. نرخ‌های ارسال لحظه‌ای، مستندات گمرکی، پیگیری مرسولات.',
    icon: 'Truck',
    features: [
      'اتصال به API شرکت‌های حمل‌ونقل',
      'نرخ‌های ارسال لحظه‌ای',
      'مستندات گمرکی خودکار',
      'پیگیری مرسولات آنلاین',
      'مدیریت مرجوعی',
      'اتصال به انبارها',
    ],
    targetAudience: ['صادرکنندگان', 'فروشگاه‌های آنلاین', 'شرکت‌های تجاری', 'تولیدکنندگان'],
    timeline: '۳ تا ۶ هفته',
    packages: [
      { name: 'استارتر', price: '۱۸,۰۰۰,۰۰۰ تومان', features: ['دو شرکت حمل‌ونقل', 'پیگیری ساده', 'پشتیبانی ایمیلی'] },
      { name: 'حرفه‌ای', price: '۴۰,۰۰۰,۰۰۰ تومان', features: ['تمام شرکت‌های حمل‌ونقل', 'مستندات گمرکی', 'مدیریت مرجوعی', 'داشبورد تحلیلی'] },
      { name: 'سازمانی', price: 'تماس بگیرید', features: ['سفارشی‌سازی کامل', 'اتصال به ERP', 'انبارداری', 'SLA تضمینی'] },
    ],
  },
  {
    id: 'billing',
    slug: 'billing',
    title: 'صورت‌حساب و حسابداری بین‌المللی',
    shortTitle: 'حسابداری بین‌المللی',
    description: 'سیستم صدور صورتحساب بین‌المللی. حسابداری چند ارزی. انطباق مالیاتی VAT و GST.',
    icon: 'Receipt',
    features: [
      'صدور صورتحساب بین‌المللی',
      'حسابداری چند ارزی',
      'انطباق مالیاتی VAT/GST',
      'اتصال به QuickBooks/Xero/Zoho',
      'سیستم اشتراکی',
      'گزارشات مالی پیشرفته',
    ],
    targetAudience: ['شرکت‌های خدماتی', 'SaaS ایرانی', 'مشاوران', 'فریلنسرها'],
    timeline: '۲ تا ۵ هفته',
    packages: [
      { name: 'استارتر', price: '۱۲,۰۰۰,۰۰۰ تومان', features: ['صدور صورتحساب ساده', 'یک ارز', 'پشتیبانی ایمیلی'] },
      { name: 'حرفه‌ای', price: '۳۰,۰۰۰,۰۰۰ تومان', features: ['صورتحساب چند ارزی', 'انطباق مالیاتی', 'اتصال حسابداری', 'گزارشات پیشرفته'] },
      { name: 'سازمانی', price: 'تماس بگیرید', features: ['سفارشی‌سازی کامل', 'ERP اتصال', 'مدیر پروژه', 'SLA تضمینی'] },
    ],
  },
  {
    id: 'digital',
    slug: 'digital',
    title: 'حضور دیجیتال بین‌المللی',
    shortTitle: 'حضور دیجیتال',
    description: 'بازطراحی وب‌سایت با استانداردهای بین‌المللی. سئوی چندزبانه. Google Business. شبکه‌های اجتماعی بین‌المللی.',
    icon: 'Globe',
    features: [
      'بازطراحی وب‌سایت استاندارد جهانی',
      'سئوی چندزبانه',
      'Google Business Profile',
      'شبکه‌های اجتماعی بین‌المللی',
      'مهاجرت دامنه و هاستینگ',
      'SSL، امنیت و GDPR',
    ],
    targetAudience: ['تمام کسب‌وکارها', 'برندهای ایرانی', 'استارتاپ‌ها', 'شرکت‌های صادراتی'],
    timeline: '۳ تا ۶ هفته',
    packages: [
      { name: 'استارتر', price: '۱۰,۰۰۰,۰۰۰ تومان', features: ['بازطراحی وب‌سایت', 'سئوی پایه', 'پشتیبانی ایمیلی'] },
      { name: 'حرفه‌ای', price: '۲۸,۰۰۰,۰۰۰ تومان', features: ['وب‌سایت چندزبانه', 'سئوی پیشرفته', 'Google Business', 'شبکه‌های اجتماعی'] },
      { name: 'سازمانی', price: 'تماس بگیرید', features: ['سفارشی‌سازی کامل', 'استراتژی دیجیتال', 'مدیر پروژه', 'SLA تضمینی'] },
    ],
  },
  {
    id: 'legal',
    slug: 'legal',
    title: 'انطباق قانونی و مالی بین‌المللی',
    shortTitle: 'انطباق قانونی',
    description: 'GDPR، ثبت شرکت بین‌المللی، ضد پولشویی، شرایط استفاده چندزبانه، راهنمای IBAN و SWIFT.',
    icon: 'Scale',
    features: [
      'انطباق با GDPR',
      'راهنمای ثبت شرکت بین‌المللی',
      'انطباق ضد پولشویی',
      'شرایط استفاده چندزبانه',
      'راهنمای IBAN و SWIFT',
      'مشاوره حقوقی تجارت بین‌الملل',
    ],
    targetAudience: ['تمام کسب‌وکارها', 'شرکت‌های صادراتی', 'فین‌تک‌ها', 'استارتاپ‌ها'],
    timeline: '۲ تا ۴ هفته',
    packages: [
      { name: 'استارتر', price: '۸,۰۰۰,۰۰۰ تومان', features: ['بررسی انطباق پایه', 'شرایط استفاده', 'پشتیبانی ایمیلی'] },
      { name: 'حرفه‌ای', price: '۲۵,۰۰۰,۰۰۰ تومان', features: ['انطباق کامل GDPR', 'مشاوره حقوقی', 'مستندات چندزبانه', 'پشتیبانی اختصاصی'] },
      { name: 'سازمانی', price: 'تماس بگیرید', features: ['انطباق کامل', 'وکیل اختصاصی', 'نظارت مستمر', 'SLA تضمینی'] },
    ],
  },
];

export const blogCategories = [
  { id: 'payment', label: 'پرداخت' },
  { id: 'ecommerce', label: 'تجارت الکترونیک' },
  { id: 'shipping', label: 'حمل‌ونقل' },
  { id: 'digital', label: 'دیجیتال' },
  { id: 'legal', label: 'قانونی' },
];
