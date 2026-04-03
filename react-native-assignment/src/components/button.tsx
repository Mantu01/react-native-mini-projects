import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, typography, spacing } from '@/theme';

interface ButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  icon?: keyof typeof Feather.glyphMap;
}

export function Button({ label, onPress, disabled, style, icon }: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        disabled && styles.buttonDisabled,
        style
      ]}
    >
      {icon && (
        <Feather
          name={icon}
          size={20}
          color={colors.buttonPrimaryText}
          style={styles.buttonIcon}
        />
      )}
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.buttonPrimary,
    height: 58,
    borderRadius: spacing.buttonRadius,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderBottomWidth: 4,
    borderBottomColor: colors.primaryDark,
  },
  buttonDisabled: {
    backgroundColor: colors.buttonDisabled,
    borderBottomColor: colors.buttonDisabled,
  },
  buttonText: {
    color: colors.buttonPrimaryText,
    fontSize: typography.sizes.l,
    fontFamily: typography.fonts.inter.semiBold,
  },
  buttonIcon: {
    marginRight: spacing.s,
  },
});