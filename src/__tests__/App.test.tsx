import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('App (Popup UI)', () => {
  beforeEach(() => {
    // Reset storage state before each test
    chrome.storage.local.set({ isEnabled: true });
  });

  it('should render the extension title', () => {
    render(<App />);
    expect(screen.getByText('FB Reel to Watch')).toBeInTheDocument();
  });

  it('should render the subtitle', () => {
    render(<App />);
    expect(
      screen.getByText('Redirect Reels → Classic Watch Player'),
    ).toBeInTheDocument();
  });

  it('should render the toggle switch', () => {
    render(<App />);
    const toggle = screen.getByRole('switch');
    expect(toggle).toBeInTheDocument();
  });

  it('should show "Active" state when enabled', async () => {
    render(<App />);
    // Wait for storage to load
    const activeText = await screen.findByText('Extension Active');
    expect(activeText).toBeInTheDocument();
  });

  it('should toggle to "Inactive" when clicked', async () => {
    render(<App />);
    const toggle = await screen.findByRole('switch');

    // Should start enabled
    expect(toggle).toHaveAttribute('aria-checked', 'true');

    // Click to disable
    fireEvent.click(toggle);

    expect(toggle).toHaveAttribute('aria-checked', 'false');
    expect(screen.getByText('Extension Inactive')).toBeInTheDocument();
    expect(screen.getByText('Reels will open normally')).toBeInTheDocument();
  });

  it('should toggle back to "Active" when clicked twice', async () => {
    render(<App />);
    const toggle = await screen.findByRole('switch');

    fireEvent.click(toggle); // OFF
    fireEvent.click(toggle); // ON

    expect(toggle).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByText('Extension Active')).toBeInTheDocument();
  });

  it('should sync toggle state to chrome.storage.local', async () => {
    render(<App />);
    const toggle = await screen.findByRole('switch');

    fireEvent.click(toggle); // Disable

    // Verify storage was updated
    return new Promise<void>((resolve) => {
      chrome.storage.local.get({ isEnabled: true }, (result) => {
        expect(result.isEnabled).toBe(false);
        resolve();
      });
    });
  });

  it('should render the version text', () => {
    render(<App />);
    expect(screen.getByText(/v1\.0\.0/)).toBeInTheDocument();
  });
});
