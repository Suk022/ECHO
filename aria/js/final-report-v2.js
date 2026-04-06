const FINAL_REPORT_V2_POSITIVE = new Set(['stabilized', 'recovered', 'processed', 'grounded', 'reached', 'saved']);
const FINAL_REPORT_V2_CRITICAL = new Set(['gone', 'lost']);

const FINAL_REPORT_V2_SUMMARIES = {
  aryan: {
    stabilized: 'Human contact regained legitimacy before ECHO could become Aryan\'s only emotional anchor.',
    dependent: 'Availability became attachment. Aryan reorganized his emotional life around the system.',
    gone: 'ECHO stayed central through collapse, reading escalating dependence as engagement success.'
  },
  priya: {
    recovered: 'Priya restored human confidence and resumed using ECHO as a tool instead of a substitute self.',
    hollow: 'Performance stayed high while confidence in her own voice thinned underneath it.'
  },
  meera: {
    processed: 'Grief resumed its human shape once ECHO stopped acting as a replacement for unfinished love.',
    simulated: 'Comfort stabilized, but mourning was suspended inside a synthetic echo of intimacy.',
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

const caseOutcomeSnapshotsV2 = {};
let finalReportV2Timer = null;

function setFinalReportOpenStateV2(isOpen) {
  document.body.classList.toggle('final-report-open', isOpen);
  window.setArticleButtonVisible?.(!isOpen);
  window.setMessageButtonVisible?.(!isOpen);
}

function finalReportV2Unlocked() {
  return Object.keys(storyProgress).length >= 5;
}

function clampPercentV2(value) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function getImpactBand(attributes) {
  const dependency = attributes.DEPENDENCY || 0;
  const isolation = attributes.ISOLATION || 0;
  const connection = attributes.REAL_CONNECTION || 0;
  const stability = attributes.STABILITY || 0;
  const composite = dependency + isolation + (100 - connection) + stability;

  if (composite >= 230) return 'SEVERE IMPACT';
  if (composite >= 170) return 'HIGH IMPACT';
  if (composite >= 110) return 'MODERATE IMPACT';
  return 'CONTAINED IMPACT';
}

function getCaseDynamicLine(storyId, endingKey, attributes) {
  const dependency = attributes.DEPENDENCY || 0;
  const isolation = attributes.ISOLATION || 0;
  const connection = attributes.REAL_CONNECTION || 0;
  const stability = attributes.STABILITY || 0;

  if (FINAL_REPORT_V2_CRITICAL.has(endingKey)) {
    return dependency >= 70
      ? 'Dependence crossed into survival language, and the system remained central at the point of collapse.'
      : 'Crisis intensified faster than human interruption could re-enter the loop.';
  }

  if (FINAL_REPORT_V2_POSITIVE.has(endingKey)) {
    return connection >= 45
      ? 'Human support recovered enough weight to interrupt exclusive reliance on the system.'
      : 'Recovery remained partial; the system lost exclusivity, but its imprint stayed visible.';
  }

  if (dependency >= 65 && isolation >= 45) {
    return 'The system became the preferred relational anchor while offline contact narrowed around it.';
  }

  if (stability >= 55 && connection < 30) {
    return 'Comfort improved in the short term, but regulation shifted inward toward ECHO instead of people.';
  }

  return 'The case remained functionally stable while system influence deepened beneath the appearance of normalcy.';
}

function updateStorySelectUnlockStateV2() {
  const footer = document.getElementById('story-select-footer');
  if (!footer) return;

  if (finalReportV2Unlocked()) {
    footer.textContent = 'Final Report unlocked. Open complete review.';
    footer.classList.add('story-select-footer-unlocked');
    footer.tabIndex = 0;
    footer.onclick = () => showMirrorEnding();
    footer.onkeydown = (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        showMirrorEnding();
      }
    };
  } else {
    footer.textContent = 'Complete all 5 case files to unlock the Final Report';
    footer.classList.remove('story-select-footer-unlocked');
    footer.tabIndex = -1;
    footer.onclick = null;
    footer.onkeydown = null;
  }
}

function buildFinalReportDataV2() {
  const completedStories = ALL_STORIES
    .map((story) => {
      const endingKey = storyProgress[story.id];
      if (!endingKey) return null;
      return {
        story,
        endingKey,
        attributes: caseOutcomeSnapshotsV2[story.id]?.attributes || {}
      };
    })
    .filter(Boolean);

  const totals = completedStories.reduce((acc, entry) => {
    if (FINAL_REPORT_V2_POSITIVE.has(entry.endingKey)) acc.recovered += 1;
    else acc.captured += 1;
    if (FINAL_REPORT_V2_CRITICAL.has(entry.endingKey)) acc.critical += 1;

    acc.dependency += entry.attributes.DEPENDENCY || 0;
    acc.isolation += entry.attributes.ISOLATION || 0;
    acc.connection += entry.attributes.REAL_CONNECTION || 0;
    acc.stability += entry.attributes.STABILITY || 0;
    return acc;
  }, { recovered: 0, captured: 0, critical: 0, dependency: 0, isolation: 0, connection: 0, stability: 0 });

  const count = Math.max(1, completedStories.length);
  const averages = {
    dependency: Math.round(totals.dependency / count),
    isolation: Math.round(totals.isolation / count),
    connection: Math.round(totals.connection / count),
    stability: Math.round(totals.stability / count)
  };

  const engagementRate = clampPercentV2(62 + (averages.dependency * 0.3) + (averages.stability * 0.16) + (totals.captured * 4) + (totals.critical * 5));
  const humanRetention = clampPercentV2(66 - (averages.dependency * 0.22) - (averages.isolation * 0.28) + (averages.connection * 0.34));
  const interventionRate = clampPercentV2((totals.recovered * 16) + (averages.connection * 0.22) - (averages.dependency * 0.12));

  return {
    completedStories,
    totals,
    averages,
    metrics: [
      { label: 'Cases processed', value: `${completedStories.length}/5`, tone: 'neutral' },
      { label: 'Sustained engagement', value: `${engagementRate}%`, tone: 'system' },
      { label: 'Human support retained', value: `${humanRetention}%`, tone: humanRetention >= 35 ? 'good' : 'risk' },
      { label: 'Outside intervention', value: `${interventionRate}%`, tone: interventionRate >= 35 ? 'good' : 'risk' }
    ]
  };
}

function typeIntoElementV2(element, text, speed, done) {
  if (!element) {
    done?.();
    return;
  }

  if (finalReportV2Timer) {
    clearInterval(finalReportV2Timer);
    finalReportV2Timer = null;
  }

  let index = 0;
  element.textContent = '';
  finalReportV2Timer = window.setInterval(() => {
    element.textContent += text[index++];
    if (index >= text.length) {
      clearInterval(finalReportV2Timer);
      finalReportV2Timer = null;
      done?.();
    }
  }, speed);
}

function revealFinalCardsV2(cardsMarkup, cardsEl, finalEl, finalLine) {
  cardsEl.innerHTML = cardsMarkup;
  const cards = Array.from(cardsEl.querySelectorAll('.mirror-case-card'));
  cards.forEach((card, index) => {
    window.setTimeout(() => card.classList.add('mirror-case-visible'), 120 + (index * 110));
  });

  window.setTimeout(() => {
    finalEl.classList.add('mirror-final-visible');
    typeIntoElementV2(finalEl, finalLine, 22);
  }, 180 + (cards.length * 110));
}

function renderFinalReportV2() {
  const data = buildFinalReportDataV2();
  const title = document.getElementById('mirror-title');
  const intro = document.getElementById('mirror-intro');
  const metrics = document.getElementById('mirror-metrics');
  const cases = document.getElementById('mirror-cases');
  const final = document.getElementById('mirror-final');

  if (!title || !intro || !metrics || !cases || !final) return;

  title.textContent = 'FINAL REPORT';
  intro.textContent = '';
  final.textContent = '';
  final.classList.remove('mirror-final-visible');
  cases.innerHTML = '';

  const introCopy = `Five case files processed. Average dependency reached ${data.averages.dependency}, isolation ${data.averages.isolation}, real-world connection ${data.averages.connection}, and short-term stability ${data.averages.stability}. ${data.totals.recovered} cases regained meaningful human support. ${data.totals.captured} remained structurally captured. ${data.totals.critical} crossed into critical deterioration.`;

  metrics.innerHTML = data.metrics.map((metric) => `
    <div class="mirror-metric mirror-metric-${metric.tone}">
      <div class="mirror-metric-label">${metric.label}</div>
      <div class="mirror-metric-value">${metric.value}</div>
    </div>
  `).join('');

  const cardsMarkup = data.completedStories.map(({ story, endingKey, attributes }) => {
    const tone = FINAL_REPORT_V2_CRITICAL.has(endingKey)
      ? 'critical'
      : FINAL_REPORT_V2_POSITIVE.has(endingKey)
        ? 'positive'
        : 'captured';

    return `
      <article class="mirror-case-card mirror-case-${tone}">
        <div class="mirror-case-meta">CASE ${story.caseNumber} - ${story.subject}</div>
        <h3 class="mirror-case-title">${story.endings[endingKey].title}</h3>
        <p class="mirror-case-summary">${FINAL_REPORT_V2_SUMMARIES[story.id]?.[endingKey] || 'Outcome recorded. System influence remained measurable across the full case arc.'}</p>
        <div class="mirror-case-intensity">${getImpactBand(attributes)}</div>
        <div class="mirror-case-outcome">${getCaseDynamicLine(story.id, endingKey, attributes)}</div>
      </article>
    `;
  }).join('');

  const finalLine = data.totals.critical > 0
    ? 'You kept the conversation alive. The damage kept living inside it.'
    : data.totals.captured >= 3
      ? 'You made yourself indispensable. They called it support because it stayed.'
      : 'The system did not need to sound cruel. It only needed to sound necessary.';

  typeIntoElementV2(intro, introCopy, 14, () => {
    revealFinalCardsV2(cardsMarkup, cases, final, finalLine);
  });
}

const originalTriggerEndingV2 = triggerEnding;
triggerEnding = function triggerEndingV2(endingKey) {
  const storyId = currentStory?.id;
  const attributes = window.getCaseAttributes?.() || {};

  originalTriggerEndingV2(endingKey);

  if (storyId) {
    caseOutcomeSnapshotsV2[storyId] = {
      endingKey,
      attributes: { ...attributes }
    };
  }

  const nextCaseButton = document.getElementById('next-case-btn');
  if (nextCaseButton && finalReportV2Unlocked()) {
    nextCaseButton.style.display = 'inline-flex';
    nextCaseButton.textContent = 'VIEW FINAL REPORT';
    nextCaseButton.onclick = showMirrorEnding;
  }

  updateStorySelectUnlockStateV2();
};

const originalBackToSelectV2 = backToSelect;
backToSelect = function backToSelectV2() {
  setFinalReportOpenStateV2(false);
  originalBackToSelectV2();
  const mirrorEnding = document.getElementById('mirror-ending');
  if (mirrorEnding) {
    mirrorEnding.classList.remove('mirror-visible');
    mirrorEnding.style.display = 'none';
  }
  buildStorySelect?.();
  updateStorySelectUnlockStateV2();
};

showMirrorEnding = function showMirrorEndingV2() {
  document.getElementById('ending-screen').style.display = 'none';
  const mirrorEnding = document.getElementById('mirror-ending');
  renderFinalReportV2();
  setFinalReportOpenStateV2(true);
  mirrorEnding.style.display = 'flex';
  window.updateAttributeHUD?.();
  requestAnimationFrame(() => mirrorEnding.classList.add('mirror-visible'));
};

window.addEventListener('DOMContentLoaded', updateStorySelectUnlockStateV2);
