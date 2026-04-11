import { validateURL, isValidURL, normalizeURL } from '../validators/url';

describe('URL Validator', () => {
  describe('isValidURL', () => {
    test('should return true for valid HTTP URLs', () => {
      expect(isValidURL('http://example.com')).toBe(true);
      expect(isValidURL('https://google.com/search?q=test')).toBe(true);
    });

    test('should return true for valid IPv4 URLs', () => {
      expect(isValidURL('http://127.0.0.1')).toBe(true);
      expect(isValidURL('https://192.168.1.1:8080')).toBe(true);
    });

    test('should return true for valid bracketed IPv6 URLs', () => {
      expect(isValidURL('http://[2001:db8:3333:4444:5555:6666:7777:8888]')).toBe(true);
      expect(isValidURL('https://[::1]:3000')).toBe(true);
    });

    test('should return true for raw IPv6 addresses (with normalization)', () => {
      expect(isValidURL('2001:db8:3333:4444:5555:6666:7777:8888')).toBe(true);
      expect(isValidURL('::1')).toBe(true);
    });

    test('should return false for unsupported protocols', () => {
      expect(isValidURL('ftp://example.com')).toBe(false);
      expect(isValidURL('mailto:user@example.com')).toBe(false);
    });

    test('should return false for invalid strings', () => {
      expect(isValidURL('')).toBe(false);
      expect(isValidURL('not-a-url')).toBe(false);
      expect(isValidURL('http://')).toBe(false);
    });
  });

  describe('normalizeURL', () => {
    test('should add https protocol if missing', () => {
      expect(normalizeURL('example.com')).toBe('https://example.com');
    });

    test('should not add protocol if one already exists', () => {
      expect(normalizeURL('http://example.com')).toBe('http://example.com');
      expect(normalizeURL('ftp://example.com')).toBe('ftp://example.com');
    });

    test('should wrap raw IPv6 addresses in brackets', () => {
      expect(normalizeURL('2001:db8::1')).toBe('https://[2001:db8::1]');
      expect(normalizeURL('::1')).toBe('https://[::1]');
    });

    test('should not wrap already bracketed IPv6 addresses', () => {
      expect(normalizeURL('[::1]')).toBe('https://[::1]');
      expect(normalizeURL('http://[::1]')).toBe('http://[::1]');
    });

    test('should trim the input', () => {
      expect(normalizeURL('  https://example.com  ')).toBe('https://example.com');
    });
  });

  describe('validateURL', () => {
    test('should return a valid result for valid URLs', () => {
      const result = validateURL('https://example.com');
      expect(result.valid).toBe(true);
      expect(result.value).toBe('https://example.com/');
    });

    test('should return an error for invalid URLs', () => {
      const result = validateURL('not-a-url');
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Invalid URL format');
    });

    test('should return an error for non-string input', () => {
      const result = validateURL(123);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('URL must be a non-empty string');
    });
  });
});
