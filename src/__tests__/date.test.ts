import { validateDate, formatDate, daysBetween, isWeekend, addDays } from '../validators/date';

describe('validateDate', () => {
  it('accepts valid date strings', () => {
    expect(validateDate('2024-01-15').valid).toBe(true);
    expect(validateDate(new Date()).valid).toBe(true);
  });

  it('rejects invalid date strings', () => {
    expect(validateDate('not-a-date').valid).toBe(false);
    expect(validateDate(null).valid).toBe(false);
  });

  it('rejects future dates when allowFuture is false', () => {
    const future = new Date(Date.now() + 86400000 * 30);
    expect(validateDate(future, { allowFuture: false }).valid).toBe(false);
  });

  it('rejects past dates when allowPast is false', () => {
    const past = new Date('2000-01-01');
    expect(validateDate(past, { allowPast: false }).valid).toBe(false);
  });

  it('respects min/max date bounds', () => {
    const date = new Date('2024-06-15');
    expect(validateDate(date, { min: '2024-07-01' }).valid).toBe(false);
    expect(validateDate(date, { max: '2024-05-01' }).valid).toBe(false);
    expect(validateDate(date, { min: '2024-01-01', max: '2024-12-31' }).valid).toBe(true);
  });
});

describe('formatDate', () => {
  const d = new Date('2024-03-15');
  it('formats as ISO by default', () => { expect(formatDate(d)).toBe('2024-03-15'); });
  it('formats as US', () => { expect(formatDate(d, 'us')).toBe('03/15/2024'); });
  it('formats as EU', () => { expect(formatDate(d, 'eu')).toBe('15/03/2024'); });
});

describe('daysBetween', () => {
  it('calculates days between two dates', () => {
    const a = new Date('2024-01-01');
    const b = new Date('2024-01-11');
    expect(daysBetween(a, b)).toBe(10);
  });
});

describe('isWeekend', () => {
  it('identifies weekends correctly', () => {
    expect(isWeekend(new Date('2024-01-06'))).toBe(true);  // Saturday
    expect(isWeekend(new Date('2024-01-07'))).toBe(true);  // Sunday
    expect(isWeekend(new Date('2024-01-08'))).toBe(false); // Monday
  });
});

describe('addDays', () => {
  it('adds days to a date', () => {
    const d = new Date('2024-01-01');
    const result = addDays(d, 5);
    expect(result.toISOString().startsWith('2024-01-06')).toBe(true);
  });
});
