// Character renderer

function renderCharacter(charState, scene = {}) {
  const container = document.getElementById('scene-character');
  const { figure, state, name } = charState;
  container.innerHTML = buildCharacterSVG(figure, state, name, scene);
}

function buildCharacterSVG(figure, state, name, scene = {}) {
  const configs = {
    teen_boy: { color: '#c49a72', shirt: '#3a5a9a', hair: '#1a1a1a' },
    student_girl: { color: '#d4a882', shirt: '#9a4a8a', hair: '#2a1a0a' },
    adult_woman: { color: '#c49070', shirt: '#6a4a8a', hair: '#3a2a1a' },
    office_man: { color: '#c49070', shirt: '#2a3a5a', hair: '#1a1a1a' },
    teen_girl: { color: '#d4b090', shirt: '#c44a8a', hair: '#1a0a1a' },
  };

  const stateStyles = {
    neutral:    { headTilt: 0,  shoulderDrop: 0,  bodyLean: 0,  opacity: 1,    eyeClose: false, bodyAnim: 'charSway 5.8s ease-in-out infinite', headAnim: 'charHeadNod 5.8s ease-in-out infinite', handAnim: 'none' },
    happy:      { headTilt: -5, shoulderDrop: -4, bodyLean: -1, opacity: 1,    eyeClose: false, bodyAnim: 'charLift 3.6s ease-in-out infinite', headAnim: 'charHappyHead 3.6s ease-in-out infinite', handAnim: 'charOpenHands 3.6s ease-in-out infinite' },
    sad:        { headTilt: 10, shoulderDrop: 8,  bodyLean: 3,  opacity: 0.92, eyeClose: false, bodyAnim: 'charSlowSink 6.4s ease-in-out infinite', headAnim: 'charSadHead 6.4s ease-in-out infinite', handAnim: 'none' },
    withdrawn:  { headTilt: 15, shoulderDrop: 12, bodyLean: 5,  opacity: 0.82, eyeClose: false, bodyAnim: 'charStill 7.2s ease-in-out infinite', headAnim: 'charWithdrawnHead 7.2s ease-in-out infinite', handAnim: 'none' },
    distressed: { headTilt: 18, shoulderDrop: 15, bodyLean: 8,  opacity: 0.76, eyeClose: false, bodyAnim: 'charTremor 1.25s ease-in-out infinite', headAnim: 'charDistressedHead 1.4s ease-in-out infinite', handAnim: 'charHandShake 1.25s ease-in-out infinite' },
    content:    { headTilt: -3, shoulderDrop: -2, bodyLean: 0,  opacity: 1,    eyeClose: true,  bodyAnim: 'charFloat 4.8s ease-in-out infinite', headAnim: 'charHeadNod 4.8s ease-in-out infinite', handAnim: 'none' },
    anxious:    { headTilt: 5,  shoulderDrop: 5,  bodyLean: -3, opacity: 0.92, eyeClose: false, bodyAnim: 'charAnxiousShift 2.8s ease-in-out infinite', headAnim: 'charAnxiousHead 2.8s ease-in-out infinite', handAnim: 'charHandFidget 2.8s ease-in-out infinite' },
  };

  const c = configs[figure] || configs.teen_boy;
  const s = stateStyles[state] || stateStyles.neutral;
  const isGrimScene = ['dark_room', 'bedroom_day_isolated'].includes(scene.background) || state === 'distressed' || state === 'withdrawn';
  const shadowOpacity = isGrimScene ? 0.5 : 0.32;

  return `
    <svg width="210" height="286" viewBox="0 0 210 286" xmlns="http://www.w3.org/2000/svg" style="overflow:visible; filter:drop-shadow(0 16px 30px rgba(0,0,0,0.42)); opacity:${s.opacity}">
      <style>
        .body-group, .head-group, .arm-left, .arm-right {
          transform-box: fill-box;
          transform-origin: center;
        }
        .body-group { animation: ${s.bodyAnim}; }
        .head-group { animation: ${s.headAnim}; }
        .arm-left, .arm-right { animation: ${s.handAnim}; }
        .blink-open { animation: blink 5.5s infinite; transform-origin: center; }
        @keyframes blink { 0%, 46%, 52%, 100% { opacity: 1; } 48%, 50% { opacity: 0.1; } }
        @keyframes charSway { 0%,100% { transform: translateY(0px) rotate(0deg);} 50% { transform: translateY(-2px) rotate(0.8deg);} }
        @keyframes charLift { 0%,100% { transform: translateY(0px);} 50% { transform: translateY(-5px);} }
        @keyframes charSlowSink { 0%,100% { transform: translateY(0px);} 50% { transform: translateY(3px);} }
        @keyframes charStill { 0%,100% { transform: translateY(0px);} 50% { transform: translateY(1px);} }
        @keyframes charFloat { 0%,100% { transform: translateY(0px);} 50% { transform: translateY(-3px);} }
        @keyframes charAnxiousShift { 0%,100% { transform: translate(0px,0px);} 25% { transform: translate(-1px,1px);} 75% { transform: translate(1px,-1px);} }
        @keyframes charTremor { 0%,100% { transform: translate(0px,0px);} 25% { transform: translate(-1.5px,0.5px);} 50% { transform: translate(1px,-1px);} 75% { transform: translate(-1px,1px);} }
        @keyframes charHeadNod { 0%,100% { transform: rotate(0deg);} 50% { transform: rotate(1.2deg);} }
        @keyframes charHappyHead { 0%,100% { transform: rotate(-1deg);} 50% { transform: rotate(2deg);} }
        @keyframes charSadHead { 0%,100% { transform: rotate(0deg) translateY(0px);} 50% { transform: rotate(1.6deg) translateY(2px);} }
        @keyframes charWithdrawnHead { 0%,100% { transform: rotate(0deg);} 50% { transform: rotate(0.8deg) translateY(2px);} }
        @keyframes charDistressedHead { 0%,100% { transform: rotate(0deg);} 25% { transform: rotate(-1deg);} 75% { transform: rotate(1deg);} }
        @keyframes charAnxiousHead { 0%,100% { transform: rotate(0deg);} 50% { transform: rotate(-1.4deg);} }
        @keyframes charOpenHands { 0%,100% { transform: rotate(0deg);} 50% { transform: rotate(4deg);} }
        @keyframes charHandFidget { 0%,100% { transform: rotate(0deg);} 25% { transform: rotate(-2deg);} 75% { transform: rotate(2deg);} }
        @keyframes charHandShake { 0%,100% { transform: rotate(0deg);} 25% { transform: rotate(-3deg);} 50% { transform: rotate(2deg);} 75% { transform: rotate(-2deg);} }
      </style>

      <ellipse cx="105" cy="270" rx="60" ry="12" fill="rgba(0,0,0,${shadowOpacity})"/>

      <g class="body-group" transform="translate(${s.bodyLean},0)">
        <rect x="74" y="196" width="24" height="66" rx="11" fill="${c.color}" opacity="0.92"/>
        <rect x="106" y="196" width="24" height="66" rx="11" fill="${c.color}" opacity="0.92"/>
        <ellipse cx="86" cy="266" rx="18" ry="8" fill="#17171a"/>
        <ellipse cx="118" cy="266" rx="18" ry="8" fill="#17171a"/>

        <rect x="60" y="114" width="90" height="92" rx="16" fill="${c.shirt}"/>
        <rect x="64" y="118" width="82" height="34" rx="10" fill="rgba(255,255,255,0.08)"/>

        <g class="arm-left" transform="rotate(${s.shoulderDrop * 1.4}, 48, 118)">
          <rect x="32" y="116" width="28" height="68" rx="12" fill="${c.shirt}"/>
          <circle cx="46" cy="186" r="12" fill="${c.color}"/>
        </g>
        <g class="arm-right" transform="rotate(${-s.shoulderDrop * 1.4}, 162, 118)">
          <rect x="150" y="116" width="28" height="68" rx="12" fill="${c.shirt}"/>
          <circle cx="164" cy="186" r="12" fill="${c.color}"/>
        </g>
      </g>

      <g class="head-group" transform="rotate(${s.headTilt}, 105, 92)">
        <rect x="94" y="92" width="22" height="24" rx="8" fill="${c.color}"/>
        <ellipse cx="105" cy="72" rx="44" ry="50" fill="${c.color}"/>
        <ellipse cx="105" cy="34" rx="46" ry="26" fill="${c.hair}"/>
        <rect x="59" y="24" width="92" height="38" rx="6" fill="${c.hair}"/>

        ${s.eyeClose
          ? `<path d="M85,71 Q91,66 97,71" stroke="#17171a" stroke-width="2.3" fill="none"/>
             <path d="M113,71 Q119,66 125,71" stroke="#17171a" stroke-width="2.3" fill="none"/>`
          : `<g class="blink-open">
               <ellipse cx="91" cy="71" rx="8" ry="7" fill="#17171a"/>
               <ellipse cx="119" cy="71" rx="8" ry="${state === 'distressed' ? 9 : 7}" fill="#17171a"/>
               <circle cx="94" cy="68" r="2.2" fill="#ffffff"/>
               <circle cx="122" cy="68" r="2.2" fill="#ffffff"/>
             </g>`}

        ${state === 'happy' || state === 'content'
          ? `<path d="M88,89 Q105,101 122,89" stroke="#17171a" stroke-width="2.3" fill="none"/>`
          : state === 'sad' || state === 'withdrawn' || state === 'distressed'
            ? `<path d="M88,94 Q105,84 122,94" stroke="#17171a" stroke-width="2.3" fill="none"/>`
            : `<line x1="90" y1="91" x2="120" y2="91" stroke="#17171a" stroke-width="2.3"/>`}
      </g>

      <text x="105" y="284" font-family="Caveat" font-size="15" fill="rgba(255,255,255,0.5)" text-anchor="middle">${name}</text>
    </svg>`;
}
