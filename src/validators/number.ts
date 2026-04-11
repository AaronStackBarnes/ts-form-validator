/**
 * Numeric field validation utilities
 */
import { ValidationResult } from '../types';

export interface NumberValidationOptions {
  min?: number;
  max?: number;
  integer?: boolean;
  positive?: boolean;
}

export function validateNumber(input: unknown, opts: NumberValidationOptions = {}): ValidationResult<number> {
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

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
