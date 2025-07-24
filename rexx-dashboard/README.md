# 🛠 REXX Reporting Toolkit  
**Optional Add-on for Breach Reporting**

This file (`rexx-dashboard.js`) is an **optional logic module** for teams using REXX. It transforms saved REXX outputs into structured, Playbook-aligned **trust breach reports**—filtered by time period, routed by pattern, and prioritised by severity.

This module does not store, style, or visualise data. It exists solely to support traceable reporting.

---

## 📂 What This File Does

- Accepts an array of REXX output objects
- Filters records by:
  - Month, Week, Quarter, Year, or Custom Date Range
- Generates:
  - **Total breach counts**
  - **Accounts impacted**
  - **Breach pattern summaries**
  - **Traceability metrics**
  - **Structured action summaries** (with team routing, case IDs, and severity/priority)
- Returns a single structured JSON report—ready for export, audit, or routing

---

## 🧪 Example Usage

```js
const { generateTrustBreachReport } = require('./rexx-dashboard');

const report = generateTrustBreachReport(rexxRecords, {
  rangeType: 'monthly',
  startDate: '2025-07-01',
  endDate: '2025-07-31'
});

console.log(JSON.stringify(report, null, 2));
```

---

## 📊 Sample Output

```json
{
  "title": "Trust Breach Report — July 2025",
  "total_breaches_logged": 47,
  "accounts_impacted": 33,
  "repeat_harm_patterns": {
    "Policy-cited refusal with no override path": 14,
    "Silent exits following refund denial": 8
  },
  "traceability_metrics": {
    "percent_denials_attributed": 76,
    "structural_escalations": 13,
    "exits_unconfirmed": 22,
    "repeat_harms_flagged": 18
  },
  "action_summary": [
    {
      "pattern": "Policy-cited refusal with no override path",
      "teams": ["Legal"],
      "trigger_count": 14,
      "triggering_cases": ["acc_0032", "acc_0045", "..."],
      "note": "policy-based denials exceed threshold",
      "severity": "high",
      "priority": 1
    }
  ]
}
```

---

## 🔒 This Is Not

- A dashboard  
- A storage tool  
- A UI renderer  
- A reporting system  
- A product  

This is **open-source structural logic** to help operational teams surface breach without permission.

---

## 📄 Requirements

- Node.js (for local use)
- Valid REXX output records (JSON)
- Timestamps on records (used for filtering)

---

## ✍️ License & Use

This file is published under the same terms as REXX:  
**Open, inspectable, and free to use.**

There is no telemetry, monetisation, or tracking.  
Structural integrity is not optional.
