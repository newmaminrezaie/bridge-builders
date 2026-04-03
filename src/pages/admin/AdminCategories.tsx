import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, GripVertical } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  meta_title: string | null;
  meta_keywords: string | null;
  sort_order: number;
  created_at: string;
}

const empty = { name: '', slug: '', description: '', meta_title: '', meta_keywords: '', sort_order: 0 };

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('blog_categories').select('*').order('sort_order');
    setCategories((data as Category[]) || []);
    setLoading(false);
  };

  const openNew = () => { setForm({ ...empty, sort_order: categories.length + 1 }); setEditing('new'); };
  const openEdit = (c: Category) => {
    setForm({ name: c.name, slug: c.slug, description: c.description || '', meta_title: c.meta_title || '', meta_keywords: c.meta_keywords || '', sort_order: c.sort_order });
    setEditing(c);
  };

  const generateSlug = (name: string) => name.trim().replace(/\s+/g, '-').replace(/[^\u0600-\u06FFa-zA-Z0-9-]/g, '').toLowerCase();

  const save = async () => {
    if (!form.name.trim() || !form.slug.trim()) { toast({ title: 'خطا', description: 'نام و اسلاگ الزامی است.', variant: 'destructive' }); return; }
    setSaving(true);
    const payload = { name: form.name, slug: form.slug, description: form.description || null, meta_title: form.meta_title || null, meta_keywords: form.meta_keywords || null, sort_order: form.sort_order };
    if (editing === 'new') {
      const { error } = await supabase.from('blog_categories').insert(payload);
      if (error) { toast({ title: 'خطا', description: error.message, variant: 'destructive' }); setSaving(false); return; }
    } else {
      const { error } = await supabase.from('blog_categories').update(payload).eq('id', editing.id);
      if (error) { toast({ title: 'خطا', description: error.message, variant: 'destructive' }); setSaving(false); return; }
    }
    setSaving(false);
    setEditing(null);
    load();
    toast({ title: 'ذخیره شد' });
  };

  const remove = async (id: string) => {
    if (!confirm('آیا مطمئنید؟')) return;
    await supabase.from('blog_categories').delete().eq('id', id);
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black">مدیریت دسته‌بندی‌ها</h1>
        <Button onClick={openNew} className="bg-gradient-primary"><Plus size={16} className="ml-1" />دسته جدید</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? <p className="p-8 text-center text-muted-foreground">در حال بارگذاری...</p> : categories.length === 0 ? <p className="p-8 text-center text-muted-foreground">هنوز دسته‌بندی ایجاد نشده.</p> : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">#</TableHead>
                  <TableHead>نام</TableHead>
                  <TableHead>اسلاگ</TableHead>
                  <TableHead>عنوان سئو</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="text-muted-foreground text-sm">{c.sort_order}</TableCell>
                    <TableCell className="font-medium">{c.name}</TableCell>
                    <TableCell className="text-sm text-muted-foreground" dir="ltr">{c.slug}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{c.meta_title || '—'}</TableCell>
                    <TableCell className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => openEdit(c)}><Pencil size={14} /></Button>
                      <Button variant="ghost" size="sm" onClick={() => remove(c.id)}><Trash2 size={14} /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!editing} onOpenChange={() => setEditing(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{editing === 'new' ? 'دسته جدید' : 'ویرایش دسته'}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">نام دسته *</label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value, slug: editing === 'new' ? generateSlug(e.target.value) : form.slug })} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">اسلاگ (URL) *</label>
              <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} dir="ltr" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">توضیحات (سئو)</label>
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">عنوان سئو (meta title)</label>
              <Input value={form.meta_title} onChange={(e) => setForm({ ...form, meta_title: e.target.value })} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">کلمات کلیدی سئو (meta keywords)</label>
              <Input value={form.meta_keywords} onChange={(e) => setForm({ ...form, meta_keywords: e.target.value })} placeholder="کلمه۱, کلمه۲, ..." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">ترتیب نمایش</label>
              <Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} />
            </div>
            <Button onClick={save} disabled={saving} className="w-full bg-gradient-primary">{saving ? 'در حال ذخیره...' : 'ذخیره'}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
