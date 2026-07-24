"""A tiny in-memory sliding-window rate limiter.

Good enough for a single-process deployment (the app runs as one uvicorn worker
under pm2). If this ever scales to multiple workers, swap the store for Redis —
the `allow()` interface can stay the same.
"""

import threading
import time
from collections import defaultdict, deque


class RateLimiter:
    def __init__(self, max_requests: int, window_seconds: int) -> None:
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self._hits: dict[str, deque[float]] = defaultdict(deque)
        self._lock = threading.Lock()

    def allow(self, key: str) -> bool:
        """Record a hit for `key`; return False if it's over the limit."""
        now = time.monotonic()
        cutoff = now - self.window_seconds
        with self._lock:
            hits = self._hits[key]
            while hits and hits[0] < cutoff:
                hits.popleft()
            if len(hits) >= self.max_requests:
                return False
            hits.append(now)
            # Opportunistic cleanup so idle keys don't accumulate forever.
            if not hits:
                del self._hits[key]
            return True
