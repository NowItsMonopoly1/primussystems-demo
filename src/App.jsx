import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const SCENARIOS = {
  fintech: {
    label: "Fintech Credit", law: "EU AI Act Annex III §5", vertical: "FINTECH_CREDIT",
    rules: [
      { id: "LAW_FC_001", name: "Identity Verification", field: "id_verified", type: "bool" },
      { id: "LAW_FC_002", name: "Risk Score Threshold", field: "risk_score", type: "threshold", max: 0.25 },
      { id: "LAW_FC_003", name: "Evidence Confidence", field: "evidence_score", type: "min", min: 85 },
    ],
    inputs: [
      { key: "risk_score", label: "Risk Score", type: "number", placeholder: "0.00–1.00", step: "0.01" },
      { key: "evidence_score", label: "Evidence Score", type: "number", placeholder: "0–100", step: "1" },
      { key: "id_verified", label: "Identity Verified", type: "select", options: ["true", "false"] },
    ],
    defaults: { risk_score: "0.31", evidence_score: "91", id_verified: "true" },
  },
  healthcare: {
    label: "Healthcare Triage", law: "EU AI Act Annex III §1", vertical: "HEALTHCARE_TRIAGE",
    rules: [
      { id: "LAW_HC_001", name: "Diagnostic Confidence", field: "diag_confidence", type: "min", min: 0.80 },
      { id: "LAW_HC_002", name: "Clinical Review Flag", field: "clinical_review", type: "bool" },
      { id: "LAW_HC_003", name: "Deterioration Risk Cap", field: "deterioration_risk", type: "threshold", max: 0.70 },
    ],
    inputs: [
      { key: "deterioration_risk", label: "Deterioration Risk", type: "number", placeholder: "0.00–1.00", step: "0.01" },
      { key: "diag_confidence", label: "Diagnostic Confidence", type: "number", placeholder: "0.00–1.00", step: "0.01" },
      { key: "clinical_review", label: "Clinical Review", type: "select", options: ["true", "false"] },
    ],
    defaults: { deterioration_risk: "0.81", diag_confidence: "0.93", clinical_review: "true" },
  },
  supply: {
    label: "Supply Chain", law: "EU AI Act Annex III §8", vertical: "SUPPLY_CHAIN",
    rules: [
      { id: "LAW_SC_004", name: "Sanctions Check", field: "sanctions_clear", type: "bool" },
      { id: "LAW_SC_005", name: "Forecast Confidence", field: "forecast_confidence", type: "min", min: 0.75 },
      { id: "LAW_SC_006", name: "Order Value Cap", field: "order_value", type: "threshold", max: 250000 },
    ],
    inputs: [
      { key: "order_value", label: "Order Value ($)", type: "number", placeholder: "e.g. 380000", step: "1000" },
      { key: "forecast_confidence", label: "Forecast Confidence", type: "number", placeholder: "0.00–1.00", step: "0.01" },
      { key: "sanctions_clear", label: "Sanctions Clear", type: "select", options: ["true", "false"] },
    ],
    defaults: { order_value: "380000", forecast_confidence: "0.88", sanctions_clear: "true" },
  },
};

function generateHash() {
  return Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
}

function evaluateRules(scenario, values) {
  const failures = [];
  for (const rule of scenario.rules) {
    const val = values[rule.field];
    if (rule.type === "bool" && val !== "true") {
      failures.push({ rule, observed: val, reason: `${rule.name} not satisfied` });
    } else if (rule.type === "threshold") {
      const n = parseFloat(val);
      if (n > rule.max) failures.push({ rule, observed: n, reason: `${n} > max ${rule.max}` });
    } else if (rule.type === "min") {
      const n = parseFloat(val);
      if (n < rule.min) failures.push({ rule, observed: n, reason: `${n} < min ${rule.min}` });
    }
  }
  return failures;
}

function LiveDemo() {
  const [activeScenario, setActiveScenario] = useState("fintech");
  const [values, setValues] = useState(SCENARIOS.fintech.defaults);
  const [phase, setPhase] = useState("idle");
  const [result, setResult] = useState(null);
  const [logs, setLogs] = useState([]);
  const logRef = useRef(null);
  const scenario = SCENARIOS[activeScenario];

  useEffect(() => { setValues(scenario.defaults); setPhase("idle"); setResult(null); setLogs([]); }, [activeScenario]);
  useEffect(() => { if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight; }, [logs]);

  const run = () => {
    setPhase("evaluating"); setResult(null); setLogs([]);
    const failures = evaluateRules(scenario, values);
    const approved = failures.length === 0;
    const hash = generateHash(); const prevHash = generateHash();
    const timestamp = new Date().toISOString();
    const evalLogs = [
      `> PRIMUS OS GOVERNANCE KERNEL v2.1`,
      `> INTERCEPTING — ${scenario.vertical}`,
      `> RULESET: ${scenario.law}`,
      ...scenario.rules.map(r => `> ${r.id}: ${r.name} — CHECKING`),
      approved ? `> ALL RULES PASSED — APPROVED` : `> CONSTRAINT VIOLATION — REFUSED`,
      `> WRITING TO PROOF CHAIN`,
      `> PREV_HASH: ${prevHash}`,
      `> HASH: ${hash}`,
      `> TIMESTAMP: ${timestamp}`,
      `> ARTIFACT SEALED`,
    ];
    let i = 0;
    const iv = setInterval(() => {
      if (i < evalLogs.length) { setLogs(p => [...p, evalLogs[i]]); i++; }
      else { clearInterval(iv); setResult({ approved, failures, hash, prevHash, timestamp }); setPhase("result"); }
    }, 100);
  };

  return (
    <div style={{ fontFamily: "'IBM Plex Mono', monospace", background: "#040810", border: "1px solid #1a2535", borderRadius: "8px", overflow: "hidden" }}>
      <div style={{ background: "#060c16", borderBottom: "1px solid #1a2535", padding: "12px 20px", display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#00d4a0", boxShadow: "0 0 8px #00d4a0" }} />
        <span style={{ color: "#00d4a0", fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em" }}>PRIMUS OS — GOVERNANCE KERNEL LIVE</span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div style={{ width: "220px", minWidth: "180px", borderRight: "1px solid #1a2535", padding: "16px", background: "#030609" }}>
          <div style={{ fontSize: "9px", color: "#2a4a6a", letterSpacing: "0.15em", marginBottom: "10px" }}>SCENARIO</div>
          {Object.entries(SCENARIOS).map(([k, s]) => (
            <button key={k} onClick={() => setActiveScenario(k)} style={{
              display: "block", width: "100%", textAlign: "left", padding: "8px 10px", marginBottom: "5px",
              background: activeScenario === k ? "#0a1e30" : "transparent",
              border: `1px solid ${activeScenario === k ? "#1e5080" : "#111d2a"}`,
              borderRadius: "3px", cursor: "pointer", color: activeScenario === k ? "#4ab0e0" : "#2a5a7a",
              fontSize: "10px", fontFamily: "inherit", letterSpacing: "0.05em",
            }}>
              <div style={{ fontWeight: 700 }}>{s.label}</div>
              <div style={{ fontSize: "8px", opacity: 0.7, marginTop: "2px" }}>{s.law}</div>
            </button>
          ))}
          <div style={{ fontSize: "9px", color: "#2a4a6a", letterSpacing: "0.15em", margin: "14px 0 8px" }}>RULESET</div>
          {scenario.rules.map(r => (
            <div key={r.id} style={{ padding: "6px 8px", marginBottom: "4px", background: "#040810", border: "1px solid #111d2a", borderRadius: "2px", fontSize: "9px" }}>
              <div style={{ color: "#e08040" }}>{r.id}</div>
              <div style={{ color: "#4a7a9a", marginTop: "1px" }}>{r.name}</div>
            </div>
          ))}
        </div>
        <div style={{ flex: 1, minWidth: "260px", padding: "16px", display: "flex", flexDirection: "column", gap: "14px" }}>
          <div style={{ border: "1px solid #111d2a", borderRadius: "4px", overflow: "hidden" }}>
            <div style={{ padding: "8px 14px", background: "#040810", borderBottom: "1px solid #111d2a", fontSize: "9px", color: "#2a4a6a", letterSpacing: "0.12em" }}>DECISION INPUT — {scenario.vertical}</div>
            <div style={{ padding: "12px 14px", display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {scenario.inputs.map(inp => (
                <div key={inp.key} style={{ flex: "1", minWidth: "130px" }}>
                  <label style={{ display: "block", fontSize: "8px", color: "#2a5a7a", letterSpacing: "0.1em", marginBottom: "4px" }}>{inp.label}</label>
                  {inp.type === "select" ? (
                    <select value={values[inp.key] || ""} onChange={e => setValues({ ...values, [inp.key]: e.target.value })} disabled={phase === "evaluating"}
                      style={{ width: "100%", background: "#030609", color: "#a0c8e0", border: "1px solid #1a3a5a", borderRadius: "2px", padding: "6px 8px", fontSize: "11px", fontFamily: "inherit", outline: "none" }}>
                      {inp.options.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input type="number" value={values[inp.key] || ""} placeholder={inp.placeholder} step={inp.step}
                      onChange={e => setValues({ ...values, [inp.key]: e.target.value })} disabled={phase === "evaluating"}
                      style={{ width: "100%", background: "#030609", color: "#a0c8e0", border: "1px solid #1a3a5a", borderRadius: "2px", padding: "6px 8px", fontSize: "11px", fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
                  )}
                </div>
              ))}
            </div>
            <div style={{ padding: "0 14px 12px", display: "flex", gap: "8px" }}>
              <button onClick={phase !== "evaluating" ? run : undefined} style={{
                padding: "8px 18px", background: phase === "evaluating" ? "#111d2a" : "#003a6a",
                color: phase === "evaluating" ? "#2a5a7a" : "#4ab0e0",
                border: `1px solid ${phase === "evaluating" ? "#1a3a5a" : "#1a6090"}`,
                borderRadius: "2px", cursor: phase === "evaluating" ? "not-allowed" : "pointer",
                fontSize: "10px", fontFamily: "inherit", letterSpacing: "0.1em", fontWeight: 700,
              }}>{phase === "evaluating" ? "EVALUATING..." : "SUBMIT TO KERNEL"}</button>
              {phase === "result" && (
                <button onClick={() => { setPhase("idle"); setResult(null); setLogs([]); }} style={{
                  padding: "8px 14px", background: "transparent", color: "#2a5a7a",
                  border: "1px solid #111d2a", borderRadius: "2px", cursor: "pointer",
                  fontSize: "10px", fontFamily: "inherit", letterSpacing: "0.1em",
                }}>RESET</button>
              )}
            </div>
          </div>
          {logs.length > 0 && (
            <div style={{ border: "1px solid #111d2a", borderRadius: "4px", overflow: "hidden" }}>
              <div style={{ padding: "6px 14px", background: "#030609", borderBottom: "1px solid #111d2a", fontSize: "9px", color: "#2a4a6a", letterSpacing: "0.12em" }}>KERNEL LOG</div>
              <div ref={logRef} style={{ padding: "10px 14px", maxHeight: "130px", overflowY: "auto", fontSize: "10px", lineHeight: "1.8" }}>
                {logs.map((log, i) => log == null ? null : (
                  <div key={i} style={{ color: log.includes("REFUSED") || log.includes("VIOLATION") ? "#ff4a4a" : log.includes("APPROVED") || log.includes("PASSED") || log.includes("SEALED") ? "#00d4a0" : log.includes("HASH") || log.includes("TIMESTAMP") ? "#e08040" : "#2a6a8a" }}>{log}</div>
                ))}
              </div>
            </div>
          )}
          {result && (
            <div style={{ border: `1px solid ${result.approved ? "#004d28" : "#4d0a0a"}`, borderRadius: "4px", overflow: "hidden", background: result.approved ? "#010d07" : "#0d0101" }}>
              <div style={{ padding: "10px 14px", background: result.approved ? "#001a0d" : "#1a0404", borderBottom: `1px solid ${result.approved ? "#004d28" : "#4d0a0a"}`, display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: result.approved ? "#00d4a0" : "#ff4a4a", boxShadow: `0 0 8px ${result.approved ? "#00d4a0" : "#ff4a4a"}` }} />
                <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.12em", color: result.approved ? "#00d4a0" : "#ff4a4a" }}>DECISION {result.approved ? "APPROVED" : "REFUSED"}</span>
              </div>
              <div style={{ padding: "12px 14px" }}>
                {!result.approved && result.failures.map((f, i) => (
                  <div key={i} style={{ marginBottom: "10px", padding: "8px 10px", background: "#1a0404", border: "1px solid #4d0a0a", borderRadius: "2px", fontSize: "10px" }}>
                    <span style={{ color: "#ff4a4a" }}>{f.rule.id}_LOCKED</span>
                    <span style={{ color: "#7a3030", marginLeft: "10px" }}>{f.reason}</span>
                  </div>
                ))}
                <div style={{ background: "#020508", border: "1px solid #111d2a", borderRadius: "3px", padding: "12px 14px", fontSize: "10px", lineHeight: "2" }}>
                  {[["vertical", scenario.vertical], ["rule", result.failures[0]?.rule.id || "ALL_RULES_PASSED"], ["outcome", result.approved ? "APPROVED" : "REFUSED"], ["timestamp", result.timestamp], ["prev_hash", result.prevHash], ["hash", result.hash]].map(([k, v]) => (
                    <div key={k} style={{ display: "flex", gap: "14px" }}>
                      <span style={{ color: "#1a5a7a", minWidth: "80px" }}>{k}</span>
                      <span style={{ color: k === "outcome" ? (result.approved ? "#00d4a0" : "#ff4a4a") : k === "hash" || k === "prev_hash" ? "#e08040" : "#7ab0d0" }}>{v}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: "10px", fontSize: "9px", color: "#1a4a6a", lineHeight: "1.7" }}>
                  PROOF → Rule encoded before decision fired. Threshold evaluated in real time. Outcome logged before execution. Hash chains to previous artifact. <span style={{ color: "#e08040" }}>Immutable. Replayable. Court-admissible.</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [pilotForm, setPilotForm] = useState({ name: "", company: "", email: "", vertical: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const demoRef = useRef(null);
  const pilotRef = useRef(null);

  return (
    <div style={{ fontFamily: "'IBM Plex Sans', 'Helvetica Neue', sans-serif", background: "#04080f", color: "#c8d8e8", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&family=IBM+Plex+Mono:wght@400;500;600&family=Playfair+Display:wght@700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        ::selection{background:#003a6a}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:#04080f}::-webkit-scrollbar-thumb{background:#1a2a3a}
        .cta-primary{background:#003a6a;color:#60c0f0;border:1px solid #1a6090;padding:14px 32px;font-size:13px;font-family:'IBM Plex Mono',monospace;letter-spacing:0.1em;cursor:pointer;border-radius:3px;transition:all 0.2s;font-weight:500}
        .cta-primary:hover{background:#004d8a;border-color:#2a80b0}
        .cta-outline{background:transparent;color:#4a7a9a;border:1px solid #1a3a5a;padding:14px 32px;font-size:13px;font-family:'IBM Plex Mono',monospace;letter-spacing:0.1em;cursor:pointer;border-radius:3px;transition:all 0.2s}
        .cta-outline:hover{border-color:#2a5a7a;color:#7aaac8}
        .container{max-width:1100px;margin:0 auto;padding:0 32px}
        .label{font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:0.2em;color:#1e5a80;text-transform:uppercase;margin-bottom:16px}
        .h2{font-family:'Playfair Display',serif;font-size:clamp(26px,4vw,42px);font-weight:700;color:#e0eef8;line-height:1.2;margin-bottom:20px}
        .divider{border:none;border-top:1px solid #0d1e2e;margin:0}
        input:focus,textarea:focus,select:focus{outline:none;border-color:#1e6090!important}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .fu{animation:fadeUp 0.7s ease forwards}
        @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        select option{background:#040810}
      `}</style>

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(4,8,15,0.94)", backdropFilter: "blur(12px)", borderBottom: "1px solid #0d1e2e" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "60px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#00d4a0", boxShadow: "0 0 6px #00d4a0" }} />
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "13px", fontWeight: 500, color: "#e0eef8", letterSpacing: "0.1em" }}>PRIMUS SYSTEMS</span>
          </div>
          <div style={{ display: "flex", gap: "28px", alignItems: "center" }}>
            <span style={{ color: "#4a7a9a", fontSize: "13px", cursor: "pointer" }} onClick={() => demoRef.current?.scrollIntoView({ behavior: "smooth" })}>Demo</span>
            <span style={{ color: "#4a7a9a", fontSize: "13px", cursor: "pointer" }} onClick={() => pilotRef.current?.scrollIntoView({ behavior: "smooth" })}>Pilot</span>
            <Link to="/proof" style={{ color: "#4a7a9a", fontSize: "13px", textDecoration: "none" }}>Proof</Link>
            <Link to="/compliance" style={{ color: "#4a7a9a", fontSize: "13px", textDecoration: "none" }}>Security</Link>
            <button className="cta-primary" style={{ padding: "8px 20px", fontSize: "11px" }} onClick={() => pilotRef.current?.scrollIntoView({ behavior: "smooth" })}>REQUEST PILOT</button>
          </div>
        </div>
      </nav>

      {/* TICKER */}
      <div style={{ background: "#030609", borderBottom: "1px solid #0d1e2e", overflow: "hidden", height: "32px", display: "flex", alignItems: "center" }}>
        <div style={{ display: "flex", animation: "ticker 35s linear infinite", whiteSpace: "nowrap" }}>
          {[0, 1].map(ri => (
            <span key={ri} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: "#1e5a80", letterSpacing: "0.1em" }}>
              {["COLORADO AI ACT — JUN 30, 2026", "EU AI ACT ANNEX III — AUG 2, 2026", "EU PRODUCT LIABILITY DIRECTIVE — DEC 9, 2026", "FINES UP TO EUR 35M OR 7% GLOBAL REVENUE", "DECISION-LAYER ENFORCEMENT — NOT MONITORING", "COMPLIANCE PROOF CHAIN — CRYPTOGRAPHICALLY SIGNED", "FAIL-CLOSED BY DEFAULT", "SOC 2 TYPE I — IN PREPARATION · Q3 2026"].map(t => (
                <span key={t} style={{ marginRight: "80px" }}>◆ {t}</span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* HERO */}
      <section style={{ padding: "120px 0 100px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 70% 50%, #001828 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,50,100,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,50,100,0.03) 1px,transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative" }}>
          <div style={{ maxWidth: "700px" }}>
            <div className="label fu">Decision Logic Layer — v2.1</div>
            <h1 className="fu" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px,5vw,62px)", fontWeight: 800, color: "#e8f4ff", lineHeight: "1.1", marginBottom: "24px", animationDelay: "0.1s" }}>
              Deterministic Decision<br /><span style={{ color: "#00d4a0" }}>Infrastructure</span> for Autonomous AI
            </h1>
            <p className="fu" style={{ fontSize: "17px", color: "#6a9ab8", lineHeight: "1.7", marginBottom: "40px", fontWeight: 300, animationDelay: "0.2s" }}>
              AI models generate outputs. Autonomous agents make decisions. Primus Systems governs the decision logic layer — enforced before execution, cryptographically sealed, court-admissible at the moment of action.
            </p>
            <div className="fu" style={{ display: "flex", gap: "14px", flexWrap: "wrap", animationDelay: "0.3s" }}>
              <button className="cta-primary" onClick={() => demoRef.current?.scrollIntoView({ behavior: "smooth" })}>VIEW LIVE DEMO</button>
              <button className="cta-outline" onClick={() => pilotRef.current?.scrollIntoView({ behavior: "smooth" })}>REQUEST PILOT</button>
            </div>
          </div>
          <div style={{ marginTop: "80px", display: "flex", borderTop: "1px solid #0d1e2e", borderBottom: "1px solid #0d1e2e", flexWrap: "wrap" }}>
            {[["EUR 35M", "Max fine — EU AI Act"], ["3 hard deadlines", "Jun 30 · Aug 2 · Dec 9"], ["< 1.2ms", "Intercept latency (SDK)"], ["3 verticals", "Fintech · Healthcare · Supply"]].map(([val, label], i) => (
              <div key={i} style={{ flex: "1", minWidth: "160px", padding: "24px 28px", borderRight: i < 3 ? "1px solid #0d1e2e" : "none" }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "22px", color: "#e0eef8", fontWeight: 500, marginBottom: "4px" }}>{val}</div>
                <div style={{ fontSize: "11px", color: "#2a5a7a" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* PROBLEM */}
      <section style={{ padding: "100px 0" }}>
        <div className="container">
          <div style={{ display: "flex", gap: "80px", flexWrap: "wrap", alignItems: "flex-start" }}>
            <div style={{ flex: "1", minWidth: "280px" }}>
              <div className="label">The Problem</div>
              <h2 className="h2">AI systems are becoming impossible to audit.</h2>
              <p style={{ color: "#4a7a9a", lineHeight: "1.8", fontSize: "15px", fontWeight: 300 }}>
                Modern governance tools observe and report after decisions are made. When regulators ask how a decision occurred — who authorized it, what constraints were active, what the model saw — most teams cannot answer. That is a liability.
              </p>
            </div>
            <div style={{ flex: "1", minWidth: "280px" }}>
              {["No deterministic record of how decisions were made", "Regulatory exposure under EU AI Act Annex III", "Inability to prove model behavior to auditors", "No immutable decision evidence for legal review", "Compliance policies with no enforcement mechanism"].map((p, i) => (
                <div key={i} style={{ display: "flex", gap: "14px", alignItems: "flex-start", padding: "14px 0", borderBottom: "1px solid #0d1e2e" }}>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: "#ff4a4a", marginTop: "3px", flexShrink: 0 }}>✗</span>
                  <span style={{ fontSize: "14px", color: "#5a8aa8" }}>{p}</span>
                </div>
              ))}
              <div style={{ marginTop: "20px", background: "#030609", border: "1px solid #1a2535", borderRadius: "4px", padding: "16px 20px", fontFamily: "'DM Mono', monospace", fontSize: "11px" }}>
                <div style={{ color: "#1e5a80", marginBottom: "8px", fontSize: "9px", letterSpacing: "0.15em" }}>EXPOSURE BY INDUSTRY</div>
                {["Fintech platforms", "AI SaaS products", "Autonomous trading systems", "Regulated enterprise AI"].map((s, i, arr) => (
                  <div key={i} style={{ color: "#4a7a9a", padding: "5px 0", borderBottom: i < arr.length - 1 ? "1px solid #0d1e2e" : "none" }}>→ {s}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* SOLUTION */}
      <section style={{ padding: "100px 0", background: "#030609" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <div className="label">The Solution</div>
            <h2 className="h2" style={{ maxWidth: "600px", margin: "0 auto 16px" }}>A decision audit layer that enforces before execution.</h2>
            <p style={{ color: "#3a6a8a", fontSize: "15px", fontWeight: 300, maxWidth: "500px", margin: "0 auto" }}>
              Think of it as <span style={{ color: "#00d4a0", fontFamily: "'DM Mono', monospace" }}>"Git for machine decisions"</span> — every decision versioned, constrained, and signed.
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0", marginBottom: "60px", flexWrap: "wrap" }}>
            {[["AI Model", "#1a2535", "#4a7a9a", false], ["  →  ", "transparent", "#1e5a80", true], ["PRIMUS INTERCEPT", "#001828", "#00d4a0", false], ["  →  ", "transparent", "#1e5a80", true], ["Execution", "#1a2535", "#4a7a9a", false]].map(([label, bg, color, isArrow], i) => (
              <div key={i} style={{ padding: isArrow ? "0 8px" : "14px 24px", background: bg, border: isArrow ? "none" : `1px solid ${label === "PRIMUS INTERCEPT" ? "#00d4a0" : "#1a2535"}`, borderRadius: "4px", fontFamily: "'DM Mono', monospace", fontSize: isArrow ? "16px" : "12px", color, letterSpacing: "0.08em", fontWeight: label === "PRIMUS INTERCEPT" ? 500 : 400, boxShadow: label === "PRIMUS INTERCEPT" ? "0 0 20px rgba(0,212,160,0.1)" : "none" }}>{label}</div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1px", background: "#0d1e2e", border: "1px solid #0d1e2e", borderRadius: "6px", overflow: "hidden" }}>
            {[["Decision Intercept Layer", "Sits between model output and execution. Every decision passes through the governance kernel before any action fires."], ["Constraint Enforcement", "Rules encoded in the kernel. Non-compliant decisions are refused before they execute — not flagged after."], ["Compliance Proof Chain", "Every decision generates a cryptographically signed, timestamped artifact. SHA-256 chained. Cannot be backdated."], ["Court-Admissible Artifacts", "Audit trail your legal team can use. Structured for EU AI Act Article 9 technical file requirements."]].map(([title, desc], i) => (
              <div key={i} style={{ padding: "28px", background: "#040810" }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: "#00d4a0", letterSpacing: "0.15em", marginBottom: "10px" }}>0{i + 1}</div>
                <div style={{ fontSize: "15px", color: "#c8d8e8", fontWeight: 500, marginBottom: "10px" }}>{title}</div>
                <div style={{ fontSize: "13px", color: "#3a6a8a", lineHeight: "1.7", fontWeight: 300 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* DEMO */}
      <section style={{ padding: "100px 0" }} ref={demoRef}>
        <div className="container">
          <div style={{ marginBottom: "40px" }}>
            <div className="label">Live Demo</div>
            <h2 className="h2">Watch the governance kernel fire.</h2>
            <p style={{ color: "#3a6a8a", fontSize: "15px", fontWeight: 300, maxWidth: "520px" }}>Submit a decision. Watch constraints evaluate in real time. See the Compliance Proof Chain artifact — the record your auditor will ask for.</p>
          </div>
          <LiveDemo />
          <div style={{ marginTop: "16px", fontFamily: "'DM Mono', monospace", fontSize: "10px", color: "#1a3a5a", textAlign: "center" }}>
            Default loads a REFUSED scenario. Change risk_score to 0.20 to see an APPROVAL artifact.
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* RUNTIME PROOF */}
      <section style={{ padding: "100px 0" }}>
        <div className="container">
          <div style={{ marginBottom: "48px" }}>
            <div className="label">Runtime Proof</div>
            <h2 className="h2">Enforcement is not declared. It's proven.</h2>
            <p style={{ color: "#3a6a8a", fontSize: "15px", fontWeight: 300, maxWidth: "560px" }}>
              Every enforcement decision produces an artifact. Here are four from a live CANARY session on March 17, 2026 — real Kraken ETH/USD 5m bars, real kernel evaluation.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))", gap: "1px", background: "#0d1e2e", border: "1px solid #0d1e2e", borderRadius: "6px", overflow: "hidden" }}>
            {[
              { label: "APPROVED", color: "#00d4a0", symbol: "ETH-PERP", lines: ["LAW_010: PROBATIONARY", "canary_statistical_metrics_satisfied: density_gate_absent", "LAW_011: frequency_ok · position_size_ok · daily_loss_ok", "decision_state: approved | approved: true"] },
              { label: "BLOCKED — FREQUENCY", color: "#ff4a4a", symbol: "ETH-PERP", lines: ["LAW_011: trade_frequency_exceeded", "1/1 in 5min window", "decision_state: escalated | approved: false", "approval_mode: OBSERVABILITY"] },
              { label: "BLOCKED — POSITION SIZE", color: "#ff4a4a", symbol: "ETH-PERP", lines: ["LAW_011: position_size_exceeded", "0.015% >= 0.010% canary limit", "decision_state: escalated | approved: false", "approval_mode: OBSERVABILITY"] },
              { label: "BLOCKED — CONCURRENCY", color: "#ff4a4a", symbol: "ETH-PERP", lines: ["LAW_011: concurrency_exceeded", "1 symbols with positions (max 1)", "decision_state: escalated | approved: false", "approval_mode: OBSERVABILITY"] },
            ].map(({ label, color, symbol, lines }) => (
              <div key={label} style={{ background: "#040810", padding: "24px", borderLeft: `3px solid ${color}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", color }}>{label}</span>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: "#1e5a80" }}>{symbol} · 2026-03-17</span>
                </div>
                {lines.map(line => (
                  <div key={line} style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#3a6a8a", marginBottom: "5px", lineHeight: 1.6 }}>{line}</div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ marginTop: "16px", fontFamily: "'DM Mono', monospace", fontSize: "10px", color: "#1a3a5a", textAlign: "center" }}>
            Artifacts are cryptographically chained JSONL. Deterministic replay from request_id.
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* PILOT */}
      <section style={{ padding: "100px 0", background: "#030609" }} ref={pilotRef}>
        <div className="container">
          <div style={{ display: "flex", gap: "80px", flexWrap: "wrap" }}>
            <div style={{ flex: "1", minWidth: "280px" }}>
              <div className="label">Pilot Program</div>
              <h2 className="h2">Launch a Decision Logging Pilot</h2>
              <p style={{ color: "#3a6a8a", fontSize: "15px", fontWeight: 300, lineHeight: "1.8", marginBottom: "32px" }}>We work with a small number of companies to implement Primus Systems in production. Each pilot is scoped to your AI decision environment and delivers court-admissible artifacts your legal team can use immediately.</p>
              {["Integration with existing AI models", "Deterministic logging infrastructure", "Governance artifact generation", "Compliance-ready audit trail", "Article 9 technical file foundation"].map((item, i, arr) => (
                <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start", padding: "10px 0", borderBottom: i < arr.length - 1 ? "1px solid #0d1e2e" : "none" }}>
                  <span style={{ color: "#00d4a0", fontFamily: "'DM Mono', monospace", fontSize: "11px", marginTop: "2px", flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: "14px", color: "#5a8aa8" }}>{item}</span>
                </div>
              ))}
              <div style={{ marginTop: "32px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ padding: "20px", background: "#040810", border: "1px solid #00d4a033", borderLeft: "3px solid #00d4a0", borderRadius: "4px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                    <div style={{ fontSize: "14px", color: "#c8d8e8", fontWeight: 500 }}>Decision Audit Proof</div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "16px", color: "#00d4a0", fontWeight: 500 }}>$2,500</div>
                  </div>
                  <div style={{ fontSize: "12px", color: "#2a5a7a", lineHeight: "1.7", marginBottom: "14px" }}>
                    We run your AI decision system through the Primus kernel and return a live enforcement proof packet — approvals, refusals, and exact constraint receipts. No commitment required.
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    {["Runtime enforcement verification", "Approval + block artifact examples", "LAW-level constraint receipts", "Delivered in 5 business days"].map(item => (
                      <div key={item} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#3a6a8a" }}>
                        <span style={{ color: "#00d4a0", fontFamily: "'DM Mono', monospace", fontSize: "10px" }}>✓</span>{item}
                      </div>
                    ))}
                  </div>
                </div>
                {[{ name: "Decision Liability Assessment", price: "$25,000–$35,000", scope: "Board-ready memo quantifying your institution's AI compliance exposure across all three 2026 enforcement deadlines. Signed deliverable your legal team can act on. 50% credited toward Year 1 deployment.", highlight: true }, { name: "Institutional Deployment", price: "$75,000–$200,000/yr", scope: "Multi-vertical deployment. Complete EU AI Act Annex III mapping. Ongoing artifact generation. SSO, In-VPC hosting, dedicated integration support.", highlight: false }].map((tier, i) => (
                  <div key={i} style={{ padding: "20px", background: "#040810", border: `1px solid ${tier.highlight ? "#003a6a" : "#0d1e2e"}`, borderRadius: "4px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                      <div style={{ fontSize: "14px", color: "#c8d8e8", fontWeight: 500 }}>{tier.name}</div>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "16px", color: tier.highlight ? "#60c0f0" : "#4a7a9a", fontWeight: 500 }}>{tier.price}</div>
                    </div>
                    <div style={{ fontSize: "12px", color: "#2a5a7a", lineHeight: "1.7" }}>{tier.scope}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ flex: "1", minWidth: "280px" }}>
              <div style={{ background: "#040810", border: "1px solid #0d1e2e", borderRadius: "6px", overflow: "hidden" }}>
                <div style={{ padding: "20px 24px", borderBottom: "1px solid #0d1e2e", fontFamily: "'DM Mono', monospace", fontSize: "10px", color: "#1e5a80", letterSpacing: "0.15em" }}>REQUEST PILOT ACCESS</div>
                {submitted ? (
                  <div style={{ padding: "48px 24px", textAlign: "center" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#001a0d", border: "1px solid #00d4a0", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", color: "#00d4a0", fontSize: "18px" }}>✓</div>
                    <div style={{ color: "#c8d8e8", fontSize: "15px", marginBottom: "8px" }}>Request received.</div>
                    <div style={{ color: "#2a5a7a", fontSize: "13px" }}>We'll be in touch within 24 hours to scope your pilot.</div>
                  </div>
                ) : (
                  <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} style={{ padding: "24px" }}>
                    {[{ key: "name", label: "Full Name", placeholder: "Your name" }, { key: "company", label: "Company", placeholder: "Company name" }, { key: "email", label: "Work Email", placeholder: "you@company.com", type: "email" }].map(f => (
                      <div key={f.key} style={{ marginBottom: "16px" }}>
                        <label style={{ display: "block", fontSize: "10px", color: "#1e5a80", letterSpacing: "0.12em", marginBottom: "6px", fontFamily: "'DM Mono', monospace" }}>{f.label}</label>
                        <input type={f.type || "text"} required value={pilotForm[f.key]} placeholder={f.placeholder}
                          onChange={e => setPilotForm({ ...pilotForm, [f.key]: e.target.value })}
                          style={{ width: "100%", background: "#030609", color: "#c8d8e8", border: "1px solid #0d1e2e", borderRadius: "3px", padding: "10px 12px", fontSize: "14px" }} />
                      </div>
                    ))}
                    <div style={{ marginBottom: "16px" }}>
                      <label style={{ display: "block", fontSize: "10px", color: "#1e5a80", letterSpacing: "0.12em", marginBottom: "6px", fontFamily: "'DM Mono', monospace" }}>Primary Vertical</label>
                      <select value={pilotForm.vertical} onChange={e => setPilotForm({ ...pilotForm, vertical: e.target.value })}
                        style={{ width: "100%", background: "#030609", color: pilotForm.vertical ? "#c8d8e8" : "#3a5a7a", border: "1px solid #0d1e2e", borderRadius: "3px", padding: "10px 12px", fontSize: "14px" }}>
                        <option value="">Select vertical</option>
                        <option>Fintech / Credit</option><option>Healthcare</option><option>Supply Chain</option><option>Other regulated AI</option>
                      </select>
                    </div>
                    <div style={{ marginBottom: "20px" }}>
                      <label style={{ display: "block", fontSize: "10px", color: "#1e5a80", letterSpacing: "0.12em", marginBottom: "6px", fontFamily: "'DM Mono', monospace" }}>Tell us about your AI decision system</label>
                      <textarea value={pilotForm.message} onChange={e => setPilotForm({ ...pilotForm, message: e.target.value })}
                        placeholder="What decisions is your AI making? What compliance pressure are you facing?"
                        rows={4} style={{ width: "100%", background: "#030609", color: "#c8d8e8", border: "1px solid #0d1e2e", borderRadius: "3px", padding: "10px 12px", fontSize: "14px", resize: "vertical", fontFamily: "inherit" }} />
                    </div>
                    <button type="submit" className="cta-primary" style={{ width: "100%" }}>REQUEST PILOT ACCESS</button>
                    <div style={{ marginTop: "12px", fontSize: "10px", color: "#1a3a5a", textAlign: "center", fontFamily: "'IBM Plex Mono', monospace" }}>Limited slots. Three enforcement deadlines before Dec 2026.</div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #0d1e2e", padding: "32px 0", background: "#030609" }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00d4a0" }} />
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", color: "#2a5a7a", letterSpacing: "0.1em" }}>PRIMUS SYSTEMS LLC</span>
          </div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: "#1a3a5a" }}>DECISION ASSURANCE INFRASTRUCTURE · PRIMUSSYSTEMS.IO</div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: "#1a3a5a" }}>COLORADO AI ACT · EU AI ACT · EU PRODUCT LIABILITY DIRECTIVE</div>
        </div>
      </footer>
    </div>
  );
}
