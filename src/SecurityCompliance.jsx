import { Link } from "react-router-dom";

export default function SecurityCompliance() {
  const tsc = [
    { criterion: "Security (CC)", scope: "Type I", controls: ["Role-based access with MFA enforcement", "TLS 1.3 in transit · AES-256 at rest", "Dependency scanning on every commit", "Incident response — 4hr acknowledgment SLA"], status: "ACTIVE" },
    { criterion: "Availability (A)", scope: "Type I", controls: ["Vercel Edge Network — 99.95% SLA", "Real-time uptime and performance enforcement telemetry"], status: "ACTIVE" },
    { criterion: "Confidentiality (C)", scope: "Type I", controls: ["Customer decision data isolated per tenant", "All sub-processors maintain SOC 2 Type II", "Customer-defined retention; deletion on termination"], status: "ACTIVE" },
    { criterion: "Processing Integrity (PI)", scope: "Type II", controls: ["Scheduled for Type II observation period"], status: "PLANNED" },
    { criterion: "Privacy (P)", scope: "Type II", controls: ["Scheduled for Type II observation period"], status: "PLANNED" },
  ];

  const subprocessors = [
    { name: "Vercel", role: "Infrastructure hosting and global CDN", cert: "SOC 2 Type II", data: "Application data, logs, request routing" },
    { name: "Anthropic", role: "AI model inference (Claude API)", cert: "SOC 2 Type II", data: "Prompt and response data only" },
    { name: "GitHub", role: "Source code management and CI", cert: "SOC 2 Type II", data: "Source code only — no customer data" },
  ];

  const regulatory = [
    {
      act: "Colorado AI Act",
      deadline: "Jun 30, 2026",
      color: "#e08040",
      requirement: "High-risk AI systems must avoid algorithmic discrimination; developer and deployer risk management programs required.",
      alignment: "Primus enforces constraint rules at decision time before execution, preventing discriminatory outcomes by design rather than by detection.",
    },
    {
      act: "EU AI Act — Annex III",
      deadline: "Aug 2, 2026",
      color: "#60c0f0",
      requirement: "High-risk AI conformity assessment; Article 9 technical file; ongoing human oversight requirements.",
      alignment: "Every Primus decision generates an Article 9-compliant artifact: constraint log, outcome, timestamp, and SHA-256 chain. Replayable from any request_id.",
    },
    {
      act: "EU Product Liability Directive",
      deadline: "Dec 9, 2026",
      color: "#00d4a0",
      requirement: "Software treated as a product; defects in AI features trigger strict liability for importers and hosting infrastructure providers.",
      alignment: "Primus cryptographic decision records establish that the system operated within defined constraints at the moment of action — the operational record required to rebut a product liability claim.",
    },
  ];

  const roadmap = [
    { date: "Apr 2026", milestone: "Readiness controls system onboarded (Drata)", status: "COMPLETE", color: "#00d4a0" },
    { date: "May 2026", milestone: "Internal control documentation — Access Control + Incident Response policies", status: "IN PROGRESS", color: "#e08040" },
    { date: "Jun 2026", milestone: "Auditor engaged (A-LIGN / Prescient Assurance)", status: "PLANNED", color: "#2a5a7a" },
    { date: "Jul–Aug 2026", milestone: "SOC 2 Type I examination window", status: "PLANNED", color: "#2a5a7a" },
    { date: "Q3 2026", milestone: "SOC 2 Type I attestation — target", status: "TARGET", color: "#60c0f0" },
    { date: "Q1 2027", milestone: "SOC 2 Type II observation period begins", status: "PLANNED", color: "#2a5a7a" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&family=IBM+Plex+Mono:wght@400;500;600&family=Playfair+Display:wght@700;800&display=swap');
        .sc-page *{box-sizing:border-box;margin:0;padding:0}
        .sc-page{font-family:'IBM Plex Sans','Helvetica Neue',sans-serif;background:#04080f;color:#c8d8e8;min-height:100vh}
        .sc-container{max-width:1100px;margin:0 auto;padding:0 32px}
        .sc-label{font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:0.2em;color:#1e5a80;text-transform:uppercase;margin-bottom:14px}
        .sc-h2{font-family:'Playfair Display',serif;font-size:clamp(22px,3.5vw,36px);font-weight:700;color:#e0eef8;line-height:1.2;margin-bottom:14px}
        .sc-divider{border:none;border-top:1px solid #0d1e2e;margin:0}
        .sc-badge{display:inline-flex;align-items:center;gap:8px;background:#030609;border:1px solid #1a3a5a;padding:6px 14px;border-radius:2px;font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:0.12em;color:#4a7a9a}
        .sc-badge-dot{width:6px;height:6px;border-radius:50%;background:#e08040;box-shadow:0 0 6px #e08040;flex-shrink:0}
        .sc-status-active{font-family:'IBM Plex Mono',monospace;font-size:9px;letter-spacing:0.12em;color:#00d4a0;background:#001a0d;border:1px solid #004d28;padding:3px 8px;border-radius:2px}
        .sc-status-progress{font-family:'IBM Plex Mono',monospace;font-size:9px;letter-spacing:0.12em;color:#e08040;background:#1a0f00;border:1px solid #4d3000;padding:3px 8px;border-radius:2px}
        .sc-status-planned{font-family:'IBM Plex Mono',monospace;font-size:9px;letter-spacing:0.12em;color:#2a5a7a;background:#030609;border:1px solid #0d1e2e;padding:3px 8px;border-radius:2px}
        .sc-status-target{font-family:'IBM Plex Mono',monospace;font-size:9px;letter-spacing:0.12em;color:#60c0f0;background:#001828;border:1px solid #003a6a;padding:3px 8px;border-radius:2px}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:#04080f}::-webkit-scrollbar-thumb{background:#1a2a3a}
      `}</style>

      <div className="sc-page">

        {/* NAV */}
        <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(4,8,15,0.96)", backdropFilter: "blur(12px)", borderBottom: "1px solid #0d1e2e" }}>
          <div className="sc-container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "60px" }}>
            <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ filter: "drop-shadow(0 0 5px rgba(0,212,160,0.7))", flexShrink: 0 }}>
                <rect x="2.5" y="2.5" width="15" height="15" rx="1" transform="rotate(45 10 10)" stroke="#00d4a0" strokeWidth="1.5" fill="rgba(0,212,160,0.07)"/>
                <line x1="10" y1="5" x2="10" y2="15" stroke="#00d4a0" strokeWidth="0.75" strokeLinecap="round" opacity="0.45"/>
                <line x1="5" y1="10" x2="15" y2="10" stroke="#00d4a0" strokeWidth="0.75" strokeLinecap="round" opacity="0.45"/>
                <circle cx="10" cy="10" r="2" fill="#00d4a0"/>
              </svg>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "13px", fontWeight: 500, color: "#e0eef8", letterSpacing: "0.1em" }}>PRIMUS SYSTEMS</span>
            </Link>
            <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
              <Link to="/" style={{ color: "#4a7a9a", fontSize: "13px", textDecoration: "none" }}>← Home</Link>
              <Link to="/proof" style={{ color: "#4a7a9a", fontSize: "13px", textDecoration: "none" }}>Proof</Link>
              <a href="mailto:security@primussystems.io" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", letterSpacing: "0.08em", color: "#60c0f0", background: "#001828", border: "1px solid #003a6a", padding: "8px 16px", borderRadius: "2px", textDecoration: "none" }}>SECURITY CONTACT</a>
            </div>
          </div>
        </nav>

        {/* HERO */}
        <section style={{ padding: "80px 0 60px", borderBottom: "1px solid #0d1e2e" }}>
          <div className="sc-container">
            <div className="sc-label">Security &amp; Compliance</div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px,4.5vw,52px)", fontWeight: 800, color: "#e8f4ff", lineHeight: "1.1", marginBottom: "20px" }}>
              Vendor Security Posture<br /><span style={{ color: "#00d4a0" }}>Statement</span>
            </h1>
            <p style={{ fontSize: "16px", color: "#6a9ab8", lineHeight: "1.7", marginBottom: "32px", fontWeight: 300, maxWidth: "640px" }}>
              This document establishes the current security posture of Primus Systems and outlines our formal path to SOC 2 Type I attestation. It is intended for procurement teams, vendor risk assessors, and institutional infrastructure reviews.
            </p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
              <div className="sc-badge">
                <div className="sc-badge-dot" />
                SOC 2 TYPE I — IN PREPARATION · TARGET: Q3 2026
              </div>
              <div className="sc-badge" style={{ color: "#2a5a7a" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#003a6a", flexShrink: 0 }} />
                DOCUMENT VERSION 1.0 · MAR 2026
              </div>
            </div>
          </div>
        </section>

        {/* DETERMINISTIC CONTROL MODEL */}
        <section style={{ padding: "80px 0", background: "#030609" }}>
          <div className="sc-container">
            <div className="sc-label">Control Philosophy</div>
            <h2 className="sc-h2">Deterministic Control &amp; Enforcement Model</h2>
            <p style={{ color: "#3a6a8a", fontSize: "15px", fontWeight: 300, lineHeight: "1.7", marginBottom: "40px", maxWidth: "620px" }}>
              Primus Systems is not an observability layer. It is an enforcement layer. The distinction is architectural and determines whether compliance can be declared retroactively or guaranteed prospectively.
            </p>
            <div style={{ border: "1px solid #0d1e2e", borderRadius: "4px", overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "200px 1fr 1fr", background: "#040810", borderBottom: "1px solid #0d1e2e", padding: "12px 20px", gap: "20px" }}>
                {["Control Property", "Implementation", "Audit Implication"].map(h => (
                  <div key={h} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "9px", letterSpacing: "0.15em", color: "#1e5a80", textTransform: "uppercase" }}>{h}</div>
                ))}
              </div>
              {[
                {
                  prop: "Pre-Execution Constraint Enforcement",
                  impl: "All governance rules are evaluated and enforced before any downstream action executes. Non-compliant decisions are intercepted at the kernel layer.",
                  audit: "Enforcement cannot be bypassed or deferred. Regulators can verify that no non-compliant action fired — not that one was flagged after the fact.",
                },
                {
                  prop: "Log-Bound Replayable Decisions",
                  impl: "Every decision generates an immutable, cryptographically signed artifact. SHA-256 chained to the prior decision record. Tamper-evident by construction.",
                  audit: "Decision records support full deterministic replay from any request_id. The log is the proof — not a summary or a dashboard screenshot.",
                },
                {
                  prop: "Fail-Closed by Default",
                  impl: "Unauthorized, ambiguous, or governance-failed decisions cannot execute. The system defaults to refusal when constraint evaluation is incomplete or inconclusive.",
                  audit: "No action requires manual intervention to be blocked. The default operating state is non-execution, not permissive pass-through.",
                },
              ].map((row, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "200px 1fr 1fr", padding: "20px", gap: "20px", background: "#040810", borderBottom: i < 2 ? "1px solid #0d1e2e" : "none" }}>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", color: "#00d4a0", lineHeight: "1.5", fontWeight: 500 }}>{row.prop}</div>
                  <div style={{ fontSize: "13px", color: "#5a8aa8", lineHeight: "1.7", fontWeight: 300 }}>{row.impl}</div>
                  <div style={{ fontSize: "13px", color: "#3a6a8a", lineHeight: "1.7", fontWeight: 300 }}>{row.audit}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="sc-divider" />

        {/* SOC 2 ROADMAP */}
        <section style={{ padding: "80px 0" }}>
          <div className="sc-container">
            <div className="sc-label">SOC 2 Attestation Roadmap</div>
            <h2 className="sc-h2">Formal compliance timeline</h2>
            <p style={{ color: "#3a6a8a", fontSize: "15px", fontWeight: 300, lineHeight: "1.7", marginBottom: "16px", maxWidth: "580px" }}>
              SOC 2 Type I examination is scoped to <span style={{ color: "#c8d8e8", fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px" }}>Security (CC) · Availability (A) · Confidentiality (C)</span>. Processing Integrity and Privacy are included in the subsequent Type II observation period.
            </p>
            <div style={{ marginBottom: "40px", padding: "12px 16px", background: "#030609", border: "1px solid #0d1e2e", borderRadius: "3px", fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", color: "#2a5a7a", lineHeight: "1.6" }}>
              This scope is deliberate, not incomplete. The three selected criteria cover the controls evaluated in standard vendor risk assessments for infrastructure software handling governed decision flows.
            </div>
            <div style={{ border: "1px solid #0d1e2e", borderRadius: "4px", overflow: "hidden" }}>
              {roadmap.map((item, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "120px 1fr auto", alignItems: "center", padding: "16px 20px", borderBottom: i < roadmap.length - 1 ? "1px solid #0d1e2e" : "none", background: "#040810", gap: "20px" }}>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", color: item.color, fontWeight: 500 }}>{item.date}</div>
                  <div style={{ fontSize: "13px", color: "#5a8aa8", fontWeight: 300 }}>{item.milestone}</div>
                  <div>
                    {item.status === "COMPLETE" && <span className="sc-status-active">{item.status}</span>}
                    {item.status === "IN PROGRESS" && <span className="sc-status-progress">{item.status}</span>}
                    {item.status === "PLANNED" && <span className="sc-status-planned">{item.status}</span>}
                    {item.status === "TARGET" && <span className="sc-status-target">{item.status}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="sc-divider" />

        {/* ACTIVE CONTROLS */}
        <section style={{ padding: "80px 0", background: "#030609" }}>
          <div className="sc-container">
            <div className="sc-label">Trust Services Criteria</div>
            <h2 className="sc-h2">Active security control posture</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "#0d1e2e", border: "1px solid #0d1e2e", borderRadius: "4px", overflow: "hidden" }}>
              {tsc.map((item, i) => (
                <div key={i} style={{ background: "#040810", padding: "24px 28px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", color: "#c8d8e8", fontWeight: 600, letterSpacing: "0.05em" }}>{item.criterion}</div>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "9px", color: "#2a4a6a", letterSpacing: "0.1em" }}>SCOPE: {item.scope}</span>
                      {item.status === "ACTIVE" && <span className="sc-status-active">{item.status}</span>}
                      {item.status === "PLANNED" && <span className="sc-status-planned">{item.status}</span>}
                    </div>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {item.controls.map((ctrl, j) => (
                      <div key={j} style={{ display: "flex", gap: "8px", alignItems: "flex-start", padding: "7px 12px", background: "#030609", border: "1px solid #0d1e2e", borderRadius: "2px", fontSize: "12px", color: "#4a7a9a", fontWeight: 300 }}>
                        <span style={{ color: item.status === "ACTIVE" ? "#00d4a0" : "#1e5a80", fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", flexShrink: 0, marginTop: "1px" }}>{item.status === "ACTIVE" ? "✓" : "○"}</span>
                        {ctrl}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="sc-divider" />

        {/* SUB-PROCESSORS */}
        <section style={{ padding: "80px 0" }}>
          <div className="sc-container">
            <div className="sc-label">Sub-Processor Inventory</div>
            <h2 className="sc-h2">Third-party infrastructure</h2>
            <p style={{ color: "#3a6a8a", fontSize: "15px", fontWeight: 300, lineHeight: "1.7", marginBottom: "32px", maxWidth: "580px" }}>
              All sub-processors maintain independent SOC 2 Type II attestations. Sensitive customer data does not leave the sub-processor infrastructure listed below.
            </p>
            <div style={{ border: "1px solid #0d1e2e", borderRadius: "4px", overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "120px 1fr 160px 1fr", background: "#040810", borderBottom: "1px solid #0d1e2e", padding: "12px 20px", gap: "20px" }}>
                {["Sub-Processor", "Role", "Certification", "Data Processed"].map(h => (
                  <div key={h} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "9px", letterSpacing: "0.15em", color: "#1e5a80", textTransform: "uppercase" }}>{h}</div>
                ))}
              </div>
              {subprocessors.map((sp, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "120px 1fr 160px 1fr", padding: "18px 20px", gap: "20px", background: "#040810", borderBottom: i < subprocessors.length - 1 ? "1px solid #0d1e2e" : "none", alignItems: "start" }}>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", color: "#c8d8e8", fontWeight: 500 }}>{sp.name}</div>
                  <div style={{ fontSize: "13px", color: "#5a8aa8", fontWeight: 300 }}>{sp.role}</div>
                  <div><span className="sc-status-active" style={{ fontSize: "9px" }}>{sp.cert}</span></div>
                  <div style={{ fontSize: "13px", color: "#3a6a8a", fontWeight: 300 }}>{sp.data}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="sc-divider" />

        {/* REGULATORY ALIGNMENT */}
        <section style={{ padding: "80px 0", background: "#030609" }}>
          <div className="sc-container">
            <div className="sc-label">Regulatory Framework Alignment</div>
            <h2 className="sc-h2">Three enforcement deadlines. One infrastructure.</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "#0d1e2e", border: "1px solid #0d1e2e", borderRadius: "4px", overflow: "hidden", marginTop: "32px" }}>
              {regulatory.map((reg, i) => (
                <div key={i} style={{ background: "#040810", padding: "28px", borderLeft: `3px solid ${reg.color}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", flexWrap: "wrap", gap: "10px" }}>
                    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", color: reg.color, fontWeight: 600, letterSpacing: "0.05em" }}>{reg.act}</div>
                    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: reg.color, background: "#030609", border: `1px solid ${reg.color}33`, padding: "4px 10px", borderRadius: "2px" }}>ENFORCEMENT: {reg.deadline}</div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", flexWrap: "wrap" }}>
                    <div>
                      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "9px", color: "#1e5a80", letterSpacing: "0.12em", marginBottom: "8px" }}>REQUIREMENT</div>
                      <div style={{ fontSize: "13px", color: "#4a7a9a", lineHeight: "1.7", fontWeight: 300 }}>{reg.requirement}</div>
                    </div>
                    <div>
                      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "9px", color: "#1e5a80", letterSpacing: "0.12em", marginBottom: "8px" }}>PRIMUS ALIGNMENT</div>
                      <div style={{ fontSize: "13px", color: "#5a8aa8", lineHeight: "1.7", fontWeight: 300 }}>{reg.alignment}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="sc-divider" />

        {/* DOWNLOAD + CONTACT */}
        <section style={{ padding: "80px 0" }}>
          <div className="sc-container">
            <div style={{ display: "flex", gap: "60px", flexWrap: "wrap", alignItems: "flex-start" }}>
              <div style={{ flex: "1", minWidth: "280px" }}>
                <div className="sc-label">Security Posture Document</div>
                <h2 className="sc-h2">Download for vendor risk assessment</h2>
                <p style={{ color: "#3a6a8a", fontSize: "15px", fontWeight: 300, lineHeight: "1.7", marginBottom: "28px" }}>
                  The full security posture statement includes this control posture, the SOC 2 roadmap as a formal commitment table, data sovereignty commitments, and the signatory attestation. Formatted for direct attachment to vendor risk assessment packages.
                </p>
                <a href="/downloads/primus_security_posture_v1.pdf" download style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "transparent", border: "1px solid #00d4a0", color: "#00d4a0", fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", fontWeight: 500, letterSpacing: "0.1em", padding: "14px 28px", borderRadius: "2px", textDecoration: "none", cursor: "pointer" }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v8M4 6l3 3 3-3M2 11h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  DOWNLOAD SECURITY POSTURE PDF
                </a>
              </div>
              <div style={{ flex: "1", minWidth: "280px" }}>
                <div className="sc-label">Security Contact</div>
                <h2 className="sc-h2" style={{ fontSize: "clamp(18px,2.5vw,28px)" }}>Questions, assessments, and disclosure</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "20px" }}>
                  {[
                    { label: "Vendor Risk Assessments", value: "security@primussystems.io", href: "mailto:security@primussystems.io" },
                    { label: "Vulnerability Disclosure", value: "security@primussystems.io", href: "mailto:security@primussystems.io" },
                    { label: "Enterprise / Legal Inquiries", value: "contact@primussystems.io", href: "mailto:contact@primussystems.io" },
                  ].map((item, i) => (
                    <div key={i} style={{ padding: "16px 20px", background: "#030609", border: "1px solid #0d1e2e", borderRadius: "3px" }}>
                      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "9px", color: "#1e5a80", letterSpacing: "0.12em", marginBottom: "6px" }}>{item.label}</div>
                      <a href={item.href} style={{ fontSize: "13px", color: "#60c0f0", textDecoration: "none" }}>{item.value}</a>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: "20px", padding: "14px 16px", background: "#030609", border: "1px solid #0d1e2e", borderRadius: "3px", fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: "#1a3a5a", lineHeight: "1.7" }}>
                  Response SLA: Security inquiries — 24 hours. Vulnerability reports — 4 hours acknowledgment, 72 hours initial assessment.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ borderTop: "1px solid #0d1e2e", padding: "32px 0", background: "#030609" }}>
          <div className="sc-container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
                <rect x="2.5" y="2.5" width="15" height="15" rx="1" transform="rotate(45 10 10)" stroke="#00d4a0" strokeWidth="1.5" fill="rgba(0,212,160,0.07)"/>
                <line x1="10" y1="5" x2="10" y2="15" stroke="#00d4a0" strokeWidth="0.75" strokeLinecap="round" opacity="0.45"/>
                <line x1="5" y1="10" x2="15" y2="10" stroke="#00d4a0" strokeWidth="0.75" strokeLinecap="round" opacity="0.45"/>
                <circle cx="10" cy="10" r="2" fill="#00d4a0"/>
              </svg>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", color: "#2a5a7a", letterSpacing: "0.1em" }}>PRIMUS SYSTEMS LLC</span>
            </div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: "#1a3a5a" }}>SECURITY POSTURE v1.0 · MARCH 2026</div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: "#1a3a5a" }}>SOC 2 TYPE I · TARGET Q3 2026</div>
          </div>
        </footer>

      </div>
    </>
  );
}
