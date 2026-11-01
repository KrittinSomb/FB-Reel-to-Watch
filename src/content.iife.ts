/**
 * FB Reel to Watch — Isolated World Script
 *
 * Runs in the ISOLATED world with direct access to chrome.storage.
 * 1. Reads the `isEnabled` preference.
 * 2. If enabled and current URL is a Reel, performs immediate redirect at document_start.
 * 3. Sets `document.documentElement.dataset.fbReelToWatch` to "true" or "false"
 *    so the MAIN world script knows the exact state synchronously.
 */

// ─── Direct URL Redirection (Executed only if enabled) ───────────────
function rewriteReelHref(urlStr: string): string | null {
  if (!urlStr || typeof urlStr !== 'string') return null;

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

function checkAndRedirectIfEnabled(enabled: boolean): void {
  if (!enabled || typeof window === 'undefined') return;

  const path = window.location.pathname;
  if (path.includes('/reel') || path.includes('/share/r/')) {
    const watchUrl = rewriteReelHref(window.location.href);
    if (watchUrl && watchUrl !== window.location.href) {
      window.location.replace(watchUrl);
    }
  }
}

function updateEnabledState(enabled: boolean): void {
  try {
    document.documentElement.dataset.fbReelToWatch = enabled ? 'true' : 'false';
  } catch {
    // Ignore if documentElement is not yet available
  }
}

// ─── Read Initial State from storage ─────────────────────────────────
chrome.storage.local.get({ isEnabled: true }, (result) => {
  const enabled = Boolean(result.isEnabled ?? true);
  updateEnabledState(enabled);

  // ONLY redirect if the extension is actually enabled!
  if (enabled) {
    checkAndRedirectIfEnabled(true);
  }
});

// ─── Listen for changes from Popup Toggle ────────────────────────────
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'local' && changes.isEnabled !== undefined) {
    const newEnabled = Boolean(changes.isEnabled.newValue);
    updateEnabledState(newEnabled);

    if (newEnabled) {
      checkAndRedirectIfEnabled(true);
    }
  }
});
