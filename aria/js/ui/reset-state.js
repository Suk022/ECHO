import { clearPersistedProgress } from '../core/state.js';

const BOOT_SESSION_KEY = 'echo:hasSeenBootScreen';

let resetButton;
let resetPopover;
let resetConfirmButton;
let resetCancelButton;
let isResetOpen = false;

export function initResetStateControl() {
  resetButton = document.getElementById('reset-state-btn');
  resetPopover = document.getElementById('reset-state-popover');
  resetConfirmButton = document.getElementById('reset-state-confirm');
  resetCancelButton = document.getElementById('reset-state-cancel');

  if (!resetButton || !resetPopover || !resetConfirmButton || !resetCancelButton) {
    return;
  }

  resetButton.addEventListener('click', () => {
    if (isResetOpen) {
      closeResetPopover();
    } else {
      openResetPopover();
    }
  });

  resetConfirmButton.addEventListener('click', () => {
    clearPersistedProgress();
    window.sessionStorage.removeItem(BOOT_SESSION_KEY);
    window.location.reload();
  });

  resetCancelButton.addEventListener('click', closeResetPopover);

  document.addEventListener('click', (event) => {
    if (!isResetOpen) return;
    if (resetPopover.contains(event.target) || resetButton.contains(event.target)) {
      return;
    }
    closeResetPopover();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isResetOpen) {
      closeResetPopover();
    }
  });
}

function openResetPopover() {
  if (!resetPopover) return;
  isResetOpen = true;
  resetPopover.classList.add('is-open');
}

function closeResetPopover() {
  if (!resetPopover) return;
  isResetOpen = false;
  resetPopover.classList.remove('is-open');
}

export function setResetButtonVisible(visible) {
  if (!resetButton || !resetPopover) return;
  resetButton.style.display = visible ? 'flex' : 'none';
  if (!visible) {
    closeResetPopover();
  }
}
