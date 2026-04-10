/**
 * Phone number validation utilities
 */

export interface PhoneValidationResult {
  valid: boolean;
  value?: string;
  normalized?: string;
  error?: string;
}

/** @deprecated Use PhoneValidationResult instead */
export type ValidationResult = PhoneValidationResult;

export interface PhoneValidationOptions {
  countryCode?: string;
  strict?: boolean;
}

// E.164 format: +[country code][number], 8-15 digits total
const E164_REGEX = /^\+[1-9]\d{7,14}$/;

// Loose format: allows spaces, dashes, parentheses
const LOOSE_REGEX = /^\+?\(?[0-9]{1,4}\)?[-\s./0-9]{6,14}[0-9]$/;

export function validatePhone(input: string, opts: PhoneValidationOptions = {}): PhoneValidationResult {
  const { strict = false } = opts;

  if (!input || typeof input !== 'string') {
    return { valid: false, error: 'Phone number must be a non-empty string' };
  }

  const trimmed = input.trim();
  const digits = trimmed.replace(/\D/g, '');

  if (digits.length < 7) {
    return { valid: false, error: 'Phone number is too short' };
  }

  if (digits.length > 15) {
    return { valid: false, error: 'Phone number exceeds maximum length' };
  }

  if (strict && !E164_REGEX.test(trimmed)) {
    return { valid: false, error: 'Phone number must be in E.164 format (e.g. +14155552671)' };
  }

  if (!strict && !LOOSE_REGEX.test(trimmed)) {
    return { valid: false, error: 'Invalid phone number format' };
  }

  return { valid: true, value: digits, normalized: digits };
}

export function formatPhoneUS(digits: string): string {
  const d = digits.replace(/\D/g, '');
  if (d.length === 10) return `(${d.slice(0,3)}) ${d.slice(3,6)}-${d.slice(6)}`;
  if (d.length === 11 && d[0] === '1') return `+1 (${d.slice(1,4)}) ${d.slice(4,7)}-${d.slice(7)}`;
  return d;
}
