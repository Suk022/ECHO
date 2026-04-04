"""
In-memory cache for article metadata.

Design decision: Simple dict-based cache keyed by original URL.
No TTL needed for a jam build.
If scaling to production, replace with Redis or add TTL logic.
"""

from typing import Optional

_cache: dict[str, dict] = {}


def get(url: str) -> Optional[dict]:
    """Return cached metadata for a URL."""
    return _cache.get(url)


def set(url: str, data: dict) -> None:
    """Store metadata for a URL."""
    _cache[url] = data


def is_cached(url: str) -> bool:
    """Return True if URL is cached."""
    return url in _cache


def all_cached() -> list[dict]:
    """Return all cached records."""
    return list(_cache.values())


def cache_size() -> int:
    """Return cache size."""
    return len(_cache)
