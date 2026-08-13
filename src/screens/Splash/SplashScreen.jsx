import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { SPLASH_DURATION_MS } from '../../config/constants';
import { ROUTES } from '../../navigation/routes';
import { colors } from '../../theme/colors';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace(ROUTES.CHART);
    }, SPLASH_DURATION_MS);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>IHLDMedTech</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: colors.green,
    fontSize: 32,
    fontWeight: 'bold',
  },
});
