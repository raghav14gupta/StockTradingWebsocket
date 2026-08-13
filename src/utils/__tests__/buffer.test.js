import { pushCapped, toChartPoints } from '../buffer';

describe('pushCapped', () => {
  it('should keep all elements when total length is under or equal to max', () => {
    const array = [1, 2, 3];
    const items = [4, 5];
    const max = 5;

    const result = pushCapped(array, items, max);
    expect(result).toEqual([1, 2, 3, 4, 5]);
    expect(result).not.toBe(array); // returns NEW array
  });

  it('should drop oldest elements when total length is over max', () => {
    const array = [1, 2, 3];
    const items = [4, 5];
    const max = 4;

    const result = pushCapped(array, items, max);
    expect(result).toEqual([2, 3, 4, 5]);
  });

  it('should return a new array even if capped', () => {
    const array = [1, 2];
    const items = [];
    const max = 5;

    const result = pushCapped(array, items, max);
    expect(result).toEqual([1, 2]);
    expect(result).not.toBe(array);
  });
});

describe('toChartPoints', () => {
  it('should map the first item to flat', () => {
    const trades = [
      { price: 43350.5, volume: 0.012, timestamp: 1784230150716 },
    ];

    const result = toChartPoints(trades);
    expect(result[0].direction).toBe('flat');
  });

  it('should map higher price to up, lower to down, and equal to flat', () => {
    const trades = [
      { price: 100, volume: 1, timestamp: 1 },
      { price: 105, volume: 1, timestamp: 2 }, // higher -> up
      { price: 105, volume: 1, timestamp: 3 }, // equal -> flat
      { price: 102, volume: 1, timestamp: 4 }, // lower -> down
      { price: 102, volume: 1, timestamp: 5 }, // equal -> flat
      { price: 103, volume: 1, timestamp: 6 }, // higher -> up
    ];

    const result = toChartPoints(trades);

    expect(result.map(r => r.direction)).toEqual([
      'flat',
      'up',
      'flat',
      'down',
      'flat',
      'up',
    ]);
  });
});
