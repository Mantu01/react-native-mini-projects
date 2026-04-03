import { Button } from '@/components/button';
import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  type NativeSyntheticEvent,
  type TextInputKeyPressEventData,
} from 'react-native';
import { Image } from 'expo-image';
import { colors, typography, spacing } from '@/theme';
import { useAuth } from '@/context/auth-context';
import type { AuthStackScreenProps } from '@/navigation/types';

export function LoginScreen({ navigation }: AuthStackScreenProps<'Login'>) {
  const { login } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isOtpSent, setIsOtpSent] = useState(false);
  
  const otpInputs = useRef<Array<TextInput | null>>([]);

  const handleAction = () => {
    if (!isOtpSent) {
      if (phoneNumber.length >= 10) {
        setIsOtpSent(true);
      }
    } else {
      login(phoneNumber);
    }
  };

  const onPhoneChange = (text: string) => {
    setPhoneNumber(text.replace(/\D/g, '').slice(0, 10));
  };

  const updateOtp = (value: string, index: number) => {
    const digit = value.replace(/\D/g, '').slice(0, 1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    if (value.length !== 0 && index < 5) {
      otpInputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.content}>
          <Text style={styles.heading}>
            <Text style={styles.headingHighlight}>Kickstart</Text> your journey
          </Text>

          <Text style={styles.subHeading}>
            We will send you an OTP to verify your number.
          </Text>

          {!isOtpSent ? (
            <View style={styles.inputSection}>
              <Text style={styles.label}>Phone number</Text>
              <View style={styles.inputWrapper}>
                <View style={styles.countryPicker}>
                  <Image
                    source={{ uri: 'https://flagcdn.com/w40/in.png' }}
                    style={styles.flag}
                    cachePolicy="memory-disk"
                  />
                  <Text style={styles.countryCode}>+91</Text>
                  <Text style={styles.dropdownIcon}>⌵</Text>
                </View>
                <TextInput
                  style={styles.input}
                  keyboardType="number-pad"
                  inputMode="numeric"
                  placeholder="8812014288"
                  placeholderTextColor={colors.textDisabled}
                  value={phoneNumber}
                  onChangeText={onPhoneChange}
                  maxLength={10}
                />
              </View>
              <Text style={styles.helperText}>
                Please enter a valid 10-digit mobile number.
              </Text>
            </View>
          ) : (
            <View style={styles.otpSection}>
              <Text style={styles.label}>Enter the OTP</Text>
              <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                  <View key={index} style={styles.otpBox}>
                    <TextInput
                      ref={(ref) => {
                        otpInputs.current[index] = ref;
                      }}
                      style={styles.otpInputText}
                      keyboardType="number-pad"
                      maxLength={1}
                      value={digit}
                      onChangeText={(val) => updateOtp(val, index)}
                      onKeyPress={(e) => handleKeyPress(e, index)}
                      placeholder="_"
                      placeholderTextColor={colors.textPrimary}
                      autoFocus={index === 0}
                    />
                  </View>
                ))}
              </View>
            </View>
          )}

          <View style={styles.buttonContainer}>
            <Button
              label={isOtpSent ? 'Continue' : 'Send OTP'}
              onPress={handleAction}
              disabled={!isOtpSent ? phoneNumber.length < 10 : otp.join('').length < 4}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingVertical:10,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.l,
  },
  heading: {
    fontSize: typography.sizes.xxxl,
    fontFamily: typography.fonts.inter.semiBold,
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  headingHighlight: {
    color: colors.primary,
  },
  subHeading: {
    fontSize: typography.sizes.m,
    color: colors.textSecondary,
    marginTop: spacing.m,
    marginBottom: spacing.xxxl,
    lineHeight: 22,
    fontFamily: typography.fonts.inter.normal,
  },
  inputSection: {
    marginBottom: 32,
  },
  label: {
    fontSize: typography.sizes.s,
    fontFamily: typography.fonts.inter.medium,
    color: colors.textSecondary,
    marginBottom: spacing.s,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: spacing.inputRadius,
    height: 56,
    paddingHorizontal: spacing.s,
  },
  countryPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
  },
  flag: {
    width: 20,
    height: 14,
    borderRadius: 2,
    marginRight: 8,
  },
  countryCode: {
    fontSize: typography.sizes.m,
    color: colors.textPrimary,
    marginRight: spacing.xxs,
    fontFamily: typography.fonts.inter.normal,
  },
  dropdownIcon: {
    fontSize: typography.sizes.s,
    color: colors.textSecondary,
    marginRight: spacing.xxs,
  },
  input: {
    flex: 1,
    fontSize: typography.sizes.l,
    color: colors.textPrimary,
    fontFamily: typography.fonts.inter.normal,
  },
  helperText: {
    fontSize: typography.sizes.xs,
    color: colors.textDisabled,
    marginTop: spacing.s,
    fontFamily: typography.fonts.inter.normal,
  },
  otpSection: {
    marginTop: 8,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  otpBox: {
    width: 48,
    height: 56,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: spacing.inputRadius,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  otpInputText: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fonts.inter.medium,
    color: colors.textPrimary,
    textAlign: 'center',
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: spacing.xxxl,
    left: spacing.screenPadding,
    right: spacing.screenPadding,
  },
});