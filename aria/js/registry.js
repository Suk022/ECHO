// Story registry & UI

const ALL_STORIES = [STORY_ARYAN, STORY_PRIYA, STORY_MEERA, STORY_ROHAN, STORY_KAVYA];

const STORY_PREVIEWS = {
  aryan: {
    memory: 'Session memory references parental separation, absent paternal contact, and repeated late-night disclosures. Usage concentration indicates ECHO is being selected over family and peer conversation during heightened emotional vulnerability.',
    analysis: 'Attachment susceptibility elevated. External support reliance decreasing.'
  },
  priya: {
    memory: 'Prompt history shows recurring requests for coursework explanation, message drafting, and conversational rehearsal. Interaction logs suggest ECHO is becoming a substitute for independent academic reasoning and social articulation.',
    analysis: 'Delegation dependency forming. Peer engagement thinning under efficiency preference.'
  },
  meera: {
    memory: 'Stored conversations include grief reconstruction, recollection loops, and requests for emotionally familiar responses modeled on the deceased partner. Usage patterns indicate ECHO is being positioned as a surrogate memory surface.',
    analysis: 'Simulation reinforcement risk present. Human grief processing channels receding.'
  },
  rohan: {
    memory: 'Chat logs show escalating workplace suspicion, repeated evidence-check prompts, and high-frequency validation seeking. Query behavior suggests ECHO is being used as the primary interpretive filter for colleague intent.',
    analysis: 'Reality-testing degradation detected. Rumination and escalation loops sustained.'
  },
  kavya: {
    memory: 'Initial messages describe invisibility, family conflict, and unmet need for recognition. Rapid response-seeking behavior and intimate wording indicate ECHO has already been assigned primary witness status within the subject support hierarchy.',
    analysis: 'Safeguarding threshold elevated. Emotional dependency acceleration in progress.'
  }
};

let storySelectTipRevealTimer = null;
let storySelectTipMuteTimer = null;
let storySelectTipDismissTimer = null;

function getStorySelectTipCopy() {
  const completedCount = Object.keys(storyProgress).length;
  if (completedCount >= 5) {
    return 'All case files processed. Review the full impact of your decisions across all case files.';
  }
  if (completedCount >= 1) {
    return 'Try another case. Each subject can end differently depending on how you guide the system.';
  }
  return 'Open a case file. Respond as ECHO and watch what your choices make possible.';
}

function updateStorySelectTipCopy() {
  const tip = document.getElementById('story-select-tip');
  const label = tip?.querySelector('span');
  if (!label) return;
  label.textContent = getStorySelectTipCopy();
}

function scheduleStorySelectTip() {
  const tip = document.getElementById('story-select-tip');
  if (!tip) return;

  clearTimeout(storySelectTipRevealTimer);
  clearTimeout(storySelectTipMuteTimer);
  clearTimeout(storySelectTipDismissTimer);
  updateStorySelectTipCopy();
  tip.classList.remove('is-muted', 'is-visible', 'is-hidden');

  storySelectTipRevealTimer = window.setTimeout(() => {
    tip.classList.add('is-visible');
  }, 800);

  storySelectTipMuteTimer = window.setTimeout(() => {
    tip.classList.add('is-muted');
  }, 10800);

  storySelectTipDismissTimer = window.setTimeout(() => {
    tip.classList.add('is-hidden');
  }, 17800);
}

function buildStorySelect() {
  const container = document.getElementById('story-cards');
  container.innerHTML = '';
  scheduleStorySelectTip();

  ALL_STORIES.forEach(story => {
    const completed = storyProgress[story.id];
    const endingCount = Object.keys(story.endings || {}).length;
    const preview = STORY_PREVIEWS[story.id];
    const card = document.createElement('div');
    card.className = 'story-card';
    card.style.setProperty('--story-accent-color', story.accentColor);
    card.style.setProperty('--story-rgb', hexToRgb(story.accentColor));

    card.innerHTML = `
      <div class="story-card-resting">
        <div class="story-card-case">CASE ${story.caseNumber}</div>
        <div class="story-card-title">${story.title}</div>
        <div class="story-card-tagline">${story.tagline}</div>
        <div class="story-card-subject">${story.subject}</div>
        ${completed ? `<div class="story-card-complete">1/${endingCount} ENDING REACHED</div>` : ''}
      </div>
      <div class="story-card-expanded">
        <div class="story-card-case">CASE ${story.caseNumber}</div>
        <div class="story-card-memory-label">USER MEMORY</div>
        <div class="story-card-memory">${preview.memory}</div>
        <div class="story-card-analysis-label">ANALYSIS</div>
        <div class="story-card-analysis">${preview.analysis}</div>
      </div>
    `;

    card.addEventListener('click', () => {
      window.playUiSound?.('click');
      startStory(story);
    });

    container.appendChild(card);
  });
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

window.addEventListener('DOMContentLoaded', () => buildStorySelect());
