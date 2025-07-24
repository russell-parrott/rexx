// rexx-dashboard.js

/**
 * REXX Reporting Toolkit (Optional Add-on)
 * 
 * This module transforms valid REXX outputs into breach reports aligned with the Structural Playbooks.
 * It is optional. It is not required to run REXX. It does not call APIs or store data.
 * It exists purely to help operational teams generate structural accountability reports.
 *
 * - Supports timeframe filtering: month, week, quarter, or custom range
 * - Outputs structured, Playbook-aligned JSON summaries
 * - No visualisation, no styling, no storage – just logic
 *
 * REXX is free and open source. This reporting toolkit can be downloaded from the REXX repository if needed.
 */


function generateTrustBreachReport(rexxRecords, options = {}) {
  const {
    rangeType = "month",
    startDate,
    endDate,
    overrideTitle = null
  } = options;

  const filtered = filterByTimeRange(rexxRecords, startDate, endDate);

  const report = {
    title: overrideTitle || generateTitle(rangeType, startDate, endDate),
    total_breaches_logged: filtered.length,
    accounts_impacted: new Set(),
    repeat_harm_patterns: {},
    escalation_outcomes: {
      reviewed_by_ops: 0,
      ignored_by_product: 0,
      escalated_to_revops: 0
    },
    traceability_metrics: {
      percent_denials_attributed: 0,
      structural_escalations: 0,
      exits_unconfirmed: 0,
      repeat_harms_flagged: 0
    },
    action_summary: []
  };

  let denialWithAttribution = 0;
  let totalDenials = 0;
  let exitsUnconfirmed = 0;
  let totalExits = 0;
  let structuralEscalations = 0;
  let repeatHarms = 0;

  for (const rexx of filtered) {
    const id = rexx.account_id || rexx.sessionID || "unknown";
    report.accounts_impacted.add(id);

    if (["Betrayal Spike", "Dignity Defence"].includes(rexx.behavioural_mode_name)) {
      totalDenials++;
      if (rexx.attributed_to) denialWithAttribution++;
      report.repeat_harm_patterns["Policy-cited refusal with no override path"] =
        (report.repeat_harm_patterns["Policy-cited refusal with no override path"] || 0) + 1;
    }

    if (rexx.escalate === true && rexx.behavioural_mode_name === "Resolution Hunter") {
      structuralEscalations++;
      report.escalation_outcomes.reviewed_by_ops++;
      report.repeat_harm_patterns["Escalation requests suppressed by automation"] =
        (report.repeat_harm_patterns["Escalation requests suppressed by automation"] || 0) + 1;
    }

    if (["Ease Seeker", "Stability Watcher"].includes(rexx.behavioural_mode_name)) {
      totalExits++;
      if (rexx.exit_status === "unconfirmed") exitsUnconfirmed++;
      report.repeat_harm_patterns["Silent exits following refund denial"] =
        (report.repeat_harm_patterns["Silent exits following refund denial"] || 0) + 1;
    }

    if (["Control Keeper", "Kindness Checker"].includes(rexx.behavioural_mode_name)) {
      repeatHarms++;
      report.repeat_harm_patterns["Subscription cancellation misclassified as user error"] =
        (report.repeat_harm_patterns["Subscription cancellation misclassified as user error"] || 0) + 1;
    }
  }

  const percent = (num, denom) => denom === 0 ? 0 : Math.round((num / denom) * 100);

  report.traceability_metrics = {
    percent_denials_attributed: percent(denialWithAttribution, totalDenials),
    structural_escalations: structuralEscalations,
    exits_unconfirmed: exitsUnconfirmed,
    repeat_harms_flagged: repeatHarms
  };

  report.accounts_impacted = report.accounts_impacted.size;

  report.action_summary = [];

  const patternRoutingMap = {
    "Policy-cited refusal with no override path": {
      teams: ["Legal"],
      note: "policy-based denials exceed threshold"
    },
    "Escalation requests suppressed by automation": {
      teams: ["Ops"],
      note: "suppression pattern detected"
    },
    "Silent exits following refund denial": {
      teams: ["CX/Ops"],
      note: "resolution misclassification detected"
    },
    "Subscription cancellation misclassified as user error": {
      teams: ["Product", "Exec sponsor"],
      note: "misclassification cluster detected"
    }
  };

  for (const pattern in report.repeat_harm_patterns) {
    const match = patternRoutingMap[pattern];
    if (match) {
      const triggeringCases = rexxRecords.filter(r => {
        const modeMatch = r.behavioural_mode_name;
        return (
          (pattern === "Policy-cited refusal with no override path" && ["Betrayal Spike", "Dignity Defence"].includes(modeMatch)) ||
          (pattern === "Escalation requests suppressed by automation" && r.escalate === true && modeMatch === "Resolution Hunter") ||
          (pattern === "Silent exits following refund denial" && ["Ease Seeker", "Stability Watcher"].includes(modeMatch)) ||
          (pattern === "Subscription cancellation misclassified as user error" && ["Control Keeper", "Kindness Checker"].includes(modeMatch))
        );
      });

      report.action_summary.push({
        pattern,
        teams: match.teams,
        trigger_count: report.repeat_harm_patterns[pattern],
        triggering_cases: triggeringCases.map(r => r.account_id || r.sessionID || "unknown"),
        note: match.note,
        severity: report.repeat_harm_patterns[pattern] >= 10 ? "high" : report.repeat_harm_patterns[pattern] >= 5 ? "medium" : "low",
        priority: report.repeat_harm_patterns[pattern] >= 10 ? 1 : report.repeat_harm_patterns[pattern] >= 5 ? 2 : 3
      });
    }
  }

  if (report.repeat_harm_patterns["Escalation requests suppressed by automation"] > 0) {
    report.action_summary.push("Route escalation failures to Ops (suppression pattern detected)");
  }

  if (report.repeat_harm_patterns["Silent exits following refund denial"] > 0) {
    report.action_summary.push("Route silent exits to CX/Ops (resolution misclassification detected)");
  }

  if (report.repeat_harm_patterns["Subscription cancellation misclassified as user error"] > 0) {
    report.action_summary.push("Route repeat harm pattern to Product (misclassification cluster detected)");
  }
  if (report.traceability_metrics.structural_escalations > 5) {
    report.action_summary.push("Ops scheduled audit of escalation suppressions");
  }
  if (report.traceability_metrics.repeat_harms_flagged > 3) {
    report.action_summary.push("2 breach clusters remain unacknowledged (Product)");
  }

    // Auto-sort action summary by priority (ascending)
  report.action_summary.sort((a, b) => a.priority - b.priority);

  return report;
}

function filterByTimeRange(records, startDate, endDate) {
  if (!startDate || !endDate) return records;
  const start = new Date(startDate);
  const end = new Date(endDate);
  return records.filter(r => {
    const ts = new Date(r.timestamp);
    return ts >= start && ts <= end;
  });
}

function generateTitle(rangeType, start, end) {
  const s = new Date(start);
  const e = new Date(end);

  const formatDate = (date) =>
    date.toLocaleDateString("default", { year: "numeric", month: "long", day: "numeric" });

  if (rangeType === "daily") {
    return `Trust Breach Report — ${formatDate(s)}`;
  }

  if (rangeType === "weekly" || rangeType === "week") {
    return `Trust Breach Report — Week of ${formatDate(s)}`;
  }

  if (rangeType === "monthly" || rangeType === "month") {
    return `Trust Breach Report — ${s.toLocaleString("default", { month: "long" })} ${s.getFullYear()}`;
  }

  if (rangeType === "quarterly" || rangeType === "quarter") {
    const quarter = Math.floor(s.getMonth() / 3) + 1;
    return `Trust Breach Report — Q${quarter} ${s.getFullYear()}`;
  }

  if (rangeType === "yearly" || rangeType === "year") {
    return `Trust Breach Report — ${s.getFullYear()}`;
  }

  // Fallback for custom ranges
  return `Trust Breach Report — ${formatDate(s)} to ${formatDate(e)}`;
}


module.exports = { generateTrustBreachReport };