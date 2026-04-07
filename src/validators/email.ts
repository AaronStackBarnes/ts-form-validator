/**
 * Email validation utilities
 */

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

/**
 * Validates an email address.
 *
 * @param email - The email address to validate.
 * @returns An object containing a `valid` boolean indicating if the email is valid, and an `error` string if not.
 */
export function validateEmail(email: string): ValidationResult {
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

/**
 * Normalizes an email address by trimming whitespace and converting to lowercase.
 *
 * @param email - The email address to normalize.
 * @returns The normalized email address.
 */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/**
 * Extracts the domain from an email address.
 *
 * @param email - The email address to extract the domain from.
 * @returns The extracted domain in lowercase, or `null` if the email is invalid.
 */
export function extractDomain(email: string): string | null {
  const result = validateEmail(email);
  if (!result.valid) return null;
  const parts = email.trim().split('@');
  return parts[1].toLowerCase();
}
