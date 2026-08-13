import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ChartScreen from '../screens/Chart/ChartScreen';
import SplashScreen from '../screens/Splash/SplashScreen';
import TradeHistoryScreen from '../screens/TradeHistory/TradeHistoryScreen';
import { colors } from '../theme/colors';
import { ROUTES } from './routes';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.SPLASH}
      screenOptions={{ contentStyle: { backgroundColor: colors.bg } }}>
      <Stack.Screen
        name={ROUTES.SPLASH}
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.CHART}
        component={ChartScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.TRADE_HISTORY}
        component={TradeHistoryScreen}
        options={{
          headerShown: true,
          title: 'Recent Trades',
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.textPrimary,
        }}
      />
    </Stack.Navigator>
  );
}
