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

/**
 * Validates a string based on the provided options.
 *
 * @param input - The value to validate, which should be a string.
 * @param opts - Validation options such as minLength, maxLength, pattern, trim, and required.
 * @returns An object containing a `valid` boolean, the processed `value` if valid, and an `error` string if not.
 */
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

/**
 * Sanitizes a string by escaping HTML characters (&, <, >, ", ').
 *
 * @param input - The string to sanitize.
 * @returns The sanitized string with HTML entities.
 */
export function sanitizeString(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

/**
 * Converts a string into a URL-friendly slug.
 *
 * @param input - The string to slugify.
 * @returns The slugified string.
 */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
