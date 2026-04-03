import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import { fadeUpVariants, useAnimationConfig, delayedVariants } from '@/lib/animations';
import { Target, Lightbulb, Shield, Heart, Globe, Users, Award, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const fadeUp = fadeUpVariants;

const team = [
  { name: 'محمد رضایی', role: 'بنیان‌گذار و مدیرعامل', bio: 'بیش از ۱۵ سال تجربه در تجارت بین‌الملل و تحول دیجیتال' },
  { name: 'سارا احمدی', role: 'مدیر فنی', bio: 'متخصص زیرساخت‌های پرداخت و تجارت الکترونیک بین‌المللی' },
  { name: 'امیر حسینی', role: 'مدیر توسعه کسب‌وکار', bio: 'تجربه گسترده در بازارهای خاورمیانه و اروپا' },
  { name: 'نیلوفر کریمی', role: 'مشاور حقوقی بین‌الملل', bio: 'متخصص GDPR و انطباق قانونی تجارت بین‌الملل' },
];

const values = [
  { icon: <Target size={24} />, title: 'تعالی', desc: 'در هر پروژه، بالاترین استانداردهای کیفیت را دنبال می‌کنیم.' },
  { icon: <Lightbulb size={24} />, title: 'نوآوری', desc: 'از جدیدترین فناوری‌ها و متدولوژی‌ها استفاده می‌کنیم.' },
  { icon: <Shield size={24} />, title: 'اعتماد', desc: 'شفافیت و صداقت، پایه همه روابط ما با مشتریان است.' },
  { icon: <Heart size={24} />, title: 'تعهد', desc: 'تا رسیدن به نتیجه مطلوب، در کنار مشتریان می‌مانیم.' },
];

export default function About() {
  return (
    <div>
      <SEO title="درباره ما" description="تیم اینتل‌بریجز متشکل از متخصصان تجارت بین‌الملل، فناوری و حقوق بین‌الملل. آشنایی با ماموریت و ارزش‌های ما." path="/about" />
      <section className="bg-gradient-hero text-white py-16 md:py-24">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl space-y-4">
            <h1 className="text-3xl font-black md:text-5xl">درباره اینتل‌بریجز</h1>
            <p className="text-white/70 text-lg">
              ما پلی هستیم میان استعداد و توانمندی کسب‌وکارهای ایرانی و فرصت‌های بی‌پایان بازار جهانی.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="space-y-4">
              <h2 className="text-2xl font-black">داستان ما</h2>
              <p className="text-muted-foreground leading-relaxed">
                IntlBridges با یک ایده ساده اما بزرگ متولد شد: کسب‌وکارهای ایرانی استعداد و توانایی رقابت در سطح جهانی را دارند، فقط به زیرساخت‌های مناسب نیاز دارند.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                تیم ما از متخصصان تجارت بین‌الملل، فناوری اطلاعات و حقوق بین‌الملل تشکیل شده که هدف مشترکشان یک چیز است: آماده‌سازی کسب‌وکارهای ایرانی برای ورود موفق به بازار جهانی.
              </p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-8 space-y-6">
                  <h3 className="text-xl font-bold">فرصت پیش رو</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { num: '۴۰۰B$', label: 'ظرفیت اقتصاد ایران' },
                      { num: '۸۵M', label: 'جمعیت مصرف‌کننده' },
                      { num: '۶۰٪', label: 'رشد دیجیتال' },
                      { num: '۱۲۰+', label: 'بازار هدف' },
                    ].map((s, i) => (
                      <div key={i} className="text-center">
                        <div className="text-xl font-black text-primary">{s.num}</div>
                        <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="text-2xl font-black md:text-4xl">تیم ما</h2>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {team.map((t, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { delay: i * 0.1, duration: 0.5 } } }}>
                <Card className="h-full text-center">
                  <CardContent className="p-6 space-y-3">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Users size={24} />
                    </div>
                    <h3 className="font-bold">{t.name}</h3>
                    <p className="text-sm text-primary font-medium">{t.role}</p>
                    <p className="text-xs text-muted-foreground">{t.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="text-2xl font-black md:text-4xl">ارزش‌های ما</h2>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { delay: i * 0.1, duration: 0.5 } } }} className="text-center space-y-3">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {v.icon}
                </div>
                <h3 className="font-bold">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="bg-muted/30 py-16">
        <div className="container text-center space-y-8">
          <h2 className="text-xl font-black">فناوری‌ها و شرکای ما</h2>
          <div className="flex flex-wrap items-center justify-center gap-6 opacity-50">
            {['Stripe', 'PayPal', 'Shopify', 'DHL', 'QuickBooks', 'AWS', 'Cloudflare'].map((name, i) => (
              <div key={i} className="rounded-lg bg-card px-5 py-3 text-sm font-bold border border-border">{name}</div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-hero text-white py-16">
        <div className="container text-center space-y-6">
          <h2 className="text-2xl font-black md:text-3xl">بیایید آینده را بسازیم</h2>
          <Link to="/consultation">
            <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold">
              مشاوره رایگان
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
