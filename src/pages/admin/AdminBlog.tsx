import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const empty = { title: '', slug: '', category: '', content: '', excerpt: '', cover_image: '', published: false, meta_title: '', meta_description: '' };

export default function AdminBlog() {
  const [articles, setArticles] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => { fetch(); fetchCategories(); }, []);

  const fetch = async () => {
    setLoading(true);
    const { data } = await supabase.from('blog_articles').select('*').order('created_at', { ascending: false });
    setArticles(data || []);
    setLoading(false);
  };

  const fetchCategories = async () => {
    const { data } = await supabase.from('blog_categories').select('*').order('sort_order');
    setCategories(data || []);
  };

  const openNew = () => { setForm(empty); setEditing('new'); };
  const openEdit = (a: any) => {
    setForm({ title: a.title, slug: a.slug, category: a.category || '', content: a.content || '', excerpt: a.excerpt || '', cover_image: a.cover_image || '', published: a.published, meta_title: a.meta_title || '', meta_description: a.meta_description || '' });
    setEditing(a);
  };

  const generateSlug = (title: string) => title.trim().replace(/\s+/g, '-').replace(/[^\u0600-\u06FFa-zA-Z0-9-]/g, '').toLowerCase();

  const save = async () => {
    if (!form.title.trim() || !form.slug.trim()) { toast({ title: 'خطا', description: 'عنوان و اسلاگ الزامی است.', variant: 'destructive' }); return; }
    setSaving(true);
    const payload = { ...form, published_at: form.published ? new Date().toISOString() : null };
    if (editing === 'new') {
      const { error } = await supabase.from('blog_articles').insert(payload);
      if (error) { toast({ title: 'خطا', description: error.message, variant: 'destructive' }); setSaving(false); return; }
    } else {
      const { error } = await supabase.from('blog_articles').update(payload).eq('id', editing.id);
      if (error) { toast({ title: 'خطا', description: error.message, variant: 'destructive' }); setSaving(false); return; }
    }
    setSaving(false);
    setEditing(null);
    fetch();
    toast({ title: 'ذخیره شد' });
  };

  const remove = async (id: string) => {
    if (!confirm('آیا مطمئنید؟')) return;
    await supabase.from('blog_articles').delete().eq('id', id);
    fetch();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black">مدیریت مقالات</h1>
        <Button onClick={openNew} className="bg-gradient-primary"><Plus size={16} className="ml-1" />مقاله جدید</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? <p className="p-8 text-center text-muted-foreground">در حال بارگذاری...</p> : articles.length === 0 ? <p className="p-8 text-center text-muted-foreground">هنوز مقاله‌ای ایجاد نشده.</p> : (
            <Table>
              <TableHeader><TableRow><TableHead>عنوان</TableHead><TableHead>دسته‌بندی</TableHead><TableHead>وضعیت</TableHead><TableHead>تاریخ</TableHead><TableHead></TableHead></TableRow></TableHeader>
              <TableBody>
                {articles.map((a) => (
                  <TableRow key={a.id}>
                    <TableCell className="font-medium">{a.title}</TableCell>
                    <TableCell className="text-sm">{categories.find(c => c.slug === a.category)?.name || a.category || '—'}</TableCell>
                    <TableCell><Badge variant={a.published ? 'default' : 'secondary'}>{a.published ? 'منتشر شده' : 'پیش‌نویس'}</Badge></TableCell>
                    <TableCell className="text-sm text-muted-foreground">{new Date(a.created_at).toLocaleDateString('fa-IR')}</TableCell>
                    <TableCell className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => openEdit(a)}><Pencil size={14} /></Button>
                      <Button variant="ghost" size="sm" onClick={() => remove(a.id)}><Trash2 size={14} /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!editing} onOpenChange={() => setEditing(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing === 'new' ? 'مقاله جدید' : 'ویرایش مقاله'}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">عنوان *</label>
              <Input value={form.title} onChange={(e) => { setForm({ ...form, title: e.target.value, slug: editing === 'new' ? generateSlug(e.target.value) : form.slug }); }} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">اسلاگ *</label>
              <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} dir="ltr" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">دسته‌بندی</label>
              <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                <SelectTrigger><SelectValue placeholder="انتخاب" /></SelectTrigger>
                <SelectContent>{categories.map(c => <SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">خلاصه</label>
              <Textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">محتوا (HTML)</label>
              <Textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={10} dir="rtl" className="font-mono text-xs" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">لینک تصویر کاور</label>
              <Input value={form.cover_image} onChange={(e) => setForm({ ...form, cover_image: e.target.value })} dir="ltr" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">عنوان سئو</label>
              <Input value={form.meta_title} onChange={(e) => setForm({ ...form, meta_title: e.target.value })} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">توضیحات سئو</label>
              <Textarea value={form.meta_description} onChange={(e) => setForm({ ...form, meta_description: e.target.value })} rows={2} />
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={form.published} onCheckedChange={(v) => setForm({ ...form, published: v })} />
              <label className="text-sm font-medium">منتشر شده</label>
            </div>
            <Button onClick={save} disabled={saving} className="w-full bg-gradient-primary">{saving ? 'در حال ذخیره...' : 'ذخیره'}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
