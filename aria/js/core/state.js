export const appState = {
  currentStory: null,
  currentSceneIndex: 0,
  storyProgress: {},
  choiceIdleTimer: null,
};

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

export function setStoryEnding(storyId, endingKey) {
  appState.storyProgress[storyId] = endingKey;
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
