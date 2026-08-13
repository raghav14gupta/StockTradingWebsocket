import React, { useMemo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import EmptyState from '../../components/EmptyState';
import TradeRow from '../../components/TradeRow';
import {
  COLUMN_HEADER_FONT_SIZE,
  FOOTER_FONT_SIZE,
  FOOTER_ICON_SIZE,
  INITIAL_NUM_TO_RENDER,
  TRADE_ROW_HEIGHT,
  WINDOW_SIZE,
} from '../../config/constants';
import { useTrades } from '../../context/TradeContext';
import { colors } from '../../theme/colors';
import { radius, spacing } from '../../theme/spacing';
import { toChartPoints } from '../../utils/buffer';

const ListFooter = () => (
  <View style={styles.footerContainer}>
    <Text style={styles.footerIcon}>📂</Text>
    <Text style={styles.footerText}>No more trade history available.</Text>
  </View>
);

export default function TradeHistoryScreen() {
  const { historyRows } = useTrades();

  const data = useMemo(() => {
    const withDirection = toChartPoints(historyRows);
    return [...withDirection].reverse();
  }, [historyRows]);

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <View style={styles.columnHeader}>
        <Text style={styles.columnHeaderTextLeft}>Time</Text>
        <Text style={styles.columnHeaderTextCenter}>Price (USD)</Text>
        <Text style={styles.columnHeaderTextRight}>Amount (BTC)</Text>
      </View>

      <FlatList
        data={data}
        renderItem={({ item }) => <TradeRow trade={item} />}
        keyExtractor={(item, index) => `${item.timestamp}-${index}`}
        getItemLayout={(d, index) => ({
          length: TRADE_ROW_HEIGHT,
          offset: TRADE_ROW_HEIGHT * index,
          index,
        })}
        ListEmptyComponent={<EmptyState message="No trades yet." />}
        ListFooterComponent={data.length > 0 ? ListFooter : null}
        initialNumToRender={INITIAL_NUM_TO_RENDER}
        windowSize={WINDOW_SIZE}
        removeClippedSubviews
        style={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  columnHeader: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  columnHeaderTextLeft: {
    flex: 1,
    color: colors.textSecondary,
    fontSize: COLUMN_HEADER_FONT_SIZE,
    fontWeight: '600',
  },
  columnHeaderTextCenter: {
    flex: 1,
    textAlign: 'right',
    color: colors.textSecondary,
    fontSize: COLUMN_HEADER_FONT_SIZE,
    fontWeight: '600',
  },
  columnHeaderTextRight: {
    flex: 1,
    textAlign: 'right',
    color: colors.textSecondary,
    fontSize: COLUMN_HEADER_FONT_SIZE,
    fontWeight: '600',
  },
  list: {
    backgroundColor: colors.bg,
  },
  footerContainer: {
    margin: spacing.xl,
    padding: spacing.xl,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerIcon: {
    fontSize: FOOTER_ICON_SIZE,
    marginBottom: spacing.xs,
  },
  footerText: {
    color: colors.textSecondary,
    fontSize: FOOTER_FONT_SIZE,
    textAlign: 'center',
  },
});
