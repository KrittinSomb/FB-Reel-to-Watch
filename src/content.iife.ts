/**
 * FB Reel to Watch — Isolated World Script
 *
 * Runs in the ISOLATED world with access to chrome.storage.
 * Synchronizes the extension's `isEnabled` state to `document.documentElement.dataset`
 * so the MAIN world script can read it synchronously with zero latency.
 */

function updateEnabledState(enabled: boolean): void {
  try {
    document.documentElement.dataset.fbReelToWatch = enabled ? 'true' : 'false';
  } catch {
    // Ignore if documentElement is not yet available
  }
}

// Read initial state
chrome.storage.local.get({ isEnabled: true }, (result) => {
  updateEnabledState(Boolean(result.isEnabled ?? true));
});

// Sync changes when user toggles in popup
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'local' && changes.isEnabled !== undefined) {
    updateEnabledState(Boolean(changes.isEnabled.newValue));
  }
});

// Set default immediately
updateEnabledState(true);
