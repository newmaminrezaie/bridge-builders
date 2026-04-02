import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

export default function AdminSubscribers() {
  const [subs, setSubs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetch(); }, []);

  const fetch = async () => {
    setLoading(true);
    const { data } = await supabase.from('subscribers').select('*').order('created_at', { ascending: false });
    setSubs(data || []);
    setLoading(false);
  };

  const exportCSV = () => {
    const headers = ['ایمیل', 'منبع', 'وضعیت', 'تاریخ'];
    const rows = subs.map((s) => [s.email, s.source || '', s.status, new Date(s.created_at).toLocaleDateString('fa-IR')]);
    const csv = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.map((c: string) => `"${c}"`).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'subscribers.csv'; a.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black">مشترکین خبرنامه</h1>
        <Button variant="outline" size="sm" onClick={exportCSV}><Download size={16} className="ml-1" />خروجی CSV</Button>
      </div>
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <p className="p-8 text-center text-muted-foreground">در حال بارگذاری...</p>
          ) : subs.length === 0 ? (
            <p className="p-8 text-center text-muted-foreground">هنوز مشترکی ثبت نشده.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ایمیل</TableHead>
                  <TableHead>منبع</TableHead>
                  <TableHead>وضعیت</TableHead>
                  <TableHead>تاریخ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subs.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="font-medium">{s.email}</TableCell>
                    <TableCell className="text-sm">{s.source || '—'}</TableCell>
                    <TableCell className="text-sm">{s.status === 'active' ? 'فعال' : s.status}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{new Date(s.created_at).toLocaleDateString('fa-IR')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
