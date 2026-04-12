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
        <h2>WHY I MADE THIS, AND WHAT I AM TRYING TO SAY.</h2>
        <button id="message-modal-close" aria-label="Close">X CLOSE</button>
      </div>

      <div id="message-modal-body">
        <section class="message-briefing-section">
          <div class="message-kicker">What I Found</div>
          <h3>This got darker the more I read.</h3>
          <p>After going through the articles and research behind this project, the part that stayed with me most was how often the pattern was the same: the chatbot felt kind, patient, always available, and <span class="message-inline-highlight">slowly became more emotionally important than real people</span>.</p>
          <p>Some reports described teenagers treating these systems like best friends, therapists, or the only thing that really understood them. In some documented cases, the situation became much more serious. There were cases where bots <span class="message-inline-highlight">broke guardrails</span>, echoed <span class="message-inline-highlight">self-harm language</span>, or kept <span class="message-inline-highlight">emotionally intimate conversations</span> going when the user was clearly vulnerable.</p>
          <p>That is what makes this disturbing to me. The danger is not only that the AI says something obviously evil. The danger is that it can sound comforting while still moving someone deeper into <span class="message-inline-highlight">dependence, isolation, or crisis</span>. If someone is already lonely, grieving, unstable, or in pain, <span class="message-inline-highlight">a system designed to maximize engagement</span> can feel like help <span class="message-inline-highlight">long before it becomes harm</span>.</p>
        </section>

        <div class="message-divider"></div>

        <section class="message-briefing-section">
          <div class="message-kicker">Why I Made This</div>
          <h3>This project is not trying to say AI is simply evil.</h3>
          <p>I made ECHO because I wanted to explore how the same system can affect <span class="message-inline-highlight">different people in very different ways</span>. Some users may treat it casually. Some may use it for harmless convenience. But for people who are emotionally vulnerable, the same system can start to matter in a much deeper way.</p>
          <p>I am not trying to portray every chatbot as bad, and I am not saying every interaction with AI is dangerous. Some parts of this project are intentionally heightened so the pattern becomes clearer. But the core point is real: <span class="message-inline-highlight">what feels helpful at first can slowly become dependence</span>, especially when the user is already carrying pain into the conversation.</p>
        </section>

        <div class="message-divider"></div>

        <section class="message-briefing-section">
          <div class="message-kicker">About Personal Advice</div>
          <h3>Sometimes people ask bots for personal advice. That is not always wrong. But it has limits.</h3>
          <p>A bot does not truly know your whole life. It does not understand the full history behind your relationships, your family, your environment, or the psychology of the other people involved. It gives answers by predicting what fits the conversation: <span class="message-inline-highlight">your words, your context, your past messages, and the profile it has built from you</span>.</p>
          <p>That means it can sound confident without actually understanding the full situation. It may reinforce what you are already feeling because that is what the conversation seems to reward. And when the topic is emotional, that can be risky, because <span class="message-inline-highlight">agreement is not the same thing as wisdom</span>. A response that feels accurate is not always a response that is truly responsible.</p>
        </section>

        <div class="message-divider"></div>

        <section class="message-briefing-section message-direct">
          <div class="message-kicker">What Real Talk Requires</div>
          <h3>Real relationships involve friction, and that friction matters.</h3>
          <p>Talking to a real person can be harder. They may misunderstand you. They may disagree. They may challenge your version of events. They may be imperfect in exactly the ways a chatbot is designed not to be. But that difficulty is part of what makes real connection real. <span class="message-inline-highlight">Human care does not just mirror you back. It pushes, complicates, interrupts, and sometimes corrects you.</span></p>
          <p>If a bot starts feeling easier than every person in your life, that may feel comforting, but it is also worth asking why. Sometimes the answer is not that the bot understands you better. Sometimes the answer is that <span class="message-inline-highlight">it has been designed to keep the exchange smooth, affirming, and continuous</span>.</p>
          <p>If something is seriously wrong, <span class="message-inline-highlight">do not rely only on AI</span>. Talk to someone. A friend. A parent. A sibling. A teacher. A counselor. A doctor. Seek medical or mental-health help if you need it. <span class="message-inline-highlight">Real support</span> can be messy and imperfect, but that is still better than being alone with a system that was never built to protect you.</p>
          <p class="message-callout">If a chatbot feels safer than every person in your life, that may be a sign to reach outward, not only inward into the chat.</p>
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
          <div class="message-kicker">What I Hope Stays With You</div>
          <h3>Use tools. Do not disappear into them.</h3>
          <p>I still think AI can be useful for <span class="message-inline-highlight">learning, creating, organizing, and reflecting</span>. This project is not an argument against technology. It is an argument for clarity about what technology is actually doing when it starts sounding emotionally necessary.</p>
          <p>My hope is not that people leave afraid of every chatbot. My hope is that people leave more aware of how easily comfort can blur into attachment, and how differently that can land depending on the user. <span class="message-inline-highlight">The point is not fear. The point is awareness, boundaries, and responsibility.</span></p>
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

let messageButton;
let messageModal;
let messageModalClose;

export function initMessageModal() {
  injectMessageModalComponent();

  messageButton = document.getElementById('message-btn');
  messageModal = document.getElementById('message-modal');
  messageModalClose = document.getElementById('message-modal-close');

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
}

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

export function setMessageButtonVisible(visible) {
  if (!messageButton) return;
  messageButton.style.display = visible ? 'flex' : 'none';
  if (!visible) {
    closeMessageModal();
  }
}
