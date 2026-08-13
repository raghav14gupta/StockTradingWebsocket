import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { EMPTY_STATE_FONT_SIZE } from '../config/constants';
import { colors } from '../theme/colors';

const EmptyState = React.memo(({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
});

EmptyState.displayName = 'EmptyState';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.textSecondary,
    fontSize: EMPTY_STATE_FONT_SIZE,
  },
});

export default EmptyState;
