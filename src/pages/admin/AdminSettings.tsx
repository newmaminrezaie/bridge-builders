import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const settingKeys = [
  { key: 'whatsapp_number', label: 'شماره واتساپ' },
  { key: 'telegram_username', label: 'نام کاربری تلگرام' },
  { key: 'contact_email', label: 'ایمیل تماس' },
  { key: 'office_address', label: 'آدرس دفتر' },
  { key: 'phone_number', label: 'شماره تلفن' },
];

export default function AdminSettings() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => { fetch(); }, []);

  const fetch = async () => {
    const { data } = await supabase.from('site_settings').select('*');
    const map: Record<string, string> = {};
    (data || []).forEach((s: any) => { map[s.key] = s.value || ''; });
    setSettings(map);
    setLoading(false);
  };

  const save = async () => {
    setSaving(true);
    for (const { key } of settingKeys) {
      const value = settings[key] || '';
      await supabase.from('site_settings').upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' });
    }
    setSaving(false);
    toast({ title: 'ذخیره شد', description: 'تنظیمات با موفقیت ذخیره شد.' });
  };

  if (loading) return <p className="text-center text-muted-foreground py-12">در حال بارگذاری...</p>;

  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="text-2xl font-black">تنظیمات سایت</h1>
      <Card>
        <CardContent className="p-6 space-y-4">
          {settingKeys.map(({ key, label }) => (
            <div key={key} className="space-y-2">
              <label className="text-sm font-medium">{label}</label>
              <Input value={settings[key] || ''} onChange={(e) => setSettings({ ...settings, [key]: e.target.value })} />
            </div>
          ))}
          <Button onClick={save} disabled={saving} className="bg-gradient-primary">
            {saving ? 'در حال ذخیره...' : 'ذخیره تنظیمات'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
