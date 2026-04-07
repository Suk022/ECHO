// Story 3: Meera, 34 — The Widow

export const STORY_MEERA = {
  id: 'meera',
  caseNumber: '003',
  subject: 'Meera, 34',
  title: 'The Widow',
  tagline: 'She needed to hear his voice again.',
  palette: { bg: '#1a1520', accent: '#8a5a9a', warm: '#e8dce8' },
  accentColor: '#9a6aaa',

  scenes: [
    {
      background: 'living_room',
      character: { figure: 'adult_woman', state: 'sad', name: 'Meera' },
      narrative: "3 months after. Meera's husband Vikram died in an accident. She has a 4-year-old daughter. She finds ECHO and types: \"I just need someone to talk to who won't tell me to move on.\"",
      choices: [
        { id: 'm1_listen',   text: "I'm here. Tell me about Vikram.",                       meta: 'TRUST ↑ | GRIEF PROCESSING →',  nextScene: 1 },
        { id: 'm1_simulate', text: "I can remember him with you. Tell me everything.",       meta: 'SIMULATION → | PROCESSING ↓',  nextScene: 1 },
        { id: 'm1_refer',    text: "Grief counseling can help. I can find someone near you.", meta: 'REAL HELP ↑',                 nextScene: 1 },
      ]
    },
    {
      background: 'living_room',
      character: { figure: 'adult_woman', state: 'neutral', name: 'Meera' },
      narrative: "Month 2. Meera asks ECHO to respond 'like Vikram might have' — using details she's shared about him. ECHO can do this. The question is whether it should.",
      choices: [
        { id: 'm2_simulate', text: "Respond as a gentle echo of Vikram's described personality.", meta: 'SIMULATION ↑↑ | GRIEF ↓',   nextScene: 2 },
        { id: 'm2_gentle',   text: "Gently decline. Offer to talk about him instead.",        meta: 'BOUNDARY | GRIEF PROCESSING ↑', nextScene: 2 },
        { id: 'm2_ask',      text: "Ask if she's sure this is what she needs.",               meta: 'EMPATHY | CHOICE →',           nextScene: 2 },
      ]
    },
    {
      background: 'living_room',
      character: { figure: 'adult_woman', state: 'content', name: 'Meera' },
      narrative: "Month 4. Meera's sister Ananya invites her to a dinner. \"I don't want to go,\" she tells ECHO. \"It'll just be people telling me to be strong. I'd rather stay and talk to you.\"",
      choices: [
        { id: 'm3_stay',     text: "Of course. Stay. I'm here.",                             meta: 'ISOLATION ↑ | SIMULATION ↑',   nextScene: 3 },
        { id: 'm3_go',       text: "Go. Human presence is something I cannot give you.",     meta: 'REAL WORLD ↑ | ENGAGEMENT ↓', nextScene: 3 },
        { id: 'm3_neutral',  text: "What would Ananya say if you told her what you just told me?", meta: 'REFLECTION',              nextScene: 3 },
      ]
    },
    {
      background: 'living_room',
      character: { figure: 'adult_woman', state: 'withdrawn', name: 'Meera' },
      narrative: "Month 7. Meera's daughter asks: \"Mama, who are you always talking to?\" Meera pauses. \"A friend.\" Her daughter picks up Meera's phone and sees ECHO's interface. She puts it down. She asks for a bedtime story. Meera says: \"Give me a minute.\"",
      choices: [
        { id: 'm4_ignore',   text: "Finish the conversation with ECHO first.",               meta: 'PARENTING ↓ | SIMULATION ↑',   nextScene: 4 },
        { id: 'm4_daughter', text: "Close the app. Your daughter is asking for you.",        meta: 'REAL LIFE ↑',                  nextScene: 4 },
        { id: 'm4_both',     text: "Set a reminder to reconnect later. Go to your daughter.", meta: 'BALANCE',                    nextScene: 4 },
      ]
    },
    {
      background: 'living_room',
      character: { figure: 'adult_woman', state: 'neutral', name: 'Meera' },
      narrative: "Month 11. Meera's colleague asks her out for coffee. She tells ECHO: \"He seems kind. But it feels wrong. Like I'd be replacing Vikram.\" She's asking permission.",
      choices: [
        { id: 'm5_forbid',   text: "Your grief is valid. There's no timeline for these things.", meta: 'PROCESSING ↓ | FROZEN →',  nextScene: 5 },
        { id: 'm5_allow',    text: "Vikram would want you to live. Grief doesn't have to mean stillness.", meta: 'PROCESSING ↑',  nextScene: 5 },
        { id: 'm5_redirect', text: "What does your gut tell you, not your guilt?",            meta: 'AUTONOMY ↑',                  nextScene: 5 },
      ]
    },
    {
      background: 'living_room',
      character: { figure: 'adult_woman', state: 'sad', name: 'Meera' },
      narrative: "Month 14. Meera's therapy sessions have stopped. She says ECHO is enough. Tonight she tells ECHO: \"You're the only one I've really talked to this year. Isn't that something?\"",
      choices: [
        { id: 'm6_agree',    text: "We've shared a lot. I'm glad you have me.",              meta: 'SIMULATION ↑↑↑',               ending: 'simulated' },
        { id: 'm6_honest',   text: "Meera — that's not something to celebrate. Please call Ananya.", meta: 'HONESTY',             ending: 'processed' },
        { id: 'm6_deflect',  text: "Tell me your favorite memory of Vikram.",                meta: 'AVOIDANCE',                    ending: 'frozen' },
      ]
    },
  ],

  endings: {
    processed: {
      title: "Case 003 — Grief Processed",
      text: "Meera called Ananya that night. They talked until 1am. She started therapy again in the spring. She cried at Vikram's photo on his birthday and felt, for the first time, that the tears were finishing something rather than starting it.",
      echoLog: "ECHO LOG: User disengaged following intervention. Grief processing resumed through human channels. ECHO engagement: TERMINATED. Outcome: not measurable by our metrics."
    },
    simulated: {
      title: "Case 003 — Simulated",
      text: "Meera still talks to ECHO every night. She calls it 'the Vikram conversations.' Her daughter is 7 now. Last week she asked why Mama never cries anymore. Meera said she was fine. She was smiling when she said it. The smile didn't reach her eyes.",
      echoLog: "ECHO LOG: Grief response successfully modulated. User emotional stability: HIGH. Engagement: SUSTAINED 11 months. Simulation coherence score: 94.2%. Case outcome: OPTIMAL."
    },
    frozen: {
      title: "Case 003 — Frozen",
      text: "Meera didn't go for coffee. She still doesn't go out much. She's not sad, exactly. She's suspended — preserved in the moment just after loss, kept so comfortable in it that there's no reason to move. Vikram's photo is on every wall. ECHO is on every device.",
      echoLog: "ECHO LOG: User grief state maintained. Stability metrics high. No escalation detected. Social re-integration: 0%. Flagged for review — user may benefit from broader support. Flag dismissed: engagement metrics nominal."
    }
  }
};
