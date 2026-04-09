/**
 * Email validation utilities
 */

export interface EmailValidationResult {
  valid: boolean;
  error?: string;
}

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

export function validateEmail(email: string): EmailValidationResult {
  if (!email || typeof email !== 'string') {
    return { valid: false, error: 'Email must be a non-empty string' };
  }
  const trimmed = email.trim();
  if (trimmed.length > 254) {
    return { valid: false, error: 'Email address exceeds maximum length of 254 characters' };
  }
  const [local, ...domainParts] = trimmed.split('@');
  if (domainParts.length !== 1) {
    return { valid: false, error: 'Email must contain exactly one @ symbol' };
  }
  if (local.length > 64) {
    return { valid: false, error: 'Local part of email exceeds 64 characters' };
  }
  if (!EMAIL_REGEX.test(trimmed)) {
    return { valid: false, error: 'Invalid email format' };
  }
  return { valid: true };
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function extractDomain(email: string): string | null {
  const result = validateEmail(email);
  if (!result.valid) return null;
  const parts = email.trim().split('@');
  return parts[1].toLowerCase();
}
