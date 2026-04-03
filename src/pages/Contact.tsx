import { useState } from 'react';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';
import { Send, MessageCircle, MapPin, Clock, Phone, Mail } from 'lucide-react';
import { fadeUpVariants, useAnimationConfig } from '@/lib/animations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { services } from '@/lib/persian';
import { sendEmail } from '@/lib/send-email';

const businessTypes = ['تولیدی', 'بازرگانی', 'خدماتی', 'فناوری اطلاعات', 'خرده‌فروشی', 'صنایع دستی', 'سایر'];

const fadeUp = fadeUpVariants;

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', businessType: '', message: '' });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { initialState } = useAnimationConfig();

  const toggleService = (id: string) => {
    setSelectedServices((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    setLoading(true);
    const { error } = await supabase.from('leads').insert({
      name: form.name,
      email: form.email,
      phone: form.phone,
      business_type: form.businessType,
      services_needed: selectedServices,
      message: form.message,
      source: 'contact-page',
    });
    setLoading(false);
    if (error) {
      toast({ title: 'خطا', description: 'مشکلی پیش آمد. لطفاً دوباره تلاش کنید.', variant: 'destructive' });
    } else {
      toast({ title: 'موفق', description: 'پیام شما با موفقیت ارسال شد. در کمتر از ۲۴ ساعت پاسخ می‌دهیم.' });
      const emailData = {
        name: form.name, email: form.email, phone: form.phone,
        businessType: form.businessType,
        services: selectedServices.map(id => services.find(s => s.id === id)?.shortTitle || id).join('، '),
        message: form.message,
      };
      sendEmail({ type: 'contact-admin', to: 'info@intlbridges.ir', data: emailData });
      sendEmail({ type: 'contact-confirm', to: form.email, data: emailData });
      setForm({ name: '', email: '', phone: '', businessType: '', message: '' });
      setSelectedServices([]);
    }
  };

  return (
    <div>
      <SEO title="تماس با ما" description="با اینتل‌بریجز تماس بگیرید. مشاوره رایگان، واتساپ، تلگرام و فرم تماس آنلاین." path="/contact" />
      <section className="bg-gradient-hero text-white py-16 md:py-24">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-2xl space-y-4">
            <h1 className="text-3xl font-black md:text-5xl">تماس با ما</h1>
            <p className="text-white/70 text-lg">در کمتر از ۲۴ ساعت پاسخ می‌دهیم</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
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
                  <div className="space-y-2">
                    <label className="text-sm font-medium">نوع کسب‌وکار</label>
                    <Select value={form.businessType} onValueChange={(v) => setForm({ ...form, businessType: v })}>
                      <SelectTrigger><SelectValue placeholder="انتخاب کنید" /></SelectTrigger>
                      <SelectContent>
                        {businessTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">خدمات مورد نیاز</label>
                  <div className="grid gap-2 md:grid-cols-2">
                    {services.map((s) => (
                      <label key={s.id} className="flex items-center gap-2 cursor-pointer rounded-lg border border-border p-3 hover:bg-muted/50 transition-colors">
                        <Checkbox checked={selectedServices.includes(s.id)} onCheckedChange={() => toggleService(s.id)} />
                        <span className="text-sm">{s.shortTitle}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">پیام</label>
                  <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4} placeholder="در مورد نیازهای کسب‌وکارتان بنویسید..." />
                </div>

                <Button type="submit" disabled={loading} className="bg-gradient-primary text-base py-6 px-8">
                  {loading ? 'در حال ارسال...' : 'ارسال پیام'}
                </Button>
              </form>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-bold text-lg">راه‌های ارتباط</h3>
                  <div className="space-y-3 text-sm">
                    <a href="https://wa.me/qr/ERDSPOB6INRHP1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                       <MessageCircle size={18} /> واتساپ: ۰۹۱۵۰۶۱۶۷۸۸
                     </a>
                     <a href="https://t.me/maminre" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                       <Send size={18} /> تلگرام: @maminre
                     </a>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Mail size={18} /> info@intlbridges.ir
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Phone size={18} /> ۰۹۱۵۰۶۱۶۷۸۸
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-3">
                  <h3 className="font-bold flex items-center gap-2"><Clock size={18} /> زمان پاسخگویی</h3>
                  <p className="text-sm text-muted-foreground">شنبه تا پنجشنبه، ۹ صبح تا ۶ عصر</p>
                  <p className="text-sm text-muted-foreground">پاسخ در کمتر از ۲۴ ساعت</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-3">
                  <h3 className="font-bold flex items-center gap-2"><MapPin size={18} /> آدرس دفتر</h3>
                  <p className="text-sm text-muted-foreground">تهران، خیابان ولیعصر، برج تجاری آرمان، طبقه ۱۲</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
