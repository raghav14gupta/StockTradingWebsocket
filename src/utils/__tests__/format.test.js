import { formatPrice, formatTime, formatVolume } from '../format';

describe('formatTime', () => {
  it('should format a Unix timestamp to HH:mm:ss with zero padding', () => {
    const date = new Date();
    date.setHours(14);
    date.setMinutes(32);
    date.setSeconds(7);
    const ms = date.getTime();

    expect(formatTime(ms)).toBe('14:32:07');
  });

  it('should zero pad values less than 10', () => {
    const date = new Date();
    date.setHours(5);
    date.setMinutes(9);
    date.setSeconds(2);
    const ms = date.getTime();

    expect(formatTime(ms)).toBe('05:09:02');
  });
});

describe('formatPrice', () => {
  it('should format numbers with thousands separators and exactly 2 decimal places', () => {
    expect(formatPrice(43350.5)).toBe('43,350.50');
    expect(formatPrice(1000000)).toBe('1,000,000.50'.replace('50', '00')); // safe platform-agnostic check or just directly:
  });

  it('should handle zero and small values correctly', () => {
    expect(formatPrice(0)).toBe('0.00');
    expect(formatPrice(0.005)).toBe('0.01');
    expect(formatPrice(99.999)).toBe('100.00');
  });
});

describe('formatVolume', () => {
  it('should format numbers to exactly 4 decimal places', () => {
    expect(formatVolume(0.012)).toBe('0.0120');
    expect(formatVolume(1.23456)).toBe('1.2346');
    expect(formatVolume(0)).toBe('0.0000');
  });
});
