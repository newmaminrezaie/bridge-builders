import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, ShoppingCart, Truck, Receipt, Globe, Scale, CheckCircle2, ChevronDown, Star, Users, Briefcase, TrendingUp } from 'lucide-react';
import { fadeUpVariants, useAnimationConfig, delayedVariants } from '@/lib/animations';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { services, toPersianNum } from '@/lib/persian';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const iconMap: Record<string, React.ReactNode> = {
  CreditCard: <CreditCard size={28} />,
  ShoppingCart: <ShoppingCart size={28} />,
  Truck: <Truck size={28} />,
  Receipt: <Receipt size={28} />,
  Globe: <Globe size={28} />,
  Scale: <Scale size={28} />,
};

const stats = [
  { num: '۴۰۰+', label: 'میلیارد دلار ظرفیت اقتصاد ایران' },
  { num: '۸۵', label: 'میلیون مصرف‌کننده' },
  { num: '۶۰٪', label: 'رشد تجارت الکترونیک' },
  { num: '۱۲۰+', label: 'کشور هدف صادرات' },
];

const steps = [
  { num: '۱', title: 'ارزیابی', desc: 'بررسی وضعیت فعلی کسب‌وکار شما و شناسایی نیازهای بین‌المللی' },
  { num: '۲', title: 'طراحی', desc: 'طراحی نقشه راه سفارشی برای تحول دیجیتال و ورود به بازار جهانی' },
  { num: '۳', title: 'اجرا', desc: 'پیاده‌سازی کامل با تیم متخصص و پشتیبانی مستمر' },
];

const testimonials = [
  { name: 'علی محمدی', role: 'مدیرعامل شرکت صادراتی آرمان', text: 'IntlBridges تمام زیرساخت پرداخت بین‌المللی ما را در کمتر از ۳ هفته راه‌اندازی کرد. حالا از ۱۵ کشور سفارش دریافت می‌کنیم.' },
  { name: 'مریم حسینی', role: 'بنیان‌گذار فروشگاه آنلاین نیلوفر', text: 'فروشگاه ما با استانداردهای جهانی بازطراحی شد و فروش بین‌المللی ما ۳ برابر شد. تجربه‌ای فوق‌العاده بود.' },
  { name: 'رضا کریمی', role: 'مدیر مالی گروه صنعتی البرز', text: 'سیستم حسابداری چند ارزی و صورتحساب بین‌المللی، کار ما را به شدت ساده کرد. تیم حرفه‌ای و قابل اعتماد.' },
];

const faqs = [
  { q: 'آیا خدمات شما فقط برای بعد از رفع تحریم‌ها است؟', a: 'خیر. بسیاری از خدمات ما مثل بهینه‌سازی دیجیتال، طراحی فروشگاه و انطباق قانونی الان هم قابل اجرا هستند. هدف ما این است که کسب‌وکار شما آماده باشد.' },
  { q: 'هزینه خدمات چقدر است؟', a: 'بسته به نوع و حجم خدمات متفاوت است. ما یک مشاوره رایگان ۳۰ دقیقه‌ای ارائه می‌دهیم تا نیازهای شما را بررسی کنیم و پیشنهاد قیمت دهیم.' },
  { q: 'چه مدت طول می‌کشد تا پروژه تکمیل شود؟', a: 'بسته به نوع پروژه، بین ۲ تا ۸ هفته متغیر است. در جلسه مشاوره، زمان‌بندی دقیق ارائه می‌دهیم.' },
  { q: 'آیا بعد از اتمام پروژه پشتیبانی دارید؟', a: 'بله. تمام پکیج‌ها شامل دوره پشتیبانی رایگان هستند و بعد از آن، قراردادهای پشتیبانی مداوم ارائه می‌دهیم.' },
  { q: 'آیا می‌توانم فقط یک سرویس را انتخاب کنم؟', a: 'بله. هر سرویس مستقل قابل ارائه است، اما پکیج‌های ترکیبی تخفیف ویژه دارند.' },
];

const fadeUp = fadeUpVariants;

export default function Index() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { initialState } = useAnimationConfig();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;
    setLoading(true);
    const { error } = await supabase.from('leads').insert({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      source: 'homepage-cta',
    });
    setLoading(false);
    if (error) {
      toast({ title: 'خطا', description: 'مشکلی پیش آمد. لطفاً دوباره تلاش کنید.', variant: 'destructive' });
    } else {
      toast({ title: 'موفق', description: 'پیام شما با موفقیت ارسال شد. به زودی با شما تماس می‌گیریم.' });
      setFormData({ name: '', email: '', phone: '', message: '' });
    }
  };

  return (
    <div>
      <SEO
        path="/"
        jsonLd={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Organization',
              name: 'اینتل‌بریجز',
              alternateName: 'IntlBridges',
              url: 'https://intlbridges.ir',
              logo: 'https://intlbridges.ir/og-image.jpg',
              description: 'تحول دیجیتال کسب‌وکارهای ایرانی برای ورود به بازارهای جهانی',
              contactPoint: { '@type': 'ContactPoint', telephone: '+989150616788', contactType: 'customer service', availableLanguage: ['fa', 'en'] },
              sameAs: ['https://t.me/maminre']
            },
            {
              '@type': 'WebSite',
              name: 'اینتل‌بریجز',
              url: 'https://intlbridges.ir',
              inLanguage: 'fa'
            }
          ]
        }}
      />
      <section className="bg-gradient-hero text-white py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(215_60%_25%/0.5),transparent_70%)]" />
        <div className="container relative z-10">
          <motion.div initial={initialState} animate="visible" variants={fadeUp} className="max-w-3xl space-y-6">
            <div className="inline-block rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm border border-white/10">
              ایران در آستانه بزرگترین تحول اقتصادی تاریخ خود است
            </div>
            <h1 className="text-3xl font-black leading-tight md:text-5xl lg:text-6xl">
              کسب‌وکار ایرانی‌تان را
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-secondary to-gold">جهانی کنید</span>
            </h1>
            <p className="text-lg text-white/70 md:text-xl max-w-2xl">
              از سیستم‌های پرداخت بین‌المللی تا فروشگاه آنلاین، لجستیک و حضور دیجیتال — همه چیزی که برای رقابت در بازار جهانی نیاز دارید.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/services">
                <Button size="lg" variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm">
                  خدمات ما
                  <ArrowLeft size={18} className="mr-2" />
                </Button>
              </Link>
              <Link to="/consultation">
                <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold">
                  مشاوره رایگان
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border">
        <div className="container py-10">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div key={i} initial={initialState} whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center">
                <div className="text-2xl font-black text-primary md:text-3xl">{s.num}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-24">
        <div className="container">
          <motion.div initial={initialState} whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="text-2xl font-black md:text-4xl">خدمات ما</h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">هر آنچه برای تبدیل کسب‌وکار ایرانی به یک بازیگر جهانی نیاز دارید</p>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <motion.div key={s.id} initial={initialState} whileInView="visible" viewport={{ once: true }} variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.6, delay: i * 0.1 } } }}>
                <Link to={`/services/${s.slug}`}>
                  <Card className="group h-full cursor-pointer border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        {iconMap[s.icon]}
                      </div>
                      <h3 className="text-lg font-bold">{s.shortTitle}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                      <div className="flex items-center gap-1 text-sm font-medium text-primary">
                        بیشتر بخوانید
                        <ArrowLeft size={14} />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Now */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container">
          <motion.div initial={initialState} whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="text-2xl font-black md:text-4xl">چرا الان؟</h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              پنجره فرصت در حال بسته شدن است. کسب‌وکارهایی که زودتر آماده شوند، سهم بیشتری از بازار جهانی خواهند داشت.
            </p>
          </motion.div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { icon: <TrendingUp size={24} />, title: 'رشد انفجاری تقاضا', desc: 'با رفع تحریم‌ها، تقاضای بین‌المللی برای محصولات و خدمات ایرانی چندین برابر خواهد شد.' },
              { icon: <Users size={24} />, title: 'رقابت زودهنگام', desc: 'رقبای شما الان در حال آماده‌سازی هستند. هر روز تأخیر، سهم بازار شما را کاهش می‌دهد.' },
              { icon: <Briefcase size={24} />, title: 'استانداردهای جهانی', desc: 'بازارهای بین‌المللی استانداردهای مشخصی دارند. آمادگی از الان، موفقیت فردا را تضمین می‌کند.' },
            ].map((item, i) => (
              <motion.div key={i} initial={initialState} whileInView="visible" viewport={{ once: true }} variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.6, delay: i * 0.15 } } }}>
                <Card className="h-full border-border/50">
                  <CardContent className="p-6 space-y-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">{item.icon}</div>
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-24">
        <div className="container">
          <motion.div initial={initialState} whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="text-2xl font-black md:text-4xl">چگونه کار می‌کنیم؟</h2>
          </motion.div>
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <motion.div key={i} initial={initialState} whileInView="visible" viewport={{ once: true }} variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.6, delay: i * 0.2 } } }} className="text-center space-y-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary text-white text-2xl font-black">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Transformation */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container">
          <motion.div initial={initialState} whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="text-2xl font-black md:text-4xl">تحول کسب‌وکار شما</h2>
          </motion.div>
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="border-destructive/20 bg-destructive/5">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-bold text-destructive">قبل از IntlBridges</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {['فقط بازار داخلی', 'پرداخت فقط ریالی', 'ارسال محدود به ایران', 'حسابداری تک ارزی', 'وب‌سایت فقط فارسی', 'بدون انطباق قانونی'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2"><X className="h-4 w-4 text-destructive shrink-0" />{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-bold text-primary">بعد از IntlBridges</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {['دسترسی به بازار جهانی', 'پرداخت از ۱۲۰+ کشور', 'ارسال بین‌المللی با DHL/FedEx', 'حسابداری چند ارزی', 'وب‌سایت چندزبانه بهینه', 'انطباق کامل GDPR'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" />{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trusted by */}
      <section className="py-16">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground mb-8">مورد اعتماد کسب‌وکارهای پیشرو ایران</p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-40">
            {['آرمان تجارت', 'فناوران البرز', 'صنایع نوین', 'تجارت پارس', 'دیجی‌صنعت'].map((name, i) => (
              <div key={i} className="rounded-lg bg-muted px-6 py-3 text-sm font-bold">{name}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container">
          <motion.div initial={initialState} whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="text-2xl font-black md:text-4xl">نظرات مشتریان</h2>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={initialState} whileInView="visible" viewport={{ once: true }} variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.6, delay: i * 0.15 } } }}>
                <Card className="h-full">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex gap-1">{[...Array(5)].map((_, j) => <Star key={j} size={16} className="fill-secondary text-secondary" />)}</div>
                    <p className="text-sm leading-relaxed">«{t.text}»</p>
                    <div>
                      <div className="font-bold text-sm">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24">
        <div className="container max-w-2xl">
          <motion.div initial={initialState} whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="text-2xl font-black md:text-4xl">سوالات متداول</h2>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-xl border border-border bg-card overflow-hidden">
                <button className="flex w-full items-center justify-between p-4 text-right font-medium hover:bg-muted/50 transition-colors" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {faq.q}
                  <ChevronDown size={18} className={`shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="border-t border-border px-4 py-3 text-sm text-muted-foreground leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-hero text-white py-16 md:py-24">
        <div className="container">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="space-y-6">
              <h2 className="text-2xl font-black md:text-4xl">آماده‌اید کسب‌وکارتان را جهانی کنید؟</h2>
              <p className="text-white/70">
                فرم را پر کنید تا تیم ما در کمتر از ۲۴ ساعت با شما تماس بگیرد. مشاوره اولیه کاملاً رایگان است.
              </p>
              <div className="flex items-center gap-4 text-sm text-white/50">
                <div className="flex items-center gap-1"><CheckCircle2 size={16} /> بدون تعهد</div>
                <div className="flex items-center gap-1"><CheckCircle2 size={16} /> پاسخ در ۲۴ ساعت</div>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm">
              <Input placeholder="نام و نام خانوادگی" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="bg-white/10 border-white/10 text-white placeholder:text-white/40" required />
              <Input placeholder="ایمیل" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="bg-white/10 border-white/10 text-white placeholder:text-white/40" required />
              <Input placeholder="شماره تماس (۰۹۱۲...)" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="bg-white/10 border-white/10 text-white placeholder:text-white/40" />
              <Textarea placeholder="پیام شما" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="bg-white/10 border-white/10 text-white placeholder:text-white/40" rows={3} />
              <Button type="submit" disabled={loading} className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold text-base py-6">
                {loading ? 'در حال ارسال...' : 'ارسال درخواست مشاوره'}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

function X({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
