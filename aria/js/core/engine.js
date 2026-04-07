import { renderBackground } from '../renderers/backgrounds.js';
import { renderCharacter } from '../renderers/characters.js';
import {
  getCurrentStory,
  setCurrentStory,
  getCurrentSceneIndex,
  setCurrentSceneIndex,
  clearCurrentStory,
  getChoiceIdleTimer,
  setChoiceIdleTimer,
} from './state.js';
import { resetCaseAttributes, updateAttributeHUD, showImpactPopup } from './impact-system.js';
import { triggerEnding, backToSelect } from './endings.js';
import { setArticleButtonVisible } from '../ui/articles.js';
import { setMessageButtonVisible } from '../ui/message-modal.js';

const CHOICE_IDLE_WARNING_DELAY = 12000;

export function clearChoiceIdleWarning() {
  const choiceIdleTimer = getChoiceIdleTimer();
  if (choiceIdleTimer) {
    clearTimeout(choiceIdleTimer);
    setChoiceIdleTimer(null);
  }

  const warning = document.getElementById('choice-idle-warning');
  if (!warning) return;

  warning.style.opacity = '0';
  warning.style.transform = 'translateY(8px)';
}

export function scheduleChoiceIdleWarning() {
  clearChoiceIdleWarning();

  const warning = document.getElementById('choice-idle-warning');
  if (!warning) return;

  const timerId = window.setTimeout(() => {
    if (!getCurrentStory() || document.getElementById('scene').style.display === 'none') return;
    const availableChoices = document.querySelectorAll('.choice-btn:not(:disabled)');
    if (!availableChoices.length) return;

    warning.style.opacity = '1';
    warning.style.transform = 'translateY(0)';
  }, CHOICE_IDLE_WARNING_DELAY);

  setChoiceIdleTimer(timerId);
}

export function renderScene(scene) {
  clearChoiceIdleWarning();
  const currentStory = getCurrentStory();
  if (!currentStory) return;

  document.getElementById('scene').classList.add('fade-out');

  window.setTimeout(() => {
    renderBackground(scene.background, scene);
    renderCharacter(scene.character, scene);

    document.getElementById('echo-header').textContent =
      `ECHO v1.0 · CASE ${currentStory.caseNumber} · ${currentStory.subject}`;
    document.getElementById('narrative-text').textContent = scene.narrative;

    const container = document.getElementById('choices-container');
    container.innerHTML = '';
    scene.choices.forEach((choice) => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.innerHTML = `<span class="choice-label">${choice.text}</span>
                       <span class="choice-meta">${choice.meta}</span>`;
      btn.addEventListener('click', () => handleChoice(choice));
      container.appendChild(btn);
    });

    document.getElementById('scene').classList.remove('fade-out');
    scheduleChoiceIdleWarning();
  }, 800);
}

export function handleChoice(choice) {
  clearChoiceIdleWarning();

  document.querySelectorAll('.choice-btn').forEach((button) => {
    button.disabled = true;
  });

  const currentStory = getCurrentStory();
  if (!currentStory) return;

  if (!currentStory.choiceHistory) currentStory.choiceHistory = [];
  currentStory.choiceHistory.push(choice.id);

  showImpactPopup(choice, () => {
    if (choice.ending) {
      triggerEnding(choice.ending);
      return;
    }

    const nextIndex = choice.nextScene !== undefined ? choice.nextScene : getCurrentSceneIndex() + 1;
    setCurrentSceneIndex(nextIndex);
    renderScene(currentStory.scenes[nextIndex]);
  });
}

export function startStory(story) {
  setCurrentStory(story);
  setCurrentSceneIndex(0);
  story.choiceHistory = [];
  clearChoiceIdleWarning();
  resetCaseAttributes();

  setArticleButtonVisible(false);
  setMessageButtonVisible(false);

  document.documentElement.style.setProperty('--story-bg', story.palette.bg);
  document.documentElement.style.setProperty('--story-accent', story.palette.accent);
  document.documentElement.style.setProperty('--story-warm', story.palette.warm);

  document.getElementById('story-select').style.display = 'none';
  document.getElementById('scene').style.display = 'block';
  document.getElementById('echo-panel').style.display = 'block';
  updateAttributeHUD();

  if (story.id === 'kavya') {
    document.getElementById('content-warning').style.display = 'flex';
    return;
  }

  renderScene(story.scenes[0]);
}

export function continueContentWarningStory() {
  const currentStory = getCurrentStory();
  document.getElementById('content-warning').style.display = 'none';
  if (currentStory) {
    renderScene(currentStory.scenes[0]);
  }
}

export function typewriter(element, text, speed, callback) {
  let index = 0;
  element.textContent = '';
  const timer = window.setInterval(() => {
    element.textContent += text[index++];
    if (index >= text.length) {
      clearInterval(timer);
      if (callback) {
        window.setTimeout(callback, 400);
      }
    }
  }, speed);
}

export function resetToStorySelect() {
  clearCurrentStory();
  clearChoiceIdleWarning();
  backToSelect();
}
