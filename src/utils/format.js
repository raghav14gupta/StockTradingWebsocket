/**
 * Formats a Unix-ms timestamp to 'HH:mm:ss'.
 * @param {number} ms
 * @returns {string}
 */
export function formatTime(ms) {
  const date = new Date(ms);
  const hh = String(date.getHours()).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  const ss = String(date.getSeconds()).padStart(2, '0');
  return `${hh}:${mm}:${ss}`;
}

/**
 * Formats a price number to a locale string with 2 decimal places.
 * e.g. 43350.5 → '43,350.50'
 * @param {number} n
 * @returns {string}
 */
export function formatPrice(n) {
  return n.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/**
 * Formats a volume number to 4 decimal places.
 * @param {number} n
 * @returns {string}
 */
export function formatVolume(n) {
  return n.toFixed(4);
}
