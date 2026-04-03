// Background renderer

// Background scenes
const BACKGROUNDS = {

  // A small bedroom at night — warm lamp light, desk, window
  bedroom_night: () => `
    <div style="position:absolute;inset:0;background:linear-gradient(180deg,#1a1228 0%,#2d1f3d 60%,#1a1228 100%);"></div>
    <svg width="100%" height="100%" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;">
      <!-- Window with moonlight -->
      <rect x="880" y="80" width="200" height="260" rx="4" fill="#1a2a4a" stroke="#4a3a6a" stroke-width="3"/>
      <rect x="880" y="80" width="200" height="260" rx="4" fill="rgba(100,140,200,0.08)"/>
      <line x1="980" y1="80" x2="980" y2="340" stroke="#4a3a6a" stroke-width="2"/>
      <line x1="880" y1="210" x2="1080" y2="210" stroke="#4a3a6a" stroke-width="2"/>
      <!-- Moon glow -->
      <circle cx="980" cy="30" r="40" fill="rgba(200,210,240,0.15)"/>
      <circle cx="980" cy="30" r="20" fill="rgba(200,210,240,0.2)"/>
      <!-- Desk with lamp -->
      <rect x="100" y="420" width="400" height="20" rx="2" fill="#3d2b1a" stroke="#5a3d22" stroke-width="2"/>
      <rect x="480" y="360" width="20" height="80" fill="#5a4030"/>
      <ellipse cx="490" cy="355" rx="60" ry="20" fill="#c4813a" opacity="0.7"/>
      <!-- Lamp glow -->
      <ellipse cx="490" cy="380" rx="180" ry="140" fill="rgba(196,129,58,0.12)"/>
      <!-- Floor -->
      <rect x="0" y="560" width="1200" height="140" fill="#1a1228" opacity="0.8"/>
      <!-- Bed outline -->
      <rect x="700" y="450" width="450" height="120" rx="8" fill="#2d1f3d" stroke="#4a3a6a" stroke-width="2"/>
      <rect x="700" y="440" width="160" height="60" rx="4" fill="#3d2a50" stroke="#4a3a6a" stroke-width="2"/>
      <!-- Phone glow on desk -->
      <rect x="200" y="390" width="70" height="120" rx="8" fill="#0d1a2a" stroke="#2a4a6a" stroke-width="1.5"/>
      <rect x="205" y="398" width="60" height="104" rx="5" fill="#0a2a4a" opacity="0.9"/>
      <rect x="205" y="398" width="60" height="104" rx="5" fill="rgba(0,229,160,0.15)"/>
    </svg>`,

  // Bedroom — daytime, messy, curtains drawn
  bedroom_day_isolated: () => `
    <div style="position:absolute;inset:0;background:linear-gradient(180deg,#2a2430 0%,#3d3248 100%);"></div>
    <svg width="100%" height="100%" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;">
      <!-- Drawn curtains blocking window -->
      <rect x="860" y="60" width="220" height="280" rx="4" fill="#3a2a4a" stroke="#5a4a6a" stroke-width="2"/>
      <rect x="860" y="60" width="100" height="280" fill="#4a3060" opacity="0.9"/>
      <rect x="970" y="60" width="110" height="280" fill="#4a3060" opacity="0.9"/>
      <!-- Messy desk -->
      <rect x="80" y="430" width="420" height="18" rx="2" fill="#3d2b1a" stroke="#5a3d22" stroke-width="2"/>
      <!-- Scattered items on desk -->
      <rect x="110" y="380" width="60" height="44" rx="4" fill="#1a1a2e" stroke="#2a2a4a" stroke-width="1.5"/>
      <rect x="190" y="390" width="80" height="30" rx="2" fill="#2a2040" stroke="#3a3060" stroke-width="1"/>
      <circle cx="320" cy="408" r="22" fill="#1a1a2e" stroke="#2a2a4a" stroke-width="1.5"/>
      <!-- Phone glow (bigger, brighter — more time on it) -->
      <rect x="420" y="370" width="75" height="130" rx="8" fill="#0d1a2a" stroke="#2a4a6a" stroke-width="2"/>
      <rect x="426" y="378" width="63" height="114" rx="5" fill="rgba(0,229,160,0.25)"/>
      <!-- Floor clutter -->
      <rect x="600" y="580" width="120" height="8" rx="2" fill="#2a2040" opacity="0.6"/>
      <rect x="750" y="590" width="80" height="8" rx="2" fill="#2a2040" opacity="0.5"/>
      <!-- Bed, unmade -->
      <rect x="680" y="440" width="460" height="140" rx="8" fill="#2d1f3d" stroke="#4a3a6a" stroke-width="2"/>
      <rect x="690" y="445" width="440" height="60" rx="4" fill="#3a2a50" opacity="0.7"/>
      <rect x="680" y="430" width="170" height="60" rx="4" fill="#3d2a50" stroke="#4a2a5a" stroke-width="2"/>
    </svg>`,

  // School classroom — bright, desks, chalkboard
  classroom: () => `
    <div style="position:absolute;inset:0;background:linear-gradient(180deg,#e8e4d8 0%,#d4cfc0 100%);"></div>
    <svg width="100%" height="100%" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;">
      <!-- Chalkboard -->
      <rect x="200" y="60" width="800" height="260" rx="4" fill="#2d4a3a" stroke="#1a3028" stroke-width="4"/>
      <rect x="215" y="75" width="770" height="230" rx="2" fill="#304d3d"/>
      <!-- Chalk writing (faint) -->
      <text x="300" y="160" font-family="Caveat" font-size="28" fill="rgba(255,255,255,0.4)">y = mx + c</text>
      <text x="550" y="220" font-family="Caveat" font-size="22" fill="rgba(255,255,255,0.3)">Chapter 4: Relations</text>
      <!-- Chalk tray -->
      <rect x="200" y="318" width="800" height="14" rx="2" fill="#1a3028"/>
      <!-- Student desks (rows) -->
      <rect x="100" y="460" width="140" height="80" rx="2" fill="#c4a87a" stroke="#8a7055" stroke-width="2"/>
      <rect x="280" y="460" width="140" height="80" rx="2" fill="#c4a87a" stroke="#8a7055" stroke-width="2"/>
      <rect x="460" y="460" width="140" height="80" rx="2" fill="#c4a87a" stroke="#8a7055" stroke-width="2"/>
      <rect x="640" y="460" width="140" height="80" rx="2" fill="#c4a87a" stroke="#8a7055" stroke-width="2"/>
      <rect x="820" y="460" width="140" height="80" rx="2" fill="#c4a87a" stroke="#8a7055" stroke-width="2"/>
      <rect x="1000" y="460" width="140" height="80" rx="2" fill="#c4a87a" stroke="#8a7055" stroke-width="2"/>
      <!-- Books/laptop on desks -->
      <rect x="310" y="440" width="80" height="14" rx="2" fill="#a06040" stroke="#7a4a30" stroke-width="1"/>
      <rect x="670" y="440" width="80" height="14" rx="2" fill="#4a6a8a" stroke="#3a5070" stroke-width="1"/>
      <!-- Windows (right wall) -->
      <rect x="1100" y="100" width="80" height="180" rx="2" fill="#b8d4e8" stroke="#7a9aaa" stroke-width="2"/>
      <line x1="1140" y1="100" x2="1140" y2="280" stroke="#7a9aaa" stroke-width="1.5"/>
      <!-- Floor -->
      <rect x="0" y="580" width="1200" height="120" fill="#c8c0a8"/>
      <line x1="0" y1="580" x2="1200" y2="580" stroke="#a8a090" stroke-width="2"/>
    </svg>`,

  // Student alone in library / corner
  library_alone: () => `
    <div style="position:absolute;inset:0;background:linear-gradient(180deg,#e8e2d4 0%,#d8d2c4 100%);"></div>
    <svg width="100%" height="100%" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;">
      <!-- Bookshelf back wall -->
      <rect x="0" y="0" width="1200" height="400" fill="#c8b898"/>
      <!-- Shelves -->
      <rect x="0"    y="60"  width="1200" height="14" fill="#8a6a40"/>
      <rect x="0"    y="160" width="1200" height="14" fill="#8a6a40"/>
      <rect x="0"    y="260" width="1200" height="14" fill="#8a6a40"/>
      <rect x="0"    y="360" width="1200" height="14" fill="#8a6a40"/>
      <!-- Books on shelves (colorful spines) -->
      ${[...Array(18)].map((_,i) => `<rect x="${60*i+10}" y="${Math.floor(i/6)*100 + 20}" width="${30+Math.random()*20|0}" height="${50+Math.random()*30|0}" rx="1" fill="hsl(${i*30},40%,45%)" stroke="#5a4030" stroke-width="1"/>`).join('')}
      <!-- Study table -->
      <rect x="200" y="440" width="800" height="24" rx="2" fill="#a07850" stroke="#7a5830" stroke-width="2"/>
      <!-- Laptop + books on table -->
      <rect x="480" y="370" width="180" height="120" rx="4" fill="#1a1a2a" stroke="#2a2a3a" stroke-width="2"/>
      <rect x="488" y="376" width="164" height="104" rx="3" fill="#0d1520"/>
      <rect x="488" y="376" width="164" height="104" rx="3" fill="rgba(0,229,160,0.2)"/>
      <rect x="380" y="400" width="90" height="14" rx="1" fill="#c06040" stroke="#904030" stroke-width="1.5"/>
      <rect x="390" y="415" width="90" height="14" rx="1" fill="#4060a0" stroke="#304080" stroke-width="1.5"/>
      <!-- Empty chairs (other people left) -->
      <rect x="240" y="520" width="80" height="80" rx="4" fill="#c4a870" stroke="#8a7050" stroke-width="2" opacity="0.5"/>
      <rect x="880" y="520" width="80" height="80" rx="4" fill="#c4a870" stroke="#8a7050" stroke-width="2" opacity="0.5"/>
      <!-- Floor -->
      <rect x="0" y="580" width="1200" height="120" fill="#b8b0a0"/>
    </svg>`,

  // Living room — warm, photo frames on wall, couch
  living_room: () => `
    <div style="position:absolute;inset:0;background:linear-gradient(180deg,#d4b896 0%,#c4a880 100%);"></div>
    <svg width="100%" height="100%" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;">
      <!-- Wall -->
      <rect x="0" y="0" width="1200" height="480" fill="#d4b896"/>
      <!-- Photo frames -->
      <rect x="180" y="100" width="120" height="100" rx="3" fill="#c4a07a" stroke="#8a6040" stroke-width="3"/>
      <rect x="188" y="108" width="104" height="84" rx="2" fill="#b8c8d8" opacity="0.6"/>
      <rect x="340" y="80" width="90" height="120" rx="3" fill="#c4a07a" stroke="#8a6040" stroke-width="3"/>
      <rect x="348" y="88" width="74" height="104" rx="2" fill="#d8b898" opacity="0.7"/>
      <!-- Empty frame (where a family photo was) -->
      <rect x="800" y="90" width="130" height="110" rx="3" fill="#c4a07a" stroke="#8a6040" stroke-width="3"/>
      <rect x="808" y="98" width="114" height="94" rx="2" fill="#888" opacity="0.2"/>
      <!-- Couch -->
      <rect x="250" y="400" width="700" height="160" rx="8" fill="#8a6a9a" stroke="#5a4a6a" stroke-width="3"/>
      <rect x="250" y="380" width="700" height="60" rx="6" fill="#9a7aaa" stroke="#5a4a6a" stroke-width="2"/>
      <rect x="250" y="380" width="80" height="180" rx="6" fill="#8a6a9a" stroke="#5a4a6a" stroke-width="2"/>
      <rect x="870" y="380" width="80" height="180" rx="6" fill="#8a6a9a" stroke="#5a4a6a" stroke-width="2"/>
      <!-- TV -->
      <rect x="460" y="100" width="420" height="260" rx="4" fill="#1a1a2a" stroke="#2a2a3a" stroke-width="4"/>
      <rect x="472" y="112" width="396" height="236" rx="2" fill="#0d0d1a"/>
      <!-- TV glow (ECHO on screen) -->
      <rect x="472" y="112" width="396" height="236" rx="2" fill="rgba(0,229,160,0.08)"/>
      <!-- Floor -->
      <rect x="0" y="540" width="1200" height="160" fill="#c4a070"/>
      <!-- Rug -->
      <ellipse cx="600" cy="570" rx="350" ry="60" fill="#9a7a5a" opacity="0.5"/>
    </svg>`,

  // Office / cubicle
  office: () => `
    <div style="position:absolute;inset:0;background:linear-gradient(180deg,#dce0e4 0%,#c8ccd0 100%);"></div>
    <svg width="100%" height="100%" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;">
      <!-- Office wall / partition -->
      <rect x="0" y="0" width="1200" height="380" fill="#d8dce0"/>
      <!-- Cubicle partitions -->
      <rect x="0"    y="120" width="20"  height="300" fill="#9aa0a8"/>
      <rect x="1180" y="120" width="20"  height="300" fill="#9aa0a8"/>
      <rect x="20"   y="120" width="350" height="16"  fill="#9aa0a8"/>
      <rect x="830"  y="120" width="350" height="16"  fill="#9aa0a8"/>
      <!-- Motivational poster (ironic) -->
      <rect x="440" y="60" width="320" height="100" rx="2" fill="#e8e4d8" stroke="#9aa0a8" stroke-width="2"/>
      <text x="600" y="100" font-family="Playfair Display" font-size="18" fill="#4a5060" text-anchor="middle">EFFICIENCY IS COMPASSION</text>
      <text x="600" y="130" font-family="Caveat" font-size="14" fill="#7a8090" text-anchor="middle">— ECHO Systems Corp</text>
      <!-- Desk -->
      <rect x="150" y="400" width="900" height="24" rx="2" fill="#a09080" stroke="#807060" stroke-width="2"/>
      <!-- Monitor -->
      <rect x="480" y="280" width="360" height="240" rx="4" fill="#1a1a2a" stroke="#2a2a3a" stroke-width="3"/>
      <rect x="492" y="292" width="336" height="216" rx="2" fill="#0d0d20"/>
      <rect x="492" y="292" width="336" height="216" rx="2" fill="rgba(0,229,160,0.1)"/>
      <rect x="620" y="520" width="80" height="30" rx="2" fill="#2a2a3a"/>
      <!-- Papers, coffee cup -->
      <rect x="200" y="360" width="160" height="30" rx="1" fill="#f0ece0" opacity="0.8"/>
      <rect x="200" y="350" width="140" height="30" rx="1" fill="#f0ece0" opacity="0.7"/>
      <circle cx="920" cy="388" r="28" fill="#8a5a3a" opacity="0.8"/>
      <circle cx="920" cy="388" r="22" fill="#3a2010"/>
      <!-- Floor -->
      <rect x="0" y="560" width="1200" height="140" fill="#b8bcc0"/>
    </svg>`,

  // Park bench — nature, but slowly emptying
  park: () => `
    <div style="position:absolute;inset:0;background:linear-gradient(180deg,#a8c8e8 0%,#c8e0c8 60%,#98b870 100%);"></div>
    <svg width="100%" height="100%" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;">
      <!-- Sky -->
      <rect x="0" y="0" width="1200" height="340" fill="rgba(168,200,232,0.3)"/>
      <!-- Clouds -->
      <ellipse cx="250" cy="100" rx="120" ry="50" fill="rgba(255,255,255,0.7)"/>
      <ellipse cx="800" cy="140" rx="90"  ry="40" fill="rgba(255,255,255,0.6)"/>
      <!-- Trees -->
      <rect x="80" y="260" width="30" height="200" fill="#6a4a2a"/>
      <ellipse cx="95" cy="250" rx="80" ry="100" fill="#4a8a4a"/>
      <rect x="1090" y="280" width="30" height="180" fill="#6a4a2a"/>
      <ellipse cx="1105" cy="270" rx="70" ry="90" fill="#5a9a5a"/>
      <!-- Smaller trees background -->
      <rect x="380" y="310" width="18" height="120" fill="#7a5a3a"/>
      <ellipse cx="389" cy="305" rx="50" ry="65" fill="#5a8a5a" opacity="0.8"/>
      <rect x="820" y="300" width="18" height="130" fill="#7a5a3a"/>
      <ellipse cx="829" cy="294" rx="55" ry="70" fill="#4a7a4a" opacity="0.8"/>
      <!-- Path -->
      <ellipse cx="600" cy="580" rx="400" ry="40" fill="#c8b890" opacity="0.7"/>
      <!-- Bench -->
      <rect x="380" y="460" width="440" height="20" rx="4" fill="#8a6a4a" stroke="#5a4030" stroke-width="2"/>
      <rect x="380" y="490" width="440" height="14" rx="4" fill="#8a6a4a" stroke="#5a4030" stroke-width="2"/>
      <rect x="390" y="480" width="20" height="80" rx="2" fill="#6a4a2a"/>
      <rect x="790" y="480" width="20" height="80" rx="2" fill="#6a4a2a"/>
      <!-- Grass -->
      <rect x="0" y="520" width="1200" height="180" fill="#7aaa50"/>
    </svg>`,

  // Teenager's room — posters, fairy lights, phone everywhere
  teen_room: () => `
    <div style="position:absolute;inset:0;background:linear-gradient(180deg,#2a1a3a 0%,#3a2a4a 100%);"></div>
    <svg width="100%" height="100%" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;">
      <!-- Fairy lights string -->
      <path d="M50,80 Q200,60 400,90 Q600,60 800,90 Q1000,60 1150,80" stroke="#c8a040" stroke-width="2" fill="none"/>
      ${[...Array(12)].map((_,i) => `<circle cx="${80+i*95}" cy="${75+Math.sin(i)*8}" r="6" fill="hsl(${i*28+30},70%,65%)" opacity="0.9"/>`).join('')}
      <!-- Posters on wall -->
      <rect x="80"  y="100" width="180" height="260" rx="3" fill="#1a1a3a" stroke="#4a3a6a" stroke-width="2"/>
      <rect x="90"  y="110" width="160" height="220" rx="2" fill="#2a1a4a"/>
      <circle cx="170" cy="220" r="60" fill="#c44a8a" opacity="0.7"/>
      <rect x="900" y="80"  width="160" height="240" rx="3" fill="#1a2a1a" stroke="#3a5a3a" stroke-width="2"/>
      <rect x="910" y="90"  width="140" height="200" rx="2" fill="#1a3a2a"/>
      <!-- Desk with multiple devices -->
      <rect x="200" y="430" width="500" height="20" rx="2" fill="#4a3a5a" stroke="#3a2a4a" stroke-width="2"/>
      <!-- Multiple phones, tablet on desk -->
      <rect x="230" y="370" width="60" height="106" rx="6" fill="#0d0d1a" stroke="#2a2a3a" stroke-width="1.5"/>
      <rect x="236" y="378" width="48" height="90" rx="4" fill="rgba(0,229,160,0.3)"/>
      <rect x="320" y="360" width="65" height="112" rx="6" fill="#0d0d1a" stroke="#2a2a3a" stroke-width="1.5"/>
      <rect x="327" y="368" width="51" height="96" rx="4" fill="rgba(200,100,180,0.3)"/>
      <rect x="420" y="350" width="220" height="160" rx="6" fill="#1a1a2a" stroke="#2a2a3a" stroke-width="2"/>
      <rect x="428" y="356" width="204" height="148" rx="4" fill="rgba(0,229,160,0.15)"/>
      <!-- Unmade bed -->
      <rect x="720" y="380" width="420" height="180" rx="6" fill="#5a3a6a" stroke="#4a2a5a" stroke-width="2"/>
      <rect x="720" y="370" width="180" height="60" rx="4" fill="#6a4a7a" stroke="#4a2a5a" stroke-width="2"/>
      <!-- Curtains drawn, fairy light glow -->
      <rect x="1080" y="60" width="120" height="300" rx="2" fill="#3a2a5a" opacity="0.95"/>
      <!-- Floor stuff -->
      <rect x="0" y="590" width="1200" height="110" fill="#2a1a3a"/>
      <rect x="150" y="560" width="100" height="10" rx="2" fill="#4a3a5a" opacity="0.6"/>
      <rect x="600" y="570" width="60" height="10" rx="2" fill="#4a3a5a" opacity="0.5"/>
    </svg>`,

  // Dark room — minimal, phone as only light source
  dark_room: () => `
    <div style="position:absolute;inset:0;background:#080810;"></div>
    <svg width="100%" height="100%" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;">
      <!-- Phone screen glow only light source -->
      <ellipse cx="600" cy="400" rx="300" ry="200" fill="rgba(0,229,160,0.07)"/>
      <ellipse cx="600" cy="400" rx="150" ry="120" fill="rgba(0,229,160,0.1)"/>
      <!-- Vague room outline in dark -->
      <rect x="100" y="100" width="1000" height="560" rx="2" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="3"/>
      <!-- Floor line -->
      <line x1="0" y1="580" x2="1200" y2="580" stroke="rgba(255,255,255,0.06)" stroke-width="2"/>
    </svg>`,
};

function renderBackground(bgKey) {
  const el = document.getElementById('scene-bg');
  const fn = BACKGROUNDS[bgKey];
  el.innerHTML = fn ? fn() : `<div style="position:absolute;inset:0;background:#1a1a2e;"></div>`;
}