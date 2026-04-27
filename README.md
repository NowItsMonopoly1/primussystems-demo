# Primus Systems Demo

Decision proof packet demonstrating deterministic decision infrastructure, pre-execution checks, replay verification, and tamper-evident audit artifacts.

This repo is a public-safe proof artifact. It shows how a single decision can be packaged with inputs, rules, governor constraints, a hash, and a replay script so that another reviewer can verify what happened.

## What This Demonstrates

- Deterministic rule evaluation from a fixed input snapshot.
- Pre-execution governor checks before action.
- Tamper-evident SHA-256 decision records.
- Replayable proof artifacts for audit review.
- Clear separation between public demo data and private/live systems.

## What This Does Not Claim

- It is not a live trading system.
- It does not provide financial advice.
- It does not expose private trading logic, accounts, wallets, credentials, or runtime logs.
- It does not claim production-grade compliance readiness.

## Contents

| File | Purpose |
| --- | --- |
| `decision.json` | Synthetic decision record and outcome. |
| `inputs_snapshot.json` | Fixed input snapshot used for replay. |
| `ruleset.yaml` | Deterministic rules evaluated during replay. |
| `risk_governor.yaml` | Hard constraints checked before execution. |
| `decision_hash.txt` | Hash for tamper-evidence. |
| `replay_decision.py` | Verification script for replaying the proof packet. |

## Safe Demo Path

```bash
pip install pyyaml
python replay_decision.py
```

Expected result: the replay script re-evaluates the public sample and confirms the decision hash.

## Public/Private Boundary

All public examples should remain synthetic. Do not add private market feeds, account data, exchange credentials, wallet information, live execution logs, or proprietary strategy logic.

## Topic Recommendations

`auditability`, `decision-infrastructure`, `deterministic-systems`, `replayable-proof`, `ai-governance`, `public-safe-demo`
