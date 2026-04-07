/**
 * Numeric field validation utilities
 */

export interface NumberValidationOptions {
  min?: number;
  max?: number;
  integer?: boolean;
  positive?: boolean;
}

export interface ValidationResult {
  valid: boolean;
  value?: number;
  error?: string;
}

/**
 * Validates a number based on the provided options.
 *
 * @param input - The value to validate, which can be a number or a string that parses to a number.
 * @param opts - Validation options such as min, max, integer, and positive.
 * @returns An object containing a `valid` boolean, the parsed `value` if valid, and an `error` string if not.
 */
export function validateNumber(input: unknown, opts: NumberValidationOptions = {}): ValidationResult {
  const { min = -Infinity, max = Infinity, integer = false, positive = false } = opts;

  const n = typeof input === 'string' ? parseFloat(input) : Number(input);

  if (isNaN(n) || !isFinite(n)) {
    return { valid: false, error: 'Expected a valid number' };
  }

  if (integer && !Number.isInteger(n)) {
    return { valid: false, error: 'Expected an integer value' };
  }

  if (positive && n <= 0) {
    return { valid: false, error: 'Expected a positive number' };
  }

  if (n < min) {
    return { valid: false, error: `Minimum value is ${min}` };
  }

  if (n > max) {
    return { valid: false, error: `Maximum value is ${max}` };
  }

  return { valid: true, value: n };
}

/**
 * Clamps a number within the inclusive range specified by the lower and upper bounds.
 *
 * @param value - The number to clamp.
 * @param min - The minimum allowed value.
 * @param max - The maximum allowed value.
 * @returns The clamped number.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
