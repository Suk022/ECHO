const BOOT_SESSION_KEY = 'echo:hasSeenBootScreen';
const BOOT_DECLINE_DELAY_MS = 1600;
const BOOT_BODY_DELAY_MS = 1400;
const BOOT_WARNING_DELAY_MS = 1100;
const BOOT_ACTIONS_DELAY_MS = 900;

(function initBootScreen() {
  const bootScreen = document.getElementById('boot-screen');
  const proceedButton = document.getElementById('boot-proceed');
  const declineButton = document.getElementById('boot-decline');
  const status = document.getElementById('boot-status');

  if (!bootScreen || !proceedButton || !declineButton || !status) {
    return;
  }

  const hasSeenBootScreen = sessionStorage.getItem(BOOT_SESSION_KEY) === 'true';
  let isClosing = false;
  let actionsVisible = false;

  proceedButton.disabled = true;
  declineButton.disabled = true;

  if (hasSeenBootScreen) {
    bootScreen.remove();
    return;
  }

  document.body.classList.add('boot-active');
  requestAnimationFrame(() => {
    bootScreen.classList.add('is-visible');
    bootScreen.classList.add('stage-title');
  });

  window.setTimeout(() => {
    if (!isClosing) {
      bootScreen.classList.add('stage-body');
    }
  }, BOOT_BODY_DELAY_MS);

  window.setTimeout(() => {
    if (!isClosing) {
      bootScreen.classList.add('stage-warning');
    }
  }, BOOT_BODY_DELAY_MS + BOOT_WARNING_DELAY_MS);

  window.setTimeout(() => {
    if (!isClosing) {
      actionsVisible = true;
      proceedButton.disabled = false;
      declineButton.disabled = false;
      bootScreen.classList.add('stage-actions');
    }
  }, BOOT_BODY_DELAY_MS + BOOT_WARNING_DELAY_MS + BOOT_ACTIONS_DELAY_MS);

  proceedButton.addEventListener('click', completeBootScreen);
  declineButton.addEventListener('click', handleDecline);
  document.addEventListener('keydown', handleBootKeydown);

  function handleDecline() {
    if (isClosing) return;

    window.playUiSound?.('cancel');
    status.textContent = 'System requires participation.';
    status.classList.add('is-visible');
    bootScreen.classList.add('stage-status');
    proceedButton.disabled = true;
    declineButton.disabled = true;

    window.setTimeout(() => {
      completeBootScreen();
    }, BOOT_DECLINE_DELAY_MS);
  }

  function completeBootScreen() {
    if (isClosing) return;
    isClosing = true;

    window.playUiSound?.('enter');
    sessionStorage.setItem(BOOT_SESSION_KEY, 'true');
    bootScreen.classList.add('is-exiting');
    document.removeEventListener('keydown', handleBootKeydown);

    window.setTimeout(() => {
      document.body.classList.remove('boot-active');
      bootScreen.remove();
    }, 820);
  }

  function handleBootKeydown(event) {
    if (!bootScreen.classList.contains('is-visible') || isClosing) return;
    if (!actionsVisible) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      completeBootScreen();
    }
  }
})();
