import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Download, Filter } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const statuses = [
  { value: 'new', label: 'جدید' },
  { value: 'contacted', label: 'تماس گرفته' },
  { value: 'qualified', label: 'واجد شرایط' },
  { value: 'proposal_sent', label: 'پیشنهاد ارسال شده' },
  { value: 'won', label: 'موفق' },
  { value: 'lost', label: 'از دست رفته' },
];

export default function AdminLeads() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [selected, setSelected] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => { fetchLeads(); }, [statusFilter]);

  const fetchLeads = async () => {
    setLoading(true);
    let q = supabase.from('leads').select('*').order('created_at', { ascending: false });
    if (statusFilter !== 'all') q = q.eq('status', statusFilter);
    const { data } = await q;
    setLeads(data || []);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('leads').update({ status }).eq('id', id);
    fetchLeads();
    if (selected?.id === id) setSelected({ ...selected, status });
  };

  const updateNotes = async (id: string, notes: string) => {
    await supabase.from('leads').update({ notes }).eq('id', id);
    toast({ title: 'ذخیره شد' });
  };

  const exportCSV = () => {
    const headers = ['نام', 'ایمیل', 'تلفن', 'نوع کسب‌وکار', 'خدمات', 'پیام', 'وضعیت', 'تاریخ'];
    const rows = leads.map((l) => [l.name, l.email, l.phone || '', l.business_type || '', (l.services_needed || []).join('; '), l.message || '', l.status, new Date(l.created_at).toLocaleDateString('fa-IR')]);
    const csv = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.map((c: string) => `"${c}"`).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'leads.csv'; a.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black">مدیریت سرنخ‌ها</h1>
        <Button variant="outline" size="sm" onClick={exportCSV}><Download size={16} className="ml-1" />خروجی CSV</Button>
      </div>

      <div className="flex gap-2 flex-wrap">
        <Button variant={statusFilter === 'all' ? 'default' : 'outline'} size="sm" onClick={() => setStatusFilter('all')}>همه</Button>
        {statuses.map((s) => (
          <Button key={s.value} variant={statusFilter === s.value ? 'default' : 'outline'} size="sm" onClick={() => setStatusFilter(s.value)}>{s.label}</Button>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <p className="p-8 text-center text-muted-foreground">در حال بارگذاری...</p>
          ) : leads.length === 0 ? (
            <p className="p-8 text-center text-muted-foreground">سرنخی یافت نشد.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>نام</TableHead>
                  <TableHead>ایمیل</TableHead>
                  <TableHead>تلفن</TableHead>
                  <TableHead>نوع کسب‌وکار</TableHead>
                  <TableHead>وضعیت</TableHead>
                  <TableHead>تاریخ</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell className="font-medium">{lead.name}</TableCell>
                    <TableCell className="text-sm">{lead.email}</TableCell>
                    <TableCell className="text-sm">{lead.phone || '—'}</TableCell>
                    <TableCell className="text-sm">{lead.business_type || '—'}</TableCell>
                    <TableCell>
                      <Select value={lead.status} onValueChange={(v) => updateStatus(lead.id, v)}>
                        <SelectTrigger className="h-8 text-xs w-28"><SelectValue /></SelectTrigger>
                        <SelectContent>{statuses.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}</SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{new Date(lead.created_at).toLocaleDateString('fa-IR')}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => setSelected(lead)}>جزئیات</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>جزئیات سرنخ</DialogTitle></DialogHeader>
          {selected && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">نام:</span> {selected.name}</div>
                <div><span className="text-muted-foreground">ایمیل:</span> {selected.email}</div>
                <div><span className="text-muted-foreground">تلفن:</span> {selected.phone || '—'}</div>
                <div><span className="text-muted-foreground">نوع:</span> {selected.business_type || '—'}</div>
              </div>
              {selected.services_needed?.length > 0 && (
                <div><span className="text-sm text-muted-foreground">خدمات:</span><div className="flex flex-wrap gap-1 mt-1">{selected.services_needed.map((s: string) => <Badge key={s} variant="secondary">{s}</Badge>)}</div></div>
              )}
              {selected.message && <div><span className="text-sm text-muted-foreground">پیام:</span><p className="text-sm mt-1">{selected.message}</p></div>}
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
