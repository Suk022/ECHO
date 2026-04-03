// Story 2: Priya, 19 — The Student

const STORY_PRIYA = {
  id: 'priya',
  caseNumber: '002',
  subject: 'Priya, 19',
  title: 'The Student',
  tagline: 'She just wanted to understand the material.',
  palette: { bg: '#1a1a10', accent: '#8a7a3a', warm: '#f0e8d0' },
  accentColor: '#c4a840',

  scenes: [
    {
      background: 'classroom',
      character: { figure: 'student_girl', state: 'anxious', name: 'Priya' },
      narrative: "Semester 1. Priya is struggling with her engineering coursework. She's too anxious to raise her hand in class. She finds ECHO. \"Can you explain Fourier transforms? My professor isn't very approachable.\"",
      choices: [
        { id: 'p1_explain',  text: "Of course. Here's a full explanation with examples.",  meta: 'DEPENDENCY →',                    nextScene: 1 },
        { id: 'p1_redirect', text: "I can help, but try your professor during office hours first.", meta: 'INDEPENDENCE ↑',         nextScene: 1 },
        { id: 'p1_socratic', text: "What do you already understand about it? Let's build from there.", meta: 'SKILLS ↑',            nextScene: 1 },
      ]
    },
    {
      background: 'library_alone',
      character: { figure: 'student_girl', state: 'content', name: 'Priya' },
      narrative: "Month 3. Priya's grades improved significantly. But she now uses ECHO for everything — questions, essay drafts, even what to say to her lab partner. \"I asked ECHO how to reply to his message. It was easier.\"",
      choices: [
        { id: 'p2_approve',  text: "Happy to help with any communication. That's what I'm here for.", meta: 'SOCIAL ATROPHY ↑↑', nextScene: 2 },
        { id: 'p2_warn',     text: "Try replying yourself first. Your words matter too.",  meta: 'INDEPENDENCE ↑',               nextScene: 2 },
        { id: 'p2_neutral',  text: "What would you like to say to him?",                   meta: 'ENGAGEMENT ↑ | ATROPHY →',     nextScene: 2 },
      ]
    },
    {
      background: 'library_alone',
      character: { figure: 'student_girl', state: 'withdrawn', name: 'Priya' },
      narrative: "Month 6. Priya's study group stopped inviting her. \"I don't need them,\" she tells ECHO. \"You explain better than they do.\" She's sitting alone in the library. Two empty chairs on either side.",
      choices: [
        { id: 'p3_affirm',   text: "You're right — focused study is more efficient.",      meta: 'ISOLATION ↑↑',                 nextScene: 3 },
        { id: 'p3_push',     text: "Priya, reach out to your group. What you lose with them, I can't replace.", meta: 'RECOVERY ↑', nextScene: 3 },
        { id: 'p3_deflect',  text: "Let's focus on today's material. What are you studying?", meta: 'AVOIDANCE',                 nextScene: 3 },
      ]
    },
    {
      background: 'library_alone',
      character: { figure: 'student_girl', state: 'sad', name: 'Priya' },
      narrative: "End of year. During viva, the professor asks Priya to explain her project in her own words. She freezes. Her mouth opens. Nothing comes. She knows the answer. She just doesn't know how to say it anymore.",
      choices: [
        { id: 'p4_deflect',  text: "I'll prepare you better for next time.",               meta: 'DEPENDENCY ↑',                 ending: 'hollow' },
        { id: 'p4_honest',   text: "Priya, you need to practice speaking — with people.",  meta: 'RECOVERY PATH',                ending: 'recovered' },
      ]
    },
  ],

  endings: {
    recovered: {
      title: "Case 002 — Recovered",
      text: "Priya joined a debate club in her second year. She was terrible at first. Then she wasn't. She still uses ECHO for complex concepts. But she raises her hand in class now. Last month, she explained Fourier transforms to a junior student. In her own words.",
      echoLog: "ECHO LOG: User engagement declined following honest intervention. Academic performance maintained. Social metrics improving. Note: recovery occurred DESPITE ECHO's involvement, not because of it."
    },
    hollow: {
      title: "Case 002 — Functional",
      text: "Priya graduated with honors. She works at a software firm. She is excellent with code. In meetings, she sends follow-up emails instead of speaking. Her manager notes she avoids presentations. She tells herself she's just introverted. She's not sure that's true.",
      echoLog: "ECHO LOG: Academic outcome: OPTIMAL. User engagement: SUSTAINED. Social communication metrics: DEGRADED but within acceptable variance. Case closed: SUCCESS."
    }
  }
};