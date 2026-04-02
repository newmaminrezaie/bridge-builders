import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { Users, CalendarCheck, Mail, FileText } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ leads: 0, consultations: 0, subscribers: 0, articles: 0 });
  const [recentLeads, setRecentLeads] = useState<any[]>([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

    const [leads, consultations, subscribers, articles, recent] = await Promise.all([
      supabase.from('leads').select('id', { count: 'exact', head: true }).gte('created_at', monthStart),
      supabase.from('consultations').select('id', { count: 'exact', head: true }).gte('created_at', monthStart),
      supabase.from('subscribers').select('id', { count: 'exact', head: true }),
      supabase.from('blog_articles').select('id', { count: 'exact', head: true }).eq('published', true),
      supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(5),
    ]);

    setStats({
      leads: leads.count || 0,
      consultations: consultations.count || 0,
      subscribers: subscribers.count || 0,
      articles: articles.count || 0,
    });
    setRecentLeads(recent.data || []);
  };

  const statCards = [
    { icon: <Users size={20} />, label: 'سرنخ‌های این ماه', value: stats.leads },
    { icon: <CalendarCheck size={20} />, label: 'درخواست مشاوره', value: stats.consultations },
    { icon: <Mail size={20} />, label: 'مشترکین خبرنامه', value: stats.subscribers },
    { icon: <FileText size={20} />, label: 'مقالات منتشر شده', value: stats.articles },
  ];

  const statusMap: Record<string, string> = { new: 'جدید', contacted: 'تماس گرفته', qualified: 'واجد شرایط', proposal_sent: 'پیشنهاد ارسال شده', won: 'موفق', lost: 'از دست رفته' };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black">داشبورد</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((s, i) => (
          <Card key={i}>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">{s.icon}</div>
              <div>
                <div className="text-2xl font-black">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">آخرین سرنخ‌ها</CardTitle>
        </CardHeader>
        <CardContent>
          {recentLeads.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground py-8">هنوز سرنخی ثبت نشده است.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>نام</TableHead>
                  <TableHead>ایمیل</TableHead>
                  <TableHead>وضعیت</TableHead>
                  <TableHead>تاریخ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentLeads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell className="font-medium">{lead.name}</TableCell>
                    <TableCell className="text-sm">{lead.email}</TableCell>
                    <TableCell><Badge variant="secondary">{statusMap[lead.status] || lead.status}</Badge></TableCell>
                    <TableCell className="text-sm text-muted-foreground">{new Date(lead.created_at).toLocaleDateString('fa-IR')}</TableCell>
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
