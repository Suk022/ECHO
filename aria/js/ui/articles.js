import { CONFIG } from '../data/config.js';

const ARTICLES_API = `${CONFIG.BACKEND_URL}/articles`;
const ARTICLE_WAKE_RETRY_MS = 4000;
const ARTICLE_WAKE_MAX_ATTEMPTS = 8;
let articlesCache = null;
let fetchInProgress = false;
let articleButton;
let articleModal;
let wakeRetryTimer = null;
let wakeRetryAttempts = 0;

export function initArticles() {
  articleButton = document.getElementById('article-btn');
  articleModal = document.getElementById('article-modal');
  const closeButton = document.getElementById('article-modal-close');

  if (!articleButton || !articleModal || !closeButton) return;

  articleButton.addEventListener('click', openArticleModal);
  closeButton.addEventListener('click', closeArticleModal);

  articleModal.addEventListener('click', (e) => {
    if (e.target === articleModal) closeArticleModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeArticleModal();
  });
}

function openArticleModal() {
  articleModal.classList.add('open');
  articleModal.scrollTop = 0;
  document.body.style.overflow = 'hidden';

  if (articlesCache === null && !fetchInProgress) {
    loadArticles();
  } else if (articlesCache && articlesCache.length > 0) {
    renderArticles(articlesCache);
  }
}

function closeArticleModal() {
  articleModal.classList.remove('open');
  document.body.style.overflow = '';
  clearWakeRetry();
}

export function setArticleButtonVisible(visible) {
  if (!articleButton) return;
  articleButton.style.display = visible ? 'flex' : 'none';
  if (!visible) {
    closeArticleModal();
  }
}

async function loadArticles() {
  fetchInProgress = true;
  if (!articlesCache || articlesCache.length === 0) {
    showSkeletons(7);
  }

  try {
    const response = await fetch(ARTICLES_API);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    const articles = data.articles || [];

    articlesCache = articles;
    renderArticles(articles);

    if ((!data.ready || articles.length === 0) && articleModal?.classList.contains('open')) {
      scheduleWakeRetry();
    } else {
      clearWakeRetry();
    }
  } catch (err) {
    console.error('Article fetch failed:', err);
    const shouldShowWakeMessage = wakeRetryAttempts < ARTICLE_WAKE_MAX_ATTEMPTS;

    if (shouldShowWakeMessage) {
      showWakeMessage();
    } else {
      showError();
    }

    if (articleModal?.classList.contains('open') && shouldShowWakeMessage) {
      scheduleWakeRetry();
    } else {
      clearWakeRetry();
    }
  } finally {
    fetchInProgress = false;
  }
}

function scheduleWakeRetry() {
  if (wakeRetryTimer || wakeRetryAttempts >= ARTICLE_WAKE_MAX_ATTEMPTS) {
    return;
  }

  wakeRetryTimer = window.setTimeout(() => {
    wakeRetryTimer = null;
    wakeRetryAttempts += 1;

    if (!articleModal?.classList.contains('open') || fetchInProgress) {
      return;
    }

    loadArticles();
  }, ARTICLE_WAKE_RETRY_MS);
}

function clearWakeRetry() {
  if (wakeRetryTimer) {
    clearTimeout(wakeRetryTimer);
    wakeRetryTimer = null;
  }

  if (!articleModal?.classList.contains('open')) {
    wakeRetryAttempts = 0;
  }
}

function showSkeletons(count) {
  const grid = document.getElementById('article-grid');

  grid.innerHTML = `
    <div class="article-layout-skeleton">
      <div class="skeleton-feature">
        <div class="skeleton-body">
          <div class="skeleton-kicker"></div>
          <div class="skeleton-line tall"></div>
          <div class="skeleton-line tall"></div>
          <div class="skeleton-line medium"></div>
          <div class="skeleton-line"></div>
          <div class="skeleton-line"></div>
          <div class="skeleton-line short"></div>
        </div>
        <div class="skeleton-img"></div>
      </div>
      <div class="skeleton-rail">
        ${Array.from({ length: Math.min(count, 4) }, () => `
          <div class="skeleton-rail-item">
            <div class="skeleton-thumb"></div>
            <div class="skeleton-body">
              <div class="skeleton-line"></div>
              <div class="skeleton-line medium"></div>
              <div class="skeleton-line short"></div>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="skeleton-strip">
        ${Array.from({ length: Math.max(count - 4, 3) }, () => `
          <div class="skeleton-strip-item">
            <div class="skeleton-line"></div>
            <div class="skeleton-line medium"></div>
            <div class="skeleton-line short"></div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function showError() {
  document.getElementById('article-error').style.display = 'block';
  document.getElementById('article-grid').innerHTML = '';
}

function showWakeMessage() {
  document.getElementById('article-error').style.display = 'none';
  document.getElementById('article-grid').innerHTML = `
    <div style="grid-column:1/-1;text-align:center;padding:40px;
                border:1px solid rgba(0,229,160,0.1);
                background:rgba(0,229,160,0.05);
                font-family:'Share Tech Mono',monospace;font-size:14px;
                color:rgba(0,229,160,0.4);letter-spacing:1px;">
    Hey! The server's just waking up.
    This project runs on Render's free tier, which sleeps between visits.
    Give it a few seconds and the articles will load.
    Thanks for waiting.
    </div>`;
}

function renderArticles(articles) {
  document.getElementById('article-error').style.display = 'none';
  const grid = document.getElementById('article-grid');

  if (!articles || articles.length === 0) {
    showWakeMessage();
    return;
  }

  wakeRetryAttempts = 0;
  clearWakeRetry();

  const orderedArticles = prioritizeArticles(articles);
  const featured = orderedArticles[0];
  const railArticles = orderedArticles.slice(1, 5);
  const stripArticles = orderedArticles.slice(5);

  grid.innerHTML = `
    <section class="article-lead-layout">
      ${buildFeaturedArticle(featured)}
      <aside class="article-rail">
        ${railArticles.map((article, index) => buildCompactArticle(article, index + 1)).join('')}
      </aside>
    </section>
    ${stripArticles.length ? `
      <section class="article-strip">
        ${stripArticles.map((article, index) => buildStripArticle(article, index + railArticles.length + 1)).join('')}
      </section>
    ` : ''}
  `;

  attachArticleImageFallbacks(grid);
}

function buildFeaturedArticle(article) {
  const meta = buildMeta(article, 'Lead research');

  return `
    <a class="article-feature"
       href="${escapeAttr(article.url)}"
       target="_blank"
       rel="noopener noreferrer"
       title="${escapeAttr(article.title)}">
      <div class="article-feature-copy">
        <div class="article-story-label">Jacqueline Nesi</div>
        <h3 class="article-feature-title">${escapeHtml(article.title)}</h3>
        <p class="article-feature-summary">
          A key source informing how persistent AI companionship shapes attachment, validation, and withdrawal from offline relationships among teens.
        </p>
        <div class="article-feature-meta">${meta}</div>
      </div>
      ${buildImage(article, 'article-feature-image', 'article-feature-image-placeholder', 'PRIMARY SOURCE')}
    </a>
  `;
}

function buildCompactArticle(article, index) {
  const meta = buildMeta(article, `Source ${String(index).padStart(2, '0')}`);

  return `
    <a class="article-compact"
       href="${escapeAttr(article.url)}"
       target="_blank"
       rel="noopener noreferrer"
       title="${escapeAttr(article.title)}">
      ${buildImage(article, 'article-compact-image', 'article-compact-image-placeholder', 'NO IMAGE')}
      <div class="article-compact-body">
        <div class="article-compact-meta">${meta}</div>
        <h4 class="article-compact-title">${escapeHtml(article.title)}</h4>
      </div>
    </a>
  `;
}

function buildStripArticle(article, index) {
  const meta = buildMeta(article, `Archive ${String(index).padStart(2, '0')}`);

  return `
    <a class="article-strip-item"
       href="${escapeAttr(article.url)}"
       target="_blank"
       rel="noopener noreferrer"
       title="${escapeAttr(article.title)}">
      <div class="article-strip-meta">${meta}</div>
      <h4 class="article-strip-title">${escapeHtml(article.title)}</h4>
    </a>
  `;
}

function buildImage(article, imageClass, placeholderClass, placeholderLabel) {
  if (!article.image) {
    return `<div class="${placeholderClass}">${placeholderLabel}</div>`;
  }

  return `
    <div class="${imageClass}-frame">
      <img
        class="${imageClass}"
        src="${escapeAttr(article.image)}"
        alt="${escapeAttr(article.title)}"
        loading="lazy"
        data-fallback-class="${placeholderClass}"
        data-fallback-label="${escapeAttr(placeholderLabel)}"
      />
    </div>
  `;
}

function createArticleFallback(className, label) {
  const element = document.createElement('div');
  element.className = className;
  element.textContent = label;
  return element;
}

function attachArticleImageFallbacks(root) {
  root.querySelectorAll('img[data-fallback-class]').forEach((image) => {
    image.addEventListener('error', () => {
      const frame = image.parentElement;
      if (!frame) return;
      frame.replaceWith(createArticleFallback(image.dataset.fallbackClass, image.dataset.fallbackLabel || 'NO IMAGE'));
    }, { once: true });
  });
}

function buildMeta(article, label) {
  const domain = extractDomain(article.original_url || article.url);

  return `
    <span>${escapeHtml(label)}</span>
    <span class="article-meta-divider"></span>
    <span>${escapeHtml(domain || 'unknown source')}</span>
  `;
}

function prioritizeArticles(articles) {
  return [...articles].sort((a, b) => Number(Boolean(b.image)) - Number(Boolean(a.image)));
}

function extractDomain(url) {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch (_) {
    return '';
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeAttr(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

