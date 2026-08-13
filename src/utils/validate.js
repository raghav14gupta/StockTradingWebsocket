/**
 * Parses a raw WebSocket message string from Finnhub.
 * Never throws. Returns [] on any parsing or validation failure.
 * @param {string} rawString
 * @returns {{ price: number, volume: number, timestamp: number }[]}
 */
export function parseTradeMessage(rawString) {
  let msg;
  try {
    msg = JSON.parse(rawString);
  } catch {
    return [];
  }

  if (!msg || typeof msg !== 'object') return [];
  if (msg.type !== 'trade') return [];
  if (!Array.isArray(msg.data)) return [];

  const trades = [];
  for (const item of msg.data) {
    const { p, v, t } = item;
    if (!Number.isFinite(p) || !Number.isFinite(v) || !Number.isFinite(t)) {
      continue;
    }
    trades.push({ price: p, volume: v, timestamp: t });
  }
  return trades;
}
