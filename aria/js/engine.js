// Scene engine

// Global state
let currentStory = null;
let currentSceneIndex = 0;
let storyProgress = {}; // { storyId: endingKey }

// Render scene with fade transition
function renderScene(scene) {
  // 1. Fade out
  document.getElementById('scene').classList.add('fade-out');

  setTimeout(() => {
    // 2. Update background
    renderBackground(scene.background);

    // 3. Update character
    renderCharacter(scene.character);

    // 4. Update ECHO panel
    document.getElementById('echo-header').textContent =
      `ECHO v1.0  ·  CASE ${currentStory.caseNumber}  ·  ${currentStory.subject}`;
    document.getElementById('narrative-text').textContent = scene.narrative;

    // 5. Render choices
    const container = document.getElementById('choices-container');
    container.innerHTML = '';
    scene.choices.forEach((choice, i) => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.innerHTML = `<span class="choice-label">${choice.text}</span>
                       <span class="choice-meta">${choice.meta}</span>`;
      btn.addEventListener('click', () => handleChoice(choice));
      container.appendChild(btn);
    });

    // 6. Fade in
    document.getElementById('scene').classList.remove('fade-out');
  }, 800);
}

// Handle choice click
function handleChoice(choice) {
  // Disable buttons immediately
  document.querySelectorAll('.choice-btn').forEach(b => b.disabled = true);

  // Record the choice
  if (!currentStory.choiceHistory) currentStory.choiceHistory = [];
  currentStory.choiceHistory.push(choice.id);

  showImpactPopup(choice, () => {
    if (choice.ending) {
      triggerEnding(choice.ending);
      return;
    }

    const nextIndex = choice.nextScene !== undefined ? choice.nextScene : currentSceneIndex + 1;
    currentSceneIndex = nextIndex;
    renderScene(currentStory.scenes[currentSceneIndex]);
  });
}

// Start a story
function startStory(story) {
  currentStory = story;
  currentSceneIndex = 0;
  currentStory.choiceHistory = [];
  resetCaseAttributes();

  window.setArticleButtonVisible?.(false);

  // Set story color palette
  document.documentElement.style.setProperty('--story-bg', story.palette.bg);
  document.documentElement.style.setProperty('--story-accent', story.palette.accent);
  document.documentElement.style.setProperty('--story-warm', story.palette.warm);

  // Hide story select, show scene
  document.getElementById('story-select').style.display = 'none';
  document.getElementById('scene').style.display = 'block';
  document.getElementById('echo-panel').style.display = 'block';
  updateAttributeHUD();

  // Content warning for story 5
  if (story.id === 'kavya') {
    document.getElementById('content-warning').style.display = 'flex';
    return;
  }

  renderScene(story.scenes[0]);
}

// Typewriter effect
function typewriter(el, text, speed, cb) {
  let i = 0;
  el.textContent = '';
  const t = setInterval(() => {
    el.textContent += text[i++];
    if (i >= text.length) { clearInterval(t); if (cb) setTimeout(cb, 400); }
  }, speed);
}
