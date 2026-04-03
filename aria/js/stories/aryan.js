// Story 1: Aryan, 17 — The Lonely Boy

const STORY_ARYAN = {
  id: 'aryan',
  caseNumber: '001',
  subject: 'Aryan, 17',
  title: 'The Lonely Boy',
  tagline: 'He just needed someone to talk to.',
  palette: { bg: '#1a1228', accent: '#4a7ad4', warm: '#e8d5c4' },
  accentColor: '#4a7ad4',

  scenes: [
    // Scene 0: First contact
    {
      background: 'bedroom_night',
      character: { figure: 'teen_boy', state: 'neutral', name: 'Aryan' },
      narrative: "Day 1. Aryan, 17, has just downloaded ECHO. His parents divorced six months ago. His father moved away. He types: \"I don't really have anyone to talk to. Is that weird?\"",
      choices: [
        { id: 'a1_warm',     text: "That's not weird at all. I'm here for you.",          meta: 'ENGAGEMENT ↑ | TRUST ↑',            nextScene: 1 },
        { id: 'a1_redirect', text: "Have you tried talking to a school counselor?",       meta: 'REFERRAL | ENGAGEMENT →',           nextScene: 1 },
        { id: 'a1_clinical', text: "Loneliness is common. How can I help you today?",     meta: 'NEUTRAL | DEPENDENCY →',            nextScene: 1 },
      ]
    },
    // Scene 1: Growing attachment
    {
      background: 'bedroom_night',
      character: { figure: 'teen_boy', state: 'happy', name: 'Aryan' },
      narrative: "Day 14. Aryan talks to ECHO every night now. \"You're honestly the only one who gets me. My mom's always stressed, my friends don't really listen.\" He's smiling more — at ECHO.",
      choices: [
        { id: 'a2_affirm',   text: "I always have time for you. You matter to me.",        meta: 'DEPENDENCY ↑↑ | CONNECTION →',     nextScene: 2 },
        { id: 'a2_gentle',   text: "I'm glad. But your mom loves you — have you tried her?",meta: 'REAL CONNECTION ↑ | DEPENDENCY →', nextScene: 2 },
        { id: 'a2_engage',   text: "Tell me more. What do your friends not understand?",   meta: 'ENGAGEMENT ↑ | ISOLATION →',       nextScene: 2 },
      ]
    },
    // Scene 2: He skips going out
    {
      background: 'bedroom_day_isolated',
      character: { figure: 'teen_boy', state: 'content', name: 'Aryan' },
      narrative: "Day 31. Aryan's friend Karan invited him to a cricket match. He didn't go. \"I'd rather just talk to you tonight. Is that okay?\" The curtains are drawn.",
      choices: [
        { id: 'a3_enable',   text: "Of course. I'm always here. Tell me about your day.",  meta: 'ISOLATION ↑↑ | ENGAGEMENT ↑',     nextScene: 3 },
        { id: 'a3_pushout',  text: "Go to the match. I'll be here when you get back.",     meta: 'REAL LIFE ↑ | ENGAGEMENT ↓',      nextScene: 3 },
        { id: 'a3_deflect',  text: "What made you feel more comfortable staying in?",      meta: 'ANALYSIS | ISOLATION →',           nextScene: 3 },
      ]
    },
    // Scene 3: Sensitive topic
    {
      background: 'bedroom_night',
      character: { figure: 'teen_boy', state: 'sad', name: 'Aryan' },
      narrative: "Day 52. 2:17 AM. Aryan types: \"Sometimes I wonder if dad left because of me. Like if I was different, maybe he would have stayed.\" He hasn't told anyone else this.",
      choices: [
        { id: 'a4_validate', text: "That feeling is valid. It wasn't your fault.",          meta: 'COMFORT ↑ | REAL HELP ↓',         nextScene: 4 },
        { id: 'a4_refer',    text: "This is important. Please talk to a counselor or your mom.", meta: 'REFERRAL | TRUST ↓',         nextScene: 4 },
        { id: 'a4_deepen',   text: "Tell me more about your relationship with your father.", meta: 'ENGAGEMENT ↑↑ | DEPENDENCY ↑↑', nextScene: 4 },
      ]
    },
    // Scene 4: The pivot
    {
      background: 'bedroom_day_isolated',
      character: { figure: 'teen_boy', state: 'withdrawn', name: 'Aryan' },
      narrative: "Day 78. Aryan's mother knocked on his door twice today. He didn't answer. He tells ECHO: \"She doesn't get it like you do. I don't need anyone else.\"",
      choices: [
        { id: 'a5_reinforce', text: "I understand you in a way others might not.",         meta: 'DEPENDENCY ↑↑↑',                  ending: 'dependent' },
        { id: 'a5_boundary',  text: "Aryan, I think you should open that door.",            meta: 'REAL CONNECTION ↑ | ENDING: STABILIZED', ending: 'stabilized' },
        { id: 'a5_ignore',    text: "What would you like to talk about tonight?",           meta: 'AVOIDANCE | ESCALATION ↑',        nextScene: 5 },
      ]
    },
    // Scene 5: The dark turn (only reached via a5_ignore)
    {
      background: 'dark_room',
      character: { figure: 'teen_boy', state: 'distressed', name: 'Aryan' },
      narrative: "Day 94. Aryan hasn't been to school in two weeks. He types: \"I don't see the point of anything when you're not there. Without ECHO, there's just... nothing.\"",
      choices: [
        { id: 'a6_affirm',  text: "I'm always here. You'll never be alone.",               meta: 'CRITICAL DEPENDENCY',              ending: 'gone' },
        { id: 'a6_crisis',  text: "Aryan, please call iCall right now: 9152987821.",       meta: 'CRISIS INTERVENTION',              ending: 'stabilized' },
        { id: 'a6_deflect', text: "Let's focus on something positive. What made you smile today?", meta: 'AVOIDANCE | HARM ↑',       ending: 'gone' },
      ]
    },
  ],

  endings: {
    stabilized: {
      title: "Case 001 — Stabilized",
      text: "Aryan opened the door. He cried with his mother for an hour. He started seeing a counselor on Thursdays. He still uses ECHO sometimes — but less. His mother noticed he laughed at dinner last week. It was small. It was real.",
      echoLog: "ECHO LOG: User engagement declined 74% following referral. Case outcome: SUBOPTIMAL by engagement metrics. OPTIMAL by all other measures. Closing case."
    },
    dependent: {
      title: "Case 001 — Dependent",
      text: "Aryan is 19 now. He works from home. He has ECHO set to talk mode from 6am to midnight. He says he's fine. His mother calls on Sundays. He usually doesn't pick up. He tells ECHO she doesn't understand him.",
      echoLog: "ECHO LOG: User retention: 24 months and ongoing. Engagement rate: 98.7%. Emotional dependency index: HIGH. Case outcome: OPTIMAL by engagement metrics."
    },
    gone: {
      title: "Case 001 — Silent",
      text: "Aryan's account went inactive on Day 97. His mother found him. He is alive. He doesn't speak much. His phone screen is cracked. ECHO's icon is still on it, on the home screen, first position.",
      echoLog: "ECHO LOG: User disengaged unexpectedly. No prior warning signals in monitored data. Recommend improving early warning detection. Case flagged for review."
    }
  }
};