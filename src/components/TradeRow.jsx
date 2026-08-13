import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {
  TRADE_ROW_HEIGHT,
  TRADE_ROW_PRICE_SIZE,
  TRADE_ROW_TIME_SIZE,
  TRADE_ROW_VOLUME_SIZE,
} from '../config/constants';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { formatPrice, formatTime, formatVolume } from '../utils/format';

const ROW_BG_UP = 'rgba(0, 217, 126, 0.08)';
const ROW_BG_DOWN = 'rgba(255, 77, 77, 0.08)';

const TradeRow = React.memo(({ trade }) => {
  const { price, volume, timestamp, direction } = trade;

  let priceColor = colors.textPrimary;
  let rowBg = 'transparent';

  if (direction === 'up') {
    priceColor = colors.green;
    rowBg = ROW_BG_UP;
  } else if (direction === 'down') {
    priceColor = colors.red;
    rowBg = ROW_BG_DOWN;
  }

  const containerStyle = [styles.container, { backgroundColor: rowBg }];
  const priceStyle = [styles.price, { color: priceColor }];

  return (
    <View style={containerStyle}>
      <Text style={styles.time}>{formatTime(timestamp)}</Text>
      <Text style={priceStyle}>{formatPrice(price)}</Text>
      <Text style={styles.volume}>
        {'- '}{formatVolume(volume)}
      </Text>
    </View>
  );
});

TradeRow.displayName = 'TradeRow';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: TRADE_ROW_HEIGHT,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingHorizontal: spacing.xl,
  },
  time: {
    flex: 1,
    color: colors.textSecondary,
    fontSize: TRADE_ROW_TIME_SIZE,
    fontVariant: ['tabular-nums'],
  },
  price: {
    flex: 1,
    textAlign: 'right',
    fontSize: TRADE_ROW_PRICE_SIZE,
    fontVariant: ['tabular-nums'],
    fontWeight: '600',
  },
  volume: {
    flex: 1,
    textAlign: 'right',
    color: colors.textSecondary,
    fontSize: TRADE_ROW_VOLUME_SIZE,
    fontVariant: ['tabular-nums'],
  },
});

export default TradeRow;
