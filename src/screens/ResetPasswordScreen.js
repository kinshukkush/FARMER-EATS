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
import { resetPassword } from '../api/authApi';

const ResetPasswordScreen = ({ navigation, route }) => {
  const { token } = route.params || {};
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!password.trim()) newErrors.password = 'New password is required';
    else if (password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (!confirmPassword.trim()) newErrors.confirmPassword = 'Please confirm your password';
    else if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleReset = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const result = await resetPassword({
        token: token || '',
        password,
        cpassword: confirmPassword,
      });
      if (result.success === 'true' || result.success === true) {
        setDone(true);
      } else {
        Alert.alert('Reset Failed', result.message || 'Unable to reset password. Please try again.');
      }
    } catch (err) {
      Alert.alert('Error', err?.response?.data?.message || 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <View style={styles.successContainer}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
        <View style={styles.successIconWrapper}>
          <Text style={styles.successEmoji}>🔓</Text>
        </View>
        <Text style={styles.successTitle}>Password Reset!</Text>
        <Text style={styles.successSubtitle}>
          Your password has been successfully changed. You can now log in with your new password.
        </Text>
        <CustomButton
          title="Back to Login"
          onPress={() => navigation.replace('Login')}
          style={styles.loginBtn}
        />
      </View>
    );
  }

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
          <View style={styles.illustration}>
            <View style={styles.illustrationCircle}>
              <Text style={styles.illustrationEmoji}>🔑</Text>
            </View>
          </View>

          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.subtitle}>
            Create a strong new password for your account.
          </Text>

          {/* Password strength indicator */}
          <View style={styles.strengthRow}>
            {[1, 2, 3, 4].map((level) => {
              const strength = password.length;
              const filled = strength >= level * 2;
              return (
                <View
                  key={level}
                  style={[
                    styles.strengthBar,
                    filled && strength < 6 && styles.weakBar,
                    filled && strength >= 6 && strength < 10 && styles.mediumBar,
                    filled && strength >= 10 && styles.strongBar,
                  ]}
                />
              );
            })}
            <Text style={styles.strengthLabel}>
              {password.length === 0 ? 'Enter password' :
                password.length < 6 ? 'Weak' :
                password.length < 10 ? 'Medium' : 'Strong'}
            </Text>
          </View>

          <CustomInput
            placeholder="New Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            leftIcon={<Text style={styles.icon}>🔒</Text>}
            error={errors.password}
          />
          <CustomInput
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            leftIcon={<Text style={styles.icon}>🔒</Text>}
            error={errors.confirmPassword}
          />

          <CustomButton
            title="Reset Password"
            onPress={handleReset}
            loading={loading}
            style={styles.btn}
          />
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
  illustration: { alignItems: 'center', marginBottom: 28, marginTop: 16 },
  illustrationCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(94, 162, 95, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(94, 162, 95, 0.2)',
  },
  illustrationEmoji: { fontSize: 52 },
  title: { fontSize: 28, fontFamily: 'BeVietnamPro_700Bold', color: Colors.dark, marginBottom: 10 },
  subtitle: {
    fontSize: 15,
    fontFamily: 'BeVietnamPro_400Regular',
    color: Colors.textLight,
    marginBottom: 20,
    lineHeight: 24,
  },
  strengthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  strengthBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.inputBg,
  },
  weakBar: { backgroundColor: Colors.error },
  mediumBar: { backgroundColor: Colors.secondary },
  strongBar: { backgroundColor: Colors.tertiary },
  strengthLabel: {
    fontSize: 12,
    color: Colors.textLight,
    fontFamily: 'BeVietnamPro_500Medium',
    width: 55,
  },
  icon: { fontSize: 16 },
  btn: { marginTop: 8 },
  // Success
  successContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  successIconWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(94, 162, 95, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderWidth: 3,
    borderColor: 'rgba(94, 162, 95, 0.2)',
  },
  successEmoji: { fontSize: 52 },
  successTitle: {
    fontSize: 30,
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.dark,
    marginBottom: 12,
    textAlign: 'center',
  },
  successSubtitle: {
    fontSize: 15,
    fontFamily: 'BeVietnamPro_400Regular',
    color: Colors.textLight,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  loginBtn: { width: '100%' },
});

export default ResetPasswordScreen;
