// Character renderer

// Character configs
function renderCharacter(charState) {
  const container = document.getElementById('scene-character');
  const { figure, state, name } = charState;
  container.innerHTML = buildCharacterSVG(figure, state, name);
}

// Build character SVG
function buildCharacterSVG(figure, state, name) {
  const configs = {
    // Teen boy — Aryan
    teen_boy: {
      color: '#c49a72',
      shirt: '#3a5a9a',
      hair: '#1a1a1a',
    },
    // Student girl — Priya
    student_girl: {
      color: '#d4a882',
      shirt: '#9a4a8a',
      hair: '#2a1a0a',
    },
    // Middle-aged woman — Meera
    adult_woman: {
      color: '#c49070',
      shirt: '#6a4a8a',
      hair: '#3a2a1a',
    },
    // Professional man — Rohan
    office_man: {
      color: '#c49070',
      shirt: '#2a3a5a',
      hair: '#1a1a1a',
    },
    // Teen girl — Kavya
    teen_girl: {
      color: '#d4b090',
      shirt: '#c44a8a',
      hair: '#1a0a1a',
    },
  };

  const c = configs[figure] || configs.teen_boy;

  // State modifies posture
  const stateStyles = {
    neutral:     { headTilt: 0,   shoulderDrop: 0,  bodyLean: 0,  opacity: 1,   eyeClose: false },
    happy:       { headTilt: -5,  shoulderDrop: -5, bodyLean: 0,  opacity: 1,   eyeClose: false },
    sad:         { headTilt: 10,  shoulderDrop: 8,  bodyLean: 3,  opacity: 0.9, eyeClose: false },
    withdrawn:   { headTilt: 15,  shoulderDrop: 12, bodyLean: 5,  opacity: 0.8, eyeClose: false },
    distressed:  { headTilt: 20,  shoulderDrop: 15, bodyLean: 8,  opacity: 0.75,eyeClose: false },
    content:     { headTilt: -3,  shoulderDrop: -3, bodyLean: 0,  opacity: 1,   eyeClose: true  },
    anxious:     { headTilt: 5,   shoulderDrop: 5,  bodyLean: -3, opacity: 0.9, eyeClose: false },
  };

  const s = stateStyles[state] || stateStyles.neutral;

  return `
    <svg width="180" height="260" viewBox="0 0 180 260" xmlns="http://www.w3.org/2000/svg"
         style="filter:drop-shadow(0 8px 24px rgba(0,0,0,0.4)); opacity:${s.opacity}">
      <!-- Shadow -->
      <ellipse cx="90" cy="255" rx="55" ry="10" fill="rgba(0,0,0,0.3)"/>

      <!-- Body group with lean -->
      <g transform="translate(${s.bodyLean},0)">
        <!-- Legs -->
        <rect x="65"  y="185" width="22" height="65" rx="10" fill="${c.color}" opacity="0.9"/>
        <rect x="93"  y="185" width="22" height="65" rx="10" fill="${c.color}" opacity="0.9"/>
        <!-- Shoes -->
        <ellipse cx="76"  cy="252" rx="16" ry="8" fill="#1a1a1a"/>
        <ellipse cx="104" cy="252" rx="16" ry="8" fill="#1a1a1a"/>

        <!-- Torso -->
        <rect x="52" y="105" width="76" height="90" rx="14" fill="${c.shirt}"/>

        <!-- Arms -->
        <rect x="28" y="108" width="26" height="60" rx="12"
              fill="${c.shirt}"
              transform="rotate(${s.shoulderDrop * 1.5}, 41, 108)"/>
        <rect x="126" y="108" width="26" height="60" rx="12"
              fill="${c.shirt}"
              transform="rotate(${-s.shoulderDrop * 1.5}, 139, 108)"/>
        <!-- Hands -->
        <circle cx="41"  cy="170" r="12" fill="${c.color}"/>
        <circle cx="139" cy="170" r="12" fill="${c.color}"/>
      </g>

      <!-- Head group with tilt -->
      <g transform="rotate(${s.headTilt}, 90, 90)">
        <!-- Neck -->
        <rect x="80" y="88" width="20" height="22" rx="8" fill="${c.color}"/>
        <!-- Head -->
        <ellipse cx="90" cy="68" rx="42" ry="48" fill="${c.color}"/>
        <!-- Hair -->
        <ellipse cx="90" cy="30" rx="44" ry="24" fill="${c.hair}"/>
        <rect x="46" y="20" width="88" height="35" rx="4" fill="${c.hair}"/>
        <!-- Eyes -->
        ${s.eyeClose
          ? `<path d="M72,65 Q78,60 84,65" stroke="#1a1a1a" stroke-width="2" fill="none"/>
             <path d="M96,65 Q102,60 108,65" stroke="#1a1a1a" stroke-width="2" fill="none"/>`
          : `<ellipse cx="78" cy="65" rx="8" ry="${state === 'distressed' ? 9 : 7}" fill="#1a1a1a"/>
             <ellipse cx="102" cy="65" rx="8" ry="${state === 'distressed' ? 9 : 7}" fill="#1a1a1a"/>
             <circle cx="81" cy="62" r="2.5" fill="white"/>
             <circle cx="105" cy="62" r="2.5" fill="white"/>`
        }
        <!-- Mouth -->
        ${state === 'happy' || state === 'content'
          ? `<path d="M76,82 Q90,92 104,82" stroke="#1a1a1a" stroke-width="2" fill="none"/>` 
          : state === 'sad' || state === 'withdrawn' || state === 'distressed'
            ? `<path d="M76,88 Q90,80 104,88" stroke="#1a1a1a" stroke-width="2" fill="none"/>` 
            : `<line x1="78" y1="85" x2="102" y2="85" stroke="#1a1a1a" stroke-width="2"/>` 
        }
      </g>

      <!-- Name tag (small, below character) -->
      <text x="90" y="275" font-family="Caveat" font-size="14" fill="rgba(255,255,255,0.5)" text-anchor="middle">${name}</text>
    </svg>`;
}