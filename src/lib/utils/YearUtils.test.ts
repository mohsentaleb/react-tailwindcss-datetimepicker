import { describe, expect, it } from 'vitest';
import { createYears } from './YearUtils';

describe('createYears', () => {
  it('starts from current year and ends at 1900 by default (descending)', () => {
    const years = createYears();
    const currentYear = new Date().getFullYear();
    expect(years[0]).toBe(currentYear);
    expect(years[years.length - 1]).toBe(1900);
  });

  it('generates years in descending order by default', () => {
    const years = createYears([2020, 2023]);
    expect(years).toEqual([2023, 2022, 2021, 2020]);
  });

  it('generates years in ascending order when descendingYears=false', () => {
    const years = createYears([2020, 2023], false);
    expect(years).toEqual([2020, 2021, 2022, 2023]);
  });

  it('generates a single year when start equals end', () => {
    const years = createYears([2024, 2024]);
    expect(years).toEqual([2024]);
  });

  it('respects custom year range', () => {
    const years = createYears([2000, 2002]);
    expect(years).toHaveLength(3);
    expect(years[0]).toBe(2002);
    expect(years[2]).toBe(2000);
  });
});
