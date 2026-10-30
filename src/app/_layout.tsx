import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { FavoritesProvider } from '../contexts/FavoritesContext';
import { PreferencesProvider } from '../contexts/PreferencesContext';

import { styles } from '../styles/app/root-layout.styles';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <StatusBar style="dark" />
      <FavoritesProvider>
        <PreferencesProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
          </Stack>
        </PreferencesProvider>
      </FavoritesProvider>
    </GestureHandlerRootView>
  );
}
