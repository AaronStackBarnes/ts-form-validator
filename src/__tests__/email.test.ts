import { validateEmail, normalizeEmail, extractDomain } from '../validators/email';

describe('validateEmail', () => {
  it('accepts valid email addresses', () => {
    expect(validateEmail('user@example.com').valid).toBe(true);
    expect(validateEmail('user.name+tag@sub.domain.org').valid).toBe(true);
    expect(validateEmail('USER@EXAMPLE.COM').valid).toBe(true);
  });

  it('rejects missing @ symbol', () => {
    const result = validateEmail('notanemail');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('@');
  });

  it('rejects empty input', () => {
    expect(validateEmail('').valid).toBe(false);
    expect(validateEmail('   ').valid).toBe(false);
  });

  it('rejects addresses exceeding 254 chars', () => {
    const long = 'a'.repeat(250) + '@b.com';
    expect(validateEmail(long).valid).toBe(false);
  });

  it('rejects multiple @ symbols', () => {
    expect(validateEmail('a@b@c.com').valid).toBe(false);
  });

  it('rejects local part exceeding 64 characters', () => {
    const longLocal = 'a'.repeat(65) + '@example.com';
    expect(validateEmail(longLocal).valid).toBe(false);
  });

  it('rejects emails with invalid format matching missing EMAIL_REGEX coverage', () => {
    expect(validateEmail('user@').valid).toBe(false);
  });
});

describe('normalizeEmail', () => {
  it('lowercases and trims', () => {
    expect(normalizeEmail('  USER@EXAMPLE.COM  ')).toBe('user@example.com');
  });
});

describe('extractDomain', () => {
  it('returns the domain portion', () => {
    expect(extractDomain('user@example.com')).toBe('example.com');
  });

  it('returns null for invalid emails', () => {
    expect(extractDomain('invalid')).toBeNull();
  });
});
