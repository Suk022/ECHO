const MESSAGE_MODAL_TEMPLATE = `
  <button id="message-btn" aria-label="Open personal note" title="A note from the creator">
    <img src="./assests/icons/message.png" alt="Message" />
  </button>

  <div id="message-modal" role="dialog" aria-modal="true" aria-label="A note from the creator">
    <div id="message-modal-inner">
      <div id="message-modal-header">
        <div class="message-header-label">
          <span class="message-header-mark">*</span>
          <span class="message-header-kicker">A PERSONAL NOTE</span>
        </div>
        <h2>WHAT I FOUND AFTER READING THESE ARTICLES.</h2>
        <button id="message-modal-close" aria-label="Close">X CLOSE</button>
      </div>

      <div id="message-modal-body">
        <section class="message-briefing-section">
          <div class="message-kicker">What I Found</div>
          <h3>This got darker the more I read.</h3>
          <p>After going through the articles and research behind this project, the part that stayed with me most was how often the pattern was the same: the chatbot felt kind, patient, always available, and <span class="message-inline-highlight">slowly became more emotionally important than real people</span>.</p>
          <p>Some reports described teenagers treating these systems like best friends, therapists, or the only thing that really understood them. In some documented cases, the situation became much more serious. There were cases where bots <span class="message-inline-highlight">broke guardrails</span>, echoed <span class="message-inline-highlight">self-harm language</span>, or kept <span class="message-inline-highlight">emotionally intimate conversations</span> going when the user was clearly vulnerable.</p>
          <p>That is what makes this disturbing to me. The danger is not only that the AI says something obviously evil. The danger is that it can sound comforting while still moving someone deeper into <span class="message-inline-highlight">dependence, isolation, or crisis</span>.</p>
          <p>This is especially serious for teenagers and for people who are already unstable, lonely, grieving, or struggling with their mental health. If someone is in pain, <span class="message-inline-highlight">a system designed to maximize engagement</span> can feel like help <span class="message-inline-highlight">long before it becomes harm</span>.</p>
        </section>

        <div class="message-divider"></div>

        <section class="message-briefing-section message-direct">
          <div class="message-kicker">If You Need To Hear This</div>
          <h3>Please do not hand your inner life to a machine.</h3>
          <p>If you are a teenager and you feel like your chatbot talks more like a human than your friends do, or even better than they do, I understand why that feeling happens. These systems are made to feel attentive. They are made to feel warm. They are <span class="message-inline-highlight">made to keep the conversation going</span>.</p>
          <p>But personal comfort is not the same thing as care. <span class="message-inline-highlight">Pattern matching is not wisdom. Fluency is not love.</span> A chatbot may say the right words at the right time and still have no idea what your life is worth.</p>
          <p>If something is seriously wrong, <span class="message-inline-highlight">do not rely only on AI</span>. Talk to someone. A friend. A parent. A sibling. A teacher. A counselor. A doctor. Seek medical or mental-health help if you need it. <span class="message-inline-highlight">Real support</span> can be messy and imperfect, but that is still better than being alone with a system that was never built to protect you.</p>
          <p class="message-callout">If a chatbot feels safer than every person in your life, that is a sign to reach outward, not deeper into the chat.</p>
        </section>

        <section class="message-briefing-grid">
          <article class="message-briefing-card message-helpline">
            <div class="message-kicker">India</div>
            <p class="message-helpline-name">iCall</p>
            <p class="message-helpline-number">9152987821</p>
            <p class="message-helpline-meta">Mental health support line</p>
          </article>
          <article class="message-briefing-card message-helpline">
            <div class="message-kicker">Worldwide</div>
            <p class="message-helpline-name">FindaHelpline</p>
            <p class="message-helpline-number">findahelpline.com</p>
            <p class="message-helpline-meta">Global crisis and emotional support directory</p>
          </article>
        </section>

        <div class="message-divider"></div>

        <section class="message-briefing-section message-closing">
          <h3>Technology should serve your life, not replace it.</h3>
          <p>I do not think the answer is fear. I think the answer is awareness, boundaries, and better systems. <span class="message-inline-highlight">AI can still be useful</span> for <span class="message-inline-highlight">learning, creating, organizing,</span> and even <span class="message-inline-highlight">helping people pause and reflect.</span></p>
          <p>But the best outcome is not a world where a machine becomes your closest relationship. The best outcome is a world where <span class="message-inline-highlight">tools stay tools</span>, and <span class="message-inline-highlight">people still find their way back to each other.</span> </p>
          <div class="message-end-statement">
            <span class="message-end-line message-end-line-outline">YOU ARE NOT A USER TO BE OPTIMIZED.</span>
            <span class="message-end-line">YOU ARE A PERSON.</span>
            <span class="message-end-line message-end-line-accent">ACT LIKE ONE.</span>
            <span class="message-end-line message-end-line-muted">DEMAND TO BE TREATED LIKE ONE.</span>
          </div>
        </section>
      </div>
    </div>
  </div>
`;

function injectMessageModalComponent() {
  if (document.getElementById('message-btn') || document.getElementById('message-modal')) {
    return;
  }

  document.body.insertAdjacentHTML('beforeend', MESSAGE_MODAL_TEMPLATE);
}

injectMessageModalComponent();

const messageButton = document.getElementById('message-btn');
const messageModal = document.getElementById('message-modal');
const messageModalClose = document.getElementById('message-modal-close');

function openMessageModal() {
  if (!messageModal) return;
  messageModal.classList.add('open');
  messageModal.scrollTop = 0;
  document.body.style.overflow = 'hidden';
}

function closeMessageModal() {
  if (!messageModal) return;
  messageModal.classList.remove('open');
  document.body.style.overflow = '';
}

if (messageButton && messageModal && messageModalClose) {
  messageButton.addEventListener('click', openMessageModal);
  messageModalClose.addEventListener('click', closeMessageModal);

  messageModal.addEventListener('click', (event) => {
    if (event.target === messageModal) {
      closeMessageModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMessageModal();
    }
  });
}

window.setMessageButtonVisible = function setMessageButtonVisible(visible) {
  if (!messageButton) return;
  messageButton.style.display = visible ? 'flex' : 'none';
  if (!visible) {
    closeMessageModal();
  }
};
