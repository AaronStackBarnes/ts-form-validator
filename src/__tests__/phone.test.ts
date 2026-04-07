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

  it('rejects invalid inputs', () => {
    // @ts-ignore testing invalid input type
    expect(validatePhone(null).valid).toBe(false);
  });

  it('rejects invalid loose format when strict=false', () => {
    expect(validatePhone('not a phone number!1234567').valid).toBe(false);
  });
});

describe('formatPhoneUS', () => {
  it('formats 10-digit numbers', () => {
    expect(formatPhoneUS('4155552671')).toBe('(415) 555-2671');
  });

  it('formats 11-digit numbers with country code 1', () => {
    expect(formatPhoneUS('14155552671')).toBe('+1 (415) 555-2671');
  });

  it('returns raw digits if length is not 10 or 11 starting with 1', () => {
    expect(formatPhoneUS('12345')).toBe('12345');
    expect(formatPhoneUS('24155552671')).toBe('24155552671');
  });
});
