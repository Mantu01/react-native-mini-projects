import React from 'react';
import { View } from 'react-native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { typography } from '@/theme';
import HomeScreen from '@/features/home/screens/home-screen';
import { SessionResultScreen } from '@/features/session-result/screens/session-result-screen';
import { SettingsScreen } from '@/features/settings/screens/settings-screen';
import type { MainTabParamList, HomeStackParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();

const defaultTabBarStyle = {
  position: 'absolute' as const,
  marginLeft: 50,
  bottom: 40,
  width: 320,
  backgroundColor: '#FFFFFF',
  borderRadius: 40,
  height: 72,
  borderTopWidth: 0,
  shadowColor: '#000000',
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.1,
  shadowRadius: 16,
  elevation: 8,
  paddingBottom: 8,
  paddingTop: 8,
};

function HomeNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="SessionResult" component={SessionResultScreen} />
    </HomeStack.Navigator>
  );
}

export function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const nestedRouteName =
          getFocusedRouteNameFromRoute(route) ?? 'HomeScreen';
        const hideTabBar =
          route.name === 'Settings' ||
          (route.name === 'Home' && nestedRouteName === 'SessionResult');

        return {
          headerShown: false,
          tabBarIcon: ({ color }: { color: string }) => {
            if (route.name === 'Home') {
              return (
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Ionicons name="home" size={26} color={color} />
                  <View
                    style={{
                      position: 'absolute',
                      top: 13,
                      width: 6,
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: '#FFFFFF',
                    }}
                  />
                </View>
              );
            }
            if (route.name === 'Settings') {
              return <Ionicons name="settings" size={26} color={color} />;
            }
            return null;
          },
          tabBarActiveTintColor: '#FF6B00',
          tabBarInactiveTintColor: '#4A4A4A',
          tabBarStyle: hideTabBar ? { display: 'none' } : defaultTabBarStyle,
          tabBarItemStyle: {
            paddingVertical: 4,
          },
          tabBarLabelStyle: {
            fontSize: 14,
            fontFamily: typography?.fonts?.inter?.semiBold || 'System',
            fontWeight: '600',
            marginTop: 4,
          },
        };
      }}
    >
      <Tab.Screen name="Home" component={HomeNavigator} options={{ title: 'Home' }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
    </Tab.Navigator>
  );
}
