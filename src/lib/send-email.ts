import { supabase } from '@/integrations/supabase/client';

interface SendEmailParams {
  type: 'contact-admin' | 'contact-confirm' | 'consultation-admin' | 'consultation-confirm' | 'subscriber-welcome';
  to: string;
  data: Record<string, string>;
}

export async function sendEmail(params: SendEmailParams): Promise<void> {
  try {
    await supabase.functions.invoke('send-email', { body: params });
  } catch (err) {
    console.error('Email send failed (non-blocking):', err);
  }
}
