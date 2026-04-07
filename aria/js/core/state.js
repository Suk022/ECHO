const APP_STATE_STORAGE_KEY = 'echo:app-state:v1';

const DEFAULT_APP_STATE = {
  currentStory: null,
  currentSceneIndex: 0,
  storyProgress: {},
  finalReportSnapshots: {},
  choiceIdleTimer: null,
};

function cloneDefaultState() {
  return {
    ...DEFAULT_APP_STATE,
    storyProgress: {},
    finalReportSnapshots: {},
  };
}

function normalizeProgressEntry(entry) {
  if (!entry) {
    return null;
  }

  if (typeof entry === 'string') {
    return {
      latestEnding: entry,
      endingsReached: [entry],
    };
  }

  const latestEnding = typeof entry.latestEnding === 'string' && entry.latestEnding ? entry.latestEnding : null;
  const endingsReached = Array.isArray(entry.endingsReached)
    ? entry.endingsReached.filter((ending, index, array) => typeof ending === 'string' && ending && array.indexOf(ending) === index)
    : [];

  if (latestEnding && !endingsReached.includes(latestEnding)) {
    endingsReached.push(latestEnding);
  }

  if (!latestEnding && endingsReached.length === 0) {
    return null;
  }

  return {
    latestEnding: latestEnding || endingsReached[endingsReached.length - 1] || null,
    endingsReached,
  };
}

function normalizeSnapshot(snapshot) {
  if (!snapshot || typeof snapshot !== 'object') {
    return null;
  }

  const endingKey = typeof snapshot.endingKey === 'string' && snapshot.endingKey ? snapshot.endingKey : null;
  const attributes = snapshot.attributes && typeof snapshot.attributes === 'object'
    ? Object.fromEntries(Object.entries(snapshot.attributes).filter(([, value]) => Number.isFinite(value)))
    : {};

  if (!endingKey) {
    return null;
  }

  return {
    endingKey,
    attributes,
  };
}

function readPersistedState() {
  try {
    const raw = window.localStorage.getItem(APP_STATE_STORAGE_KEY);
    if (!raw) {
      return cloneDefaultState();
    }

    const parsed = JSON.parse(raw);
    const storyProgress = Object.fromEntries(
      Object.entries(parsed.storyProgress || {})
        .map(([storyId, entry]) => [storyId, normalizeProgressEntry(entry)])
        .filter(([, entry]) => Boolean(entry))
    );

    const finalReportSnapshots = Object.fromEntries(
      Object.entries(parsed.finalReportSnapshots || {})
        .map(([storyId, snapshot]) => [storyId, normalizeSnapshot(snapshot)])
        .filter(([, snapshot]) => Boolean(snapshot))
    );

    return {
      ...cloneDefaultState(),
      storyProgress,
      finalReportSnapshots,
    };
  } catch (_) {
    return cloneDefaultState();
  }
}

function persistAppState() {
  try {
    const serializableState = {
      storyProgress: appState.storyProgress,
      finalReportSnapshots: appState.finalReportSnapshots,
    };
    window.localStorage.setItem(APP_STATE_STORAGE_KEY, JSON.stringify(serializableState));
  } catch (_) {
    // Ignore persistence errors so gameplay never breaks.
  }
}

export const appState = readPersistedState();

export function getCurrentStory() {
  return appState.currentStory;
}

export function setCurrentStory(story) {
  appState.currentStory = story;
}

export function getCurrentSceneIndex() {
  return appState.currentSceneIndex;
}

export function setCurrentSceneIndex(index) {
  appState.currentSceneIndex = index;
}

export function getStoryProgress() {
  return appState.storyProgress;
}

export function getStoryProgressEntry(storyId) {
  return appState.storyProgress[storyId] || null;
}

export function getCompletedCaseCount() {
  return Object.values(appState.storyProgress).filter((entry) => entry?.latestEnding).length;
}

export function setStoryEnding(storyId, endingKey) {
  const existingEntry = appState.storyProgress[storyId] || { latestEnding: null, endingsReached: [] };
  const endingsReached = existingEntry.endingsReached.includes(endingKey)
    ? existingEntry.endingsReached
    : [...existingEntry.endingsReached, endingKey];

  appState.storyProgress[storyId] = {
    latestEnding: endingKey,
    endingsReached,
  };

  persistAppState();
}

export function getFinalReportSnapshots() {
  return appState.finalReportSnapshots;
}

export function setFinalReportSnapshot(storyId, snapshot) {
  const normalized = normalizeSnapshot(snapshot);
  if (!normalized) {
    return;
  }

  appState.finalReportSnapshots[storyId] = normalized;
  persistAppState();
}

export function clearCurrentStory() {
  appState.currentStory = null;
  appState.currentSceneIndex = 0;
}

export function getChoiceIdleTimer() {
  return appState.choiceIdleTimer;
}

export function setChoiceIdleTimer(timerId) {
  appState.choiceIdleTimer = timerId;
}

export function clearPersistedProgress() {
  appState.storyProgress = {};
  appState.finalReportSnapshots = {};
  appState.currentStory = null;
  appState.currentSceneIndex = 0;
  appState.choiceIdleTimer = null;
  persistAppState();
}
