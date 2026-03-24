# FundingPips 2-Step Spec

Last updated: 2026-03-23

This file captures the current working specification for the first supported prop
program in PairGrid. It combines:

- user-provided business requirements from the product thread
- public FundingPips rules that should be re-verified before hard enforcement

## Program

- Prop firm: `FundingPips`
- Program: `2-Step Evaluation`
- Supported sizes at launch:
  - `25_000 USD`
  - `50_000 USD`
  - `100_000 USD`

## Phases

### Student

- Profit target: `8%`
- Max daily loss: `5%`
- Max total loss: `10%`
- Minimum trading days: `3`
- Leverage: `1:100`
- Time limit: `none`

### Practitioner

- Profit target: `5%`
- Max daily loss: `5%`
- Max total loss: `10%`
- Minimum trading days: `3`
- Time limit: `none`

### Master

- Profit target: `none`
- Max daily loss: `5%`
- Max total loss: `10%`
- Payout cycle options:
  - `weekly: 60%`
  - `biweekly: 80%`
  - `monthly: 100%`
  - `daily: 90%`
- Product decision at launch:
  - do not use `daily` payout flow

## Risk Rules

### Daily Drawdown

- Reset time: `00:00 CE(S)T`
- Reference value at day start:
  - use the higher of `balance` and `equity`
- Daily max loss formula:
  - `daily_loss_limit = day_start_reference * 0.05`
- Breach condition:
  - current equity or realized+floating loss must not exceed the allowed loss
    from the day-start reference

### Total Drawdown

- Static drawdown from initial balance
- Formula:
  - `min_total_equity = initial_balance * 0.90`
- Example:
  - `100_000 -> floor at 90_000`
- Not trailing

### Master Risk Per Idea

- Accounts `< 50_000`: max `3%` risk per trade idea or correlated position cluster
- Accounts `>= 50_000`: max `2%` risk per trade idea or correlated position cluster

## Trading Constraints

### News Restriction

- Applies only to `Master`
- No opening or closing positions:
  - `5 minutes before`
  - `5 minutes after`
  - high-impact macro news (`red folder`)
- During `Student` and `Practitioner`:
  - news trading allowed

### Inactivity

- Account deactivates if no full trade activity is recorded for `30 consecutive days`

### Overnight / Weekend

- Holding positions overnight: allowed
- Holding positions through weekend: allowed

## Commercial Catalog

Current working catalog from product requirements:

- `25_000 -> 199 USD`
- `50_000 -> 289 USD`
- `100_000 -> 549 USD`

Implementation note:

- Fees must be modeled as catalog data, not hardcoded logic
- Pricing may vary by platform, campaign, or active discount

## Backend Implications

The backend needs dedicated support for:

1. `prop_programs`
   - firm, model, phase definitions

2. `prop_rule_sets`
   - daily drawdown policy
   - total drawdown policy
   - min trading days
   - news restriction
   - inactivity policy
   - master-only per-idea risk caps

3. `challenge_accounts`
   - current phase
   - size
   - initial balance
   - phase start timestamp
   - pass/breach state

4. `daily_snapshots`
   - snapshot timestamp at `00:00 CE(S)T`
   - day-start balance
   - day-start equity
   - chosen day-start reference
   - remaining daily loss budget

5. `phase_progress`
   - current profit target progress
   - minimum trading days progress
   - pass eligibility

6. `news_blackout_windows`
   - event timestamp
   - symbol/currency impact mapping
   - blocked execution window for Master accounts

7. `risk_events`
   - warning thresholds
   - hard breach events
   - inactivity risk

## Dashboard Implications

FundingPips accounts need UI blocks for:

- account phase badge: `Student`, `Practitioner`, `Master`
- account size and fee
- target progress:
  - `8%` in Student
  - `5%` in Practitioner
- daily drawdown remaining
- total drawdown remaining
- reset countdown to next `00:00 CE(S)T`
- minimum trading days counter
- Master news blackout banner
- per-idea risk cap indicator on Master
- payout mode indicator on Master
- hard breach warnings with clear reason

## Open Notes

- Public FundingPips terms currently indicate the 2-Step Student target can be
  `8% or 10%` depending on the variant. For launch we are modeling the standard
  `8%` flow described in the product thread.
- Public pricing can vary. The launch catalog above should remain configurable.
- Before hard-enforcing any production rule, re-verify against current public
  FundingPips trading rules and terms.
