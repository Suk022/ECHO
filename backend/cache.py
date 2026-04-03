"""
In-memory cache for article metadata.

Design decision: Simple dict-based cache keyed by original URL.
No TTL needed for a jam build — articles don't change.
If scaling to production, replace with Redis or add TTL logic.
"""

from typing import Optional

_cache: dict[str, dict] = {}


def get(url: str) -> Optional[dict]:
    """Return cached metadata for a URL, or None if not cached."""
    return _cache.get(url)


def set(url: str, data: dict) -> None:
    """Store metadata for a URL."""
    _cache[url] = data


def is_cached(url: str) -> bool:
    return url in _cache


def all_cached() -> list[dict]:
    """Return all cached article records."""
    return list(_cache.values())


def cache_size() -> int:
    return len(_cache)
