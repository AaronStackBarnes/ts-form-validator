/**
 * Date and time validation utilities
 */

export interface ValidationResult {
  valid: boolean;
  value?: Date;
  error?: string;
}

export interface DateValidationOptions {
  min?: Date | string;
  max?: Date | string;
  format?: 'iso' | 'us' | 'eu';
  allowFuture?: boolean;
  allowPast?: boolean;
}

function toDate(input: unknown): Date | null {
  if (input instanceof Date) return isNaN(input.getTime()) ? null : input;
  if (typeof input === 'string' || typeof input === 'number') {
    const d = new Date(input);
    return isNaN(d.getTime()) ? null : d;
  }
  return null;
}

export function validateDate(input: unknown, opts: DateValidationOptions = {}): ValidationResult {
  const {
    min,
    max,
    allowFuture = true,
    allowPast = true,
  } = opts;

  const date = toDate(input);

  if (!date) {
    return { valid: false, error: 'Invalid date value' };
  }

  const now = new Date();

  if (!allowFuture && date > now) {
    return { valid: false, error: 'Future dates are not permitted' };
  }

  if (!allowPast && date < now) {
    return { valid: false, error: 'Past dates are not permitted' };
  }

  if (min) {
    const minDate = toDate(min);
    if (minDate && date < minDate) {
      return { valid: false, error: `Date must not be before ${minDate.toISOString()}` };
    }
  }

  if (max) {
    const maxDate = toDate(max);
    if (maxDate && date > maxDate) {
      return { valid: false, error: `Date must not be after ${maxDate.toISOString()}` };
    }
  }

  return { valid: true, value: date };
}

export function formatDate(date: Date, format: 'iso' | 'us' | 'eu' = 'iso'): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  const y = date.getFullYear();
  const m = pad(date.getMonth() + 1);
  const d = pad(date.getDate());

  switch (format) {
    case 'us': return `${m}/${d}/${y}`;
    case 'eu': return `${d}/${m}/${y}`;
    default:   return `${y}-${m}-${d}`;
  }
}

export function daysBetween(a: Date, b: Date): number {
  const ms = Math.abs(b.getTime() - a.getTime());
  return Math.floor(ms / (1000 * 60 * 60 * 24));
}

export function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
