export default function ProofArtifact() {
  return (
    <>
      <style>{`
        .proof-wrapper *, .proof-wrapper *::before, .proof-wrapper *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .proof-page {
          font-family: 'IBM Plex Sans', sans-serif;
          background: #080a0c;
          color: #8ca8bc;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 24px;
          position: relative;
          overflow-x: hidden;
        }

        .proof-page::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(#1e2a35 1px, transparent 1px),
            linear-gradient(90deg, #1e2a35 1px, transparent 1px);
          background-size: 48px 48px;
          opacity: 0.25;
          pointer-events: none;
        }

        .proof-page::after {
          content: '';
          position: fixed;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #00a8e8, transparent);
          animation: proof-scan 6s ease-in-out infinite;
          opacity: 0.4;
          pointer-events: none;
        }

        @keyframes proof-scan {
          0%   { top: 0%;   opacity: 0; }
          5%   { opacity: 0.4; }
          95%  { opacity: 0.4; }
          100% { top: 100%; opacity: 0; }
        }

        .proof-wrapper {
          width: 100%;
          max-width: 860px;
          position: relative;
          z-index: 1;
        }

        .proof-header {
          margin-bottom: 48px;
          opacity: 0;
          transform: translateY(-12px);
          animation: proof-rise 0.6s ease forwards 0.1s;
        }
        .proof-header-tag {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #00a8e8;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .proof-header-tag::before {
          content: '';
          display: block;
          width: 24px;
          height: 1px;
          background: #00a8e8;
        }
        .proof-h1 {
          font-family: 'IBM Plex Mono', monospace;
          font-size: clamp(22px, 4vw, 34px);
          font-weight: 600;
          color: #e8f2f8;
          line-height: 1.2;
          letter-spacing: -0.01em;
          margin-bottom: 16px;
        }
        .proof-h1 span { color: #00a8e8; }
        .proof-header-sub {
          font-size: 15px;
          font-weight: 300;
          color: #5a7a94;
          line-height: 1.6;
          max-width: 560px;
        }

        .proof-claims {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: #1e2a35;
          border: 1px solid #1e2a35;
          margin-bottom: 32px;
          opacity: 0;
          transform: translateY(8px);
          animation: proof-rise 0.6s ease forwards 0.25s;
        }
        .proof-claim {
          background: #0d1117;
          padding: 20px 22px;
        }
        .proof-claim-num {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.14em;
          color: #3a5068;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .proof-claim-title {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px;
          font-weight: 600;
          color: #00a8e8;
          margin-bottom: 6px;
          letter-spacing: 0.04em;
        }
        .proof-claim-body {
          font-size: 12px;
          font-weight: 300;
          color: #5a7a94;
          line-height: 1.5;
        }

        .proof-packet-header {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #3a5068;
          margin-bottom: 12px;
          opacity: 0;
          animation: proof-rise 0.5s ease forwards 0.4s;
        }

        .proof-file-list {
          border: 1px solid #1e2a35;
          background: #0d1117;
          margin-bottom: 32px;
          opacity: 0;
          transform: translateY(8px);
          animation: proof-rise 0.5s ease forwards 0.45s;
        }
        .proof-file-row {
          display: grid;
          grid-template-columns: 220px 1fr auto;
          align-items: center;
          padding: 13px 20px;
          border-bottom: 1px solid #1e2a35;
          transition: background 0.15s;
          gap: 16px;
        }
        .proof-file-row:last-child { border-bottom: none; }
        .proof-file-row:hover { background: #111820; }
        .proof-file-name {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px;
          font-weight: 500;
          color: #c8dce8;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .proof-file-icon {
          width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .proof-file-desc {
          font-size: 12px;
          font-weight: 300;
          color: #5a7a94;
        }
        .proof-file-type {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.1em;
          color: #3a5068;
          text-transform: uppercase;
          text-align: right;
        }

        .proof-terminal-label {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #3a5068;
          margin-bottom: 12px;
          opacity: 0;
          animation: proof-rise 0.5s ease forwards 0.55s;
        }

        .proof-terminal {
          background: #060d10;
          border: 1px solid #1e2a35;
          padding: 20px 24px;
          margin-bottom: 32px;
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(8px);
          animation: proof-rise 0.5s ease forwards 0.6s;
        }
        .proof-terminal::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 10%, #004d6e, #00a8e8, #004d6e, transparent 90%);
        }
        .proof-term-bar {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid #1e2a35;
        }
        .proof-dot { width: 8px; height: 8px; border-radius: 50%; }
        .proof-dot-r { background: #3a1515; border: 1px solid #5a2020; }
        .proof-dot-y { background: #3a3015; border: 1px solid #5a5020; }
        .proof-dot-g { background: #153a20; border: 1px solid #205a30; }
        .proof-term-title {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10px;
          color: #3a5068;
          margin-left: 8px;
          letter-spacing: 0.06em;
        }
        .proof-term-line {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px;
          line-height: 1.8;
          white-space: pre;
        }
        .t-dim    { color: #3a5068; }
        .t-muted  { color: #5a7a94; }
        .t-body   { color: #8ca8bc; }
        .t-bright { color: #c8dce8; }
        .t-accent { color: #00a8e8; }
        .t-green  { color: #00c47a; }
        .t-amber  { color: #f0a000; }
        .t-white  { color: #e8f2f8; }

        .proof-cursor {
          display: inline-block;
          width: 7px;
          height: 13px;
          background: #00a8e8;
          vertical-align: middle;
          animation: proof-blink 1.1s step-end infinite;
        }
        @keyframes proof-blink { 50% { opacity: 0; } }

        .proof-hash-strip {
          background: #0d1117;
          border: 1px solid #1e2a35;
          padding: 14px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 32px;
          opacity: 0;
          animation: proof-rise 0.5s ease forwards 0.7s;
          flex-wrap: wrap;
        }
        .proof-hash-label {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #3a5068;
          flex-shrink: 0;
        }
        .proof-hash-value {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          color: #5a7a94;
          letter-spacing: 0.04em;
          word-break: break-all;
          flex: 1;
        }
        .proof-hash-value span { color: #00a8e8; }
        .proof-hash-algo {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #00c47a;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .proof-hash-algo::before {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #00c47a;
          display: block;
        }

        .proof-download-area {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
          opacity: 0;
          animation: proof-rise 0.5s ease forwards 0.8s;
        }
        .proof-download-meta {
          font-size: 12px;
          font-weight: 300;
          color: #5a7a94;
          line-height: 1.6;
        }
        .proof-download-meta strong {
          font-family: 'IBM Plex Mono', monospace;
          font-weight: 500;
          color: #8ca8bc;
        }
        .proof-download-meta code {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          color: #5a7a94;
        }

        .proof-btn-download {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: transparent;
          border: 1px solid #00a8e8;
          color: #00a8e8;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 14px 28px;
          cursor: pointer;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          transition: color 0.2s, border-color 0.2s;
          flex-shrink: 0;
        }
        .proof-btn-download::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #00a8e8;
          transform: translateX(-101%);
          transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .proof-btn-download:hover { color: #080a0c; border-color: #00a8e8; }
        .proof-btn-download:hover::before { transform: translateX(0); }
        .proof-btn-download span { position: relative; z-index: 1; display: flex; align-items: center; gap: 10px; }

        .proof-footnote {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #1e2a35;
          display: flex;
          align-items: flex-start;
          gap: 12px;
          opacity: 0;
          animation: proof-rise 0.5s ease forwards 0.9s;
        }
        .proof-footnote-mark {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.14em;
          color: #3a5068;
          text-transform: uppercase;
          flex-shrink: 0;
          padding-top: 2px;
        }
        .proof-footnote-text {
          font-size: 12px;
          font-weight: 300;
          color: #3a5068;
          line-height: 1.6;
        }
        .proof-footnote-text a {
          color: #5a7a94;
          text-decoration: none;
          border-bottom: 1px solid #2a3f52;
        }
        .proof-footnote-text a:hover { color: #c8dce8; border-color: #8ca8bc; }

        @keyframes proof-rise {
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 640px) {
          .proof-claims { grid-template-columns: 1fr; }
          .proof-file-row { grid-template-columns: 1fr auto; }
          .proof-file-desc { display: none; }
          .proof-hash-strip { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <div className="proof-page">
        <div className="proof-wrapper">

          <div className="proof-header">
            <div className="proof-header-tag">Primus OS · Proof Artifact · v1.0</div>
            <h1 className="proof-h1">Machine decisions that are<br /><span>verifiable by design.</span></h1>
            <p className="proof-header-sub">
              Download a complete governed decision artifact from PrimusQuant. Re-evaluate every rule, confirm every constraint, verify the hash. No trust required.
            </p>
          </div>

          <div className="proof-claims">
            <div className="proof-claim">
              <div className="proof-claim-num">Proof 01</div>
              <div className="proof-claim-title">Deterministic</div>
              <div className="proof-claim-body">Same inputs produce the same decision. Every time. Verifiable on your machine.</div>
            </div>
            <div className="proof-claim">
              <div className="proof-claim-num">Proof 02</div>
              <div className="proof-claim-title">Governed</div>
              <div className="proof-claim-body">Every decision passes a ruleset and a risk governor before execution. No exceptions.</div>
            </div>
            <div className="proof-claim">
              <div className="proof-claim-num">Proof 03</div>
              <div className="proof-claim-title">Tamper-evident</div>
              <div className="proof-claim-body">SHA-256 hash seals the record at execution time. Any modification is immediately detectable.</div>
            </div>
          </div>

          <div className="proof-packet-header">Packet Contents — primus_proof_packet_v1.zip</div>
          <div className="proof-file-list">
            {[
              { name: "decision.json", desc: "Decision record — outcome, rules evaluated, governor result, hash", type: "JSON", accent: true },
              { name: "inputs_snapshot.json", desc: "Exact market and portfolio state at decision time, with inputs hash", type: "JSON", accent: false },
              { name: "ruleset.yaml", desc: "Governance rules evaluated against inputs, with observed values", type: "YAML", accent: false },
              { name: "risk_governor.yaml", desc: "Hard constraint enforcement layer — fail-closed by design", type: "YAML", accent: false },
              { name: "replay_decision.py", desc: "Verification script — re-evaluates rules and confirms hash match", type: "Python", accent: false, green: true },
            ].map(({ name, desc, type, accent, green }) => (
              <div className="proof-file-row" key={name}>
                <div className="proof-file-name">
                  <div className="proof-file-icon">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <rect x="1" y="1" width="12" height="12" rx="1" stroke={green ? "#00c47a" : accent ? "#00a8e8" : "#5a7a94"} strokeWidth="1"/>
                      {green
                        ? <path d="M4 5l2 2-2 2M8 9h2" stroke="#00c47a" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                        : <path d="M4 5h6M4 7h6M4 9h4" stroke={accent ? "#00a8e8" : "#5a7a94"} strokeWidth="1" strokeLinecap="round"/>
                      }
                    </svg>
                  </div>
                  {name}
                </div>
                <div className="proof-file-desc">{desc}</div>
                <div className="proof-file-type">{type}</div>
              </div>
            ))}
          </div>

          <div className="proof-terminal-label">Replay Output — python replay_decision.py</div>
          <div className="proof-terminal">
            <div className="proof-term-bar">
              <div className="proof-dot proof-dot-r"></div>
              <div className="proof-dot proof-dot-y"></div>
              <div className="proof-dot proof-dot-g"></div>
              <div className="proof-term-title">replay_decision.py</div>
            </div>

            <div className="proof-term-line t-dim">════════════════════════════════════════════════════════════</div>
            <div className="proof-term-line t-bright">  PRIMUS OS — Decision Replay Verification</div>
            <div className="proof-term-line t-dim">════════════════════════════════════════════════════════════</div>
            <div className="proof-term-line"> </div>
            <div className="proof-term-line t-body">[1] Loaded decision: <span className="t-accent">PQ-2026-03-15-0001</span></div>
            <div className="proof-term-line t-muted">    Original outcome: <span className="t-bright">execute_trade</span></div>
            <div className="proof-term-line t-muted">    Original hash:    <span className="t-dim">e522bd30a03d94...b4</span></div>
            <div className="proof-term-line"> </div>
            <div className="proof-term-line t-body">[2] Re-evaluating governance ruleset...</div>
            <div className="proof-term-line t-green">    ✓ R-001  trend_above_MA20           PASS</div>
            <div className="proof-term-line t-green">    ✓ R-002  pullback_within_range       PASS</div>
            <div className="proof-term-line t-green">    ✓ R-003  volume_impulse_confirmed    PASS</div>
            <div className="proof-term-line t-green">    ✓ R-004  funding_rate_not_extreme    PASS</div>
            <div className="proof-term-line"> </div>
            <div className="proof-term-line t-body">[3] Re-evaluating risk governor...</div>
            <div className="proof-term-line t-green">    ✓ G-001  daily_loss_cap             PASS</div>
            <div className="proof-term-line t-green">    ✓ G-002  max_concurrent_trades      PASS</div>
            <div className="proof-term-line t-green">    ✓ G-003  position_size_cap          PASS</div>
            <div className="proof-term-line t-green">    ✓ G-004  open_interest_threshold    PASS</div>
            <div className="proof-term-line"> </div>
            <div className="proof-term-line t-dim">════════════════════════════════════════════════════════════</div>
            <div className="proof-term-line t-green">  ✓ REPLAY SUCCESSFUL</div>
            <div className="proof-term-line t-green">  ✓ Outcome match:    execute_trade == execute_trade</div>
            <div className="proof-term-line t-green">  ✓ Hash match:       confirmed</div>
            <div className="proof-term-line t-green">  ✓ Decision is deterministic and tamper-evident.</div>
            <div className="proof-term-line t-dim">════════════════════════════════════════════════════════════</div>
            <div className="proof-term-line"> </div>
            <div className="proof-term-line t-muted">$ <span className="proof-cursor"></span></div>
          </div>

          <div className="proof-hash-strip">
            <div className="proof-hash-label">Decision Hash</div>
            <div className="proof-hash-value"><span>e522bd30</span>a03d94323c337ed26d7bbcde6b43428d0c36821ecd822ca06fba21b4</div>
            <div className="proof-hash-algo">SHA-256 · Verified</div>
          </div>

          <div className="proof-download-area">
            <div className="proof-download-meta">
              <strong>primus_proof_packet_v1.zip</strong> · 7.3 KB · 7 files<br />
              Requires Python 3.8+ · <code>pip install pyyaml</code>
            </div>
            <a className="proof-btn-download" href="/downloads/primus_proof_packet_v1.zip" download>
              <span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1v8M4 6l3 3 3-3M2 11h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Download Proof Packet
              </span>
            </a>
          </div>

          <div className="proof-footnote">
            <div className="proof-footnote-mark">Note</div>
            <div className="proof-footnote-text">
              This artifact demonstrates a single governed trade decision on SOL-PERP via Drift Protocol. The replay script is self-contained — no Primus account or API key required. Questions about enterprise deployment or the Decision Liability Review program: <a href="mailto:contact@primussystems.io">contact@primussystems.io</a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
