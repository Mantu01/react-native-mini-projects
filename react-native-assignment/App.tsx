import React from 'react';
import { useFonts } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { AuthProvider } from '@/context/auth-context';
import { RootNavigator } from '@/navigation/root-navigator';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular: require('@expo-google-fonts/inter').Inter_400Regular,
    Inter_600SemiBold: require('@expo-google-fonts/inter').Inter_600SemiBold,
    Inter_700Bold: require('@expo-google-fonts/inter').Inter_700Bold,
    Inter_800ExtraBold: require('@expo-google-fonts/inter').Inter_800ExtraBold,
  });

  React.useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}