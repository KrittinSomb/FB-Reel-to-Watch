import { useEffect, useState } from 'react';
import './index.css';

function App() {
  const [enabled, setEnabled] = useState(true);
  const [loading, setLoading] = useState(true);

  // Load initial state from chrome.storage.local
  useEffect(() => {
    chrome.storage.local.get({ isEnabled: true }, (result) => {
      setEnabled(Boolean(result.isEnabled ?? true));
      setLoading(false);
    });
  }, []);

  // Toggle handler — sync to storage
  const handleToggle = () => {
    const newValue = !enabled;
    setEnabled(newValue);
    chrome.storage.local.set({ isEnabled: newValue });
  };

  return (
    <div className="p-5 flex flex-col items-center gap-4 select-none">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="text-3xl">🎬</div>
        <div>
          <h1 className="text-lg font-bold text-fb-text leading-tight">
            FB Reel to Watch
          </h1>
          <p className="text-xs text-fb-text-secondary">
            Redirect Reels → Classic Watch Player
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-fb-hover" />

      {/* Toggle Section */}
      <div className="w-full flex items-center justify-between rounded-xl bg-fb-card px-4 py-3">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-fb-text">
            Extension {enabled ? 'Active' : 'Inactive'}
          </span>
          <span className="text-xs text-fb-text-secondary">
            {enabled
              ? 'Reels will open in Watch player'
              : 'Reels will open normally'}
          </span>
        </div>

        {/* Toggle Switch */}
        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          aria-label="Toggle extension"
          disabled={loading}
          onClick={handleToggle}
          className={`
            relative inline-flex h-7 w-12 shrink-0 cursor-pointer
            rounded-full border-2 border-transparent
            transition-colors duration-200 ease-in-out
            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fb-blue
            disabled:opacity-50 disabled:cursor-not-allowed
            ${enabled ? 'bg-fb-green' : 'bg-fb-hover'}
          `}
        >
          <span
            className={`
              pointer-events-none inline-block h-6 w-6
              rounded-full bg-white shadow-lg
              ring-0 transition-transform duration-200 ease-in-out
              ${enabled ? 'translate-x-5' : 'translate-x-0'}
            `}
          />
        </button>
      </div>

      {/* Status Badge */}
      <div
        className={`
          flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium
          transition-colors duration-200
          ${enabled
            ? 'bg-fb-green/15 text-fb-green'
            : 'bg-fb-red/15 text-fb-red'}
        `}
      >
        <span
          className={`
            inline-block w-2 h-2 rounded-full
            ${enabled ? 'bg-fb-green animate-pulse' : 'bg-fb-red'}
          `}
        />
        {enabled ? 'Monitoring Facebook links' : 'Extension is paused'}
      </div>

      {/* Footer */}
      <p className="text-[10px] text-fb-text-secondary/60 mt-1">
        v1.0.0 • Works on facebook.com
      </p>
    </div>
  );
}

export default App;
