import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { invalidateSiteSettingsCache } from '@/hooks/use-site-settings';

interface SettingField {
  key: string;
  label: string;
  type: 'input' | 'textarea';
  placeholder?: string;
}

const contactFields: SettingField[] = [
  { key: 'whatsapp_number', label: 'شماره واتساپ', type: 'input' },
  { key: 'telegram_username', label: 'نام کاربری تلگرام', type: 'input' },
  { key: 'contact_email', label: 'ایمیل تماس', type: 'input' },
  { key: 'office_address', label: 'آدرس دفتر', type: 'input' },
  { key: 'phone_number', label: 'شماره تلفن', type: 'input' },
];

const seoFields: SettingField[] = [
  { key: 'site_name', label: 'نام سایت', type: 'input', placeholder: 'اینتل‌بریجز' },
  { key: 'site_tagline', label: 'شعار سایت', type: 'input', placeholder: 'پل کسب‌وکار ایرانی با دنیا' },
  { key: 'site_description', label: 'توضیحات پیش‌فرض سایت', type: 'textarea', placeholder: 'توضیحات متا پیش‌فرض برای موتورهای جستجو...' },
  { key: 'og_image_url', label: 'تصویر پیش‌فرض اشتراک‌گذاری (OG Image)', type: 'input', placeholder: 'https://example.com/og-image.jpg' },
  { key: 'meta_keywords', label: 'کلمات کلیدی', type: 'input', placeholder: 'تحول دیجیتال، بازار جهانی، ...' },
];

const allFields = [...contactFields, ...seoFields];

export default function AdminSettings() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    const { data } = await supabase.from('site_settings').select('*');
    const map: Record<string, string> = {};
    (data || []).forEach((s: any) => { map[s.key] = s.value || ''; });
    setSettings(map);
    setLoading(false);
  };

  const save = async () => {
    setSaving(true);
    for (const { key } of allFields) {
      const value = settings[key] || '';
      await supabase.from('site_settings').upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' });
    }
    invalidateSiteSettingsCache();
    setSaving(false);
    toast({ title: 'ذخیره شد', description: 'تنظیمات با موفقیت ذخیره شد.' });
  };

  const renderField = (field: SettingField) => (
    <div key={field.key} className="space-y-2">
      <label className="text-sm font-medium">{field.label}</label>
      {field.type === 'textarea' ? (
        <Textarea
          value={settings[field.key] || ''}
          onChange={(e) => setSettings({ ...settings, [field.key]: e.target.value })}
          placeholder={field.placeholder}
          rows={3}
        />
      ) : (
        <Input
          value={settings[field.key] || ''}
          onChange={(e) => setSettings({ ...settings, [field.key]: e.target.value })}
          placeholder={field.placeholder}
        />
      )}
    </div>
  );

  if (loading) return <p className="text-center text-muted-foreground py-12">در حال بارگذاری...</p>;

  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="text-2xl font-black">تنظیمات سایت</h1>

      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-bold">اطلاعات تماس</h2>
          {contactFields.map(renderField)}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-bold">تنظیمات سئو و متا</h2>
          <p className="text-sm text-muted-foreground">این مقادیر به عنوان پیش‌فرض در تمام صفحات سایت استفاده می‌شوند.</p>
          {seoFields.map(renderField)}
        </CardContent>
      </Card>

      <Button onClick={save} disabled={saving} className="bg-gradient-primary">
        {saving ? 'در حال ذخیره...' : 'ذخیره تنظیمات'}
      </Button>
    </div>
  );
}
