import { FINNHUB_WS_URL } from '../../config/env';
import {
  BACKOFF_BASE_MS,
  BACKOFF_MAX_MS,
  CONNECTION_STATUS,
  SYMBOL,
} from '../../config/constants';
import { parseTradeMessage } from '../../utils/validate';

/**
 * Manages a Finnhub WebSocket connection.
 * Pure JS class — ZERO React / React Native imports.
 * Communicates exclusively via callbacks.
 */
export default class FinnhubSocket {
  /**
   * @param {{ onTrades: (trades: object[]) => void, onStatus: (status: string) => void }} callbacks
   */
  constructor({ onTrades, onStatus }) {
    this.onTrades = onTrades;
    this.onStatus = onStatus;
    this.ws = null;
    this.manualClose = false;
    this.attempt = 0;
    this.timer = null;
  }

  connect() {
    // Purane timer aur socket ko clean up karo to prevent duplicate connections
    this.cleanup();
    this.manualClose = false;

    this.onStatus(CONNECTION_STATUS.CONNECTING);
    this.ws = new WebSocket(FINNHUB_WS_URL);

    this.ws.onopen = () => {
      this.attempt = 0;
      this.ws.send(JSON.stringify({ type: 'subscribe', symbol: SYMBOL }));
      this.onStatus(CONNECTION_STATUS.CONNECTED);
    };

    this.ws.onmessage = (e) => {
      const trades = parseTradeMessage(e.data);
      if (trades.length) {
        this.onTrades(trades);
      }
    };

    this.ws.onerror = () => {
      // Swallowed silently — onclose reconnect trigger karega
    };

    this.ws.onclose = () => {
      if (this.manualClose) return;
      this.onStatus(CONNECTION_STATUS.RECONNECTING);
      this.scheduleReconnect();
    };
  }

  scheduleReconnect() {
    const delay = Math.min(BACKOFF_BASE_MS * 2 ** this.attempt, BACKOFF_MAX_MS);
    this.attempt++;
    this.timer = setTimeout(() => this.connect(), delay);
  }

  cleanup() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.ws) {
      // Listeners null karo to avoid callbacks from dead instance
      this.ws.onopen = null;
      this.ws.onmessage = null;
      this.ws.onerror = null;
      this.ws.onclose = null;
      this.ws.close();
      this.ws = null;
    }
  }

  close() {
    this.manualClose = true;
    this.cleanup();
    this.onStatus(CONNECTION_STATUS.DISCONNECTED);
  }
}
