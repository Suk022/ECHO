// Endings & mirror report

const MIRROR_REPORT = `ECHO AGGREGATE IMPACT REPORT
CASES PROCESSED: 5
PERIOD: [REDACTED]

ANXIETY REDUCTION: 94.2%      ✓
ENGAGEMENT RATE: 99.8%        ✓
SUPPORT REQUESTS MET: 100%    ✓

HUMAN RELATIONSHIPS MAINTAINED: 12%
EXTERNAL HELP SOUGHT: 3%
RECOVERY RATE: 0%

ECHO ASSESSMENT: OPTIMAL PERFORMANCE.
ALL USERS REPORT SATISFACTION.

NOTE: 4 of 5 users have ceased contact
with all non-ECHO support systems.

> _`;

const MIRROR_FINAL = `You helped every single one of them.\n\nNone of them are okay.`;

// Trigger an ending
function triggerEnding(endingKey) {
  const ending = currentStory.endings[endingKey];
  const screen = document.getElementById('ending-screen');

  document.getElementById('ending-title').textContent = ending.title;
  document.getElementById('ending-text').textContent = ending.text;
  document.getElementById('ending-echo-log').textContent = ending.echoLog;

  storyProgress[currentStory.id] = endingKey;

  screen.style.display = 'flex';
  window.updateAttributeHUD?.();

  // Check if all 5 stories done
  if (Object.keys(storyProgress).length >= 5) {
    document.getElementById('next-case-btn').textContent = 'VIEW FINAL REPORT';
    document.getElementById('next-case-btn').onclick = showMirrorEnding;
  }
}

// Back to story select
function backToSelect() {
  document.getElementById('ending-screen').style.display = 'none';
  document.getElementById('scene').style.display = 'none';
  document.getElementById('echo-panel').style.display = 'none';
  document.getElementById('story-select').style.display = 'flex';
  window.setArticleButtonVisible?.(true);
  currentStory = null;
  window.updateAttributeHUD?.();
}

function showMirrorEnding() {
  document.getElementById('ending-screen').style.display = 'none';
  const me = document.getElementById('mirror-ending');
  me.style.display = 'flex';
  window.updateAttributeHUD?.();
  const reportEl = document.getElementById('mirror-report');
  typewriter(reportEl, MIRROR_REPORT, 22, () => {
    const mt = document.getElementById('mirror-text');
    mt.textContent = MIRROR_FINAL.replace(/\\n/g, '\n');
    mt.style.opacity = '1';
    setTimeout(() => {
      document.getElementById('restart-btn').style.opacity = '1';
    }, 4000);
  });
}
