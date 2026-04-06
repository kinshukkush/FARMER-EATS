import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Colors } from '../theme/colors';

const CustomButton = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary', // 'primary' | 'outline' | 'secondary'
  style,
  textStyle,
}) => {
  const getButtonStyle = () => {
    if (variant === 'outline') return [styles.button, styles.outlineButton, style];
    if (variant === 'secondary') return [styles.button, styles.secondaryButton, style];
    return [styles.button, styles.primaryButton, disabled && styles.disabled, style];
  };

  const getTextStyle = () => {
    if (variant === 'outline') return [styles.buttonText, styles.outlineText, textStyle];
    return [styles.buttonText, textStyle];
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      activeOpacity={0.85}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? Colors.primary : Colors.white} size="small" />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
  },
  secondaryButton: {
    backgroundColor: Colors.secondary,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  disabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: 'BeVietnamPro_700Bold',
    letterSpacing: 0.3,
  },
  outlineText: {
    color: Colors.primary,
  },
});

export default CustomButton;
