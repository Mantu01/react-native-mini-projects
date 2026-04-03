import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography } from '@/theme';
import type { AuthStackScreenProps } from '@/navigation/types';

type SplashScreenProps = AuthStackScreenProps<'Splash'>;

export function SplashScreen({ navigation }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Welcome');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoReady}>Ready</Text>
          <View style={styles.logoAi}>
            <Text style={styles.logoAiText}>ai</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoReady: {
    fontSize: 48,
    fontFamily: typography.fonts.inter.bold,
    color: colors.primary,
    letterSpacing: -0.5,
  },
  logoAi: {
    backgroundColor: colors.textPrimary,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoAiText: {
    color: colors.textInverse,
    fontSize: 24,
    fontFamily: typography.fonts.inter.bold,
  },
});
