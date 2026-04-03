import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import { Image } from 'expo-image';
import { colors, typography, spacing } from '@/theme';
import type { AuthStackScreenProps } from '@/navigation/types';
import { Button } from '@/components/button';

const COMPANY_LOGOS = [
  {
    id: 'top-left',
    source: require('../../../../assets/swiggy-logo.png'),
    position: { top: 44, left: 46 },
  },
  {
    id: 'top-right',
    source: require('../../../../assets/microsoft-logo.png'),
    position: { top: 14, right: 30 },
  },
  {
    id: 'middle-right',
    source: require('../../../../assets/google-logo.png'),
    position: { top: 165, right: -44 },
  },
  {
    id: 'bottom-left',
    source: require('../../../../assets/amazon-logo.png'),
    position: { bottom: 46, left: 16 },
  },
  {
    id: 'bottom-right',
    source: require('../../../../assets/zomato-logo.png'),
    position: { bottom: -36, right: 36 },
  },
];

type WelcomeScreenProps = AuthStackScreenProps<'Welcome'>;

export function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('../../../../assets/logo.png')}
            style={styles.logoImage}
            contentFit="contain"
            cachePolicy="memory-disk"
          />
        </View>

        <View style={styles.illustrationContainer}>
          <View style={styles.centerCircle}>
            <Image
              source={require('../../../../assets/smiling-girl.png')}
              style={styles.mainImage}
              contentFit="cover"
              cachePolicy="memory-disk"
            />
          </View>

          {COMPANY_LOGOS.map((item) => (
            <View key={item.id} style={[styles.floatingLogo, item.position]}>
              <Image source={item.source} style={styles.companyLogo} contentFit="contain" cachePolicy="memory-disk" />
            </View>
          ))}
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.mainText}>Practice Top Interview</Text>
          <Text style={styles.mainText}>
            Questions <Text style={styles.highlightText}>with AI</Text>
          </Text>
        </View>
        <View style={styles.spacer} />
        <Button 
          label="Let's go" 
          icon="check-circle" 
          onPress={() => navigation.navigate('Login')} 
        />
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            By continuing, you acknowledge agreeing to our{'\n'}
            <Text style={styles.linkText}>terms of service</Text> and{' '}
            <Text style={styles.linkText}>privacy policy</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
    alignItems: 'center',
    paddingHorizontal: spacing.screenPadding,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    marginBottom: 40,
  },
  logoReady: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FF6A00',
    letterSpacing: -0.5,
  },
  logoImage: {
    width: 160,
    height: 45,
  },
  illustrationContainer: {
    width: 320,
    height: 320,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginVertical: 20,
  },
  centerCircle: {
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: colors.primaryLight,
    justifyContent: 'flex-end',
    alignItems: 'center',
    overflow: 'hidden',
  },
  mainImage: {
    width: 250,
    height: 250,
    resizeMode: 'cover',
  },
  floatingLogo: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 35,
    backgroundColor: colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    transform: [{ translateX: -28 }, { translateY: -28 }],
  },
  companyLogo: {
    width: 60,
    height: 60,
    borderRadius:30,
    resizeMode: 'contain',
  },
  textContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  mainText: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fonts.inter.semiBold,
    color: colors.textPrimary,
    lineHeight: 30,
  },
  highlightText: {
    color: colors.primary,
    fontFamily: typography.fonts.inter.semiBold,
  },
  spacer: {
    flex: 1,
  },
  footerContainer: {
    marginBottom: Platform.OS === 'ios' ? 10 : 30,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  footerText: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
    fontFamily: typography.fonts.inter.normal,
  },
  linkText: {
    color: colors.textDisabled,
    textDecorationLine: 'underline',
    fontFamily: typography.fonts.inter.normal,
  },
});