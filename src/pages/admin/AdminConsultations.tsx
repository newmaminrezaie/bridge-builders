import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const statuses = [
  { value: 'pending', label: 'در انتظار' },
  { value: 'confirmed', label: 'تأیید شده' },
  { value: 'completed', label: 'انجام شده' },
  { value: 'noshow', label: 'حاضر نشد' },
];

export default function AdminConsultations() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => { fetch(); }, []);

  const fetch = async () => {
    setLoading(true);
    const { data } = await supabase.from('consultations').select('*').order('created_at', { ascending: false });
    setItems(data || []);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('consultations').update({ status }).eq('id', id);
    fetch();
  };

  const updateNotes = async (id: string, notes: string) => {
    await supabase.from('consultations').update({ notes }).eq('id', id);
    toast({ title: 'ذخیره شد' });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black">درخواست‌های مشاوره</h1>
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <p className="p-8 text-center text-muted-foreground">در حال بارگذاری...</p>
          ) : items.length === 0 ? (
            <p className="p-8 text-center text-muted-foreground">هنوز درخواستی ثبت نشده.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>نام</TableHead>
                  <TableHead>ایمیل</TableHead>
                  <TableHead>تلفن</TableHead>
                  <TableHead>تاریخ ترجیحی</TableHead>
                  <TableHead>وضعیت</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="text-sm">{item.email}</TableCell>
                    <TableCell className="text-sm">{item.phone || '—'}</TableCell>
                    <TableCell className="text-sm">{item.preferred_date ? new Date(item.preferred_date).toLocaleDateString('fa-IR') : '—'} {item.preferred_time || ''}</TableCell>
                    <TableCell>
                      <Select value={item.status} onValueChange={(v) => updateStatus(item.id, v)}>
                        <SelectTrigger className="h-8 text-xs w-24"><SelectValue /></SelectTrigger>
                        <SelectContent>{statuses.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}</SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell><Button variant="ghost" size="sm" onClick={() => setSelected(item)}>جزئیات</Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>جزئیات مشاوره</DialogTitle></DialogHeader>
          {selected && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">نام:</span> {selected.name}</div>
                <div><span className="text-muted-foreground">ایمیل:</span> {selected.email}</div>
                <div><span className="text-muted-foreground">تلفن:</span> {selected.phone || '—'}</div>
                <div><span className="text-muted-foreground">تاریخ:</span> {selected.preferred_date || '—'}</div>
              </div>
              {selected.business_description && <div><span className="text-sm text-muted-foreground">توضیحات:</span><p className="text-sm mt-1">{selected.business_description}</p></div>}
              <div className="space-y-2">
                <label className="text-sm font-medium">یادداشت</label>
                <Textarea defaultValue={selected.notes || ''} onBlur={(e) => updateNotes(selected.id, e.target.value)} rows={3} />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
