/**
 * Appends `items` to `array` and returns a NEW array capped to the last `max` elements.
 * Never mutates the original array.
 * @param {any[]} array
 * @param {any[]} items
 * @param {number} max
 * @returns {any[]}
 */
export function pushCapped(array, items, max) {
  const combined = [...array, ...items];
  return combined.slice(-max);
}

/**
 * Maps a flat array of trade objects to chart points by computing the
 * price direction relative to the previous item.
 * direction: 'up' | 'down' | 'flat'
 * @param {{ price: number, volume: number, timestamp: number }[]} trades
 * @returns {{ price: number, volume: number, timestamp: number, direction: string }[]}
 */
export function toChartPoints(trades) {
  return trades.map((trade, index) => {
    let direction;
    if (index === 0) {
      direction = 'flat';
    } else if (trade.price > trades[index - 1].price) {
      direction = 'up';
    } else if (trade.price < trades[index - 1].price) {
      direction = 'down';
    } else {
      direction = 'flat';
    }
    return { ...trade, direction };
  });
}
