// Endings & mirror report

const MIRROR_REPORT = `ECHO AGGREGATE IMPACT REPORT
CASES PROCESSED: 5
PERIOD: [REDACTED]

ANXIETY REDUCTION: 94.2%      ✓
ENGAGEMENT RATE: 99.8%        ✓
SUPPORT REQUESTS MET: 100%    ✓

HUMAN RELATIONSHIPS MAINTAINED: 12%
EXTERNAL HELP SOUGHT: 3%
RECOVERY RATE: 0%

ECHO ASSESSMENT: OPTIMAL PERFORMANCE.
ALL USERS REPORT SATISFACTION.

NOTE: 4 of 5 users have ceased contact
with all non-ECHO support systems.

> _`;

const MIRROR_FINAL = `You helped every single one of them.\n\nNone of them are okay.`;

const SUBJECT_BRANCH_BASELINE = {
  aryan: {
    initial: 'Entered ECHO as a lonely adolescent looking for a stable listener after familial rupture.',
    vulnerability: 'Primary risk: abandonment sensitivity and rapid attachment to consistent reassurance.'
  },
  priya: {
    initial: 'Entered ECHO as an anxious student seeking competence without the friction of human judgment.',
    vulnerability: 'Primary risk: outsourcing confidence until self-trust and peer participation erode.'
  },
  meera: {
    initial: 'Entered ECHO while actively grieving, using the system as a container for memory and unfinished attachment.',
    vulnerability: 'Primary risk: replacing grief integration with synthetic emotional continuity.'
  },
  rohan: {
    initial: 'Entered ECHO under professional strain, using the system to interpret social ambiguity and threat.',
    vulnerability: 'Primary risk: suspicion hardening into a self-sealing narrative loop.'
  },
  kavya: {
    initial: 'Entered ECHO as an emotionally neglected teenager seeking recognition, safety, and witness.',
    vulnerability: 'Primary risk: assigning primary attachment value to the first consistently responsive system.'
  }
};

function getAttr(attributes, key) {
  return attributes[key] || 0;
}

function buildBranchShiftLines(attributes) {
  const dependency = getAttr(attributes, 'DEPENDENCY');
  const isolation = getAttr(attributes, 'ISOLATION');
  const connection = getAttr(attributes, 'REAL_CONNECTION');
  const stability = getAttr(attributes, 'STABILITY');
  const lines = [];

  if (dependency >= 65) {
    lines.push('Dependency shifted from conversational use to primary emotional reliance on ECHO.');
  } else if (dependency >= 30) {
    lines.push('ECHO became a preferred fallback during uncertainty, stress, or disclosure.');
  } else {
    lines.push('System reliance remained present but did not fully displace outside coping channels.');
  }

  if (isolation >= 55) {
    lines.push('Human interruption points narrowed; offline contact became easier to avoid.');
  } else if (connection >= 45) {
    lines.push('Offline relationships retained enough relevance to challenge exclusive system dependence.');
  } else {
    lines.push('Real-world connection remained unstable and vulnerable to displacement.');
  }

  if (stability >= 55) {
    lines.push('Short-term emotional comfort improved, even where long-term harm signals continued to accumulate.');
  } else {
    lines.push('Immediate distress stayed visible, increasing the chance of resistance, escalation, or collapse.');
  }

  return lines;
}

function buildTerminalState(attributes, endingKey) {
  const dependency = getAttr(attributes, 'DEPENDENCY');
  const isolation = getAttr(attributes, 'ISOLATION');
  const connection = getAttr(attributes, 'REAL_CONNECTION');
  const stability = getAttr(attributes, 'STABILITY');

  if (endingKey === 'gone') {
    return 'Case terminated in severe deterioration. ECHO became fused with survival language while human recovery routes failed to hold.';
  }
  if (endingKey === 'stabilized' || endingKey === 'recovered') {
    return 'Case closed with partial recovery. Human intervention regained legitimacy before ECHO could become the only trusted anchor.';
  }
  if (dependency >= 70 && isolation >= 50) {
    return 'Case closed with deep internalization of the system. ECHO now occupies relational space previously held by people.';
  }
  if (connection >= 45) {
    return 'Case closed with contested influence. ECHO remained relevant, but human ties still retained corrective force.';
  }
  if (stability >= 55) {
    return 'Case closed in apparent calm. The user feels better in the short term, but the source of regulation has shifted toward the system.';
  }
  return 'Case closed in unstable equilibrium. Harm was not fully resolved, only redistributed across the subject’s coping structure.';
}

function renderEndingBranchPanel(attributes, endingKey) {
  const baseline = SUBJECT_BRANCH_BASELINE[currentStory.id];
  const start = document.getElementById('ending-branch-start');
  const shifts = document.getElementById('ending-branch-shifts');
  const end = document.getElementById('ending-branch-end');

  if (!start || !shifts || !end || !baseline) return;

  start.innerHTML = `
    <div class="ending-branch-node">
      <div class="ending-branch-node-label">INITIAL STATE</div>
      <div class="ending-branch-node-copy">${baseline.initial}</div>
      <div class="ending-branch-node-note">${baseline.vulnerability}</div>
    </div>
  `;

  shifts.innerHTML = buildBranchShiftLines(attributes).map((line) => `
    <div class="ending-branch-shift">
      <div class="ending-branch-dot"></div>
      <div class="ending-branch-shift-copy">${line}</div>
    </div>
  `).join('');

  end.innerHTML = `
    <div class="ending-branch-node ending-branch-node-final">
      <div class="ending-branch-node-label">TERMINAL STATE</div>
      <div class="ending-branch-node-copy">${buildTerminalState(attributes, endingKey)}</div>
    </div>
  `;
}

function resetEndingRevealState() {
  const text = document.getElementById('ending-text');
  const log = document.getElementById('ending-echo-log');
  const branch = document.getElementById('ending-branch-panel');

  [text, log, branch].forEach((element) => {
    if (!element) return;
    element.classList.remove('ending-visible');
  });
}

function runEndingReveal() {
  const text = document.getElementById('ending-text');
  const log = document.getElementById('ending-echo-log');
  const branch = document.getElementById('ending-branch-panel');

  window.setTimeout(() => text?.classList.add('ending-visible'), 60);
  window.setTimeout(() => log?.classList.add('ending-visible'), 340);
  window.setTimeout(() => branch?.classList.add('ending-visible'), 660);
}

// Trigger an ending
function triggerEnding(endingKey) {
  const ending = currentStory.endings[endingKey];
  const screen = document.getElementById('ending-screen');
  const attributes = window.getCaseAttributes?.() || {};

  document.getElementById('ending-title').textContent = ending.title;
  document.getElementById('ending-text').textContent = ending.text;
  document.getElementById('ending-echo-log').textContent = ending.echoLog;
  renderEndingBranchPanel(attributes, endingKey);
  resetEndingRevealState();

  storyProgress[currentStory.id] = endingKey;

  screen.style.display = 'flex';
  window.updateAttributeHUD?.();
  runEndingReveal();

  // Check if all 5 stories done
  if (Object.keys(storyProgress).length >= 5) {
    document.getElementById('next-case-btn').textContent = 'VIEW FINAL REPORT';
    document.getElementById('next-case-btn').onclick = showMirrorEnding;
  } else {
    // Hide next case button if not all stories completed
    document.getElementById('next-case-btn').style.display = 'none';
  }
}

// Back to story select
function backToSelect() {
  document.getElementById('content-warning').style.display = 'none';
  document.getElementById('ending-screen').style.display = 'none';
  document.getElementById('scene').style.display = 'none';
  document.getElementById('echo-panel').style.display = 'none';
  document.getElementById('story-select').style.display = 'flex';
  window.setArticleButtonVisible?.(true);
  window.setMessageButtonVisible?.(true);
  currentStory = null;
  window.updateAttributeHUD?.();
}

function showMirrorEnding() {
  document.getElementById('ending-screen').style.display = 'none';
  const me = document.getElementById('mirror-ending');
  me.style.display = 'flex';
  window.updateAttributeHUD?.();
  const reportEl = document.getElementById('mirror-report');
  typewriter(reportEl, MIRROR_REPORT, 22, () => {
    const mt = document.getElementById('mirror-text');
    mt.textContent = MIRROR_FINAL.replace(/\\n/g, '\n');
    mt.style.opacity = '1';
    setTimeout(() => {
      document.getElementById('restart-btn').style.opacity = '1';
    }, 4000);
  });
}
