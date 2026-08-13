import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { TradeProvider } from './src/context/TradeContext';
import RootNavigator from './src/navigation/RootNavigator';
import { colors } from './src/theme/colors';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor={colors.bg} />
      <TradeProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </TradeProvider>
    </SafeAreaProvider>
  );
}
