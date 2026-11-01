/**
 * FB Reel to Watch — MAIN World Script
 *
 * Runs directly in Facebook's MAIN JavaScript execution context at `document_start`.
 *
 * Intercepts any attempt to open Facebook Reels and ensures the user lands on
 * the classic Facebook Watch player instead of the Reel overlay.
 */

// ─── URL Rewriting Logic ─────────────────────────────────────────────
export function rewriteReelHref(urlStr: string): string | null {
  if (!urlStr || typeof urlStr !== 'string') return null;

  // Pattern matches /reel/<id>, /reels/<id>, /share/r/<id>
  const match = urlStr.match(/(?:reel|reels|share\/r)\/([a-zA-Z0-9_-]+)/);
  if (!match || !match[1]) return null;

  const videoId = match[1];

  try {
    const isAbsolute = urlStr.startsWith('http://') || urlStr.startsWith('https://');
    const base = isAbsolute
      ? undefined
      : (typeof window !== 'undefined' && window.location?.origin
          ? window.location.origin
          : 'https://www.facebook.com');
    const parsed = new URL(urlStr, base);

    parsed.pathname = '/watch/';
    parsed.searchParams.set('v', videoId);

    return isAbsolute ? parsed.toString() : (parsed.pathname + parsed.search);
  } catch {
    return `https://www.facebook.com/watch/?v=${videoId}`;
  }
}

// ─── State Checker ───────────────────────────────────────────────────
function isExtensionActive(): boolean {
  if (typeof document === 'undefined') return true;
  return document.documentElement.dataset.fbReelToWatch !== 'false';
}

// ─── Layer 1: Initial Page Load (Direct URL) ─────────────────────────
// If user enters facebook.com/reel/... directly in address bar,
// redirect to /watch/?v= at document_start (0ms) before React mounts.
(function checkInitialUrl() {
  if (typeof window === 'undefined') return;
  const path = window.location.pathname;
  if (path.includes('/reel') || path.includes('/share/r/')) {
    const watchUrl = rewriteReelHref(window.location.href);
    if (watchUrl && watchUrl !== window.location.href) {
      window.location.replace(watchUrl);
    }
  }
})();

// ─── Layer 2: Hook History API (pushState & replaceState) ─────────────
// When Facebook's React Router tries to pushState to a Reel URL:
// Instead of letting it mount the Reel modal overlay with a mismatched URL,
// we immediately navigate to the real Watch player page!
(function hookHistory() {
  if (typeof history === 'undefined') return;

  const originalPushState = history.pushState.bind(history);
  const originalReplaceState = history.replaceState.bind(history);

  history.pushState = function (
    data: unknown,
    unused: string,
    url?: string | URL | null,
  ): void {
    if (isExtensionActive() && url) {
      const rewritten = rewriteReelHref(url.toString());
      if (rewritten) {
        // Facebook is attempting to open a Reel! Navigate to Watch player directly.
        window.location.assign(rewritten);
        return;
      }
    }
    return originalPushState(data, unused, url);
  };

  history.replaceState = function (
    data: unknown,
    unused: string,
    url?: string | URL | null,
  ): void {
    if (isExtensionActive() && url) {
      const rewritten = rewriteReelHref(url.toString());
      if (rewritten) {
        window.location.assign(rewritten);
        return;
      }
    }
    return originalReplaceState(data, unused, url);
  };
})();

// ─── Layer 3: Link Mutation & Click Interception (Capture Phase) ──────
// 1. On hover / mousedown: mutate DOM <a> href and React props so right-click,
//    middle-click, and preview show Watch player URL.
// 2. On click: STOP Facebook's Reel Modal handler from mounting the Reel overlay,
//    and navigate directly to the Watch player.

function mutateAnchor(anchor: HTMLAnchorElement): string | null {
  const rawHref = anchor.getAttribute('href') || anchor.href;
  if (!rawHref) return null;

  const watchUrl = rewriteReelHref(rawHref);
  if (!watchUrl) return null;

  anchor.href = watchUrl;
  anchor.setAttribute('href', watchUrl);

  // Update React Fiber props if accessible
  try {
    const propKey = Object.keys(anchor).find((key) => key.startsWith('__reactProps$'));
    if (propKey) {
      const props = (anchor as Record<string, any>)[propKey];
      if (props) {
        if (typeof props.href === 'string') props.href = watchUrl;
        if (typeof props.to === 'string') props.to = watchUrl;
        if (typeof props.url === 'string') props.url = watchUrl;
      }
    }
  } catch {
    // Non-critical
  }

  return watchUrl;
}

function handleHoverOrPointer(e: Event): void {
  if (!isExtensionActive()) return;
  const target = e.target;
  if (!(target instanceof HTMLElement)) return;
  const anchor = target.closest('a');
  if (anchor) {
    mutateAnchor(anchor);
  }
}

function handleClick(e: MouseEvent): void {
  if (!isExtensionActive()) return;

  const target = e.target;
  if (!(target instanceof HTMLElement)) return;

  const anchor = target.closest('a');
  if (!anchor) return;

  const watchUrl = mutateAnchor(anchor);
  if (!watchUrl) return;

  // Standard left-click without modifier keys:
  // PREVENT Facebook from mounting the Reel overlay modal!
  if (e.button === 0 && !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    // Navigate cleanly to the genuine Watch player
    window.location.assign(watchUrl);
  }
}

if (typeof document !== 'undefined') {
  // Capture phase listeners
  document.addEventListener('mouseover', handleHoverOrPointer, true);
  document.addEventListener('pointerenter', handleHoverOrPointer, true);
  document.addEventListener('pointerdown', handleHoverOrPointer, true);
  document.addEventListener('mousedown', handleHoverOrPointer, true);
  document.addEventListener('click', handleClick, true);
}
