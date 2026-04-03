import { useState } from 'react';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';
import { CheckCircle2, Calendar, Clock, Video, FileText, Shield } from 'lucide-react';
import { fadeUpVariants, useAnimationConfig } from '@/lib/animations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { sendEmail } from '@/lib/send-email';

const fadeUp = fadeUpVariants;

const benefits = [
  { icon: <Video size={20} />, text: 'تماس تصویری ۳۰ دقیقه‌ای' },
  { icon: <FileText size={20} />, text: 'ارزیابی کامل کسب‌وکار' },
  { icon: <Calendar size={20} />, text: 'نقشه راه سفارشی' },
  { icon: <Shield size={20} />, text: 'بدون هیچ تعهدی' },
];

const checklist = [
  'اطلاعات کلی کسب‌وکار (نوع فعالیت، محصولات/خدمات)',
  'اهداف بین‌المللی‌تان چیست؟',
  'بازارهای هدف کدامند؟',
  'زیرساخت‌های فعلی دیجیتال (وب‌سایت، فروشگاه آنلاین و...)',
  'بودجه تقریبی و زمان‌بندی مورد نظر',
];

export default function Consultation() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', time: '', description: '' });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { initialState } = useAnimationConfig();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    setLoading(true);
    const { error } = await supabase.from('consultations').insert({
      name: form.name,
      email: form.email,
      phone: form.phone,
      preferred_date: form.date || null,
      preferred_time: form.time || null,
      business_description: form.description,
    });
    setLoading(false);
    if (error) {
      toast({ title: 'خطا', description: 'مشکلی پیش آمد. لطفاً دوباره تلاش کنید.', variant: 'destructive' });
    } else {
      toast({ title: 'موفق', description: 'درخواست مشاوره شما ثبت شد. به زودی برای هماهنگی تماس می‌گیریم.' });
      const emailData = { name: form.name, email: form.email, phone: form.phone, date: form.date, time: form.time, description: form.description };
      sendEmail({ type: 'consultation-admin', to: 'info@intlbridges.ir', data: emailData });
      sendEmail({ type: 'consultation-confirm', to: form.email, data: emailData });
      setForm({ name: '', email: '', phone: '', date: '', time: '', description: '' });
    }
  };

  return (
    <div>
      <SEO title="مشاوره رایگان" description="رزرو مشاوره رایگان ۳۰ دقیقه‌ای با کارشناسان اینتل‌بریجز. ارزیابی کسب‌وکار و نقشه راه ورود به بازار جهانی." path="/consultation" />
      <section className="bg-gradient-hero text-white py-16 md:py-24">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl space-y-4">
            <h1 className="text-3xl font-black md:text-5xl">مشاوره رایگان</h1>
            <p className="text-white/70 text-lg">
              ۳۰ دقیقه مشاوره تخصصی رایگان — بدون تعهد — فقط برای شناخت نیازهای کسب‌وکار شما
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-black mb-4">در مشاوره چه دریافت می‌کنید؟</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {benefits.map((b, i) => (
                    <Card key={i} className="border-border/50">
                      <CardContent className="p-4 flex items-center gap-3">
                        <div className="text-primary">{b.icon}</div>
                        <span className="text-sm font-medium">{b.text}</span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Trust */}
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-black text-primary">۲۵۰+</div>
                      <div className="text-xs text-muted-foreground">مشاوره انجام شده</div>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-primary">۹۸٪</div>
                      <div className="text-xs text-muted-foreground">رضایت مشتریان</div>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-primary">۴۵+</div>
                      <div className="text-xs text-muted-foreground">پروژه فعال</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Checklist */}
              <div>
                <h3 className="text-lg font-bold mb-3">قبل از مشاوره، آماده داشته باشید:</h3>
                <ul className="space-y-2">
                  {checklist.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Form */}
            <Card>
              <CardContent className="p-6 md:p-8">
                <h3 className="text-xl font-bold mb-6">رزرو مشاوره</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">نام و نام خانوادگی *</label>
                    <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="نام شما" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">ایمیل *</label>
                    <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required placeholder="email@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">شماره تماس</label>
                    <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="۰۹۱۲۰۰۰۰۰۰۰" />
                  </div>
                  <div className="grid gap-4 grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">تاریخ ترجیحی</label>
                      <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">ساعت ترجیحی</label>
                      <Input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">درباره کسب‌وکارتان بگویید</label>
                    <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} placeholder="نوع فعالیت، محصولات/خدمات و اهداف بین‌المللی..." />
                  </div>
                  <Button type="submit" disabled={loading} className="w-full bg-gradient-primary text-base py-6">
                    {loading ? 'در حال ثبت...' : 'ثبت درخواست مشاوره'}
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">بعد از ثبت، تیم ما برای هماهنگی نهایی با شما تماس می‌گیرد.</p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
