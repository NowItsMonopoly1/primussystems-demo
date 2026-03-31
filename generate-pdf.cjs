const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const doc = new PDFDocument({ margin: 60, size: 'A4', bufferPages: true });
const out = path.join(__dirname, 'public', 'downloads', 'primus_security_posture_v1.pdf');
doc.pipe(fs.createWriteStream(out));

// Colors
const NAVY   = '#0A2463';
const BLUE   = '#3E92CC';
const CHAR   = '#293241';
const WHITE  = '#FBFAFF';
const GREEN  = '#00874A';
const AMBER  = '#B06000';
const MUTED  = '#5a7a94';
const LIGHT  = '#c8dce8';

const W = doc.page.width - 120; // content width

// ── HEADER BAR ──────────────────────────────────────────────────────────────
doc.rect(0, 0, doc.page.width, 80).fill(NAVY);
doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(18)
   .text('PRIMUS SYSTEMS', 60, 24, { lineBreak: false });
doc.fillColor(BLUE).font('Helvetica').fontSize(9).text(' LLC', { lineBreak: false, continued: false });
doc.fillColor(LIGHT).font('Helvetica').fontSize(9)
   .text('DECISION ASSURANCE INFRASTRUCTURE  ·  PRIMUSSYSTEMS.IO', 60, 46);

// Status badge
doc.roundedRect(doc.page.width - 250, 20, 190, 38, 3)
   .fillAndStroke('#001828', BLUE);
doc.fillColor('#e08040').font('Helvetica-Bold').fontSize(7).text('● ', doc.page.width - 244, 28, { lineBreak: false, continued: true });
doc.fillColor(LIGHT).font('Helvetica-Bold').fontSize(7)
   .text('SOC 2 TYPE I — IN PREPARATION', { continued: false });
doc.fillColor(MUTED).font('Helvetica').fontSize(7)
   .text('TARGET: Q3 2026  ·  DOCUMENT v1.0 · MAR 2026', doc.page.width - 244, 40);

// ── TITLE ───────────────────────────────────────────────────────────────────
doc.moveDown(3.5);
doc.fillColor(NAVY).font('Helvetica-Bold').fontSize(22)
   .text('Vendor Security Posture Statement', 60);
doc.fillColor(MUTED).font('Helvetica').fontSize(10).moveDown(0.4)
   .text('Prepared for institutional vendor risk assessments, procurement reviews, and compliance diligence.', 60, undefined, { width: W });

doc.moveDown(0.6);
doc.moveTo(60, doc.y).lineTo(60 + W, doc.y).strokeColor('#dde8f0').lineWidth(0.5).stroke();

// ── SECTION HELPER ──────────────────────────────────────────────────────────
function sectionHeader(title, label) {
  doc.moveDown(1.2);
  doc.fillColor(BLUE).font('Helvetica-Bold').fontSize(7.5).text(label.toUpperCase(), 60, undefined, { characterSpacing: 1.5 });
  doc.moveDown(0.25);
  doc.fillColor(NAVY).font('Helvetica-Bold').fontSize(14).text(title, 60);
  doc.moveDown(0.5);
}

function tableRow(cols, widths, y, isHeader = false, bg = null) {
  if (bg) { doc.rect(60, y - 5, W, 22).fill(bg); }
  let x = 60;
  cols.forEach((text, i) => {
    doc.fillColor(isHeader ? BLUE : CHAR)
       .font(isHeader ? 'Helvetica-Bold' : 'Helvetica')
       .fontSize(isHeader ? 7.5 : 8.5)
       .text(String(text), x + 4, y, { width: widths[i] - 8, lineBreak: false, characterSpacing: isHeader ? 1 : 0 });
    x += widths[i];
  });
  return y + 22;
}

// ── 1. CONTROL PHILOSOPHY ───────────────────────────────────────────────────
sectionHeader('Deterministic Control & Enforcement Model', 'Control Philosophy');

doc.fillColor(MUTED).font('Helvetica').fontSize(9)
   .text('Primus Systems is an enforcement layer, not an observability layer. The following three properties define the architectural basis of compliance guarantees provided to institutional clients.', 60, undefined, { width: W });
doc.moveDown(0.8);

const controlRows = [
  ['Pre-Execution\nConstraint\nEnforcement', 'All governance rules are evaluated and enforced before any downstream action executes. Non-compliant decisions are intercepted at the kernel layer and cannot proceed.', 'Enforcement cannot be bypassed or deferred. Regulators can verify that no non-compliant action fired — not that one was flagged after the fact.'],
  ['Log-Bound\nReplayable\nDecisions', 'Every decision generates an immutable, cryptographically signed artifact. SHA-256 chained to the prior decision record. Tamper-evident by construction.', 'Decision records support full deterministic replay from any request_id. The log is the proof — not a dashboard screenshot.'],
  ['Fail-Closed\nby Default', 'Unauthorized, ambiguous, or governance-failed decisions cannot execute. The system defaults to refusal when constraint evaluation is incomplete or inconclusive.', 'No action requires manual intervention to be blocked. The default operating state is non-execution.'],
];

const cw = [120, 220, 195];
// header
doc.rect(60, doc.y, W, 20).fill('#e8f0f8');
let cy = doc.y + 4;
tableRow(['CONTROL PROPERTY', 'IMPLEMENTATION', 'AUDIT IMPLICATION'], cw, cy, true);
cy += 20;

controlRows.forEach((row, ri) => {
  const rowH = 54;
  doc.rect(60, cy - 4, W, rowH).fill(ri % 2 === 0 ? WHITE : '#f4f8fb');
  doc.rect(60, cy - 4, 2, rowH).fill(GREEN);
  let x = 60;
  row.forEach((text, ci) => {
    doc.fillColor(ci === 0 ? NAVY : CHAR).font(ci === 0 ? 'Helvetica-Bold' : 'Helvetica').fontSize(8)
       .text(text, x + 6, cy, { width: cw[ci] - 10, height: rowH - 8 });
    x += cw[ci];
  });
  cy += rowH;
});
doc.moveDown(0.5);

// ── 2. SOC 2 ROADMAP ────────────────────────────────────────────────────────
sectionHeader('SOC 2 Attestation Roadmap', 'Compliance Timeline');

doc.fillColor(MUTED).font('Helvetica').fontSize(9)
   .text('Type I scope: Security (CC) · Availability (A) · Confidentiality (C). Processing Integrity and Privacy included in subsequent Type II observation period. Scope is deliberate — these three criteria cover every control evaluated in standard SaaS vendor risk assessments.', 60, undefined, { width: W });
doc.moveDown(0.8);

const roadmap = [
  ['Apr 2026',    'Readiness platform onboarded (Drata)',                                          'COMPLETE'],
  ['May 2026',   'Internal control documentation — Access Control + Incident Response policies',  'IN PROGRESS'],
  ['Jun 2026',   'Auditor engaged (A-LIGN / Prescient Assurance)',                               'PLANNED'],
  ['Jul–Aug 2026','SOC 2 Type I examination window',                                              'PLANNED'],
  ['Q3 2026',    'SOC 2 Type I attestation — committed target',                                  'TARGET'],
  ['Q1 2027',    'SOC 2 Type II observation period begins',                                       'PLANNED'],
];

const rw = [90, 340, 105];
doc.rect(60, doc.y, W, 20).fill('#e8f0f8');
cy = doc.y + 4;
tableRow(['DATE', 'MILESTONE', 'STATUS'], rw, cy, true);
cy += 20;

const statusColor = { 'COMPLETE': GREEN, 'IN PROGRESS': AMBER, 'PLANNED': MUTED, 'TARGET': BLUE };

roadmap.forEach((row, ri) => {
  doc.rect(60, cy - 4, W, 22).fill(ri % 2 === 0 ? WHITE : '#f4f8fb');
  doc.fillColor(statusColor[row[2]] || MUTED).font('Helvetica-Bold').fontSize(8)
     .text(row[0], 64, cy, { width: rw[0] - 8, lineBreak: false });
  doc.fillColor(CHAR).font('Helvetica').fontSize(8)
     .text(row[1], 64 + rw[0], cy, { width: rw[1] - 8, lineBreak: false });
  doc.fillColor(statusColor[row[2]] || MUTED).font('Helvetica-Bold').fontSize(7.5)
     .text(row[2], 64 + rw[0] + rw[1], cy, { width: rw[2] - 8, lineBreak: false });
  cy += 22;
});

// ── 3. SUB-PROCESSORS ───────────────────────────────────────────────────────
sectionHeader('Sub-Processor Inventory', 'Third-Party Infrastructure');

doc.fillColor(MUTED).font('Helvetica').fontSize(9)
   .text('All sub-processors maintain independent SOC 2 Type II attestations. Sensitive customer data does not leave the infrastructure below.', 60, undefined, { width: W });
doc.moveDown(0.8);

const subs = [
  ['Vercel',    'Platform hosting and global CDN',            'SOC 2 Type II', 'Application data, logs, request routing'],
  ['Anthropic', 'AI model inference (Claude API)',            'SOC 2 Type II', 'Prompt and response data only'],
  ['GitHub',    'Source code management and CI/CD',          'SOC 2 Type II', 'Source code only — no customer data'],
];
const sw = [80, 155, 105, 195];
doc.rect(60, doc.y, W, 20).fill('#e8f0f8');
cy = doc.y + 4;
tableRow(['SUB-PROCESSOR', 'ROLE', 'CERTIFICATION', 'DATA PROCESSED'], sw, cy, true);
cy += 20;
subs.forEach((row, ri) => {
  doc.rect(60, cy - 4, W, 22).fill(ri % 2 === 0 ? WHITE : '#f4f8fb');
  let x = 60;
  row.forEach((text, ci) => {
    doc.fillColor(ci === 2 ? GREEN : ci === 0 ? NAVY : CHAR)
       .font(ci === 0 || ci === 2 ? 'Helvetica-Bold' : 'Helvetica').fontSize(8)
       .text(text, x + 4, cy, { width: sw[ci] - 8, lineBreak: false });
    x += sw[ci];
  });
  cy += 22;
});

// ── 4. REGULATORY ALIGNMENT ─────────────────────────────────────────────────
sectionHeader('Regulatory Framework Alignment', 'Three Enforcement Deadlines');

const regs = [
  { act: 'Colorado AI Act', date: 'Jun 30, 2026', color: AMBER,
    req: 'High-risk AI — algorithmic discrimination prohibition; developer and deployer risk management programs required.',
    align: 'Primus enforces constraint rules at decision time, preventing discriminatory outcomes by design rather than by post-hoc detection.' },
  { act: 'EU AI Act — Annex III', date: 'Aug 2, 2026', color: BLUE,
    req: 'High-risk AI conformity assessment; Article 9 technical file; ongoing human oversight requirements.',
    align: 'Every Primus decision generates an Article 9-compliant artifact: constraint log, outcome, timestamp, and SHA-256 chain. Replayable from any request_id.' },
  { act: 'EU Product Liability Directive', date: 'Dec 9, 2026', color: GREEN,
    req: 'Software treated as a product; defects in AI features trigger strict liability for importers and hosting platforms.',
    align: 'Primus immutable logs establish that the system operated within defined parameters at the moment of action — the operational record required to rebut a product liability claim.' },
];

regs.forEach(reg => {
  doc.moveDown(0.5);
  const startY = doc.y;
  doc.rect(60, startY, 3, 70).fill(reg.color);
  doc.rect(63, startY, W - 3, 70).fill('#f4f8fb');

  doc.fillColor(reg.color).font('Helvetica-Bold').fontSize(9.5)
     .text(reg.act, 72, startY + 8);
  doc.fillColor(MUTED).font('Helvetica-Bold').fontSize(7.5)
     .text(`ENFORCEMENT: ${reg.date}`, 72, startY + 24);

  doc.fillColor(NAVY).font('Helvetica-Bold').fontSize(7.5).text('REQUIREMENT', 72, startY + 38);
  doc.fillColor(CHAR).font('Helvetica').fontSize(8)
     .text(reg.req, 72, startY + 48, { width: (W / 2) - 20 });

  doc.fillColor(NAVY).font('Helvetica-Bold').fontSize(7.5).text('PRIMUS ALIGNMENT', 72 + W / 2, startY + 38);
  doc.fillColor(CHAR).font('Helvetica').fontSize(8)
     .text(reg.align, 72 + W / 2, startY + 48, { width: (W / 2) - 20 });

  doc.moveDown(0.2);
  doc.y = startY + 78;
});

// ── 5. ATTESTATION / SIGNATURE ──────────────────────────────────────────────
sectionHeader('Executive Attestation', 'Signatory Statement');

doc.fillColor(MUTED).font('Helvetica').fontSize(9)
   .text('I attest that the security controls, processes, and commitments described in this document accurately represent the current operational posture of Primus Systems LLC as of the date indicated below. This statement is issued in good faith and will be updated upon material change to the security environment.', 60, undefined, { width: W });

doc.moveDown(1.5);
doc.moveTo(60, doc.y).lineTo(280, doc.y).strokeColor(NAVY).lineWidth(0.5).stroke();
doc.moveDown(0.3);
doc.fillColor(NAVY).font('Helvetica-Bold').fontSize(9).text('Donte Primus', 60);
doc.fillColor(MUTED).font('Helvetica').fontSize(8).text('Founder & CEO, Primus Systems LLC', 60);
doc.moveDown(0.4);
doc.fillColor(MUTED).font('Helvetica').fontSize(8)
   .text('Date: March 18, 2026', 60, undefined, { lineBreak: false });
doc.text('    Title: Founder & CEO', { continued: false });
doc.moveDown(0.6);
doc.fillColor('#c8dce8').font('Helvetica').fontSize(8)
   .text('_________________________________', 60);
doc.fillColor(MUTED).font('Helvetica').fontSize(7.5).text('Signature', 60);

// ── FOOTER ON ALL PAGES ─────────────────────────────────────────────────────
const totalPages = doc.bufferedPageRange().count;
for (let i = 0; i < totalPages; i++) {
  doc.switchToPage(i);
  const footerY = doc.page.height - 36;
  doc.rect(0, footerY - 6, doc.page.width, 42).fill(NAVY);
  doc.fillColor(LIGHT).font('Helvetica').fontSize(7.5)
     .text('PRIMUS SYSTEMS LLC  ·  PRIMUSSYSTEMS.IO  ·  security@primussystems.io', 60, footerY, { lineBreak: false });
  doc.fillColor(MUTED).fontSize(7.5)
     .text(`Page ${i + 1} of ${totalPages}  ·  CONFIDENTIAL — VENDOR RISK ASSESSMENT USE`, doc.page.width - 300, footerY, { width: 240, align: 'right' });
}

doc.end();
console.log('PDF written to', out);
