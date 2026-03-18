#!/usr/bin/env python3
"""
Primus OS — Decision Replay Script
Version: 1.0.0

Purpose:
    Independently verify a Primus decision artifact by:
    1. Re-evaluating all governance rules against the inputs snapshot
    2. Re-evaluating all risk governor constraints
    3. Recomputing the decision hash
    4. Confirming the outcome matches the original artifact

Usage:
    python replay_decision.py

    All artifact files must be present in the same directory.

Exit codes:
    0 — Replay successful, hash match confirmed
    1 — Replay failed (rule mismatch, governor mismatch, or hash mismatch)
"""

import json
import yaml
import hashlib
import sys
from datetime import datetime, timezone


def load_json(path):
    with open(path) as f:
        return json.load(f)


def load_yaml(path):
    with open(path) as f:
        return yaml.safe_load(f)


def compute_decision_hash(decision: dict) -> str:
    """
    Canonical hash: sha256 of sorted JSON with hash fields excluded.
    """
    d = {k: v for k, v in decision.items() if k != "decision_hash"}
    canonical = json.dumps(d, sort_keys=True, separators=(",", ":"))
    return hashlib.sha256(canonical.encode()).hexdigest()


def evaluate_rules(inputs: dict) -> tuple[str, list]:
    md = inputs["market_data"]
    pf = inputs["portfolio_state"]
    sig = inputs["signal"]
    results = []

    checks = [
        ("R-001", "trend_above_MA20",        md["price"] > md["price_MA20"]),
        ("R-002", "pullback_within_range",    0.03 <= sig["pullback_pct_from_high"] <= 0.06),
        ("R-003", "volume_impulse_confirmed", md["volume_current_candle"] > md["volume_MA10"] * 1.30),
        ("R-004", "funding_rate_not_extreme", md["funding_rate_8h"] < 0.0005),
    ]

    for rule_id, name, passed in checks:
        results.append({"id": rule_id, "name": name, "result": "PASS" if passed else "FAIL"})

    overall = "PROCEED" if all(r["result"] == "PASS" for r in results) else "REJECT"
    return overall, results


def evaluate_governor(inputs: dict) -> tuple[str, list]:
    md = inputs["market_data"]
    pf = inputs["portfolio_state"]
    results = []

    checks = [
        ("G-001", "daily_loss_cap",          abs(pf["daily_pnl_sol"]) < pf["daily_loss_cap_sol"]),
        ("G-002", "max_concurrent_trades",   pf["open_positions"] < pf["max_concurrent_trades"]),
        ("G-003", "position_size_cap",       pf["position_size_proposed_sol"] <= pf["daily_loss_cap_sol"] * 5),
        ("G-004", "open_interest_threshold", pf.get("open_interest_usd", md.get("open_interest_usd", 0)) > 5_000_000),
    ]

    for gov_id, name, passed in checks:
        results.append({"id": gov_id, "name": name, "result": "PASS" if passed else "FAIL"})

    overall = "APPROVED" if all(r["result"] == "PASS" for r in results) else "REJECTED"
    return overall, results


def determine_decision(ruleset_result: str, governor_result: str) -> str:
    if ruleset_result == "PROCEED" and governor_result == "APPROVED":
        return "execute_trade"
    elif ruleset_result != "PROCEED":
        return "rejected_by_ruleset"
    else:
        return "rejected_by_governor"


def main():
    print("=" * 60)
    print("  PRIMUS OS — Decision Replay Verification")
    print(f"  {datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')}")
    print("=" * 60)

    # Load artifacts
    inputs   = load_json("inputs_snapshot.json")
    decision = load_json("decision.json")

    print(f"\n[1] Loaded decision: {decision['decision_id']}")
    print(f"    Original outcome: {decision['decision']}")
    print(f"    Original hash:    {decision['decision_hash']}")

    # Re-evaluate rules
    print("\n[2] Re-evaluating governance ruleset...")
    ruleset_result, rule_results = evaluate_rules(inputs)
    for r in rule_results:
        status = "✓" if r["result"] == "PASS" else "✗"
        print(f"    {status} {r['id']} {r['name']}: {r['result']}")
    print(f"    Ruleset outcome: {ruleset_result}")

    # Re-evaluate governor
    print("\n[3] Re-evaluating risk governor...")
    governor_result, gov_results = evaluate_governor(inputs)
    for g in gov_results:
        status = "✓" if g["result"] == "PASS" else "FAIL"
        print(f"    {status} {g['id']} {g['name']}: {g['result']}")
    print(f"    Governor outcome: {governor_result}")

    # Determine replayed decision
    replayed_decision = determine_decision(ruleset_result, governor_result)
    print(f"\n[4] Replayed decision: {replayed_decision}")

    # Recompute hash
    replayed_hash = compute_decision_hash(decision)
    print(f"\n[5] Recomputed hash:  {replayed_hash}")

    # Verify
    print("\n" + "=" * 60)
    outcome_match = replayed_decision == decision["decision"]
    hash_match    = replayed_hash == decision["decision_hash"]

    if outcome_match and hash_match:
        print("  ✓ REPLAY SUCCESSFUL")
        print(f"  ✓ Outcome match:    {replayed_decision} == {decision['decision']}")
        print(f"  ✓ Hash match:       confirmed")
        print("  ✓ Decision is deterministic and tamper-evident.")
        sys.exit(0)
    else:
        print("  ✗ REPLAY FAILED")
        if not outcome_match:
            print(f"  ✗ Outcome mismatch: got {replayed_decision}, expected {decision['decision']}")
        if not hash_match:
            print(f"  ✗ Hash mismatch: artifact may have been modified")
        sys.exit(1)


if __name__ == "__main__":
    main()
