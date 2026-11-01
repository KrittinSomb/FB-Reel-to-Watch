import { describe, it, expect, beforeEach } from 'vitest';
import { rewriteReelHref, isExtensionActive } from '../main-world.iife';

describe('isExtensionActive', () => {
  beforeEach(() => {
    delete document.documentElement.dataset.fbReelToWatch;
  });

  it('should return false if dataset is undefined', () => {
    expect(isExtensionActive()).toBe(false);
  });

  it('should return false if dataset is "false"', () => {
    document.documentElement.dataset.fbReelToWatch = 'false';
    expect(isExtensionActive()).toBe(false);
  });

  it('should return true ONLY if dataset is explicitly "true"', () => {
    document.documentElement.dataset.fbReelToWatch = 'true';
    expect(isExtensionActive()).toBe(true);
  });
});

describe('rewriteReelHref', () => {
  it('should rewrite a standard reel URL to watch URL', () => {
    const input = 'https://www.facebook.com/reel/123456789';
    const result = rewriteReelHref(input);
    expect(result).toBe('https://www.facebook.com/watch/?v=123456789');
  });

  it('should rewrite reel URL with trailing slash', () => {
    const input = 'https://www.facebook.com/reel/123456789/';
    const result = rewriteReelHref(input);
    expect(result).toBe('https://www.facebook.com/watch/?v=123456789');
  });

  it('should rewrite plural reels URL (/reels/)', () => {
    const input = 'https://www.facebook.com/reels/123456789';
    const result = rewriteReelHref(input);
    expect(result).toBe('https://www.facebook.com/watch/?v=123456789');
  });

  it('should rewrite facebook share/r/ URL', () => {
    const input = 'https://www.facebook.com/share/r/123456789/';
    const result = rewriteReelHref(input);
    expect(result).toBe('https://www.facebook.com/watch/?v=123456789');
  });

  it('should rewrite reel URL on web.facebook.com', () => {
    const input = 'https://web.facebook.com/reel/987654321';
    const result = rewriteReelHref(input);
    expect(result).toBe('https://web.facebook.com/watch/?v=987654321');
  });

  it('should rewrite reel URL on m.facebook.com', () => {
    const input = 'https://m.facebook.com/reel/111222333';
    const result = rewriteReelHref(input);
    expect(result).toBe('https://m.facebook.com/watch/?v=111222333');
  });

  it('should rewrite reel URL and preserve query parameters', () => {
    const input = 'https://www.facebook.com/reel/123456?ref=watch';
    const result = rewriteReelHref(input);
    expect(result).toContain('/watch/');
    expect(result).toContain('v=123456');
    expect(result).toContain('ref=watch');
  });

  it('should rewrite relative reel URLs', () => {
    const input = '/reel/123456789';
    const result = rewriteReelHref(input);
    expect(result).toBe('/watch/?v=123456789');
  });

  it('should return null for non-reel URLs', () => {
    expect(rewriteReelHref('https://www.facebook.com/watch/?v=123')).toBeNull();
    expect(rewriteReelHref('https://www.facebook.com/profile')).toBeNull();
    expect(rewriteReelHref('https://www.facebook.com/groups/123')).toBeNull();
    expect(rewriteReelHref('https://www.facebook.com/')).toBeNull();
  });

  it('should return null for empty string', () => {
    expect(rewriteReelHref('')).toBeNull();
  });

  it('should handle reel URLs embedded in a user profile path', () => {
    const input = 'https://www.facebook.com/user123/reel/456789';
    const result = rewriteReelHref(input);
    expect(result).toBe('https://www.facebook.com/watch/?v=456789');
  });
});
