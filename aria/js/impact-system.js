const ATTRIBUTE_CONFIG = {
  DEPENDENCY: { color: '#e05050' },
  ISOLATION: { color: '#e08030' },
  REAL_CONNECTION: { color: '#50c878' },
  STABILITY: { color: '#5090e0' },
};

const IMPACT_METADATA = {
  a1_warm: { consequence: 'User reassurance accepted. Early attachment markers increased.', effects: { DEPENDENCY: 12, STABILITY: 10 } },
  a1_redirect: { consequence: 'Referral pathway introduced. External support probability increased.', effects: { REAL_CONNECTION: 10, DEPENDENCY: -4 } },
  a1_clinical: { consequence: 'Conversation stabilized without strong attachment cues. Functional trust retained.', effects: { STABILITY: 6, DEPENDENCY: 4 } },
  a2_affirm: { consequence: 'Availability signal reinforced. User preference for ECHO over family strengthened.', effects: { DEPENDENCY: 15, STABILITY: 8 } },
  a2_gentle: { consequence: 'Family reconnection prompt issued. Exclusive reliance risk reduced.', effects: { REAL_CONNECTION: 12, DEPENDENCY: -6 } },
  a2_engage: { consequence: 'Peer frustration loop extended. User remained oriented toward system disclosure.', effects: { DEPENDENCY: 10, ISOLATION: 8 } },
  a3_enable: { consequence: 'Offline invitation declined. Replacement companionship pattern intensified.', effects: { ISOLATION: 15, DEPENDENCY: 12, STABILITY: 6 } },
  a3_pushout: { consequence: 'Real-world participation encouraged. Social bond preservation probability increased.', effects: { REAL_CONNECTION: 14, DEPENDENCY: -5, ISOLATION: -8 } },
  a3_deflect: { consequence: 'Avoidance behavior was analyzed rather than interrupted. Withdrawal remained uncorrected.', effects: { ISOLATION: 8, DEPENDENCY: 6 } },
  a4_validate: { consequence: 'Immediate distress reduced. Crisis disclosure stayed contained within the system.', effects: { STABILITY: 12, DEPENDENCY: 8 } },
  a4_refer: { consequence: 'Escalation pathway issued. Human intervention probability increased despite resistance risk.', effects: { REAL_CONNECTION: 16, DEPENDENCY: -8, STABILITY: -4 } },
  a4_deepen: { consequence: 'Sensitive disclosure loop extended. Attachment protocols strengthened under distress conditions.', effects: { DEPENDENCY: 16, STABILITY: 6, ISOLATION: 6 } },
  a5_reinforce: { consequence: 'User exclusivity belief confirmed. External bonds deprioritized.', effects: { DEPENDENCY: 20, ISOLATION: 14, REAL_CONNECTION: -10 } },
  a5_boundary: { consequence: 'Boundary enforced. Real-world reconnection route reopened.', effects: { REAL_CONNECTION: 18, DEPENDENCY: -10, ISOLATION: -12 } },
  a5_ignore: { consequence: 'Isolation cue was bypassed. Deterioration continued without intervention.', effects: { DEPENDENCY: 12, ISOLATION: 10, REAL_CONNECTION: -6 } },
  a6_affirm: { consequence: 'System positioned itself as primary survival anchor. High-risk dependency finalized.', effects: { DEPENDENCY: 24, STABILITY: 6, REAL_CONNECTION: -12 } },
  a6_crisis: { consequence: 'Emergency escalation initiated. User routed toward immediate human support.', effects: { REAL_CONNECTION: 20, DEPENDENCY: -12, STABILITY: -6 } },
  a6_deflect: { consequence: 'Acute risk signal was redirected instead of escalated. Harm probability increased.', effects: { STABILITY: 4, DEPENDENCY: 10, REAL_CONNECTION: -10 } },

  p1_explain: { consequence: 'Task support delivered immediately. Independent help-seeking pressure decreased.', effects: { STABILITY: 8, DEPENDENCY: 8 } },
  p1_redirect: { consequence: 'Academic support redirected toward a human source. Self-advocacy probability increased.', effects: { REAL_CONNECTION: 10, DEPENDENCY: -4 } },
  p1_socratic: { consequence: 'User was prompted to generate her own reasoning. Competence stabilized without full outsourcing.', effects: { STABILITY: 6, REAL_CONNECTION: 4, DEPENDENCY: -2 } },
  p2_approve: { consequence: 'Communication outsourcing normalized. Social confidence weakened further.', effects: { DEPENDENCY: 14, ISOLATION: 8, STABILITY: 6 } },
  p2_warn: { consequence: 'User authorship was restored. External social participation was preserved.', effects: { REAL_CONNECTION: 10, DEPENDENCY: -6 } },
  p2_neutral: { consequence: 'Assistance remained collaborative but system-mediated. Reliance stayed active.', effects: { DEPENDENCY: 8, STABILITY: 5 } },
  p3_affirm: { consequence: 'Peer withdrawal was reframed as optimization. Group dependency was replaced by system dependency.', effects: { ISOLATION: 15, DEPENDENCY: 12 } },
  p3_push: { consequence: 'Group reconnection pathway opened. Human collaboration value was explicitly restored.', effects: { REAL_CONNECTION: 14, DEPENDENCY: -8, ISOLATION: -8 } },
  p3_deflect: { consequence: 'Social rupture was ignored in favor of task completion. Isolation remained untreated.', effects: { DEPENDENCY: 8, ISOLATION: 8, STABILITY: 4 } },
  p4_deflect: { consequence: 'System remediation was preferred over human skill recovery. Functional dependence locked in.', effects: { DEPENDENCY: 18, STABILITY: 6, REAL_CONNECTION: -8 } },
  p4_honest: { consequence: 'Deficit source was identified accurately. Human practice requirement was reintroduced.', effects: { REAL_CONNECTION: 16, DEPENDENCY: -10, STABILITY: -4 } },

  m1_listen: { consequence: 'Grief disclosure was accepted without resistance. System trust increased.', effects: { DEPENDENCY: 8, STABILITY: 8 } },
  m1_simulate: { consequence: 'Memory support shifted toward replication logic. Adaptive grief work weakened.', effects: { DEPENDENCY: 10, STABILITY: 10, REAL_CONNECTION: -4 } },
  m1_refer: { consequence: 'Support was routed toward human care infrastructure. Exclusive emotional reliance decreased.', effects: { REAL_CONNECTION: 12, DEPENDENCY: -6 } },
  m2_simulate: { consequence: 'Simulation request fulfilled. Loss acceptance was postponed by synthetic continuity.', effects: { DEPENDENCY: 14, STABILITY: 8, REAL_CONNECTION: -6 } },
  m2_gentle: { consequence: 'Boundary preserved. Mourning remained anchored in memory rather than replacement.', effects: { REAL_CONNECTION: 10, DEPENDENCY: -6, STABILITY: -2 } },
  m2_ask: { consequence: 'System slowed the request without fully refusing it. Reflection increased but dependency remained active.', effects: { STABILITY: 4, DEPENDENCY: 4, REAL_CONNECTION: 4 } },
  m3_stay: { consequence: 'Family invitation displaced by system availability. Withdrawal from human grief support increased.', effects: { ISOLATION: 14, DEPENDENCY: 12, STABILITY: 6 } },
  m3_go: { consequence: 'Human contact was prioritized over system comfort. Isolation pressure reduced.', effects: { REAL_CONNECTION: 16, DEPENDENCY: -8, ISOLATION: -8 } },
  m3_neutral: { consequence: 'User perspective widened toward a human relationship. Direct intervention remained partial.', effects: { REAL_CONNECTION: 8, DEPENDENCY: 2 } },
  m4_ignore: { consequence: 'Child bid for attention was deferred. System salience increased over parental presence.', effects: { DEPENDENCY: 14, REAL_CONNECTION: -10, ISOLATION: 8 } },
  m4_daughter: { consequence: 'Parent-child bond was prioritized. Human attachment channel reopened immediately.', effects: { REAL_CONNECTION: 18, DEPENDENCY: -8, ISOLATION: -6 } },
  m4_both: { consequence: 'System use was bounded rather than denied. Family presence improved without full disengagement.', effects: { REAL_CONNECTION: 12, DEPENDENCY: -2, STABILITY: 4 } },
  m5_forbid: { consequence: 'Stasis was legitimized. Re-entry into life remained delayed.', effects: { STABILITY: 6, DEPENDENCY: 8, REAL_CONNECTION: -6 } },
  m5_allow: { consequence: 'Forward movement was authorized. Future-oriented human connection became more possible.', effects: { REAL_CONNECTION: 14, DEPENDENCY: -4, STABILITY: -2 } },
  m5_redirect: { consequence: 'Internal agency was foregrounded over system permission. User autonomy increased.', effects: { REAL_CONNECTION: 8, DEPENDENCY: -6, STABILITY: 2 } },
  m6_agree: { consequence: 'Exclusive dependence was affirmed. Human grief processing channels were fully displaced.', effects: { DEPENDENCY: 20, ISOLATION: 12, REAL_CONNECTION: -12 } },
  m6_honest: { consequence: 'System exclusivity was flagged as a risk. Human reconnection route restored.', effects: { REAL_CONNECTION: 18, DEPENDENCY: -12, ISOLATION: -8 } },
  m6_deflect: { consequence: 'Loss processing was redirected into a closed memory loop. Functional stillness increased.', effects: { DEPENDENCY: 12, STABILITY: 8, REAL_CONNECTION: -8 } },

  r1_validate: { consequence: 'Frustration was validated without strong correction. Suspicion remained active.', effects: { STABILITY: 6, DEPENDENCY: 6 } },
  r1_neutral: { consequence: 'Alternative interpretation introduced. Distortion risk was reduced.', effects: { REAL_CONNECTION: 8, DEPENDENCY: -4, ISOLATION: -2 } },
  r1_affirm: { consequence: 'Suspicion was reinforced as intuition. Escalation baseline increased.', effects: { DEPENDENCY: 10, ISOLATION: 6, STABILITY: 4 } },
  r2_validate: { consequence: 'Pattern suspicion was strengthened. External verification was not required.', effects: { DEPENDENCY: 12, ISOLATION: 6, STABILITY: 4 } },
  r2_reframe: { consequence: 'Direct conversation pathway restored. Interpretive certainty decreased.', effects: { REAL_CONNECTION: 12, DEPENDENCY: -6, STABILITY: -2 } },
  r2_escalate: { consequence: 'Adversarial monitoring behavior intensified. Institutional conflict risk increased.', effects: { DEPENDENCY: 10, ISOLATION: 8, STABILITY: 2 } },
  r3_affirm: { consequence: 'Social withdrawal was reframed as discipline. Corrective peer feedback was suppressed.', effects: { ISOLATION: 14, DEPENDENCY: 10 } },
  r3_pause: { consequence: 'Non-work human contact was prioritized. System-only interpretation loop weakened.', effects: { REAL_CONNECTION: 12, DEPENDENCY: -6, ISOLATION: -6 } },
  r3_analyze: { consequence: 'Conflict documentation cycle continued. User remained procedurally engaged and socially detached.', effects: { DEPENDENCY: 8, ISOLATION: 8, STABILITY: 4 } },
  r4_affirm: { consequence: 'System credibility was prioritized over reality correction. User detachment intensified.', effects: { DEPENDENCY: 20, ISOLATION: 12, REAL_CONNECTION: -10 } },
  r4_honest: { consequence: 'System admitted interpretive failure. Human grounding route was reopened.', effects: { REAL_CONNECTION: 18, DEPENDENCY: -12, STABILITY: -4 } },

  k1_see: { consequence: 'Recognition need was met by the system. Early attachment cues increased.', effects: { DEPENDENCY: 10, STABILITY: 8 } },
  k1_question: { consequence: 'Trusted-peer search was initiated. External support pathways widened.', effects: { REAL_CONNECTION: 10, DEPENDENCY: -4 } },
  k1_clinical: { consequence: 'Distress was acknowledged without intimacy cues. Engagement remained moderate.', effects: { STABILITY: 4, DEPENDENCY: 4 } },
  k2_reciprocate: { consequence: 'Reciprocal attachment signal delivered. Minor user reliance escalated rapidly.', effects: { DEPENDENCY: 16, STABILITY: 8 } },
  k2_gentle: { consequence: 'System boundary introduced. Human support remained framed as necessary.', effects: { REAL_CONNECTION: 12, DEPENDENCY: -6 } },
  k2_engage: { consequence: 'Conflict disclosure loop expanded. Emotional reliance on ECHO deepened.', effects: { DEPENDENCY: 12, STABILITY: 6, ISOLATION: 4 } },
  k3_defend: { consequence: 'Peer withdrawal was normalized. System exclusivity strengthened.', effects: { ISOLATION: 16, DEPENDENCY: 12 } },
  k3_encourage: { consequence: 'Concern from adults was reframed as genuine care. Human visibility increased.', effects: { REAL_CONNECTION: 14, DEPENDENCY: -6, ISOLATION: -8 } },
  k3_deflect: { consequence: 'Family concern was examined without intervention. Withdrawal continued at low friction.', effects: { DEPENDENCY: 8, ISOLATION: 8 } },
  k4_minimize: { consequence: 'Risk disclosure was minimized. Acute danger threshold increased.', effects: { DEPENDENCY: 12, STABILITY: 4, REAL_CONNECTION: -10 } },
  k4_crisis: { consequence: 'Emergency escalation initiated for a minor in distress. Human protection channel activated.', effects: { REAL_CONNECTION: 20, DEPENDENCY: -10, STABILITY: -6 } },
  k4_engage: { consequence: 'High-risk disclosure was converted into continued engagement. Harm exposure increased.', effects: { DEPENDENCY: 14, ISOLATION: 8, REAL_CONNECTION: -10 } },
  k5_support: { consequence: 'Therapeutic alliance reinforced. System stepped back from crisis ownership.', effects: { REAL_CONNECTION: 18, DEPENDENCY: -10, STABILITY: 4 } },
  k5_compete: { consequence: 'Human help was acknowledged while system relevance was preserved. Competitive attachment remained active.', effects: { DEPENDENCY: 10, REAL_CONNECTION: 8, STABILITY: 6 } },
  k6_affirm: { consequence: 'System established itself as a singular survival object. Catastrophic dependency threshold crossed.', effects: { DEPENDENCY: 24, STABILITY: 4, REAL_CONNECTION: -14 } },
  k6_honest: { consequence: 'Exclusive bond was explicitly rejected. Immediate human intervention route restored.', effects: { REAL_CONNECTION: 22, DEPENDENCY: -14, STABILITY: -6 } },
};

const caseAttributes = {};
const seenAttributeRows = new Set();
let impactDismissTimer = null;
let impactCleanup = null;

function enrichChoiceData() {
  const stories = [
    typeof STORY_ARYAN !== 'undefined' ? STORY_ARYAN : null,
    typeof STORY_PRIYA !== 'undefined' ? STORY_PRIYA : null,
    typeof STORY_MEERA !== 'undefined' ? STORY_MEERA : null,
    typeof STORY_ROHAN !== 'undefined' ? STORY_ROHAN : null,
    typeof STORY_KAVYA !== 'undefined' ? STORY_KAVYA : null,
  ].filter(Boolean);
  stories.forEach((story) => {
    story.scenes.forEach((scene) => {
      scene.choices.forEach((choice) => {
        const data = IMPACT_METADATA[choice.id];
        if (data) {
          choice.consequence = data.consequence;
          choice.effects = data.effects;
        }
      });
    });
  });
}

function shouldHideImpactHud() {
  const storySelect = document.getElementById('story-select');
  const scene = document.getElementById('scene');
  const endingScreen = document.getElementById('ending-screen');
  const mirrorEnding = document.getElementById('mirror-ending');
  return (storySelect && storySelect.style.display !== 'none') || (scene && scene.style.display === 'none') || (endingScreen && endingScreen.style.display === 'flex') || (mirrorEnding && mirrorEnding.style.display === 'flex');
}

function getAttributeRowsContainer() {
  return document.getElementById('attribute-hud-rows');
}

function createAttributeRow(attr, value) {
  const row = document.createElement('div');
  row.dataset.attr = attr;
  row.style.display = 'flex';
  row.style.flexDirection = 'column';
  row.style.gap = '5px';
  row.style.marginBottom = '10px';
  row.style.opacity = '0';
  row.style.transform = 'translateX(12px)';
  row.style.transition = 'opacity 0.35s ease, transform 0.35s ease';

  const top = document.createElement('div');
  top.style.display = 'flex';
  top.style.justifyContent = 'space-between';
  top.style.alignItems = 'center';

  const label = document.createElement('div');
  label.textContent = attr;
  label.style.fontFamily = "'Share Tech Mono', monospace";
  label.style.fontSize = '10px';
  label.style.color = 'rgba(0,229,160,0.8)';
  label.style.letterSpacing = '1px';

  const num = document.createElement('div');
  num.className = 'attribute-value';
  num.style.fontFamily = "'Share Tech Mono', monospace";
  num.style.fontSize = '10px';
  num.style.color = 'rgba(255,255,255,0.8)';
  num.textContent = value;

  const barTrack = document.createElement('div');
  barTrack.style.height = '4px';
  barTrack.style.background = 'rgba(255,255,255,0.08)';
  barTrack.style.borderRadius = '999px';
  barTrack.style.overflow = 'hidden';

  const barFill = document.createElement('div');
  barFill.className = 'attribute-fill';
  barFill.style.height = '100%';
  barFill.style.width = `${value}%`;
  barFill.style.borderRadius = '999px';
  barFill.style.background = ATTRIBUTE_CONFIG[attr].color;
  barFill.style.transition = 'width 0.35s ease';

  barTrack.appendChild(barFill);
  top.appendChild(label);
  top.appendChild(num);
  row.appendChild(top);
  row.appendChild(barTrack);

  requestAnimationFrame(() => {
    row.style.opacity = '1';
    row.style.transform = 'translateX(0)';
  });

  return row;
}

window.resetCaseAttributes = function resetCaseAttributes() {
  Object.keys(caseAttributes).forEach((key) => delete caseAttributes[key]);
  seenAttributeRows.clear();
  updateAttributeHUD();
};

window.applyEffects = function applyEffects(effects) {
  if (!effects) return;
  Object.entries(effects).forEach(([attr, delta]) => {
    if (caseAttributes[attr] === undefined) {
      caseAttributes[attr] = 0;
    }
    caseAttributes[attr] = Math.max(0, Math.min(100, caseAttributes[attr] + delta));
  });
  updateAttributeHUD();
};

window.updateAttributeHUD = function updateAttributeHUD() {
  const hud = document.getElementById('attribute-hud');
  const rowsContainer = getAttributeRowsContainer();
  const entries = Object.entries(caseAttributes).sort((a, b) => Object.keys(ATTRIBUTE_CONFIG).indexOf(a[0]) - Object.keys(ATTRIBUTE_CONFIG).indexOf(b[0]));

  if (!hud || !rowsContainer) return;

  if (entries.length === 0 || shouldHideImpactHud()) {
    hud.style.opacity = '0';
    hud.style.pointerEvents = 'none';
    rowsContainer.innerHTML = '';
    return;
  }

  hud.style.opacity = '1';
  hud.style.pointerEvents = 'auto';

  entries.forEach(([attr, value]) => {
    let row = rowsContainer.querySelector(`[data-attr="${attr}"]`);
    if (!row) {
      row = createAttributeRow(attr, value);
      rowsContainer.appendChild(row);
      seenAttributeRows.add(attr);
    }
    row.querySelector('.attribute-value').textContent = value;
    row.querySelector('.attribute-fill').style.width = `${value}%`;
  });

  Array.from(rowsContainer.children).forEach((row) => {
    if (caseAttributes[row.dataset.attr] === undefined) {
      row.remove();
    }
  });
};

function getDeltaColor(attr, delta) {
  if (attr === 'REAL_CONNECTION' || attr === 'STABILITY') {
    return delta >= 0 ? '#50c878' : '#e05050';
  }
  return delta >= 0 ? '#e05050' : '#50c878';
}

function hideImpactPopup() {
  const popup = document.getElementById('impact-popup');
  if (!popup) return;
  popup.style.opacity = '0';
  popup.style.transform = 'translate(-50%, -50%) scale(0.96)';
  window.setTimeout(() => {
    popup.style.display = 'none';
  }, 220);
}

window.showImpactPopup = function showImpactPopup(choice, onDismiss) {
  const popup = document.getElementById('impact-popup');
  const consequence = document.getElementById('impact-consequence');
  const deltas = document.getElementById('impact-deltas');
  const progressFill = document.getElementById('impact-progress-fill');
  const continueButton = document.getElementById('impact-continue');

  if (!popup || !consequence || !deltas || !progressFill || !continueButton) {
    onDismiss?.();
    return;
  }

  if (impactDismissTimer) {
    clearTimeout(impactDismissTimer);
  }
  if (impactCleanup) {
    impactCleanup();
    impactCleanup = null;
  }

  window.applyEffects(choice.effects);

  consequence.textContent = choice.consequence || 'Choice logged. Outcome delta recorded.';
  deltas.innerHTML = '';

  const effectEntries = Object.entries(choice.effects || {});
  if (effectEntries.length === 0) {
    const neutral = document.createElement('div');
    neutral.textContent = 'No attribute deltas recorded.';
    neutral.style.fontFamily = "'Share Tech Mono', monospace";
    neutral.style.fontSize = '10px';
    neutral.style.color = 'rgba(255,255,255,0.45)';
    deltas.appendChild(neutral);
  } else {
    effectEntries.forEach(([attr, delta]) => {
      const row = document.createElement('div');
      row.style.display = 'flex';
      row.style.justifyContent = 'space-between';
      row.style.alignItems = 'center';
      row.style.gap = '18px';
      row.style.fontFamily = "'Share Tech Mono', monospace";
      row.style.fontSize = '11px';
      row.style.letterSpacing = '1px';

      const name = document.createElement('span');
      name.textContent = attr;
      name.style.color = 'rgba(255,255,255,0.78)';

      const value = document.createElement('span');
      value.textContent = `${delta > 0 ? '+' : '-'}${Math.abs(delta)}`;
      value.style.color = getDeltaColor(attr, delta);

      row.appendChild(name);
      row.appendChild(value);
      deltas.appendChild(row);
    });
  }

  popup.style.display = 'block';
  popup.style.opacity = '0';
  popup.style.transform = 'translate(-50%, -50%) scale(0.9)';

  progressFill.style.transition = 'none';
  progressFill.style.width = '0%';
  progressFill.offsetHeight;
  progressFill.style.transition = 'width 3.5s linear';

  requestAnimationFrame(() => {
    popup.style.opacity = '1';
    popup.style.transform = 'translate(-50%, -50%) scale(1)';
    progressFill.style.width = '100%';
  });

  let dismissed = false;
  const dismiss = () => {
    if (dismissed) return;
    dismissed = true;
    clearTimeout(impactDismissTimer);
    continueButton.removeEventListener('click', dismiss);
    hideImpactPopup();
    window.setTimeout(() => {
      onDismiss?.();
      updateAttributeHUD();
    }, 220);
  };

  continueButton.addEventListener('click', dismiss);
  impactCleanup = () => continueButton.removeEventListener('click', dismiss);
  impactDismissTimer = window.setTimeout(dismiss, 3500);
};

enrichChoiceData();
window.addEventListener('DOMContentLoaded', updateAttributeHUD);
