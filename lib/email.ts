import { Resend } from 'resend';
import type { ContactPayload } from '@/lib/types';
import { escapeHtml } from '@/lib/validation';

const FALLBACK_FROM = 'Portfolio <onboarding@resend.dev>';

export interface DeliveryResult {
  ok: boolean;
  reason?: 'not-configured' | 'provider-error';
}

function row(label: string, value: string): string {
  const safe = escapeHtml(value || '—');
  return `
    <tr>
      <td style="padding:10px 16px;border-bottom:1px solid #1E252D;color:#89929E;font:12px/1.5 ui-monospace,SFMono-Regular,Menlo,monospace;text-transform:uppercase;letter-spacing:.08em;white-space:nowrap;vertical-align:top">${label}</td>
      <td style="padding:10px 16px;border-bottom:1px solid #1E252D;color:#F5F7FA;font:15px/1.6 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">${safe}</td>
    </tr>`;
}

export function buildEmail(data: ContactPayload) {
  const subject = `Portfolio Contact — ${data.name}${data.company ? ` from ${data.company}` : ''}`;

  const text = [
    'New message from your portfolio contact form.',
    '',
    `Name:              ${data.name}`,
    `Email:             ${data.email}`,
    `Company:           ${data.company || '—'}`,
    `Role:              ${data.role || '—'}`,
    `Opportunity Type:  ${data.opportunity || '—'}`,
    '',
    'Message:',
    data.message,
    '',
    `Received: ${new Date().toUTCString()}`,
  ].join('\n');

  const html = `<!doctype html>
<html><body style="margin:0;background:#080A0D;padding:28px 16px">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#11151A;border:1px solid #1E252D;border-radius:10px;overflow:hidden">
    <tr>
      <td style="padding:18px 16px;border-bottom:1px solid #1E252D;background:#0B0D10">
        <div style="color:#37E2A0;font:11px/1 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.12em;text-transform:uppercase">Portfolio contact · delivered</div>
        <div style="color:#F5F7FA;font:18px/1.4 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;margin-top:6px">${escapeHtml(
          data.name,
        )}${data.company ? ` — ${escapeHtml(data.company)}` : ''}</div>
      </td>
    </tr>
    <tr><td>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${row('Name', data.name)}
        ${row('Email', data.email)}
        ${row('Company', data.company)}
        ${row('Role', data.role)}
        ${row('Opportunity', data.opportunity)}
      </table>
    </td></tr>
    <tr><td style="padding:18px 16px">
      <div style="color:#89929E;font:12px/1.5 ui-monospace,SFMono-Regular,Menlo,monospace;text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px">Message</div>
      <div style="color:#F5F7FA;font:15px/1.7 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;white-space:pre-wrap">${escapeHtml(
        data.message,
      )}</div>
    </td></tr>
    <tr><td style="padding:14px 16px;border-top:1px solid #1E252D;color:#5D6875;font:11px/1.5 ui-monospace,SFMono-Regular,Menlo,monospace">
      Reply directly to this email to reach ${escapeHtml(data.name)}.
    </td></tr>
  </table>
</body></html>`;

  return { subject, text, html };
}

export async function deliverContactEmail(data: ContactPayload): Promise<DeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;

  if (!apiKey || !to) {
    console.error('[contact] RESEND_API_KEY or CONTACT_EMAIL is not configured.');
    return { ok: false, reason: 'not-configured' };
  }

  const { subject, text, html } = buildEmail(data);

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || FALLBACK_FROM,
      to: [to],
      replyTo: data.email,
      subject,
      text,
      html,
    });

    if (error) {
      console.error('[contact] Resend rejected the message:', error.message);
      return { ok: false, reason: 'provider-error' };
    }
    return { ok: true };
  } catch (err) {
    console.error('[contact] Delivery threw:', err);
    return { ok: false, reason: 'provider-error' };
  }
}
