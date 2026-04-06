import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import { Colors } from '../theme/colors';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import { forgotPassword } from '../api/authApi';

const ForgotPasswordScreen = ({ navigation }) => {
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validate = () => {
    if (!mobile.trim()) {
      setError('Mobile number is required');
      return false;
    }
    if (!/^\+\d{10,15}$/.test(mobile.replace(/\s/g, ''))) {
      setError('Enter a valid number with country code (e.g. +19876543210)');
      return false;
    }
    setError('');
    return true;
  };

  const handleSend = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const result = await forgotPassword(mobile.trim());
      if (result.success === 'true' || result.success === true) {
        Alert.alert('OTP Sent', result.message || 'OTP has been sent to your mobile.', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('OTP', { mobile: mobile.trim() }),
          },
        ]);
      } else {
        Alert.alert('Failed', result.message || 'Could not send OTP. Please try again.');
      }
    } catch (err) {
      Alert.alert('Error', err?.response?.data?.message || 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
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
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.brand}>🌿 FarmerEats</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.content}>
          {/* Illustration */}
          <View style={styles.illustration}>
            <View style={styles.illustrationCircle}>
              <Text style={styles.illustrationEmoji}>🔐</Text>
            </View>
          </View>

          <Text style={styles.title}>Forgot Password?</Text>
          <Text style={styles.subtitle}>
            Enter your registered mobile number and we'll send you a verification code.
          </Text>

          <CustomInput
            placeholder="Mobile Number (e.g. +19876543210)"
            value={mobile}
            onChangeText={(val) => {
              setMobile(val);
              if (error) setError('');
            }}
            keyboardType="phone-pad"
            leftIcon={<Text style={styles.icon}>📱</Text>}
            error={error}
          />

          <CustomButton
            title="Send Code"
            onPress={handleSend}
            loading={loading}
            style={styles.btn}
          />

          <TouchableOpacity
            style={styles.backToLogin}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.backToLoginText}>← Back to Login</Text>
          </TouchableOpacity>
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
  backIcon: { fontSize: 20, color: Colors.dark, fontFamily: 'BeVietnamPro_700Bold' },
  brand: { fontSize: 18, fontFamily: 'BeVietnamPro_700Bold', color: Colors.dark },
  content: { paddingHorizontal: 28, paddingTop: 12 },
  illustration: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 16,
  },
  illustrationCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: 'rgba(213, 113, 91, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(213, 113, 91, 0.2)',
  },
  illustrationEmoji: { fontSize: 56 },
  title: { fontSize: 28, fontFamily: 'BeVietnamPro_700Bold', color: Colors.dark, marginBottom: 10 },
  subtitle: {
    fontSize: 15,
    fontFamily: 'BeVietnamPro_400Regular',
    color: Colors.textLight,
    marginBottom: 28,
    lineHeight: 24,
  },
  icon: { fontSize: 16 },
  btn: { marginTop: 8, marginBottom: 20 },
  backToLogin: { alignSelf: 'center' },
  backToLoginText: {
    color: Colors.primary,
    fontFamily: 'BeVietnamPro_600SemiBold',
    fontSize: 14,
  },
});

export default ForgotPasswordScreen;
