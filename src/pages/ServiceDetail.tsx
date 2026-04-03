import { useParams, Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Clock, Users, CreditCard, ShoppingCart, Truck, Receipt, Globe, Scale } from 'lucide-react';
import { fadeUpVariants, useAnimationConfig, delayedVariants } from '@/lib/animations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { services } from '@/lib/persian';

const iconMap: Record<string, React.ReactNode> = {
  CreditCard: <CreditCard size={32} />,
  ShoppingCart: <ShoppingCart size={32} />,
  Truck: <Truck size={32} />,
  Receipt: <Receipt size={32} />,
  Globe: <Globe size={32} />,
  Scale: <Scale size={32} />,
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="container py-24 text-center space-y-4">
        <h1 className="text-2xl font-bold">سرویس یافت نشد</h1>
        <Link to="/services"><Button>بازگشت به خدمات</Button></Link>
      </div>
    );
  }

  const relatedServices = services.filter((s) => s.id !== service.id).slice(0, 3);

  return (
    <div>
      <SEO title={service.title} description={service.description} path={`/services/${service.slug}`} />
      <section className="bg-gradient-hero text-white py-16 md:py-24">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl space-y-4">
            <Link to="/services" className="inline-flex items-center gap-1 text-white/60 hover:text-white text-sm transition-colors">
              <ArrowLeft size={14} className="rotate-180" />
              بازگشت به خدمات
            </Link>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white">
              {iconMap[service.icon]}
            </div>
            <h1 className="text-3xl font-black md:text-5xl">{service.title}</h1>
            <p className="text-white/70 text-lg">{service.description}</p>
            <Link to="/consultation">
              <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold mt-2">
                درخواست مشاوره رایگان
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-black mb-6">شامل چه خدماتی است؟</h2>
              <ul className="space-y-3">
                {service.features.map((f, i) => (
                  <motion.li key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { delay: i * 0.1, duration: 0.4 } } }} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-sm">{f}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2"><Users size={18} /> چه کسانی نیاز دارند؟</h3>
                <ul className="space-y-2">
                  {service.targetAudience.map((t, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0" />{t}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 flex items-center gap-2"><Clock size={18} /> مدت زمان اجرا</h3>
                <p className="text-sm text-muted-foreground">{service.timeline}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container">
          <h2 className="text-2xl font-black text-center mb-12">پکیج‌های قیمت</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {service.packages.map((pkg, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { delay: i * 0.15, duration: 0.5 } } }}>
                <Card className={`h-full ${i === 1 ? 'border-primary shadow-lg relative' : 'border-border/50'}`}>
                  {i === 1 && <div className="absolute -top-3 right-6 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">پیشنهاد ویژه</div>}
                  <CardHeader>
                    <CardTitle className="text-lg">{pkg.name}</CardTitle>
                    <div className="text-2xl font-black text-primary mt-2">{pkg.price}</div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {pkg.features.map((f, j) => (
                        <li key={j} className="text-sm flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />{f}
                        </li>
                      ))}
                    </ul>
                    <Link to="/consultation">
                      <Button className={`w-full ${i === 1 ? 'bg-gradient-primary' : ''}`} variant={i === 1 ? 'default' : 'outline'}>
                        شروع کنید
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-2xl font-black mb-8">خدمات مرتبط</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {relatedServices.map((s) => (
              <Link key={s.id} to={`/services/${s.slug}`}>
                <Card className="group cursor-pointer hover:border-primary/30 hover:shadow-lg transition-all">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                      {iconMap[s.icon]}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm">{s.shortTitle}</h3>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{s.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-hero text-white py-16">
        <div className="container text-center space-y-6">
          <h2 className="text-2xl font-black md:text-3xl">آماده شروع هستید؟</h2>
          <p className="text-white/70">مشاوره رایگان ۳۰ دقیقه‌ای دریافت کنید</p>
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
