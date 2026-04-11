import { ValidationResult } from '../types';

/**
 * URL validation and normalization utilities
 */

/**
 * Normalizes a URL string by trimming, ensuring a protocol exists,
 * and wrapping IPv6 addresses in square brackets if needed.
 */
export function normalizeURL(url: string): string {
  if (typeof url !== 'string') return '';
  let normalized = url.trim();
  if (!normalized) return '';

  // Check if it's an IPv6 address without brackets
  // Simple check for presence of multiple colons and no brackets
  if (normalized.includes(':') && !normalized.includes('[') && !normalized.match(/^[a-z]+:\/\//i)) {
    // Check if it's a valid IPv6 pattern (simplified)
    const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^(([0-9a-fA-F]{1,4}:){0,7}[0-9a-fA-F]{1,4})?::(([0-9a-fA-F]{1,4}:){0,7}[0-9a-fA-F]{1,4})?$/;
    if (ipv6Regex.test(normalized)) {
      normalized = `[${normalized}]`;
    }
  }

  if (!normalized.match(/^[a-z]+:\/\//i)) {
    normalized = 'https://' + normalized;
  }

  return normalized;
}

/**
 * Validates a URL string and returns a ValidationResult.
 */
export function validateURL(url: unknown): ValidationResult<string> {
  if (typeof url !== 'string' || !url) {
    return { valid: false, error: 'URL must be a non-empty string' };
  }

  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return { valid: false, error: 'URL must use http or https protocol' };
    }
    // Check if the hostname has a dot or is a bracketed IPv6 or is localhost
    if (!parsed.hostname.includes('.') && !parsed.hostname.startsWith('[') && parsed.hostname !== 'localhost') {
      throw new Error('Invalid hostname');
    }
    return { valid: true, value: parsed.toString() };
  } catch (err) {
    // If it failed, try normalizing it first
    try {
      const normalized = normalizeURL(url);
      const parsed = new URL(normalized);
      if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
        return { valid: false, error: 'URL must use http or https protocol' };
      }
      if (!parsed.hostname.includes('.') && !parsed.hostname.startsWith('[') && parsed.hostname !== 'localhost') {
        return { valid: false, error: 'Invalid URL format' };
      }
      return { valid: true, value: parsed.toString() };
    } catch (innerErr) {
      return { valid: false, error: 'Invalid URL format' };
    }
  }
}

/**
 * Simple boolean check for URL validity.
 */
export function isValidURL(url: string): boolean {
  return validateURL(url).valid;
}
