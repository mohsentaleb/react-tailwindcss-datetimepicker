import { describe, expect, it } from 'vitest';
import { propValidation } from './PropValidation';
import type { ReactDateTimePickerProps } from '../ReactDateTimePicker';

const baseProps = {
  ranges: {},
  start: new Date('2024-06-01'),
  end: new Date('2024-06-30'),
  applyCallback: () => {},
  children: null,
} as unknown as ReactDateTimePickerProps;

describe('propValidation', () => {
  it('returns null (valid) when no years prop is provided', () => {
    expect(propValidation(baseProps)).toBeNull();
  });

  it('returns null when start and end are within the custom year range', () => {
    const props = { ...baseProps, years: [2020, 2030] as [number, number] };
    expect(propValidation(props)).toBeNull();
  });

  it('returns an error string when years[0] > years[1]', () => {
    const props = { ...baseProps, years: [2030, 2020] as [number, number] };
    expect(propValidation(props)).toBe('Start year must be before the end');
  });

  it('returns an error string when start year is outside the custom range', () => {
    const props = {
      ...baseProps,
      start: new Date('2015-06-01'),
      years: [2020, 2030] as [number, number],
    };
    expect(propValidation(props)).toBe('Start year should be in the custom years defined');
  });

  it('returns an error string when end year is outside the custom range', () => {
    const props = {
      ...baseProps,
      end: new Date('2035-06-01'),
      years: [2020, 2030] as [number, number],
    };
    expect(propValidation(props)).toBe('End year should be in the custom years defined');
  });
});
