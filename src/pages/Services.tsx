import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, ShoppingCart, Truck, Receipt, Globe, Scale } from 'lucide-react';
import { fadeUpVariants, useAnimationConfig, delayedVariants } from '@/lib/animations';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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

export default function Services() {
  return (
    <div>
      <SEO title="خدمات" description="خدمات اینتل‌بریجز: پرداخت بین‌المللی، فروشگاه آنلاین، لجستیک، حسابداری، حضور دیجیتال و انطباق قانونی." path="/services" />
      <section className="bg-gradient-hero text-white py-16 md:py-24">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-2xl space-y-4">
            <h1 className="text-3xl font-black md:text-5xl">خدمات ما</h1>
            <p className="text-white/70 text-lg">
              مجموعه کاملی از خدمات تحول دیجیتال برای ورود کسب‌وکار ایرانی به بازارهای جهانی
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <motion.div key={s.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.6, delay: i * 0.1 } } }}>
                <Link to={`/services/${s.slug}`}>
                  <Card className="group h-full cursor-pointer border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-8 space-y-5">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        {iconMap[s.icon]}
                      </div>
                      <h2 className="text-xl font-bold">{s.title}</h2>
                      <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                      <ul className="space-y-1.5">
                        {s.features.slice(0, 3).map((f, j) => (
                          <li key={j} className="text-xs text-muted-foreground flex items-center gap-2">
                            <div className="h-1 w-1 rounded-full bg-primary shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-center gap-1 text-sm font-medium text-primary pt-2">
                        جزئیات بیشتر
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

      <section className="bg-gradient-hero text-white py-16">
        <div className="container text-center space-y-6">
          <h2 className="text-2xl font-black md:text-3xl">نیاز به راهنمایی دارید؟</h2>
          <p className="text-white/70">مطمئن نیستید کدام سرویس برای کسب‌وکار شما مناسب است؟ مشاوره رایگان بگیرید.</p>
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
