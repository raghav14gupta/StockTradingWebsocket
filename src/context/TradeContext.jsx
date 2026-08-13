import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AppState } from 'react-native';

import {
  CONNECTION_STATUS,
  MAX_CHART_POINTS,
  MAX_HISTORY_ROWS,
  THROTTLE_MS,
} from '../config/constants';
import FinnhubSocket from '../services/websocket/FinnhubSocket';
import { pushCapped, toChartPoints } from '../utils/buffer';

const TradeContext = createContext(null);

export function TradeProvider({ children }) {
  const bufferRef = useRef([]);
  const socketRef = useRef(null);
  const appStateRef = useRef(AppState.currentState);

  const [chartPoints, setChartPoints] = useState([]);
  const [historyRows, setHistoryRows] = useState([]);
  const [status, setStatus] = useState(CONNECTION_STATUS.CONNECTING);

  useEffect(() => {
    const socket = new FinnhubSocket({
      onTrades: (trades) => {
        bufferRef.current.push(...trades);
      },
      onStatus: setStatus,
    });
    socketRef.current = socket;
    socket.connect();

    const interval = setInterval(() => {
      if (bufferRef.current.length === 0) return;

      const batch = bufferRef.current;
      bufferRef.current = [];

      setChartPoints(prev =>
        toChartPoints(pushCapped(prev, batch, MAX_CHART_POINTS)),
      );
      setHistoryRows(prev => pushCapped(prev, batch, MAX_HISTORY_ROWS));
    }, THROTTLE_MS);

    // App background/foreground handle karne ke liye listener
    const handleAppStateChange = (nextAppState) => {
      const wasActive = appStateRef.current === 'active';
      const isNowActive = nextAppState === 'active';

      if (wasActive && !isNowActive) {
        // App background me gaya -> Connection stop karo data + battery save karne ke liye
        socketRef.current?.close();
      } else if (!wasActive && isNowActive) {
        // App active state me aaya -> reconnect
        socketRef.current?.connect();
      }
      appStateRef.current = nextAppState;
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
      clearInterval(interval);
      socket.close();
    };
  }, []);

  const value = useMemo(
    () => ({ chartPoints, historyRows, status }),
    [chartPoints, historyRows, status],
  );

  return (
    <TradeContext.Provider value={value}>{children}</TradeContext.Provider>
  );
}

export function useTrades() {
  const ctx = useContext(TradeContext);
  if (!ctx) {
    throw new Error('useTrades must be used within TradeProvider');
  }
  return ctx;
}
