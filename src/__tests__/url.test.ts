import { validateUrl, extractQueryParams, buildUrl } from '../validators/url';

describe('validateUrl', () => {
  it('accepts valid HTTPS URLs', () => {
    expect(validateUrl('https://example.com').valid).toBe(true);
    expect(validateUrl('https://sub.domain.org/path?q=1').valid).toBe(true);
  });

  it('rejects HTTP when not in allowed protocols', () => {
    const result = validateUrl('http://example.com', { protocols: ['https'] });
    expect(result.valid).toBe(false);
    expect(result.error).toContain('Protocol');
  });

  it('rejects localhost by default', () => {
    expect(validateUrl('https://localhost:3000').valid).toBe(false);
  });

  it('allows localhost when configured', () => {
    expect(validateUrl('https://localhost:3000', { allowLocalhost: true }).valid).toBe(true);
  });

  it('rejects private IP addresses', () => {
    expect(validateUrl('https://192.168.1.1/api').valid).toBe(false);
    expect(validateUrl('https://10.0.0.1/api').valid).toBe(false);
  });

  it('allows public addresses that start with private-looking prefixes', () => {
    expect(validateUrl('https://10.example.com').valid).toBe(true);
    expect(validateUrl('https://172.16.example.com').valid).toBe(true);
  });

  it('rejects malformed URLs', () => {
    expect(validateUrl('not-a-url').valid).toBe(false);
    expect(validateUrl('').valid).toBe(false);
  });
});

describe('extractQueryParams', () => {
  it('extracts query parameters as a plain object', () => {
    const params = extractQueryParams('https://example.com?foo=1&bar=hello');
    expect(params).toEqual({ foo: '1', bar: 'hello' });
  });

  it('returns empty object for invalid URL', () => {
    expect(extractQueryParams('not-a-url')).toEqual({});
  });
});

describe('buildUrl', () => {
  it('appends query parameters to a base URL', () => {
    const url = buildUrl('https://api.example.com/search', { q: 'typescript', page: '2' });
    expect(url).toContain('q=typescript');
    expect(url).toContain('page=2');
  });
});
