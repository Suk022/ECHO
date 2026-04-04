"""
Articles router.

Stores hardcoded list of source URLs.
On first GET /articles request, scrapes all URLs concurrently and caches results.
Subsequent requests return cached data instantly.

Design decision: lazy initialization (scrape on first request, not on startup)
so server starts fast. A background task fires scrape immediately
on first request and returns cached data from then on.
"""

import asyncio
import logging
from urllib.parse import urlparse

from fastapi import APIRouter

from scraper import fetch_metadata
from cache import get, set, is_cached, all_cached, cache_size

logger = logging.getLogger(__name__)
router = APIRouter()

# Hardcoded article URLs
SOURCE_URLS = [
    "https://www.scientificamerican.com/article/how-are-ai-chatbots-affecting-teen-development/",
    "https://news.stanford.edu/stories/2025/08/ai-companions-chatbots-teens-young-people-risks-dangers-study",
    "https://pmc.ncbi.nlm.nih.gov/articles/PMC12621494/",
    "https://www.pewresearch.org/internet/2026/02/24/how-teens-use-and-view-ai/",
    "https://www.theguardian.com/technology/2026/apr/01/unregulated-chatbots-are-putting-lives-at-risk",
    "https://time.com/7291048/ai-chatbot-therapy-kids/",
    "https://youthendowmentfund.org.uk/news/one-in-four-teens-turn-to-ai-chatbots-for-mental-health-support-study-finds/",
    "https://divmagic.com/blog/the-impact-of-ai-chatbots-on-children-and-adolescents-a-comprehensive-analysis-xx4h0f",
    "https://www.theguardian.com/technology/2025/dec/09/teenagers-ai-chatbots-mental-health-support",
    "https://www.sciencedirect.com/science/article/pii/S1071581921000197",
    "https://psyche.co/ideas/why-chatbot-therapists-cant-offer-what-we-need"
]

HARDCODED_TITLES = {
    "https://news.stanford.edu/stories/2025/08/ai-companions-chatbots-teens-young-people-risks-dangers-study":
        "Why AI companions and young people can make for a dangerous mix",
    "https://www.sciencedirect.com/science/article/pii/S1071581921000197":
        "My Chatbot Companion - a Study of Human-Chatbot Relationships",
    "https://psyche.co/ideas/why-chatbot-therapists-cant-offer-what-we-need":
        "Why chatbot therapists can't offer what we need",
}

# Track whether background scrape has been triggered
_scrape_initiated = False


def _safe_title(article: dict) -> str:
    original_url = article.get("original_url")
    if original_url in HARDCODED_TITLES:
        return HARDCODED_TITLES[original_url]

    title = article.get("title")
    if title is not None:
        cleaned = " ".join(str(title).split()).strip()
        if cleaned:
            return cleaned

    fallback_url = article.get("url") or article.get("original_url") or ""
    try:
        domain = urlparse(fallback_url).netloc.replace("www.", "").strip()
    except Exception:
        domain = ""
    return domain or fallback_url or "untitled article"


async def _scrape_all() -> None:
    """
    Fetch metadata for all SOURCE_URLS concurrently.
    Already-cached URLs are skipped.
    Failed URLs return None and are skipped silently.
    """
    urls_to_fetch = [u for u in SOURCE_URLS if not is_cached(u)]
    if not urls_to_fetch:
        logger.info("All URLs already cached.")
        return

    logger.info(f"Scraping {len(urls_to_fetch)} URLs concurrently...")

    # Run all fetches in parallel — each has its own timeout internally
    tasks = [fetch_metadata(url) for url in urls_to_fetch]
    results = await asyncio.gather(*tasks, return_exceptions=True)

    success = 0
    for url, result in zip(urls_to_fetch, results):
        if isinstance(result, Exception):
            logger.warning(f"Exception for {url}: {result}")
            continue
        if result is not None:
            result["title"] = _safe_title(result)
            logger.info("Cached article %s -> title=%r", url, result["title"])
            set(url, result)
            success += 1
        else:
            logger.warning(f"Skipping {url} — fetch returned None")

    logger.info(f"Scrape complete: {success}/{len(urls_to_fetch)} succeeded.")


@router.get("/articles", summary="Get article preview cards")
async def get_articles():
    """
    Returns a list of article preview objects.

    First call: triggers background scrape, returns whatever is cached so far
    (may be empty or partial on cold start — frontend handles empty state).

    Subsequent calls: returns full cached results instantly.
    """
    global _scrape_initiated

    if not _scrape_initiated:
        _scrape_initiated = True
        # Fire scrape in background — don't block response
        asyncio.create_task(_scrape_all())

    cached = all_cached()

    for article in cached:
        article["title"] = _safe_title(article)

    articles = [a for a in cached if a.get("title")]

    return {
        "count": len(articles),
        "ready": len(articles) == len(SOURCE_URLS),
        "articles": articles,
    }


@router.get("/articles/refresh", summary="Force re-scrape all URLs")
async def refresh_articles():
    """
    Clears scrape-initiated flag and triggers a fresh scrape.
    Useful during development.
    """
    global _scrape_initiated
    _scrape_initiated = False

    # Clear cache by re-importing and resetting
    import cache
    cache._cache.clear()

    asyncio.create_task(_scrape_all())
    return {"message": "Refresh triggered. Call GET /articles in a few seconds."}
