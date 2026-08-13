import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import EmptyState from '../../components/EmptyState';
import PriceChart from '../../components/PriceChart';
import PriceHeader from '../../components/PriceHeader';
import StatusPill from '../../components/StatusPill';
import VolumeChart from '../../components/VolumeChart';
import {
  NAV_BUTTON_FONT_SIZE,
  PRICE_HEADER_SYMBOL_SIZE,
  SETTINGS_ICON_SIZE,
} from '../../config/constants';
import { useTrades } from '../../context/TradeContext';
import { ROUTES } from '../../navigation/routes';
import { colors } from '../../theme/colors';
import { radius, spacing } from '../../theme/spacing';

export default function ChartScreen({ navigation }) {
  const { chartPoints, status } = useTrades();

  const last = chartPoints[chartPoints.length - 1] ?? null;
  const prev = chartPoints[chartPoints.length - 2] ?? null;
  const deltaPercent =
    last && prev ? ((last.price - prev.price) / prev.price) * 100 : 0;

  return (
    <SafeAreaView style={styles.container}>
      {/* Top nav row: ← BTC/USDT  •Connected ⚙ */}
      <View style={styles.navRow}>
        <View style={styles.navLeft}>
          <Text style={styles.backArrow}>←</Text>
          <Text style={styles.symbol}>BTC/USDT</Text>
        </View>
        <View style={styles.navRight}>
          <StatusPill status={status} />
          <Text style={styles.settingsIcon}>⚙</Text>
        </View>
      </View>

      {/* Price + Last update directly below nav */}
      <View style={styles.priceSection}>
        <PriceHeader
          price={last ? last.price : null}
          deltaPercent={deltaPercent}
          direction={last ? last.direction : 'flat'}
          lastUpdate={last ? last.timestamp : null}
        />
      </View>

      {/* Charts or empty state */}
      {chartPoints.length === 0 ? (
        <EmptyState message="Waiting for live trades…" />
      ) : (
        <View style={styles.chartsContainer}>
          <PriceChart points={chartPoints} />
          <View style={styles.gap} />
          <VolumeChart points={chartPoints} />
        </View>
      )}

      <View style={styles.spacer} />

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate(ROUTES.TRADE_HISTORY)}>
        <Text style={styles.buttonText}>View Trade History ›</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  // ── Nav row ──────────────────────────────────────────────
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  navLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backArrow: {
    color: colors.green,
    fontSize: PRICE_HEADER_SYMBOL_SIZE,
    fontWeight: '600',
    marginRight: spacing.sm,
  },
  symbol: {
    color: colors.green,
    fontSize: PRICE_HEADER_SYMBOL_SIZE,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  navRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsIcon: {
    color: colors.textSecondary,
    fontSize: SETTINGS_ICON_SIZE,
    marginLeft: spacing.md,
  },
  // ── Price section ─────────────────────────────────────────
  priceSection: {
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.xl,
  },
  // ── Charts ───────────────────────────────────────────────
  chartsContainer: {
    alignItems: 'flex-start',
  },
  gap: {
    height: spacing.lg,
  },
  // ── Bottom ───────────────────────────────────────────────
  spacer: {
    flex: 1,
  },
  button: {
    marginHorizontal: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  buttonText: {
    color: colors.green,
    fontSize: NAV_BUTTON_FONT_SIZE,
    fontWeight: '600',
  },
});
