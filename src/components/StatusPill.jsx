import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {
  CONNECTION_STATUS,
  STATUS_DOT_RADIUS,
  STATUS_DOT_SIZE,
  STATUS_FONT_SIZE,
} from '../config/constants';
import { colors } from '../theme/colors';
import { radius, spacing } from '../theme/spacing';

const StatusPill = React.memo(({ status }) => {
  let statusColor;
  let labelText;

  switch (status) {
    case CONNECTION_STATUS.CONNECTED:
      statusColor = colors.green;
      labelText = 'Connected';
      break;
    case CONNECTION_STATUS.CONNECTING:
      statusColor = colors.amber;
      labelText = 'Connecting';
      break;
    case CONNECTION_STATUS.RECONNECTING:
      statusColor = colors.amber;
      labelText = 'Reconnecting';
      break;
    case CONNECTION_STATUS.DISCONNECTED:
      statusColor = colors.red;
      labelText = 'Disconnected';
      break;
    default:
      statusColor = colors.textSecondary;
      labelText = 'Disconnected';
  }

  const dotStyle = [styles.dot, { backgroundColor: statusColor }];

  return (
    <View style={styles.container}>
      <View style={dotStyle} />
      <Text style={styles.text}>{labelText}</Text>
    </View>
  );
});

StatusPill.displayName = 'StatusPill';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  dot: {
    width: STATUS_DOT_SIZE,
    height: STATUS_DOT_SIZE,
    borderRadius: STATUS_DOT_RADIUS,
    marginRight: spacing.sm,
  },
  text: {
    color: colors.textPrimary,
    fontSize: STATUS_FONT_SIZE,
    fontWeight: '500',
  },
});

export default StatusPill;
