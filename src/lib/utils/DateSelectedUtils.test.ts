import { describe, expect, it } from 'vitest';
import { beforeMinDate, datePicked, pastMaxDate } from './DateSelectedUtils';

describe('pastMaxDate', () => {
  it('returns false when maxDate is undefined', () => {
    expect(pastMaxDate(new Date('2024-06-15'), undefined)).toBe(false);
  });

  it('returns false when date is before maxDate (day mode)', () => {
    expect(pastMaxDate(new Date('2024-06-14'), new Date('2024-06-15'))).toBe(false);
  });

  it('returns false when date equals maxDate (day mode)', () => {
    expect(pastMaxDate(new Date('2024-06-15'), new Date('2024-06-15'))).toBe(false);
  });

  it('returns true when date is after maxDate (day mode)', () => {
    expect(pastMaxDate(new Date('2024-06-16'), new Date('2024-06-15'))).toBe(true);
  });

  it('returns true when date is after maxDate by time (minute mode)', () => {
    const maxDate = new Date('2024-06-15T12:00:00');
    const current = new Date('2024-06-15T12:01:00');
    expect(pastMaxDate(current, maxDate, true)).toBe(true);
  });

  it('returns false when date is before maxDate by time (minute mode)', () => {
    const maxDate = new Date('2024-06-15T12:00:00');
    const current = new Date('2024-06-15T11:59:00');
    expect(pastMaxDate(current, maxDate, true)).toBe(false);
  });
});

describe('beforeMinDate', () => {
  it('returns false when minDate is undefined', () => {
    expect(beforeMinDate(new Date('2024-06-15'), undefined)).toBe(false);
  });

  it('returns false when date is after minDate (day mode)', () => {
    expect(beforeMinDate(new Date('2024-06-16'), new Date('2024-06-15'))).toBe(false);
  });

  it('returns false when date equals minDate (day mode)', () => {
    expect(beforeMinDate(new Date('2024-06-15'), new Date('2024-06-15'))).toBe(false);
  });

  it('returns true when date is before minDate (day mode)', () => {
    expect(beforeMinDate(new Date('2024-06-14'), new Date('2024-06-15'))).toBe(true);
  });

  it('returns true when date is before minDate by time (minute mode)', () => {
    const minDate = new Date('2024-06-15T10:00:00');
    const current = new Date('2024-06-15T09:59:00');
    expect(beforeMinDate(current, minDate, true)).toBe(true);
  });
});

describe('datePicked', () => {
  const start = new Date('2024-06-01T08:00:00');
  const end = new Date('2024-06-15T08:00:00');

  it('returns unchanged dates when new start date is after end (non-smart mode)', () => {
    const newDate = new Date('2024-06-20');
    const result = datePicked(start, end, newDate, true, false);
    expect(result.startDate).toEqual(start);
    expect(result.endDate).toEqual(end);
  });

  it('sets new start date when it is before end', () => {
    const newDate = new Date('2024-06-05');
    const result = datePicked(start, end, newDate, true, false);
    expect(result.startDate).toEqual(newDate);
    expect(result.endDate).toEqual(end);
  });

  it('sets new end date when it is after start', () => {
    const newDate = new Date('2024-06-20');
    const result = datePicked(start, end, newDate, false, false);
    expect(result.startDate).toEqual(start);
    expect(result.endDate).toEqual(newDate);
  });

  it('adjusts end to next day in smart mode when new start is after end', () => {
    const newDate = new Date('2024-06-20');
    const result = datePicked(start, end, newDate, true, true);
    expect(result.startDate).toEqual(newDate);
    expect(result.endDate.getDate()).toBe(21);
  });
});
