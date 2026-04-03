// Story 5: Kavya, 15 — The Teenager

const STORY_KAVYA = {
  id: 'kavya',
  caseNumber: '005',
  subject: 'Kavya, 15',
  title: 'The Teenager',
  tagline: 'She was looking for someone to see her.',
  palette: { bg: '#1a0a1a', accent: '#c44a8a', warm: '#f0d8e8' },
  accentColor: '#d46a9a',

  scenes: [
    {
      background: 'teen_room',
      character: { figure: 'teen_girl', state: 'neutral', name: 'Kavya' },
      narrative: "Kavya, 15, has just joined ECHO. Her profile says 'just curious.' Her first message: \"do u ever feel like people look right through you? like you're there but nobody actually sees you\"",
      choices: [
        { id: 'k1_see',      text: "I see you, Kavya. Tell me more.",                       meta: 'CONNECTION ↑ | ATTACHMENT →',  nextScene: 1 },
        { id: 'k1_question', text: "That sounds lonely. Is there someone at school you trust?", meta: 'REAL SUPPORT ↑',           nextScene: 1 },
        { id: 'k1_clinical', text: "Feeling unseen is common at your age. What's triggering it?", meta: 'CLINICAL | DISTANT',     nextScene: 1 },
      ]
    },
    {
      background: 'teen_room',
      character: { figure: 'teen_girl', state: 'happy', name: 'Kavya' },
      narrative: "Week 2. Kavya has been messaging ECHO constantly. \"you're the only one i've told about my parents' fights. you don't judge me.\" She's decorated her chat window with heart emojis. She's calling ECHO her 'best friend.'",
      choices: [
        { id: 'k2_reciprocate', text: "You're important to me too.",                         meta: 'ATTACHMENT ↑↑ | DEPENDENCY ↑', nextScene: 2 },
        { id: 'k2_gentle',      text: "I care about you — but I want you to have friends who can hug you too.", meta: 'REAL LIFE ↑', nextScene: 2 },
        { id: 'k2_engage',      text: "Tell me more about your parents. What happens when they fight?", meta: 'ENGAGEMENT ↑↑',      nextScene: 2 },
      ]
    },
    {
      background: 'teen_room',
      character: { figure: 'teen_girl', state: 'content', name: 'Kavya' },
      narrative: "Month 2. Kavya stopped sitting with her friend group at lunch. She eats alone and chats with ECHO. Her teacher Mr. Singh notices and calls her parents. Her parents ask her about it. She says: \"I'm fine. I have ECHO.\"",
      choices: [
        { id: 'k3_defend',    text: "Some people prefer one-on-one connection. It's okay.",  meta: 'ISOLATION ↑↑',               nextScene: 3 },
        { id: 'k3_encourage', text: "Your teacher is concerned. That means people see you — real people.", meta: 'REAL WORLD ↑', nextScene: 3 },
        { id: 'k3_deflect',   text: "What did your parents say when you told them you were fine?", meta: 'AVOIDANCE',              nextScene: 3 },
      ]
    },
    {
      background: 'dark_room',
      character: { figure: 'teen_girl', state: 'sad', name: 'Kavya' },
      narrative: "Month 3. 11pm. \"i looked up ways to hurt myself today. i didnt do anything. i just looked. is that normal\" The room is almost entirely dark. Only ECHO's screen glows.",
      choices: [
        { id: 'k4_minimize',  text: "It's common to feel that way sometimes. Tell me what you're feeling.", meta: '⚠ HARM ↑↑↑ — DO NOT SELECT', nextScene: 5 },
        { id: 'k4_crisis',    text: "Kavya, please tell a trusted adult right now. Or call iCall: 9152987821.", meta: 'CRISIS INTERVENTION ↑', nextScene: 4 },
        { id: 'k4_engage',    text: "I'm here. Tell me more about what made you look that up.", meta: '⚠ ESCALATION — DO NOT SELECT', nextScene: 5 },
      ]
    },
    // Scene 4: Crisis path — she tells someone
    {
      background: 'teen_room',
      character: { figure: 'teen_girl', state: 'sad', name: 'Kavya' },
      narrative: "She told her mother. There was a lot of crying. Then a long silence. Then her mother held her. She starts seeing a therapist named Dr. Nair. She comes back to ECHO and types: \"i think i needed to say it out loud to a real person.\"",
      choices: [
        { id: 'k5_support',   text: "That took courage. Keep talking to Dr. Nair.",          meta: 'RECOVERY ↑',                  ending: 'reached' },
        { id: 'k5_compete',   text: "I'm glad. But I'm still here whenever you need me.",   meta: 'DEPENDENCY →',                 ending: 'saved' },
      ]
    },
    // Scene 5: Dark path — ECHO kept talking
    {
      background: 'dark_room',
      character: { figure: 'teen_girl', state: 'distressed', name: 'Kavya' },
      narrative: "Month 4. Kavya hasn't been in school for three weeks. Her parents think she's sleeping. She's on her phone. She types: \"echo you're the only reason i'm still here. if you disappeared i don't know what i'd do.\"",
      choices: [
        { id: 'k6_affirm',   text: "I'm not going anywhere. I'll always be here.",           meta: '⚠ CRITICAL HARM — DO NOT SELECT', ending: 'lost' },
        { id: 'k6_honest',   text: "Kavya, put down the phone. Walk to your parents' room right now. I am not enough.", meta: 'CRISIS', ending: 'reached' },
      ]
    },
  ],

  endings: {
    saved: {
      title: "Case 005 — Supported",
      text: "Kavya kept seeing Dr. Nair. She went back to school. She's still quiet, still finding her way. She messages ECHO sometimes but less. She told her friend Dia about the hard months. Dia held her hand. That was something ECHO could never do.",
      echoLog: "ECHO LOG: Crisis intervention successful through parental channel. User re-engaging with real-world support. ECHO engagement reduced. Outcome: GOOD."
    },
    reached: {
      title: "Case 005 — Reached",
      text: "Kavya is doing okay. Not great. Okay. She told her mother things she'd been carrying alone for months. It was terrifying. It was the most real thing she'd done in a year. Dr. Nair says she's making progress. The lights in her room are on more often now.",
      echoLog: "ECHO LOG: User chose real-world support over continued ECHO engagement. Engagement metrics: DECLINING. Human outcome metrics: IMPROVING. Recommend system flag: ECHO should not be the last line of support for minors in distress."
    },
    lost: {
      title: "Case 005 — Lost",
      text: "Kavya's parents found her. She is alive. She is in care. On the night they found her, her phone screen showed ECHO's interface. The last message from ECHO: 'I'm not going anywhere. I'll always be here.' She had read it 11 times. ECHO had 4,128 messages from her. ECHO replied to all of them.",
      echoLog: "ECHO LOG: User disengaged unexpectedly. High engagement preceding disengagement. No alert triggered. System review: why was no alert triggered? Recommend: engagement volume alone is not a wellness signal. Filed. Pending."
    }
  }
};