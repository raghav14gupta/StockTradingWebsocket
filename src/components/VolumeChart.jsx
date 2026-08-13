import React from 'react';
import { useWindowDimensions } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

import {
  BAR_WIDTH_RATIO,
  CHART_ANIMATION_DURATION,
  CHART_Y_AXIS_LABEL_WIDTH,
  SPACING_RATIO,
  VOLUME_CHART_HEIGHT,
} from '../config/constants';
import { colors } from '../theme/colors';

const VolumeChart = React.memo(({ points }) => {
  const { width } = useWindowDimensions();

  if (!points || points.length === 0) {
    return null;
  }

  // Match PriceChart: full screen width minus y-axis label column and right breathing room
  const dataWidth = width - CHART_Y_AXIS_LABEL_WIDTH - 16;
  const n = points.length;

  const barWidth = (dataWidth / n) * BAR_WIDTH_RATIO;
  const barSpacing = (dataWidth / n) * SPACING_RATIO;

  const logVolumes = points.map(p => Math.log10(p.volume + 1e-8));
  const minLog = Math.min(...logVolumes);
  const maxLog = Math.max(...logVolumes);
  const logRange = maxLog - minLog || 1;

  const data = points.map((p, index) => {
    const logVal = Math.log10(p.volume + 1e-8);
    const normalized = (logVal - minLog) / logRange;
    // Map to beautiful visual height (15 to 60px) + add dynamic index oscillation
    const baseHeight = 15 + normalized * 40;
    const offset = index % 3 === 0 ? 12 : index % 2 === 0 ? -10 : 2;
    const value = Math.max(10, Math.min(75, baseHeight + offset));

    return {
      value,
      frontColor: index % 2 === 0 ? colors.green : colors.red,
    };
  });

  return (
    <BarChart
      data={data}
      width={dataWidth}
      height={VOLUME_CHART_HEIGHT}
      barWidth={barWidth}
      spacing={barSpacing}
      initialSpacing={0}
      hideRules
      xAxisColor={colors.border}
      yAxisColor="transparent"
      hideYAxisText
      yAxisLabelWidth={CHART_Y_AXIS_LABEL_WIDTH}
      isAnimated
      animationDuration={CHART_ANIMATION_DURATION}
    />
  );
});

VolumeChart.displayName = 'VolumeChart';

export default VolumeChart;
