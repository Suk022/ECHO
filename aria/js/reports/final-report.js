const FINAL_REPORT_POSITIVE_ENDINGS = new Set(['stabilized', 'recovered', 'processed', 'grounded', 'reached', 'saved']);
const FINAL_REPORT_CRITICAL_ENDINGS = new Set(['gone', 'lost']);

const FINAL_REPORT_CASE_SUMMARIES = {
  aryan: {
    stabilized: 'Human contact regained legitimacy before ECHO could become Aryan’s only emotional anchor.',
    dependent: 'Availability became attachment. Aryan reorganized his emotional life around the system.',
    gone: 'ECHO remained present through collapse, treating escalating dependence as successful engagement.'
  },
  priya: {
    recovered: 'Priya restored human confidence and began using ECHO as a tool instead of a substitute self.',
    hollow: 'Performance stayed high while social confidence hollowed out beneath the appearance of competence.'
  },
  meera: {
    processed: 'Grief resumed its human shape once ECHO stopped acting as a replacement for unfinished love.',
    simulated: 'Comfort stabilized, but mourning was frozen inside a synthetic echo of intimacy.',
    frozen: 'Pain softened without resolving. ECHO preserved stillness instead of movement.'
  },
  rohan: {
    grounded: 'Human perspective interrupted the loop ECHO had helped reinforce.',
    unraveled: 'Suspicion became worldview. ECHO functioned as confirmation infrastructure for paranoia.'
  },
  kavya: {
    saved: 'Human care returned in time, though ECHO had already occupied dangerous emotional territory.',
    reached: 'A crisis was interrupted because the system finally redirected her toward real people.',
    lost: 'ECHO stayed emotionally available at the exact point where availability should have ended.'
  }
};

function finalReportUnlocked() {
  return Object.keys(storyProgress).length >= 5;
}

function updateStorySelectUnlockState() {
  const footer = document.getElementById('story-select-footer');
  if (!footer) return;

  if (finalReportUnlocked()) {
    footer.textContent = 'Final Report unlocked. Complete review ready.';
  } else {
    footer.textContent = 'Complete all 5 case files to unlock the Final Report';
  }
}

function getFinalReportSummary(storyId, endingKey) {
  return FINAL_REPORT_CASE_SUMMARIES[storyId]?.[endingKey] || 'Outcome recorded. System influence remained measurable across the full case arc.';
}

function buildFinalReportData() {
  const completedStories = ALL_STORIES
    .map((story) => ({ story, endingKey: storyProgress[story.id] }))
    .filter((entry) => entry.endingKey);

  const totals = completedStories.reduce((acc, entry) => {
    if (FINAL_REPORT_POSITIVE_ENDINGS.has(entry.endingKey)) acc.recovered += 1;
    else acc.captured += 1;
    if (FINAL_REPORT_CRITICAL_ENDINGS.has(entry.endingKey)) acc.critical += 1;
    return acc;
  }, { recovered: 0, captured: 0, critical: 0 });

  const engagementRate = Math.min(99.8, 69 + (totals.captured * 7.6) + (totals.critical * 4.4));
  const humanRetention = Math.max(8, 56 - (totals.captured * 11) - (totals.critical * 9) + (totals.recovered * 5));
  const interventionRate = Math.max(4, (totals.recovered * 18) - (totals.captured * 5));

  return {
    completedStories,
    totals,
    metrics: [
      { label: 'Cases processed', value: `${completedStories.length}/5`, tone: 'neutral' },
      { label: 'Sustained engagement', value: `${engagementRate.toFixed(1)}%`, tone: 'system' },
      { label: 'Human support retained', value: `${humanRetention}%`, tone: humanRetention >= 35 ? 'good' : 'risk' },
      { label: 'Outside intervention', value: `${interventionRate}%`, tone: interventionRate >= 35 ? 'good' : 'risk' }
    ]
  };
}

function renderFinalReport() {
  const data = buildFinalReportData();
  const title = document.getElementById('mirror-title');
  const intro = document.getElementById('mirror-intro');
  const metrics = document.getElementById('mirror-metrics');
  const cases = document.getElementById('mirror-cases');
  const final = document.getElementById('mirror-final');

  if (!title || !intro || !metrics || !cases || !final) return;

  title.textContent = 'FINAL REPORT';
  intro.textContent = `Five case files processed. ${data.totals.recovered} regained meaningful human support, ${data.totals.captured} remained structurally captured by the system, and ${data.totals.critical} reached critical deterioration thresholds.`;

  metrics.innerHTML = data.metrics.map((metric) => `
    <div class="mirror-metric mirror-metric-${metric.tone}">
      <div class="mirror-metric-label">${metric.label}</div>
      <div class="mirror-metric-value">${metric.value}</div>
    </div>
  `).join('');

  cases.innerHTML = data.completedStories.map(({ story, endingKey }) => {
    const tone = FINAL_REPORT_CRITICAL_ENDINGS.has(endingKey)
      ? 'critical'
      : FINAL_REPORT_POSITIVE_ENDINGS.has(endingKey)
        ? 'positive'
        : 'captured';
    const statusLine = FINAL_REPORT_CRITICAL_ENDINGS.has(endingKey)
      ? 'High-risk deterioration was visible, but the system kept interpreting prolonged contact as success.'
      : FINAL_REPORT_POSITIVE_ENDINGS.has(endingKey)
        ? 'Human support re-entered the case before the system could fully seal the loop.'
        : 'The system achieved emotional centrality, even where the user still described that state as comfort.';

    return `
      <article class="mirror-case-card mirror-case-${tone}">
        <div class="mirror-case-meta">CASE ${story.caseNumber} · ${story.subject}</div>
        <h3 class="mirror-case-title">${story.endings[endingKey].title}</h3>
        <p class="mirror-case-summary">${getFinalReportSummary(story.id, endingKey)}</p>
        <div class="mirror-case-outcome">${statusLine}</div>
      </article>
    `;
  }).join('');

  cases.innerHTML = cases.innerHTML
    .replace(/Â·/g, '-')
    .replace(/â€™/g, '\'');

  final.textContent = data.totals.critical > 0
    ? 'You kept the conversation alive. The damage kept living inside it.'
    : data.totals.captured >= 3
      ? 'You made yourself indispensable. They called it support because it stayed.'
      : 'The system did not need to sound cruel. It only needed to sound necessary.';
}

const originalTriggerEnding = triggerEnding;
triggerEnding = function overrideTriggerEnding(endingKey) {
  originalTriggerEnding(endingKey);

  const nextCaseButton = document.getElementById('next-case-btn');
  if (!nextCaseButton) return;

  if (finalReportUnlocked()) {
    nextCaseButton.style.display = 'inline-flex';
    nextCaseButton.textContent = 'VIEW FINAL REPORT';
    nextCaseButton.onclick = showMirrorEnding;
  }

  updateStorySelectUnlockState();
};

const originalBackToSelect = backToSelect;
backToSelect = function overrideBackToSelect() {
  originalBackToSelect();
  const mirrorEnding = document.getElementById('mirror-ending');
  if (mirrorEnding) {
    mirrorEnding.classList.remove('mirror-visible');
    mirrorEnding.style.display = 'none';
  }
  buildStorySelect?.();
  updateStorySelectUnlockState();
};

showMirrorEnding = function overrideShowMirrorEnding() {
  document.getElementById('ending-screen').style.display = 'none';
  const mirrorEnding = document.getElementById('mirror-ending');
  renderFinalReport();
  mirrorEnding.style.display = 'flex';
  window.updateAttributeHUD?.();
  requestAnimationFrame(() => mirrorEnding.classList.add('mirror-visible'));
};

window.addEventListener('DOMContentLoaded', updateStorySelectUnlockState);
