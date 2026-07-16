/**
 * @typedef {Object} Trade
 * @property {number} price
 * @property {number} volume
 * @property {number} timestamp
 */

/**
 * @typedef {'up' | 'down' | 'flat'} Direction
 */

/**
 * @typedef {Object} ChartPoint
 * @property {number} price
 * @property {number} volume
 * @property {number} timestamp
 * @property {Direction} direction
 */

/**
 * @typedef {'connecting' | 'connected' | 'reconnecting' | 'disconnected'} ConnectionStatus
 */

export {};
