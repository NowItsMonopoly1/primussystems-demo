import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, company, system } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email required' });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Primus Systems" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_USER,
    subject: `Demo Request — ${name}${company ? ' @ ' + company : ''}`,
    text: [
      'New demo request from primussystems.io',
      '',
      `Name:    ${name}`,
      `Email:   ${email}`,
      `Company: ${company || '—'}`,
      `System:  ${system || '—'}`,
    ].join('\n'),
    html: `
      <h2 style="font-family:monospace">New Demo Request — Primus Systems</h2>
      <table style="font-family:monospace;font-size:14px;border-collapse:collapse">
        <tr><td style="padding:6px 16px 6px 0;color:#555">Name</td><td>${name}</td></tr>
        <tr><td style="padding:6px 16px 6px 0;color:#555">Email</td><td>${email}</td></tr>
        <tr><td style="padding:6px 16px 6px 0;color:#555">Company</td><td>${company || '—'}</td></tr>
        <tr><td style="padding:6px 16px 6px 0;color:#555">System</td><td>${system || '—'}</td></tr>
      </table>
    `,
  });

  return res.status(200).json({ ok: true });
}
