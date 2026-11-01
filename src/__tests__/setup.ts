/**
 * Vitest setup file — mocks chrome.storage API for testing
 */
import '@testing-library/jest-dom/vitest';

// ─── Chrome Storage Mock ─────────────────────────────────────────────
const store: Record<string, unknown> = { isEnabled: true };
const changeListeners: Array<
  (changes: Record<string, chrome.storage.StorageChange>, areaName: string) => void
> = [];

const storageMock: Partial<typeof chrome.storage> = {
  local: {
    get: (
      keys: string | string[] | Record<string, unknown> | null,
      callback?: (items: Record<string, unknown>) => void,
    ) => {
      const defaults = typeof keys === 'object' && keys !== null && !Array.isArray(keys)
        ? keys
        : {};
      const result: Record<string, unknown> = {};
      for (const [key, defaultValue] of Object.entries(defaults as Record<string, unknown>)) {
        result[key] = store[key] !== undefined ? store[key] : defaultValue;
      }
      callback?.(result);
      return Promise.resolve(result);
    },
    set: (items: Record<string, unknown>, callback?: () => void) => {
      const changes: Record<string, chrome.storage.StorageChange> = {};
      for (const [key, value] of Object.entries(items)) {
        changes[key] = { oldValue: store[key], newValue: value };
        store[key] = value;
      }
      // Notify listeners
      for (const listener of changeListeners) {
        listener(changes, 'local');
      }
      callback?.();
      return Promise.resolve();
    },
    // Minimal stubs for the rest of the StorageArea interface
    remove: () => Promise.resolve(),
    clear: () => Promise.resolve(),
    getBytesInUse: () => Promise.resolve(0),
    setAccessLevel: () => Promise.resolve(),
    onChanged: { addListener: () => {}, removeListener: () => {}, hasListener: () => false, hasListeners: () => false, addRules: () => Promise.resolve(), getRules: () => Promise.resolve([]), removeRules: () => Promise.resolve() },
    QUOTA_BYTES: 5242880,
  } as unknown as chrome.storage.LocalStorageArea,
  onChanged: {
    addListener: (fn: (changes: Record<string, chrome.storage.StorageChange>, areaName: string) => void) => {
      changeListeners.push(fn);
    },
    removeListener: () => {},
    hasListener: () => false,
    hasListeners: () => false,
    addRules: () => Promise.resolve(),
    getRules: () => Promise.resolve([]),
    removeRules: () => Promise.resolve(),
  } as unknown as typeof chrome.storage.onChanged,
};

// Attach to global
(globalThis as Record<string, unknown>).chrome = {
  storage: storageMock,
};
