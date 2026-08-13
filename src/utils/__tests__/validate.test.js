import { parseTradeMessage } from '../validate';

describe('parseTradeMessage', () => {
  it('should parse valid trade JSON into array of {price, volume, timestamp}', () => {
    const validRaw = JSON.stringify({
      type: 'trade',
      data: [
        { p: 43350.5, v: 0.012, t: 1784230150716 },
        { p: 43351.0, v: 1.5, t: 1784230150717 },
      ],
    });

    const parsed = parseTradeMessage(validRaw);
    expect(parsed).toEqual([
      { price: 43350.5, volume: 0.012, timestamp: 1784230150716 },
      { price: 43351.0, volume: 1.5, timestamp: 1784230150717 },
    ]);
  });

  it('should return empty array for invalid JSON string', () => {
    expect(parseTradeMessage('not-even-json')).toEqual([]);
    expect(parseTradeMessage('{invalid-json')).toEqual([]);
  });

  it('should return empty array for non-trade types like ping', () => {
    const pingRaw = JSON.stringify({ type: 'ping' });
    expect(parseTradeMessage(pingRaw)).toEqual([]);
  });

  it('should skip trade items with missing properties', () => {
    const raw = JSON.stringify({
      type: 'trade',
      data: [
        { v: 0.012, t: 1784230150716 }, // missing p
        { p: 43350.5, t: 1784230150716 }, // missing v
        { p: 43350.5, v: 0.012 }, // missing t
        { p: 43351.0, v: 1.5, t: 1784230150717 }, // valid
      ],
    });

    const parsed = parseTradeMessage(raw);
    expect(parsed).toEqual([
      { price: 43351.0, volume: 1.5, timestamp: 1784230150717 },
    ]);
  });

  it('should skip trade items with NaN, null, or string values', () => {
    const raw = JSON.stringify({
      type: 'trade',
      data: [
        { p: null, v: 0.012, t: 1784230150716 }, // null
        { p: '43350.5', v: 0.012, t: 1784230150716 }, // string
        { p: NaN, v: 0.012, t: 1784230150716 }, // NaN
        { p: 43351.0, v: Infinity, t: 1784230150717 }, // Infinity
        { p: 43351.0, v: 1.5, t: 1784230150717 }, // valid
      ],
    });

    const parsed = parseTradeMessage(raw);
    expect(parsed).toEqual([
      { price: 43351.0, volume: 1.5, timestamp: 1784230150717 },
    ]);
  });

  it('should never throw an exception', () => {
    expect(() => parseTradeMessage(null)).not.toThrow();
    expect(() => parseTradeMessage(undefined)).not.toThrow();
    expect(() => parseTradeMessage(123)).not.toThrow();
    expect(() => parseTradeMessage({})).not.toThrow();
  });
});
