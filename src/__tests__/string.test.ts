import { validateString, sanitizeString, slugify } from '../validators/string';

describe('validateString', () => {
  it('accepts valid strings', () => {
    expect(validateString('hello').valid).toBe(true);
    expect(validateString('hello').value).toBe('hello');
  });

  it('trims whitespace by default', () => {
    expect(validateString('  hello  ').value).toBe('hello');
  });

  it('respects minLength', () => {
    expect(validateString('hi', { minLength: 5 }).valid).toBe(false);
    expect(validateString('hello', { minLength: 5 }).valid).toBe(true);
  });

  it('respects maxLength', () => {
    expect(validateString('toolong', { maxLength: 4 }).valid).toBe(false);
  });

  it('enforces pattern', () => {
    const result = validateString('abc123', { pattern: /^\d+$/ });
    expect(result.valid).toBe(false);
  });

  it('allows empty when not required', () => {
    expect(validateString('', { required: false }).valid).toBe(true);
  });

  it('rejects null when required', () => {
    expect(validateString(null).valid).toBe(false);
  });

  it('rejects non-string inputs', () => {
    expect(validateString(123).valid).toBe(false);
  });

  it('rejects blank string when required', () => {
    expect(validateString('   ', { required: true }).valid).toBe(false);
  });

  it('preserves whitespace when trim is false', () => {
    const result = validateString('  hello  ', { trim: false });
    expect(result.valid).toBe(true);
    expect(result.value).toBe('  hello  ');
  });
});

describe('sanitizeString', () => {
  it('escapes HTML special characters', () => {
    expect(sanitizeString('<script>alert("xss")</script>')).toBe(
      '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
    );
  });
});

describe('slugify', () => {
  it('converts to kebab-case slug', () => {
    expect(slugify('Hello World!')).toBe('hello-world');
    expect(slugify('  TypeScript & React  ')).toBe('typescript-react');
  });
});
