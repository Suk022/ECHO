// Story registry & UI

const ALL_STORIES = [STORY_ARYAN, STORY_PRIYA, STORY_MEERA, STORY_ROHAN, STORY_KAVYA];

// Build story select cards
function buildStorySelect() {
  const container = document.getElementById('story-cards');
  container.innerHTML = '';
  ALL_STORIES.forEach(story => {
    const completed = storyProgress[story.id];
    const card = document.createElement('div');
    card.style.cssText = `
      width: 160px; padding: 20px 16px; cursor: pointer;
      background: rgba(255,255,255,0.03);
      border: 1px solid ${story.accentColor}44;
      border-left: 4px solid ${story.accentColor};
      transition: all 0.3s; display: flex; flex-direction: column; gap: 8px;
    `;
    card.innerHTML = `
      <div style="font-family:'Share Tech Mono';font-size:10px;color:${story.accentColor};letter-spacing:2px;">CASE ${story.caseNumber}</div>
      <div style="font-family:'Playfair Display';font-size:15px;color:#f0ece4;">${story.title}</div>
      <div style="font-family:Lora;font-style:italic;font-size:12px;color:rgba(255,255,255,0.4);line-height:1.5;">${story.tagline}</div>
      <div style="font-family:'Share Tech Mono';font-size:10px;color:${story.accentColor};margin-top:4px;">${story.subject}</div>
      ${completed ? `<div style="font-family:'Share Tech Mono';font-size:9px;color:rgba(255,255,255,0.3);margin-top:4px;">✓ COMPLETED</div>` : ''}
    `;
    card.addEventListener('mouseenter', () => {
      card.style.background = `rgba(${hexToRgb(story.accentColor)},0.08)`;
      card.style.transform = 'translateY(-4px)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.background = 'rgba(255,255,255,0.03)';
      card.style.transform = 'none';
    });
    card.addEventListener('click', () => {
      window.playUiSound?.('click');
      startStory(story);
    });
    container.appendChild(card);
  });
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `${r},${g},${b}`;
}

// Initialize on load
window.addEventListener('DOMContentLoaded', () => buildStorySelect());
