import { useState, useEffect } from 'react';
import SEO from '@/components/SEO';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Tag } from 'lucide-react';
import { fadeUpVariants, useAnimationConfig, delayedVariants } from '@/lib/animations';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

import { useToast } from '@/hooks/use-toast';
import { sendEmail } from '@/lib/send-email';

interface Article {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  excerpt: string | null;
  cover_image: string | null;
  published_at: string | null;
  created_at: string;
}

const fadeUp = fadeUpVariants;

export default function Blog() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<{ slug: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [email, setEmail] = useState('');
  const [subLoading, setSubLoading] = useState(false);
  const { toast } = useToast();
  const { initialState } = useAnimationConfig();

  useEffect(() => {
    supabase.from('blog_categories').select('slug, name').order('sort_order').then(({ data }) => setCategories(data || []));
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [category]);

  const fetchArticles = async () => {
    setLoading(true);
    let query = supabase.from('blog_articles').select('id, title, slug, category, excerpt, cover_image, published_at, created_at').eq('published', true).order('published_at', { ascending: false });
    if (category) query = query.eq('category', category);
    const { data } = await query;
    setArticles(data || []);
    setLoading(false);
  };

  const filtered = search ? articles.filter((a) => a.title.includes(search)) : articles;

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubLoading(true);
    const { error } = await supabase.from('subscribers').insert({ email, source: 'blog' });
    setSubLoading(false);
    if (error?.code === '23505') {
      toast({ title: 'توجه', description: 'این ایمیل قبلاً ثبت شده است.' });
    } else if (error) {
      toast({ title: 'خطا', description: 'مشکلی پیش آمد.', variant: 'destructive' });
    } else {
      toast({ title: 'موفق', description: 'عضویت شما در خبرنامه ثبت شد.' });
      sendEmail({ type: 'subscriber-welcome', to: email, data: {} });
      setEmail('');
    }
  };

  return (
    <div>
      <SEO title="دانش‌نامه" description="مقالات تخصصی اینتل‌بریجز درباره تجارت بین‌الملل، پرداخت، تجارت الکترونیک و حضور دیجیتال." path="/blog" />
      <section className="bg-gradient-hero text-white py-16 md:py-24">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-2xl space-y-4">
            <h1 className="text-3xl font-black md:text-5xl">دانش‌نامه</h1>
            <p className="text-white/70 text-lg">آموزش و راهنمایی برای ورود کسب‌وکارهای ایرانی به بازار جهانی</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container">
          {/* Filters */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
            <div className="flex flex-wrap gap-2">
              <Button variant={!category ? 'default' : 'outline'} size="sm" onClick={() => setCategory('')}>همه</Button>
              {categories.map((c) => (
                <Button key={c.slug} variant={category === c.slug ? 'default' : 'outline'} size="sm" onClick={() => setCategory(c.slug)}>
                  {c.name}
                </Button>
              ))}
            </div>
            <div className="relative w-full md:w-64">
              <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="جستجو..." value={search} onChange={(e) => setSearch(e.target.value)} className="pr-9" />
            </div>
          </div>

          {/* Articles */}
          {loading ? (
            <div className="text-center py-12 text-muted-foreground">در حال بارگذاری...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <Tag size={40} className="mx-auto text-muted-foreground/50" />
              <p className="text-muted-foreground">هنوز مقاله‌ای منتشر نشده است. به زودی محتوای آموزشی اضافه خواهد شد.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((article, i) => (
                <motion.div key={article.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { delay: i * 0.1, duration: 0.5 } } }}>
                  <Link to={`/blog/${article.slug}`}>
                    <Card className="group h-full cursor-pointer hover:border-primary/30 hover:shadow-lg transition-all overflow-hidden">
                      {article.cover_image && (
                        <div className="aspect-video overflow-hidden">
                          <img src={article.cover_image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                      )}
                      <CardContent className="p-5 space-y-3">
                        {article.category && (
                          <Badge variant="secondary" className="text-xs">
                            {categories.find((c) => c.slug === article.category)?.name || article.category}
                          </Badge>
                        )}
                        <h2 className="font-bold line-clamp-2">{article.title}</h2>
                        {article.excerpt && <p className="text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>}
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {/* Newsletter */}
          <div className="mt-16 rounded-2xl bg-muted/50 p-8 text-center space-y-4">
            <h3 className="text-xl font-bold">عضویت در خبرنامه</h3>
            <p className="text-sm text-muted-foreground">جدیدترین مطالب و اخبار تحول دیجیتال را در ایمیل خود دریافت کنید.</p>
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md mx-auto">
              <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="ایمیل شما" required className="flex-1" />
              <Button type="submit" disabled={subLoading} className="bg-gradient-primary shrink-0">
                {subLoading ? '...' : 'عضویت'}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
