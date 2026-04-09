import { validatePhone, formatPhoneUS } from '../validators/phone';

describe('validatePhone', () => {
  it('accepts valid phone numbers', () => {
    expect(validatePhone('+14155552671').valid).toBe(true);
    expect(validatePhone('(415) 555-2671').valid).toBe(true);
    expect(validatePhone('415-555-2671').valid).toBe(true);
  });

  it('rejects too-short numbers', () => {
    expect(validatePhone('123').valid).toBe(false);
  });

  it('rejects too-long numbers', () => {
    expect(validatePhone('1234567890123456').valid).toBe(false);
  });

  it('enforces E.164 in strict mode', () => {
    expect(validatePhone('415-555-2671', { strict: true }).valid).toBe(false);
    expect(validatePhone('+14155552671', { strict: true }).valid).toBe(true);
  });
});

describe('formatPhoneUS', () => {
  it('formats 10-digit numbers', () => {
    expect(formatPhoneUS('4155552671')).toBe('(415) 555-2671');
  });

  it('formats 11-digit numbers with country code 1', () => {
    expect(formatPhoneUS('14155552671')).toBe('+1 (415) 555-2671');
  });
});
