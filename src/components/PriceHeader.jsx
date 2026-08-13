import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {
  PRICE_FONT_SIZE,
  PRICE_HEADER_DELTA_SIZE,
  PRICE_HEADER_SYMBOL_SIZE,
  PRICE_HEADER_UPDATE_SIZE,
} from '../config/constants';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { formatPrice, formatTime } from '../utils/format';

const PriceHeader = React.memo(({ price, deltaPercent, direction, lastUpdate }) => {
  const isNull = price === null || price === undefined;

  let dirSymbol = '';
  let dirColor = colors.textSecondary;

  if (direction === 'up') {
    dirSymbol = '▲ ';
    dirColor = colors.green;
  } else if (direction === 'down') {
    dirSymbol = '▼ ';
    dirColor = colors.red;
  }

  const deltaText = isNull ? '' : `${dirSymbol}${Math.abs(deltaPercent).toFixed(2)}%`;

  return (
    <View style={styles.container}>
      <View style={styles.priceRow}>
        <Text style={styles.price}>
          {isNull ? '—' : formatPrice(price)}
        </Text>
        {!isNull && (
          <Text style={[styles.delta, { color: dirColor }]}>
            {deltaText}
          </Text>
        )}
      </View>
      <Text style={styles.lastUpdate}>
        {isNull || !lastUpdate
          ? 'Last update —'
          : `Last update ${formatTime(lastUpdate)}`}
      </Text>
    </View>
  );
});

PriceHeader.displayName = 'PriceHeader';

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: spacing.xs,
  },
  price: {
    color: colors.textPrimary,
    fontSize: PRICE_FONT_SIZE,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
  delta: {
    fontSize: PRICE_HEADER_DELTA_SIZE,
    fontWeight: '600',
    marginLeft: spacing.sm,
  },
  lastUpdate: {
    color: colors.textSecondary,
    fontSize: PRICE_HEADER_UPDATE_SIZE,
  },
  // symbol row is handled by ChartScreen header bar
  symbolPlaceholder: {
    fontSize: PRICE_HEADER_SYMBOL_SIZE,
  },
});

export default PriceHeader;
