import { validateNumber, clamp } from '../validators/number';

describe('validateNumber', () => {
  it('accepts valid numbers', () => {
    expect(validateNumber(42).valid).toBe(true);
    expect(validateNumber('3.14').valid).toBe(true);
  });

  it('rejects NaN and non-numeric strings', () => {
    expect(validateNumber('abc').valid).toBe(false);
    expect(validateNumber(NaN).valid).toBe(false);
  });

  it('enforces min/max bounds', () => {
    expect(validateNumber(5, { min: 10 }).valid).toBe(false);
    expect(validateNumber(15, { max: 10 }).valid).toBe(false);
    expect(validateNumber(7, { min: 1, max: 10 }).valid).toBe(true);
  });

  it('enforces integer constraint', () => {
    expect(validateNumber(3.5, { integer: true }).valid).toBe(false);
    expect(validateNumber(3, { integer: true }).valid).toBe(true);
  });

  it('enforces positive constraint', () => {
    expect(validateNumber(-1, { positive: true }).valid).toBe(false);
    expect(validateNumber(0, { positive: true }).valid).toBe(false);
    expect(validateNumber(1, { positive: true }).valid).toBe(true);
  });
});

describe('clamp', () => {
  it('clamps values to range', () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-5, 0, 10)).toBe(0);
    expect(clamp(15, 0, 10)).toBe(10);
  });
});
