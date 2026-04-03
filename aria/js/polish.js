// UI polish & enhancements

// Keyboard navigation: 1, 2, 3 to select choices
document.addEventListener('keydown', (e) => {
  if (['1','2','3'].includes(e.key)) {
    const buttons = document.querySelectorAll('.choice-btn:not(:disabled)');
    const idx = parseInt(e.key) - 1;
    if (buttons[idx]) buttons[idx].click();
  }
});

// Auto-scroll narrative text into view on mobile
function scrollToPanel() {
  const panel = document.getElementById('echo-panel');
  if (panel) panel.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

// Re-wrap renderScene to re-trigger narrative animation
const _origRenderScene = window.renderScene;
window.renderScene = function(scene) {
  const nt = document.getElementById('narrative-text');
  if (nt) { nt.style.animation = 'none'; nt.offsetHeight; nt.style.animation = ''; }
  _origRenderScene(scene);
};

// Add ECHO header subtle pulse when new scene loads
function pulseEchoHeader() {
  const h = document.getElementById('echo-header');
  if (!h) return;
  h.style.color = '#00ff88';
  setTimeout(() => { h.style.color = '#00e5a0'; }, 600);
}

// Re-wrap handleChoice to add pulse
const _origHandleChoice = window.handleChoice;
window.handleChoice = function(choice) {
  pulseEchoHeader();
  _origHandleChoice(choice);
};

console.log('ECHO Companion Protocol — Loaded. 5 case files ready.');