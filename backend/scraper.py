"""
Async metadata scraper.

Responsibilities:
1. Follow redirect chains to resolve shortened URLs (share.google, bit.ly, etc.)
2. Fetch final page HTML
3. Extract OG tags (og:title, og:image) with fallbacks
4. Return structured metadata dict

Design decisions:
- Uses httpx.AsyncClient for async redirect following + HTML fetch in one client
- Sets a realistic User-Agent to avoid 403s from news sites
- Timeout of 12s per request so slow sites do not hang forever
- Normalizes titles before caching so frontend never receives null titles
"""

import logging
from typing import Optional

import httpx
from bs4 import BeautifulSoup

logger = logging.getLogger(__name__)

# Realistic browser User-Agent - many sites block Python/httpx defaults
HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/124.0.0.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
}

TIMEOUT = 12.0  # seconds


async def fetch_metadata(original_url: str) -> Optional[dict]:
    """
    Resolve redirects, fetch page HTML, extract metadata.
    Returns dict with keys: title, image, url.
    Returns None only for unrecoverable request failures.
    """
    try:
        async with httpx.AsyncClient(
            follow_redirects=True,
            headers=HEADERS,
            timeout=TIMEOUT,
        ) as client:
            response = await client.get(original_url)
            final_url = str(response.url)

            if response.status_code != 200:
                logger.warning("Non-200 status %s for %s", response.status_code, original_url)
                return _fallback_record(original_url, final_url)

            metadata = _extract_metadata(response.text, final_url, original_url)
            logger.info(
                "Metadata extracted for %s -> title=%r image=%r",
                original_url,
                metadata.get("title"),
                metadata.get("image"),
            )
            return metadata

    except httpx.TimeoutException:
        logger.warning("Timeout fetching %s", original_url)
        return _fallback_record(original_url, original_url)

    except httpx.RequestError as exc:
        logger.warning("Request error for %s: %s", original_url, exc)
        return None

    except Exception as exc:
        logger.error("Unexpected error for %s: %s", original_url, exc)
        return None


def _extract_metadata(html: str, final_url: str, original_url: str) -> dict:
    """
    Parse HTML and extract:
    1. og:title -> fallback to <title>
    2. og:image -> fallback to first <img> with src
    """
    soup = BeautifulSoup(html, "html.parser")

    og_title = soup.find("meta", property="og:title")
    if og_title and og_title.get("content"):
        title = og_title["content"].strip()
    else:
        title_tag = soup.find("title")
        title = title_tag.get_text(strip=True) if title_tag else None

    og_image = soup.find("meta", property="og:image")
    if og_image and og_image.get("content"):
        image = og_image["content"].strip()
    else:
        tw_image = soup.find("meta", attrs={"name": "twitter:image"})
        if tw_image and tw_image.get("content"):
            image = tw_image["content"].strip()
        else:
            image = _find_first_image(soup, final_url)

    return {
        "title": _safe_title(title, final_url),
        "image": image,
        "url": final_url,
        "original_url": original_url,
    }


def _find_first_image(soup: BeautifulSoup, base_url: str) -> Optional[str]:
    """
    Find first <img> tag with a meaningful src.
    Skip tiny icons (width/height < 100 in attributes if present).
    """
    for img in soup.find_all("img", src=True):
        src = img["src"].strip()
        if not src or src.startswith("data:"):
            continue

        w = img.get("width", "")
        h = img.get("height", "")
        try:
            if int(w) < 100 or int(h) < 100:
                continue
        except (ValueError, TypeError):
            pass

        if src.startswith("//"):
            src = "https:" + src
        elif src.startswith("/"):
            from urllib.parse import urlparse

            parsed = urlparse(base_url)
            src = f"{parsed.scheme}://{parsed.netloc}{src}"
        return src
    return None


def _fallback_record(original_url: str, final_url: str) -> dict:
    """Minimal record when we cannot fetch the page."""
    record = {
        "title": _safe_title(None, final_url),
        "image": None,
        "url": final_url,
        "original_url": original_url,
    }
    logger.info("Using fallback metadata for %s -> title=%r", original_url, record["title"])
    return record


def _safe_title(title: Optional[str], final_url: str) -> str:
    """Guarantee a non-empty string title for every article record."""
    if title is not None:
        cleaned = " ".join(str(title).split()).strip()
        if cleaned:
            return cleaned

    fallback = _domain_from_url(final_url).strip()
    return fallback or final_url or "untitled article"


def _domain_from_url(url: str) -> str:
    """Extract readable domain name as a last-resort title."""
    try:
        from urllib.parse import urlparse

        return urlparse(url).netloc.replace("www.", "")
    except Exception:
        return url
