import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '@/context/auth-context';
import { AuthNavigator } from './auth-navigator';
import { MainNavigator } from './main-navigator';

export function RootNavigator() {
  const { isAuthenticated, authInitialRoute } = useAuth();

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <MainNavigator />
      ) : (
        <AuthNavigator initialRouteName={authInitialRoute} />
      )}
    </NavigationContainer>
  );
}
