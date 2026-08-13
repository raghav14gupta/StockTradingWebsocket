import React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

import {
  CHART_MIN_POINTS,
  CHART_Y_AXIS_FONT_SIZE,
  CHART_Y_AXIS_LABEL_WIDTH,
  PRICE_CHART_HEIGHT,
} from '../config/constants';
import { colors } from '../theme/colors';

const PriceChart = React.memo(({ points }) => {
  const { width } = useWindowDimensions();

  if (!points || points.length < CHART_MIN_POINTS) {
    return null;
  }

  // Data area = full screen minus y-axis label column minus small right margin
  const dataWidth = width - CHART_Y_AXIS_LABEL_WIDTH - 16;

  // Compute spacing so points fill the data width.
  const n = points.length;
  const pointSpacing = n > 1 ? dataWidth / n : dataWidth;
  const endSp = n > 1 ? dataWidth - pointSpacing * (n - 1) : 0;

  const prices = points.map(p => p.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const diff = max - min;
  const pad = diff === 0 ? min * 0.01 : diff * 0.15;
  const domainMin = min - pad;
  const domainMax = max + pad;
  const domainRange = domainMax - domainMin;

  // Shift values so domain starts at 0 (gifted-charts renders from 0)
  const data = points.map(p => ({ value: p.price - domainMin }));

  return (
    <LineChart
      data={data}
      width={dataWidth}
      height={PRICE_CHART_HEIGHT}
      curved
      areaChart
      hideDataPoints
      thickness={2}
      color={colors.green}
      startFillColor={colors.green}
      startOpacity={0.3}
      endOpacity={0.01}
      gradientDirection="vertical"
      yAxisTextStyle={styles.yAxisText}
      hideRules={false}
      rulesColor={colors.border}
      rulesType="solid"
      xAxisColor={colors.border}
      yAxisColor="transparent"
      initialSpacing={0}
      endSpacing={endSp}
      spacing={pointSpacing}
      maxValue={domainRange}
      noOfSections={5}
      hideXAxisText
      yAxisLabelWidth={CHART_Y_AXIS_LABEL_WIDTH}
      formatYLabel={val => {
        const actual = parseFloat(val) + domainMin;
        return actual.toFixed(0);
      }}
    />
  );
});

PriceChart.displayName = 'PriceChart';

const styles = StyleSheet.create({
  yAxisText: {
    color: colors.textSecondary,
    fontSize: CHART_Y_AXIS_FONT_SIZE,
  },
});

export default PriceChart;
