import { useState, useEffect } from 'react';
import SEO from '@/components/SEO';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { blogCategories } from '@/lib/persian';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { sendEmail } from '@/lib/send-email';

interface Article {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  content: string | null;
  cover_image: string | null;
  published_at: string | null;
  meta_title: string | null;
  meta_description: string | null;
}

interface RelatedArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
}

export default function BlogArticle() {
  const { slug } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [related, setRelated] = useState<RelatedArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [subLoading, setSubLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (slug) fetchArticle();
  }, [slug]);

  const fetchArticle = async () => {
    setLoading(true);
    const { data } = await supabase.from('blog_articles').select('*').eq('slug', slug!).eq('published', true).single();
    setArticle(data);
    if (data?.category) {
      const { data: rel } = await supabase.from('blog_articles').select('id, title, slug, excerpt').eq('published', true).eq('category', data.category).neq('id', data.id).limit(3);
      setRelated(rel || []);
    }
    setLoading(false);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubLoading(true);
    const { error } = await supabase.from('subscribers').insert({ email, source: `blog-${slug}` });
    setSubLoading(false);
    if (error?.code === '23505') {
      toast({ title: 'توجه', description: 'این ایمیل قبلاً ثبت شده است.' });
    } else if (error) {
      toast({ title: 'خطا', description: 'مشکلی پیش آمد.', variant: 'destructive' });
    } else {
      toast({ title: 'موفق', description: 'عضویت شما ثبت شد.' });
      setEmail('');
    }
  };

  if (loading) return <div className="container py-24 text-center text-muted-foreground">در حال بارگذاری...</div>;

  if (!article) {
    return (
      <div className="container py-24 text-center space-y-4">
        <h1 className="text-2xl font-bold">مقاله یافت نشد</h1>
        <Link to="/blog"><Button>بازگشت به دانش‌نامه</Button></Link>
      </div>
    );
  }

  return (
    <div>
      <SEO
        title={article.meta_title || article.title}
        description={article.meta_description || undefined}
        path={`/blog/${article.slug}`}
        ogImage={article.cover_image || undefined}
      />
      <article className="py-12 md:py-16">
        <div className="container max-w-3xl">
          <Link to="/blog" className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary text-sm mb-6 transition-colors">
            <ArrowLeft size={14} className="rotate-180" />
            بازگشت به دانش‌نامه
          </Link>

          {article.cover_image && (
            <div className="aspect-video rounded-2xl overflow-hidden mb-8">
              <img src={article.cover_image} alt={article.title} className="w-full h-full object-cover" />
            </div>
          )}

          {article.category && (
            <Badge variant="secondary" className="mb-3">
              {blogCategories.find((c) => c.id === article.category)?.label || article.category}
            </Badge>
          )}

          <h1 className="text-3xl font-black md:text-4xl mb-6">{article.title}</h1>

          {article.published_at && (
            <p className="text-sm text-muted-foreground mb-8">
              {new Date(article.published_at).toLocaleDateString('fa-IR')}
            </p>
          )}

          <div className="prose prose-lg max-w-none text-foreground leading-relaxed" style={{ direction: 'rtl' }} dangerouslySetInnerHTML={{ __html: article.content || '' }} />
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-muted/30 py-12">
          <div className="container max-w-3xl">
            <h3 className="text-xl font-bold mb-6">مقالات مرتبط</h3>
            <div className="grid gap-4">
              {related.map((r) => (
                <Link key={r.id} to={`/blog/${r.slug}`}>
                  <Card className="hover:border-primary/30 transition-colors">
                    <CardContent className="p-4">
                      <h4 className="font-bold text-sm">{r.title}</h4>
                      {r.excerpt && <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{r.excerpt}</p>}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="py-12">
        <div className="container max-w-3xl">
          <div className="rounded-2xl bg-muted/50 p-8 text-center space-y-4">
            <h3 className="text-xl font-bold">عضویت در خبرنامه</h3>
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md mx-auto">
              <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="ایمیل شما" required className="flex-1" />
              <Button type="submit" disabled={subLoading} className="bg-gradient-primary shrink-0">{subLoading ? '...' : 'عضویت'}</Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
