import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Colors } from '../theme/colors';
import CustomButton from '../components/CustomButton';
import { verifyOTP, forgotPassword } from '../api/authApi';

const OTPScreen = ({ navigation, route }) => {
  const { mobile } = route.params || {};
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const inputs = useRef([]);

  useEffect(() => {
    if (resendTimer > 0) {
      const t = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [resendTimer]);

  const handleOtpChange = (val, index) => {
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);
    if (val && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const otpStr = otp.join('');
    if (otpStr.length < 6) {
      Alert.alert('Invalid OTP', 'Please enter the full 6-digit OTP');
      return;
    }
    setLoading(true);
    try {
      const result = await verifyOTP(otpStr);
      if (result.success === 'true' || result.success === true) {
        navigation.navigate('ResetPassword', { token: result.token || otpStr });
      } else {
        Alert.alert('Verification Failed', result.message || 'Invalid OTP. Please try again.');
      }
    } catch (err) {
      Alert.alert('Error', err?.response?.data?.message || 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!mobile) return;
    try {
      await forgotPassword(mobile);
      setResendTimer(30);
      setOtp(['', '', '', '', '', '']);
      inputs.current[0]?.focus();
      Alert.alert('OTP Resent', 'A new OTP has been sent to your mobile.');
    } catch (err) {
      Alert.alert('Error', 'Could not resend OTP. Please try again.');
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
          <View style={styles.illustration}>
            <View style={styles.illustrationCircle}>
              <Text style={styles.illustrationEmoji}>💬</Text>
            </View>
          </View>

          <Text style={styles.title}>Verify OTP</Text>
          <Text style={styles.subtitle}>
            We sent a 6-digit code to{'\n'}
            <Text style={styles.mobile}>{mobile || 'your mobile number'}</Text>
          </Text>

          {/* OTP Input boxes */}
          <View style={styles.otpRow}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputs.current[index] = ref)}
                style={[
                  styles.otpBox,
                  digit && styles.otpBoxFilled,
                ]}
                value={digit}
                onChangeText={(val) => handleOtpChange(val.replace(/[^0-9]/g, ''), index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="numeric"
                maxLength={1}
                textAlign="center"
                selectTextOnFocus
              />
            ))}
          </View>

          <CustomButton
            title="Verify OTP"
            onPress={handleSubmit}
            loading={loading}
            disabled={otp.join('').length < 6}
            style={styles.btn}
          />

          {/* Resend */}
          <View style={styles.resendRow}>
            <Text style={styles.resendText}>Didn't receive code? </Text>
            {resendTimer > 0 ? (
              <Text style={styles.timerText}>Resend in {resendTimer}s</Text>
            ) : (
              <TouchableOpacity onPress={handleResend}>
                <Text style={styles.resendLink}>Resend Code</Text>
              </TouchableOpacity>
            )}
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
  backIcon: { fontSize: 20, color: Colors.dark, fontFamily: 'BeVietnamPro_700Bold' },
  brand: { fontSize: 18, fontFamily: 'BeVietnamPro_700Bold', color: Colors.dark },
  content: { paddingHorizontal: 28, paddingTop: 12 },
  illustration: { alignItems: 'center', marginBottom: 28, marginTop: 16 },
  illustrationCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(242, 201, 76, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(242, 201, 76, 0.3)',
  },
  illustrationEmoji: { fontSize: 52 },
  title: { fontSize: 28, fontFamily: 'BeVietnamPro_700Bold', color: Colors.dark, marginBottom: 10 },
  subtitle: {
    fontSize: 15,
    fontFamily: 'BeVietnamPro_400Regular',
    color: Colors.textLight,
    marginBottom: 32,
    lineHeight: 24,
    textAlign: 'center',
  },
  mobile: { color: Colors.dark, fontFamily: 'BeVietnamPro_600SemiBold' },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    gap: 8,
  },
  otpBox: {
    width: 50,
    height: 58,
    borderRadius: 12,
    backgroundColor: Colors.inputBg,
    borderWidth: 2,
    borderColor: 'transparent',
    fontSize: 22,
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.dark,
    textAlign: 'center',
  },
  otpBoxFilled: {
    borderColor: Colors.primary,
    backgroundColor: 'rgba(213, 113, 91, 0.06)',
  },
  btn: { marginBottom: 20 },
  resendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resendText: { fontSize: 14, color: Colors.textLight, fontFamily: 'BeVietnamPro_400Regular' },
  timerText: { fontSize: 14, color: Colors.textLight, fontFamily: 'BeVietnamPro_600SemiBold' },
  resendLink: { fontSize: 14, color: Colors.primary, fontFamily: 'BeVietnamPro_700Bold' },
});

export default OTPScreen;
