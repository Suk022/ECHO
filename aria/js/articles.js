// Article Preview System (UPDATED UI + UX)

const ARTICLES_API = 'https://echo-ko7o.onrender.com/articles';
let articlesCache = null;
let fetchInProgress = false;
const articleButton = document.getElementById('article-btn');
const articleModal = document.getElementById('article-modal');

// Button & Modal controls
articleButton.addEventListener('click', openArticleModal);
document.getElementById('article-modal-close').addEventListener('click', closeArticleModal);

// Close on backdrop click
articleModal.addEventListener('click', (e) => {
  if (e.target === articleModal) closeArticleModal();
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeArticleModal();
});

function openArticleModal() {
  articleModal.classList.add('open');
  articleModal.scrollTop = 0;
  document.body.style.overflow = 'hidden';

  if (articlesCache === null && !fetchInProgress) {
    loadArticles();
  }
}

function closeArticleModal() {
  articleModal.classList.remove('open');
  document.body.style.overflow = '';
}

window.setArticleButtonVisible = function setArticleButtonVisible(visible) {
  if (!articleButton) return;
  articleButton.style.display = visible ? 'flex' : 'none';
  if (!visible) {
    closeArticleModal();
  }
};

async function loadArticles() {
  fetchInProgress = true;
  showSkeletons(7);

  try {
    const response = await fetch(ARTICLES_API);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    const articles = data.articles || [];

    articlesCache = articles;

    if (!data.ready && articles.length < 10) {
      setTimeout(async () => {
        try {
          const retry = await fetch(ARTICLES_API);
          const retryData = await retry.json();
          articlesCache = retryData.articles || articles;
          renderArticles(articlesCache);
        } catch (_) {
          // Keep the best available result from the initial fetch.
        }
      }, 4000);
    }

    renderArticles(articles);
  } catch (err) {
    console.error('Article fetch failed:', err);
    showError();
  } finally {
    fetchInProgress = false;
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

function renderArticles(articles) {
  document.getElementById('article-error').style.display = 'none';
  const grid = document.getElementById('article-grid');

  if (!articles || articles.length === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:40px;
                  font-family:'Share Tech Mono',monospace;font-size:11px;
                  color:rgba(0,229,160,0.4);letter-spacing:2px;">
      No articles, don't worry - backend is still processing, just refresh and come back
      </div>`;
    return;
  }

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
        onerror="this.parentElement.replaceWith(createArticleFallback('${placeholderClass}', '${escapeJsString(placeholderLabel)}'))"
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

function escapeJsString(str) {
  if (!str) return '';
  return String(str)
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'");
}
