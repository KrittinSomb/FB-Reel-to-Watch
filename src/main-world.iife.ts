/**
 * FB Reel to Watch — MAIN World Script
 *
 * Runs directly in Facebook's MAIN JavaScript execution context at `document_start`.
 *
 * Strictly respects the `isExtensionActive()` flag. If disabled, does NOTHING
 * and lets Facebook Reels work 100% naturally without redirection or interference.
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
// MUST be explicitly "true" to be active. If "false" or not yet loaded, inactive.
export function isExtensionActive(): boolean {
  if (typeof document === 'undefined' || !document.documentElement) return false;
  return document.documentElement.dataset.fbReelToWatch === 'true';
}

// ─── Hook History API (pushState & replaceState) ──────────────────────
// Intercepts in-app SPA transitions only when active.
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

// ─── Link Mutation & Click Interception (Capture Phase) ──────────────
function mutateAnchor(anchor: HTMLAnchorElement): string | null {
  const rawHref = anchor.getAttribute('href') || anchor.href;
  if (!rawHref) return null;

  const watchUrl = rewriteReelHref(rawHref);
  if (!watchUrl) return null;

  anchor.href = watchUrl;
  anchor.setAttribute('href', watchUrl);

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
  if (e.button === 0 && !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    window.location.assign(watchUrl);
  }
}

if (typeof document !== 'undefined') {
  document.addEventListener('mouseover', handleHoverOrPointer, true);
  document.addEventListener('pointerenter', handleHoverOrPointer, true);
  document.addEventListener('pointerdown', handleHoverOrPointer, true);
  document.addEventListener('mousedown', handleHoverOrPointer, true);
  document.addEventListener('click', handleClick, true);
}
