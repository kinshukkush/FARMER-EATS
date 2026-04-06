import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Colors } from '../theme/colors';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import StepIndicator from '../components/StepIndicator';

// Global register data store
export const registerData = {};

const RegisterStep1Screen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Enter a valid email';
    if (!phone.trim()) newErrors.phone = 'Phone is required';
    if (!password.trim()) newErrors.password = 'Password is required';
    else if (password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (!confirmPassword.trim()) newErrors.confirmPassword = 'Please confirm your password';
    else if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validate()) return;
    Object.assign(registerData, {
      full_name: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      password,
    });
    navigation.navigate('Register2');
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Top bar */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.brand}>🌿 FarmerEats</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.content}>
          <StepIndicator currentStep={1} totalSteps={5} />
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Let's start with your basic info</Text>

          <View style={styles.form}>
            <CustomInput
              placeholder="Full Name"
              value={fullName}
              onChangeText={setFullName}
              leftIcon={<Text style={styles.icon}>👤</Text>}
              error={errors.fullName}
            />
            <CustomInput
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon={<Text style={styles.icon}>✉️</Text>}
              error={errors.email}
            />
            <CustomInput
              placeholder="Phone Number (e.g. +19876543210)"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              leftIcon={<Text style={styles.icon}>📱</Text>}
              error={errors.phone}
            />
            <CustomInput
              placeholder="Password (min 8 characters)"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              leftIcon={<Text style={styles.icon}>🔒</Text>}
              error={errors.password}
            />
            <CustomInput
              placeholder="Re-enter Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              leftIcon={<Text style={styles.icon}>🔒</Text>}
              error={errors.confirmPassword}
            />
          </View>

          <CustomButton title="Continue" onPress={handleNext} style={styles.btn} />

          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: Colors.white },
  scrollContent: { flexGrow: 1, paddingBottom: 40 },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 52,
    paddingBottom: 16,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.inputBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 20,
    color: Colors.dark,
    fontFamily: 'BeVietnamPro_700Bold',
  },
  brand: {
    fontSize: 18,
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.dark,
  },
  content: { paddingHorizontal: 28, paddingTop: 8 },
  title: {
    fontSize: 28,
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.dark,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: 'BeVietnamPro_400Regular',
    color: Colors.textLight,
    marginBottom: 24,
  },
  form: { gap: 4, marginBottom: 24 },
  icon: { fontSize: 16 },
  btn: { marginBottom: 20 },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    color: Colors.textLight,
    fontFamily: 'BeVietnamPro_400Regular',
  },
  loginLink: {
    fontSize: 14,
    color: Colors.primary,
    fontFamily: 'BeVietnamPro_700Bold',
  },
});

export default RegisterStep1Screen;
