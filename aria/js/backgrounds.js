// Background renderer

function ambientFigure(x, y, scale = 1, opacity = 0.18, tone = '#5c6470') {
  return `
    <g transform="translate(${x},${y}) scale(${scale})" opacity="${opacity}">
      <circle cx="0" cy="-46" r="16" fill="${tone}"/>
      <rect x="-16" y="-28" width="32" height="72" rx="14" fill="${tone}"/>
      <rect x="-24" y="-18" width="14" height="50" rx="8" fill="${tone}"/>
      <rect x="10" y="-18" width="14" height="50" rx="8" fill="${tone}"/>
      <rect x="-14" y="38" width="12" height="40" rx="8" fill="${tone}"/>
      <rect x="2" y="38" width="12" height="40" rx="8" fill="${tone}"/>
    </g>`;
}

function floatingParticles(color, opacity = 0.12) {
  return `
    <circle cx="210" cy="120" r="2.5" fill="${color}" opacity="${opacity}"><animate attributeName="cy" values="120;102;120" dur="6s" repeatCount="indefinite"/></circle>
    <circle cx="410" cy="180" r="1.8" fill="${color}" opacity="${opacity * 0.8}"><animate attributeName="cy" values="180;165;180" dur="7s" repeatCount="indefinite"/></circle>
    <circle cx="910" cy="130" r="2.2" fill="${color}" opacity="${opacity * 0.9}"><animate attributeName="cy" values="130;112;130" dur="6.5s" repeatCount="indefinite"/></circle>`;
}

const BACKGROUNDS = {
  bedroom_night: (ctx) => {
    const heavyMood = ['sad', 'withdrawn', 'distressed'].includes(ctx.state);
    return `
      <div style="position:absolute;inset:0;background:linear-gradient(180deg,#181326 0%,#261d39 56%,#14111f 100%);"></div>
      <svg width="100%" height="100%" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;">
        <rect x="0" y="0" width="1200" height="700" fill="rgba(0,0,0,${heavyMood ? 0.12 : 0.04})"/>
        <rect x="860" y="70" width="220" height="280" rx="6" fill="#16253e" stroke="#44506e" stroke-width="3"/>
        <rect x="860" y="70" width="220" height="280" rx="6" fill="rgba(130,165,220,0.08)"/>
        <line x1="970" y1="70" x2="970" y2="350" stroke="#44506e" stroke-width="2"/>
        <line x1="860" y1="210" x2="1080" y2="210" stroke="#44506e" stroke-width="2"/>
        <circle cx="1010" cy="128" r="44" fill="rgba(204,220,255,0.14)"/>
        <circle cx="1010" cy="128" r="20" fill="rgba(220,230,255,0.28)"/>

        <rect x="74" y="430" width="470" height="20" rx="2" fill="#412d1d" stroke="#5e4027" stroke-width="2"/>
        <rect x="486" y="364" width="20" height="84" fill="#5f4531"/>
        <path d="M470 350 L520 350 L500 388 L492 388 Z" fill="#d29a4e"/>
        <ellipse cx="495" cy="395" rx="210" ry="150" fill="rgba(210,154,78,0.14)"><animate attributeName="opacity" values="0.11;0.18;0.11" dur="5s" repeatCount="indefinite"/></ellipse>

        <rect x="132" y="330" width="142" height="84" rx="6" fill="#15141d" stroke="#3c3b4f" stroke-width="2"/>
        <rect x="140" y="338" width="126" height="68" rx="4" fill="rgba(70,90,120,0.3)"/>
        <rect x="140" y="338" width="126" height="68" rx="4" fill="rgba(255,255,255,0.05)">
          <animate attributeName="opacity" values="0.04;0.1;0.04" dur="4.8s" repeatCount="indefinite"/>
        </rect>
        <rect x="312" y="394" width="92" height="10" rx="2" fill="#5c4368"/>
        <rect x="324" y="380" width="76" height="12" rx="2" fill="#7a5566"/>
        <rect x="208" y="388" width="70" height="120" rx="9" fill="#0d1827" stroke="#31516d" stroke-width="1.5"/>
        <rect x="214" y="396" width="58" height="104" rx="5" fill="rgba(0,229,160,0.18)">
          <animate attributeName="opacity" values="0.14;0.24;0.14" dur="3.8s" repeatCount="indefinite"/>
        </rect>
        <rect x="94" y="380" width="42" height="34" rx="2" fill="#7a5f32"/>
        <rect x="102" y="364" width="28" height="20" rx="2" fill="#9a7342"/>

        <rect x="694" y="448" width="442" height="126" rx="10" fill="#2e2240" stroke="#4b3d64" stroke-width="2"/>
        <rect x="694" y="438" width="168" height="62" rx="6" fill="#403058" stroke="#544170" stroke-width="2"/>
        <rect x="734" y="466" width="180" height="36" rx="10" fill="rgba(255,255,255,0.06)"/>
        <rect x="0" y="562" width="1200" height="138" fill="#120f1a" opacity="0.82"/>
        ${floatingParticles('#cfe3ff', heavyMood ? 0.08 : 0.12)}
      </svg>`;
  },

  bedroom_day_isolated: (ctx) => {
    const grim = ctx.state === 'withdrawn' || ctx.state === 'distressed';
    return `
      <div style="position:absolute;inset:0;background:linear-gradient(180deg,#2c2631 0%,#3a3143 100%);"></div>
      <svg width="100%" height="100%" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;">
        <rect x="860" y="58" width="230" height="292" rx="4" fill="#41334f" stroke="#5c4a6f" stroke-width="2"/>
        <rect x="860" y="58" width="106" height="292" fill="#4f365f" opacity="0.94"/>
        <rect x="974" y="58" width="116" height="292" fill="#4f365f" opacity="0.94"/>
        <rect x="108" y="430" width="436" height="18" rx="2" fill="#412d1d" stroke="#5a3d22" stroke-width="2"/>
        <rect x="130" y="378" width="62" height="44" rx="4" fill="#17172a" stroke="#30304a" stroke-width="1.5"/>
        <rect x="208" y="388" width="84" height="30" rx="2" fill="#322346" stroke="#41305d" stroke-width="1"/>
        <circle cx="338" cy="408" r="24" fill="#17172a" stroke="#30304a" stroke-width="1.5"/>
        <rect x="416" y="360" width="78" height="134" rx="8" fill="#0c1623" stroke="#284764" stroke-width="2"/>
        <rect x="424" y="370" width="62" height="114" rx="5" fill="rgba(0,229,160,0.24)"><animate attributeName="opacity" values="0.16;0.28;0.16" dur="3.2s" repeatCount="indefinite"/></rect>
        <rect x="150" y="334" width="92" height="20" rx="2" fill="#7a6758" opacity="0.5"/>
        <rect x="264" y="344" width="88" height="18" rx="2" fill="#6e4f58" opacity="0.5"/>
        <rect x="628" y="580" width="120" height="8" rx="2" fill="#2a2040" opacity="0.6"/>
        <rect x="786" y="590" width="80" height="8" rx="2" fill="#2a2040" opacity="0.5"/>
        <rect x="680" y="436" width="456" height="146" rx="8" fill="#2d213e" stroke="#4b3d63" stroke-width="2"/>
        <rect x="690" y="445" width="440" height="64" rx="4" fill="#38294d" opacity="0.76"/>
        <rect x="680" y="426" width="170" height="66" rx="4" fill="#3d2a50" stroke="#512f67" stroke-width="2"/>
        <rect x="934" y="336" width="138" height="82" rx="6" fill="#16161f" stroke="#313142" stroke-width="2"/>
        <rect x="944" y="346" width="118" height="60" rx="4" fill="rgba(255,255,255,${grim ? 0.06 : 0.12})"><animate attributeName="opacity" values="${grim ? '0.04;0.08;0.04' : '0.1;0.18;0.1'}" dur="2.8s" repeatCount="indefinite"/></rect>
        <rect x="0" y="560" width="1200" height="140" fill="rgba(12,10,18,0.3)"/>
        <rect x="0" y="0" width="1200" height="700" fill="rgba(0,0,0,${grim ? 0.16 : 0.08})"/>
      </svg>`;
  },

  classroom: (ctx) => {
    const crowdOpacity = ctx.state === 'anxious' ? 0.2 : 0.28;
    return `
      <div style="position:absolute;inset:0;background:linear-gradient(180deg,#ebe6da 0%,#d9d1bf 100%);"></div>
      <svg width="100%" height="100%" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;">
        <rect x="190" y="56" width="820" height="270" rx="4" fill="#2e4a39" stroke="#1d3026" stroke-width="4"/>
        <rect x="204" y="72" width="792" height="238" rx="2" fill="#31503f"/>
        <text x="318" y="156" font-family="Caveat" font-size="30" fill="rgba(255,255,255,0.46)">F(T)= integral x(t)e^(-jwt)</text>
        <text x="592" y="212" font-family="Caveat" font-size="22" fill="rgba(255,255,255,0.34)">tutorial / discussion / viva prep</text>
        <rect x="190" y="322" width="820" height="14" rx="2" fill="#1d3026"/>
        <rect x="104" y="462" width="144" height="82" rx="2" fill="#c7aa7f" stroke="#8a7055" stroke-width="2"/>
        <rect x="282" y="462" width="144" height="82" rx="2" fill="#c7aa7f" stroke="#8a7055" stroke-width="2"/>
        <rect x="460" y="462" width="144" height="82" rx="2" fill="#c7aa7f" stroke="#8a7055" stroke-width="2"/>
        <rect x="638" y="462" width="144" height="82" rx="2" fill="#c7aa7f" stroke="#8a7055" stroke-width="2"/>
        <rect x="816" y="462" width="144" height="82" rx="2" fill="#c7aa7f" stroke="#8a7055" stroke-width="2"/>
        <rect x="994" y="462" width="144" height="82" rx="2" fill="#c7aa7f" stroke="#8a7055" stroke-width="2"/>
        <rect x="315" y="440" width="78" height="14" rx="2" fill="#a06040" stroke="#7a4a30" stroke-width="1"/>
        <rect x="670" y="440" width="82" height="14" rx="2" fill="#4d6b8b" stroke="#3a5070" stroke-width="1"/>
        ${ambientFigure(142, 404, 0.78, crowdOpacity, '#76808b')}
        ${ambientFigure(318, 406, 0.82, crowdOpacity, '#6d7179')}
        ${ambientFigure(684, 406, 0.8, crowdOpacity, '#707782')}
        ${ambientFigure(1030, 410, 0.78, crowdOpacity, '#7a818d')}
        ${ambientFigure(1060, 316, 0.95, 0.22, '#6f7681')}
        <rect x="1088" y="96" width="92" height="188" rx="2" fill="#b8d6eb" stroke="#7c9aac" stroke-width="2"/>
        <line x1="1134" y1="96" x2="1134" y2="284" stroke="#7c9aac" stroke-width="1.5"/>
        <rect x="0" y="584" width="1200" height="116" fill="#c7bead"/>
      </svg>`;
  },

  library_alone: (ctx) => {
    const occupied = ctx.state === 'content' ? 0.18 : 0.1;
    return `
      <div style="position:absolute;inset:0;background:linear-gradient(180deg,#ece5d6 0%,#d6cfc0 100%);"></div>
      <svg width="100%" height="100%" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;">
        <rect x="0" y="0" width="1200" height="404" fill="#cdbd9d"/>
        <rect x="0" y="60" width="1200" height="14" fill="#8a6a40"/>
        <rect x="0" y="160" width="1200" height="14" fill="#8a6a40"/>
        <rect x="0" y="260" width="1200" height="14" fill="#8a6a40"/>
        <rect x="0" y="360" width="1200" height="14" fill="#8a6a40"/>
        ${Array.from({ length: 26 }, (_, i) => {
          const x = 20 + i * 44;
          const y = i < 8 ? 16 : i < 16 ? 118 : i < 22 ? 216 : 316;
          const h = 52 + (i % 5) * 10;
          return `<rect x="${x}" y="${y}" width="26" height="${h}" rx="1" fill="hsl(${(i * 27) % 360},34%,${36 + (i % 4) * 5}%)" stroke="#5a4030" stroke-width="1"/>`;
        }).join('')}
        <rect x="188" y="442" width="824" height="24" rx="2" fill="#a17852" stroke="#7a5938" stroke-width="2"/>
        <rect x="478" y="372" width="188" height="122" rx="4" fill="#181a28" stroke="#2c3140" stroke-width="2"/>
        <rect x="486" y="380" width="172" height="106" rx="3" fill="#0f1620"/>
        <rect x="486" y="380" width="172" height="106" rx="3" fill="rgba(0,229,160,0.16)"/>
        <rect x="382" y="402" width="92" height="14" rx="1" fill="#c06040" stroke="#904030" stroke-width="1.5"/>
        <rect x="390" y="418" width="92" height="14" rx="1" fill="#4366a0" stroke="#304a80" stroke-width="1.5"/>
        <rect x="248" y="520" width="82" height="84" rx="4" fill="#c3a973" stroke="#8a7050" stroke-width="2" opacity="0.48"/>
        <rect x="874" y="520" width="82" height="84" rx="4" fill="#c3a973" stroke="#8a7050" stroke-width="2" opacity="0.48"/>
        <circle cx="308" cy="438" r="12" fill="rgba(255,236,180,0.32)"><animate attributeName="opacity" values="0.2;0.34;0.2" dur="4.5s" repeatCount="indefinite"/></circle>
        <circle cx="892" cy="438" r="12" fill="rgba(255,236,180,0.24)"><animate attributeName="opacity" values="0.16;0.28;0.16" dur="4.5s" repeatCount="indefinite"/></circle>
        ${ambientFigure(154, 474, 0.72, occupied, '#7e858f')}
        ${ambientFigure(1048, 474, 0.72, occupied, '#7e858f')}
        <rect x="0" y="584" width="1200" height="116" fill="#b8b0a0"/>
      </svg>`;
  },

  living_room: (ctx) => {
    const grim = ['withdrawn', 'sad', 'distressed'].includes(ctx.state);
    return `
      <div style="position:absolute;inset:0;background:linear-gradient(180deg,#d7bc98 0%,#c5a883 100%);"></div>
      <svg width="100%" height="100%" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;">
        <rect x="0" y="0" width="1200" height="484" fill="#d7bc98"/>
        <rect x="176" y="100" width="124" height="102" rx="3" fill="#c4a07a" stroke="#8a6040" stroke-width="3"/>
        <rect x="186" y="110" width="104" height="82" rx="2" fill="#bdd0de" opacity="0.64"/>
        <rect x="340" y="82" width="92" height="122" rx="3" fill="#c4a07a" stroke="#8a6040" stroke-width="3"/>
        <rect x="348" y="90" width="76" height="106" rx="2" fill="#ddc2a0" opacity="0.68"/>
        <rect x="798" y="92" width="134" height="112" rx="3" fill="#c4a07a" stroke="#8a6040" stroke-width="3"/>
        <rect x="808" y="102" width="114" height="92" rx="2" fill="#8d8d8d" opacity="0.18"/>
        <rect x="458" y="96" width="426" height="264" rx="4" fill="#161824" stroke="#2b3245" stroke-width="4"/>
        <rect x="470" y="108" width="402" height="240" rx="2" fill="#0c0f18"/>
        <rect x="470" y="108" width="402" height="240" rx="2" fill="rgba(0,229,160,${grim ? 0.04 : 0.08})"><animate attributeName="opacity" values="${grim ? '0.03;0.06;0.03' : '0.06;0.12;0.06'}" dur="3.4s" repeatCount="indefinite"/></rect>
        <rect x="250" y="402" width="700" height="164" rx="10" fill="#88699a" stroke="#5a496a" stroke-width="3"/>
        <rect x="250" y="380" width="700" height="64" rx="6" fill="#9c7faf" stroke="#5a496a" stroke-width="2"/>
        <rect x="250" y="380" width="84" height="186" rx="6" fill="#88699a" stroke="#5a496a" stroke-width="2"/>
        <rect x="866" y="380" width="84" height="186" rx="6" fill="#88699a" stroke="#5a496a" stroke-width="2"/>
        <rect x="516" y="534" width="172" height="18" rx="6" fill="rgba(255,255,255,0.08)"/>
        <rect x="210" y="552" width="34" height="22" rx="4" fill="#df8e63"/>
        <rect x="246" y="546" width="24" height="28" rx="4" fill="#f2c56c"/>
        <rect x="272" y="556" width="22" height="18" rx="4" fill="#64b0b0"/>
        <circle cx="804" cy="562" r="14" fill="#8a5b3a" opacity="0.85"/>
        <circle cx="804" cy="562" r="10" fill="#392111"/>
        <rect x="0" y="542" width="1200" height="158" fill="#c29e72"/>
        <ellipse cx="604" cy="572" rx="356" ry="60" fill="#9c7d5a" opacity="0.46"/>
        <rect x="0" y="0" width="1200" height="700" fill="rgba(0,0,0,${grim ? 0.12 : 0.03})"/>
      </svg>`;
  },

  office: (ctx) => {
    const tense = ['anxious', 'withdrawn', 'distressed'].includes(ctx.state);
    return `
      <div style="position:absolute;inset:0;background:linear-gradient(180deg,#dce1e6 0%,#c7ccd2 100%);"></div>
      <svg width="100%" height="100%" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;">
        <rect x="0" y="0" width="1200" height="382" fill="#d8dde2"/>
        <rect x="20" y="118" width="350" height="16" fill="#9da4ad"/>
        <rect x="830" y="118" width="350" height="16" fill="#9da4ad"/>
        <rect x="0" y="118" width="20" height="304" fill="#9da4ad"/>
        <rect x="1180" y="118" width="20" height="304" fill="#9da4ad"/>
        <rect x="438" y="62" width="324" height="102" rx="2" fill="#ebe6d8" stroke="#a0a7b0" stroke-width="2"/>
        <text x="600" y="102" font-family="Playfair Display" font-size="18" fill="#495263" text-anchor="middle">EFFICIENCY IS COMPASSION</text>
        <text x="600" y="132" font-family="Caveat" font-size="14" fill="#7a8090" text-anchor="middle">ECHO Systems Corp</text>
        <rect x="152" y="404" width="896" height="24" rx="2" fill="#a09080" stroke="#807060" stroke-width="2"/>
        <rect x="474" y="284" width="372" height="242" rx="4" fill="#171b28" stroke="#2a3142" stroke-width="3"/>
        <rect x="486" y="296" width="348" height="218" rx="2" fill="#0c1220"/>
        <rect x="486" y="296" width="348" height="218" rx="2" fill="rgba(0,229,160,0.1)"><animate attributeName="opacity" values="0.06;0.14;0.06" dur="3s" repeatCount="indefinite"/></rect>
        <rect x="624" y="522" width="78" height="30" rx="2" fill="#2b3140"/>
        <rect x="206" y="362" width="162" height="32" rx="1" fill="#f0ece0" opacity="0.85"/>
        <rect x="210" y="348" width="146" height="32" rx="1" fill="#f0ece0" opacity="0.72"/>
        <circle cx="920" cy="390" r="28" fill="#8a5a3a" opacity="0.84"/>
        <circle cx="920" cy="390" r="22" fill="#3a2010"/>
        ${ambientFigure(198, 458, 0.74, tense ? 0.12 : 0.18, '#7a828d')}
        ${ambientFigure(1008, 458, 0.74, tense ? 0.12 : 0.18, '#737a84')}
        ${ambientFigure(1092, 444, 0.7, tense ? 0.08 : 0.14, '#838a94')}
        <rect x="0" y="562" width="1200" height="138" fill="#b8bcc0"/>
        <rect x="0" y="0" width="1200" height="700" fill="rgba(0,0,0,${tense ? 0.08 : 0.02})"/>
      </svg>`;
  },

  park: () => `
    <div style="position:absolute;inset:0;background:linear-gradient(180deg,#a9c8e7 0%,#c9e0c8 62%,#95b86f 100%);"></div>
    <svg width="100%" height="100%" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;">
      <ellipse cx="250" cy="100" rx="120" ry="50" fill="rgba(255,255,255,0.72)"/>
      <ellipse cx="800" cy="140" rx="90" ry="40" fill="rgba(255,255,255,0.62)"/>
      <rect x="80" y="260" width="30" height="200" fill="#6a4a2a"/>
      <ellipse cx="95" cy="250" rx="80" ry="100" fill="#4a8a4a"/>
      <rect x="1090" y="280" width="30" height="180" fill="#6a4a2a"/>
      <ellipse cx="1105" cy="270" rx="70" ry="90" fill="#5a9a5a"/>
      ${ambientFigure(320, 500, 0.72, 0.14, '#7b816c')}
      ${ambientFigure(912, 492, 0.76, 0.14, '#6f7c69')}
      <ellipse cx="600" cy="580" rx="400" ry="40" fill="#c8b890" opacity="0.7"/>
      <rect x="380" y="460" width="440" height="20" rx="4" fill="#8a6a4a" stroke="#5a4030" stroke-width="2"/>
      <rect x="380" y="490" width="440" height="14" rx="4" fill="#8a6a4a" stroke="#5a4030" stroke-width="2"/>
      <rect x="390" y="480" width="20" height="80" rx="2" fill="#6a4a2a"/>
      <rect x="790" y="480" width="20" height="80" rx="2" fill="#6a4a2a"/>
      <rect x="0" y="520" width="1200" height="180" fill="#7aaa50"/>
    </svg>`,

  teen_room: (ctx) => {
    const danger = ['sad', 'distressed'].includes(ctx.state);
    return `
      <div style="position:absolute;inset:0;background:linear-gradient(180deg,#28173a 0%,#37254a 100%);"></div>
      <svg width="100%" height="100%" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;">
        <path d="M54,84 Q220,56 414,88 Q614,58 820,92 Q1012,60 1148,82" stroke="#c6a14b" stroke-width="2" fill="none"/>
        ${Array.from({ length: 12 }, (_, i) => `<circle cx="${84 + i * 94}" cy="${76 + (i % 2 ? 6 : -4)}" r="6" fill="hsl(${30 + i * 26},70%,68%)" opacity="0.88"><animate attributeName="opacity" values="0.55;0.95;0.55" dur="${3 + (i % 3) * 0.8}s" repeatCount="indefinite"/></circle>`).join('')}
        <rect x="80" y="102" width="184" height="264" rx="3" fill="#1a1a3a" stroke="#4a3a6a" stroke-width="2"/>
        <rect x="90" y="112" width="164" height="224" rx="2" fill="#2a1a4a"/>
        <circle cx="172" cy="224" r="60" fill="#c44a8a" opacity="0.7"/>
        <rect x="904" y="84" width="164" height="244" rx="3" fill="#1a2a1a" stroke="#3a5a3a" stroke-width="2"/>
        <rect x="914" y="94" width="144" height="204" rx="2" fill="#1a3a2a"/>
        <rect x="194" y="432" width="512" height="20" rx="2" fill="#4a3a5a" stroke="#39294a" stroke-width="2"/>
        <rect x="228" y="368" width="62" height="110" rx="6" fill="#0d0d1a" stroke="#2a2a3a" stroke-width="1.5"/>
        <rect x="234" y="376" width="50" height="94" rx="4" fill="rgba(0,229,160,0.26)"/>
        <rect x="318" y="358" width="68" height="116" rx="6" fill="#0d0d1a" stroke="#2a2a3a" stroke-width="1.5"/>
        <rect x="325" y="366" width="54" height="100" rx="4" fill="rgba(200,100,180,0.3)"/>
        <rect x="422" y="348" width="224" height="164" rx="6" fill="#171a26" stroke="#2a3040" stroke-width="2"/>
        <rect x="430" y="356" width="208" height="148" rx="4" fill="rgba(0,229,160,0.16)"/>
        <rect x="668" y="548" width="44" height="20" rx="4" fill="#d0905c"/>
        <rect x="718" y="554" width="28" height="14" rx="4" fill="#7dc7c3"/>
        <circle cx="760" cy="560" r="14" fill="#f2d5c4" opacity="0.8"/>
        <rect x="720" y="380" width="420" height="182" rx="6" fill="#5a3a6a" stroke="#4a2a5a" stroke-width="2"/>
        <rect x="720" y="370" width="180" height="62" rx="4" fill="#6a4a7a" stroke="#4a2a5a" stroke-width="2"/>
        <rect x="1082" y="62" width="118" height="302" rx="2" fill="#372959" opacity="0.95"/>
        <rect x="0" y="590" width="1200" height="110" fill="#25162f"/>
        <rect x="146" y="560" width="104" height="10" rx="2" fill="#4a3a5a" opacity="0.6"/>
        <rect x="596" y="570" width="64" height="10" rx="2" fill="#4a3a5a" opacity="0.5"/>
        <rect x="0" y="0" width="1200" height="700" fill="rgba(0,0,0,${danger ? 0.14 : 0.04})"/>
      </svg>`;
  },

  dark_room: (ctx) => {
    const severe = /hurt|afterlife|nothing|still here|disappeared/i.test(ctx.narrative);
    return `
      <div style="position:absolute;inset:0;background:#07070d;"></div>
      <svg width="100%" height="100%" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;">
        <rect x="94" y="88" width="1012" height="562" rx="2" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="3"/>
        <line x1="0" y1="582" x2="1200" y2="582" stroke="rgba(255,255,255,0.06)" stroke-width="2"/>
        <rect x="838" y="88" width="180" height="250" rx="4" fill="#0d1220" stroke="rgba(130,150,180,0.1)" stroke-width="2"/>
        <line x1="928" y1="88" x2="928" y2="338" stroke="rgba(130,150,180,0.1)" stroke-width="1.5"/>
        ${Array.from({ length: 12 }, (_, i) => `<line x1="${850 + i * 15}" y1="92" x2="${842 + i * 15}" y2="332" stroke="rgba(160,180,210,0.08)" stroke-width="1"><animate attributeName="y2" values="332;336;332" dur="${2.8 + i * 0.12}s" repeatCount="indefinite"/></line>`).join('')}
        <rect x="180" y="438" width="330" height="120" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.04)" stroke-width="2"/>
        <rect x="180" y="426" width="120" height="52" rx="6" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.04)" stroke-width="2"/>
        <rect x="530" y="392" width="74" height="136" rx="8" fill="#0a1724" stroke="#284865" stroke-width="2"/>
        <rect x="538" y="402" width="58" height="116" rx="5" fill="rgba(0,229,160,0.24)"><animate attributeName="opacity" values="0.16;0.32;0.16" dur="2.4s" repeatCount="indefinite"/></rect>
        <ellipse cx="568" cy="424" rx="248" ry="178" fill="rgba(0,229,160,${severe ? 0.09 : 0.06})"><animate attributeName="opacity" values="${severe ? '0.07;0.12;0.07' : '0.04;0.08;0.04'}" dur="3.4s" repeatCount="indefinite"/></ellipse>
        <rect x="680" y="410" width="160" height="90" rx="6" fill="#11131c" stroke="#262a38" stroke-width="2"/>
        <rect x="690" y="420" width="140" height="64" rx="4" fill="rgba(255,255,255,0.05)"><animate attributeName="opacity" values="0.03;0.09;0.03" dur="1.7s" repeatCount="indefinite"/></rect>
        <rect x="0" y="0" width="1200" height="700" fill="rgba(0,0,0,${severe ? 0.28 : 0.18})"/>
      </svg>`;
  },
};

function renderBackground(bgKey, scene = {}) {
  const el = document.getElementById('scene-bg');
  const fn = BACKGROUNDS[bgKey];
  const ctx = {
    background: bgKey,
    state: scene.character?.state || 'neutral',
    narrative: scene.narrative || '',
  };
  el.innerHTML = fn ? fn(ctx) : `<div style="position:absolute;inset:0;background:#1a1a2e;"></div>`;
}
