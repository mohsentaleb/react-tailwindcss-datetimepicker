import { describe, expect, it } from 'vitest';
import { generateHours, generateMinutes, getFortyTwoDays, isInbetweenDates } from './TimeFunctionUtils';

describe('generateHours', () => {
  it('returns 24 entries', () => {
    expect(generateHours()).toHaveLength(24);
  });

  it('starts at 0 and ends at 23', () => {
    const hours = generateHours();
    expect(hours[0]).toBe(0);
    expect(hours[23]).toBe(23);
  });
});

describe('generateMinutes', () => {
  it('returns 60 entries', () => {
    expect(generateMinutes()).toHaveLength(60);
  });

  it('zero-pads single-digit minutes', () => {
    const minutes = generateMinutes();
    expect(minutes[0]).toBe('00');
    expect(minutes[9]).toBe('09');
    expect(minutes[10]).toBe('10');
    expect(minutes[59]).toBe('59');
  });
});

describe('getFortyTwoDays', () => {
  it('always returns exactly 42 days', () => {
    // Test multiple months including edge cases
    expect(getFortyTwoDays(0, 2024, false)).toHaveLength(42); // January
    expect(getFortyTwoDays(1, 2024, false)).toHaveLength(42); // February (leap year)
    expect(getFortyTwoDays(1, 2023, false)).toHaveLength(42); // February (non-leap)
    expect(getFortyTwoDays(11, 2024, false)).toHaveLength(42); // December
  });

  it('returns exactly 42 days with sunday-first mode', () => {
    expect(getFortyTwoDays(0, 2024, true)).toHaveLength(42);
    expect(getFortyTwoDays(6, 2025, true)).toHaveLength(42); // July 2025 starts on Tuesday
  });

  it('includes days from the correct month', () => {
    const days = getFortyTwoDays(5, 2024, false); // June 2024
    const juneDays = days.filter((d) => d.getMonth() === 5);
    expect(juneDays).toHaveLength(30); // June has 30 days
  });
});

describe('isInbetweenDates', () => {
  const start = new Date('2024-06-01');
  const end = new Date('2024-06-30');
  const middle = new Date('2024-06-15');
  const before = new Date('2024-05-31');
  const after = new Date('2024-07-01');

  describe('isStartDate=true (start param is start, end param is end)', () => {
    it('returns true for a date between start and end', () => {
      expect(isInbetweenDates(true, middle, start, end)).toBe(true);
    });

    it('returns false for start boundary (exclusive)', () => {
      expect(isInbetweenDates(true, start, start, end)).toBe(false);
    });

    it('returns false for end boundary (exclusive)', () => {
      expect(isInbetweenDates(true, end, start, end)).toBe(false);
    });

    it('returns false for a date before start', () => {
      expect(isInbetweenDates(true, before, start, end)).toBe(false);
    });

    it('returns false for a date after end', () => {
      expect(isInbetweenDates(true, after, start, end)).toBe(false);
    });
  });

  describe('isStartDate=false (params are swapped: start param=END, end param=START)', () => {
    it('returns true for a date between the two bounds', () => {
      // Caller passes (date=end, otherDate=start) so start param=end, end param=start
      expect(isInbetweenDates(false, middle, end, start)).toBe(true);
    });

    it('returns false for a date outside the bounds', () => {
      expect(isInbetweenDates(false, before, end, start)).toBe(false);
      expect(isInbetweenDates(false, after, end, start)).toBe(false);
    });
  });
});
