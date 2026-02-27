import '@/global.css';

import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import {  QrCodeIcon, ScanIcon} from 'lucide-react-native';
import ThemeToggle from '@/components/theme/ThemeToggle';


export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  
  return (
    <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <Tabs
        screenOptions={{
          headerTransparent:true,
          headerRight:()=><ThemeToggle/>
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Generate QR Code',
            tabBarLabel: 'Generate',
            tabBarIcon: ({ color, size }) => <QrCodeIcon size={size} color={color} />,
          }}
          />
        <Tabs.Screen
          name="scan"
          options={{
            title: 'Scan QR Code',
            tabBarLabel: 'Scan',
            tabBarIcon: ({ color, size }) => <ScanIcon size={size} color={color} />,
          }}
        />
      </Tabs>
      <PortalHost />
    </ThemeProvider>
  );
}