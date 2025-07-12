function createBatchSummary() {
  return {
    total_messages: 0,
    emotions: {},
    intensity_sum: 0,
    confidence_levels: { high: 0, medium: 0, low: 0 },
    triggers: {},
    severities: { low: 0, moderate: 0, high: 0 },
    contract_status: { intact: 0, fraying: 0, broken: 0 },
    warning_levels: { "Low warning": 0, "Moderate warning": 0, "High warning": 0 },
    interventions: {}
  };
}

function updateBatchSummary(summary, rexxOutput) {
  summary.total_messages += 1;
  summary.emotions[rexxOutput.emotion] = (summary.emotions[rexxOutput.emotion] || 0) + 1;
  summary.intensity_sum += (rexxOutput.intensity_of_emotion || 0);

  const cl = rexxOutput.confidence?.level;
  if (cl && summary.confidence_levels[cl] !== undefined) summary.confidence_levels[cl] += 1;

  const t = rexxOutput.emotional_trigger_context;
  summary.triggers[t] = (summary.triggers[t] || 0) + 1;

  const s = rexxOutput.severity;
  if (s && summary.severities[s] !== undefined) summary.severities[s] += 1;

  const cs = rexxOutput.emotional_contract_status;
  if (cs && summary.contract_status[cs] !== undefined) summary.contract_status[cs] += 1;

  const wl = rexxOutput.emotional_exit?.warning_level;
  if (wl && summary.warning_levels[wl] !== undefined) summary.warning_levels[wl] += 1;

  const iv = rexxOutput.recommended_intervention;
  summary.interventions[iv] = (summary.interventions[iv] || 0) + 1;

  return summary;
}

function finalizeBatchSummary(summary) {
  const { total_messages, intensity_sum, interventions } = summary;
  summary.avg_intensity = total_messages ? +(intensity_sum / total_messages).toFixed(2) : 0;

  summary.top_interventions = Object.entries(interventions)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([intervention]) => intervention);

  delete summary.intensity_sum;
  delete summary.interventions;

  return summary;
}

module.exports = {
  createBatchSummary,
  updateBatchSummary,
  finalizeBatchSummary
};
