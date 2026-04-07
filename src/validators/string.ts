/**
 * String field validation utilities
 */

export interface StringValidationOptions {
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  trim?: boolean;
  required?: boolean;
}

export interface ValidationResult {
  valid: boolean;
  value?: string;
  error?: string;
}

export function validateString(input: unknown, opts: StringValidationOptions = {}): ValidationResult {
  const { minLength = 0, maxLength = Infinity, pattern, trim = true, required = true } = opts;

  if (input === null || input === undefined || input === '') {
    if (required) return { valid: false, error: 'Field is required' };
    return { valid: true, value: '' };
  }

  if (typeof input !== 'string') {
    return { valid: false, error: 'Expected a string value' };
  }

  const value = trim ? input.trim() : input;

  if (required && value.length === 0) {
    return { valid: false, error: 'Field cannot be blank' };
  }

  if (value.length < minLength) {
    return { valid: false, error: `Minimum length is ${minLength} characters` };
  }

  if (value.length > maxLength) {
    return { valid: false, error: `Maximum length is ${maxLength} characters` };
  }

  if (pattern && !pattern.test(value)) {
    return { valid: false, error: 'Value does not match required pattern' };
  }

  return { valid: true, value };
}

export function sanitizeString(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
