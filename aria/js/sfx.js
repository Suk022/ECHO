const UI_SOUNDS = {
  click: new Audio('assests/sounds/click.m4a'),
  enter: new Audio('assests/sounds/enter.m4a'),
  cancel: new Audio('assests/sounds/cancel.m4a'),
};

Object.values(UI_SOUNDS).forEach((audio) => {
  audio.preload = 'auto';
});

window.playUiSound = function playUiSound(name) {
  const source = UI_SOUNDS[name];
  if (!source) return;

  try {
    source.currentTime = 0;
    const playPromise = source.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {});
    }
  } catch (_) {
    // Ignore playback errors caused by browser autoplay policies.
  }
};
