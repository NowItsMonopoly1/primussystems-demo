# Primus OS — Decision Proof Packet v1
**Decision ID:** PQ-2026-03-15-0001  
**System:** PrimusQuant (Primus OS v0.1.0)  
**Issued by:** Primus Systems LLC

---

## What This Packet Proves

This packet contains a complete, independently verifiable record of a single governed AI decision.

It demonstrates three properties that most AI systems cannot provide:

1. **Determinism** — Given the same inputs and ruleset, the system always produces the same decision.
2. **Constraint enforcement** — A risk governor layer evaluated hard limits before the decision executed.
3. **Tamper evidence** — A SHA-256 hash of the decision record detects any post-hoc modification.

---

## Contents

| File | Purpose |
|------|---------|
| `decision.json` | The decision record — outcome, inputs reference, rules evaluated, hash |
| `inputs_snapshot.json` | The exact market and portfolio state at decision time |
| `ruleset.yaml` | The governance rules evaluated, with observed values and pass/fail |
| `risk_governor.yaml` | The hard constraints applied after ruleset passed |
| `decision_hash.txt` | SHA-256 hash of the canonical decision record |
| `replay_decision.py` | Verification script — re-evaluates rules and confirms hash match |

---

## How to Verify

**Requirements:** Python 3.8+, PyYAML (`pip install pyyaml`)

```bash
python replay_decision.py
```

**Expected output:**

```
============================================================
  PRIMUS OS — Decision Replay Verification
============================================================

[1] Loaded decision: PQ-2026-03-15-0001
    Original outcome: execute_trade
    Original hash:    e522bd30a03d94323c337ed26d7bbcde6b43428d0c36821ecd822ca06fba21b4

[2] Re-evaluating governance ruleset...
    ✓ R-001 trend_above_MA20: PASS
    ✓ R-002 pullback_within_range: PASS
    ✓ R-003 volume_impulse_confirmed: PASS
    ✓ R-004 funding_rate_not_extreme: PASS

[3] Re-evaluating risk governor...
    ✓ G-001 daily_loss_cap: PASS
    ...

  ✓ REPLAY SUCCESSFUL
  ✓ Hash match: confirmed
  ✓ Decision is deterministic and tamper-evident.
```

---

## Decision Summary

**Asset:** SOL-PERP (Drift Protocol)  
**Signal:** Long entry — momentum pullback confirmed  
**Confidence:** 0.71  
**Rules passed:** 4/4  
**Governor constraints passed:** 4/4  
**Outcome:** `execute_trade`  
**Size:** 0.25 SOL  
**Timestamp:** 2026-03-15T14:22:19Z  

---

## What the Hash Proves

The `decision_hash` field in `decision.json` is a SHA-256 hash of the canonical decision record (all fields except the hash itself, sorted and serialized to JSON).

If any field in `decision.json` is modified after the fact — outcome, timestamp, inputs reference, rules evaluated — the replay script will detect a hash mismatch and exit with an error.

This is the foundation of Primus OS audit-first architecture: **decisions are sealed at execution time**.

---

## About Primus OS

Primus OS is algorithmic decision control infrastructure. It intercepts AI-generated decisions, evaluates them against a defined ruleset and risk governor, blocks non-compliant actions, and generates cryptographically sealed audit artifacts at execution time.

**primussystems.io** | contact@primussystems.io
