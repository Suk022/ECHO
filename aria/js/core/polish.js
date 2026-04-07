export function initPolish() {
  document.addEventListener('keydown', (event) => {
    if (['1', '2', '3'].includes(event.key)) {
      const buttons = document.querySelectorAll('.choice-btn:not(:disabled)');
      const index = parseInt(event.key, 10) - 1;
      if (buttons[index]) {
        buttons[index].click();
      }
    }
  });

  document.addEventListener('click', (event) => {
    const choiceButton = event.target.closest('.choice-btn');
    if (!choiceButton) return;

    const header = document.getElementById('echo-header');
    if (!header) return;

    header.style.color = '#00ff88';
    window.setTimeout(() => {
      header.style.color = '#00e5a0';
    }, 600);
  });

  console.log('ECHO Companion Protocol — Loaded. 5 case files ready.');
}
