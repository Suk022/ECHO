import { loadComponents } from './core/components.js';
import { initImpactSystem } from './core/impact-system.js';
import { initEndings } from './core/endings.js';
import { initStorySelect, buildStorySelect } from './core/registry.js';
import { initFinalReportV2, updateStorySelectUnlockStateV2 } from './reports/final-report-v2.js';
import { initSfx } from './ui/sfx.js';
import { initBootScreen } from './ui/boot.js';
import { initArticles } from './ui/articles.js';
import { initMessageModal } from './ui/message-modal.js';
import { initResetStateControl } from './ui/reset-state.js';
import { continueContentWarningStory } from './core/engine.js';
import { initPolish } from './core/polish.js';

async function initApp() {
  await loadComponents();

  initSfx();
  initImpactSystem();
  initEndings();
  initStorySelect();
  initFinalReportV2();
  initArticles();
  initMessageModal();
  initResetStateControl();
  initBootScreen();
  initPolish();

  document.getElementById('content-warning-continue')?.addEventListener('click', continueContentWarningStory);

  buildStorySelect();
  updateStorySelectUnlockStateV2();
}

initApp().catch((error) => {
  console.error('ECHO module bootstrap failed:', error);
});
