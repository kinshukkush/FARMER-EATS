import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
  Animated,
} from 'react-native';
import { Colors } from '../theme/colors';
import CustomButton from '../components/CustomButton';
import StepIndicator from '../components/StepIndicator';
import { registerData } from './RegisterStep1Screen';
import { registerUser } from '../api/authApi';
import { useAuth } from '../context/AuthContext';

const RegisterStep5Screen = ({ navigation }) => {
  const { saveToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Build FormData for multipart upload
      const formData = new FormData();
      formData.append('full_name', registerData.full_name || '');
      formData.append('email', registerData.email || '');
      formData.append('phone', registerData.phone || '');
      formData.append('password', registerData.password || '');
      formData.append('role', registerData.role || 'farmer');
      formData.append('business_name', registerData.business_name || '');
      formData.append('informal_name', registerData.informal_name || '');
      formData.append('address', registerData.address || '');
      formData.append('city', registerData.city || '');
      formData.append('state', registerData.state || '');
      formData.append('zip_code', registerData.zip_code || '');
      formData.append('business_hours', JSON.stringify(registerData.business_hours || {}));
      formData.append('device_token', 'expo_device_token');
      formData.append('type', 'email');

      if (registerData.registration_proof_file) {
        const file = registerData.registration_proof_file;
        formData.append('registration_proof', {
          uri: file.uri,
          name: file.name,
          type: file.mimeType || 'application/octet-stream',
        });
      }

      const result = await registerUser(formData);

      if (result.success === 'true' || result.success === true) {
        setSuccess(true);
        if (result.token) {
          await saveToken(result.token);
        }
      } else {
        Alert.alert('Registration Failed', result.message || 'Unable to register. Please try again.');
      }
    } catch (error) {
      // Still show success screen as server might not support all fields
      // but registration attempt was made
      if (error?.response?.status === 200 || !error?.response) {
        Alert.alert('Error', error?.response?.data?.message || 'Network error. Please check your connection.');
      } else {
        Alert.alert('Error', error?.response?.data?.message || 'Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <View style={styles.successContainer}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
        <View style={styles.successContent}>
          <View style={styles.successIcon}>
            <Text style={styles.checkEmoji}>✅</Text>
          </View>
          <Text style={styles.successTitle}>You're all done!</Text>
          <Text style={styles.successSubtitle}>
            Your account has been created successfully. Welcome to the FarmerEats community!
          </Text>

          {/* Confetti dots */}
          <View style={styles.confettiRow}>
            {['🌾', '🥕', '🍅', '🥬', '🌽', '🍇'].map((emoji, i) => (
              <Text key={i} style={styles.confettiEmoji}>{emoji}</Text>
            ))}
          </View>

          <CustomButton
            title="Go to Home"
            onPress={() => navigation.replace('Home')}
            style={styles.homeBtn}
          />
          <CustomButton
            title="Back to Login"
            onPress={() => navigation.replace('Login')}
            variant="outline"
            style={styles.loginBtn}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.flex}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.scrollContent}
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
          <StepIndicator currentStep={5} totalSteps={5} />
          <Text style={styles.title}>Almost Done!</Text>
          <Text style={styles.subtitle}>
            Review your details and complete registration
          </Text>

          {/* Review card */}
          <View style={styles.reviewCard}>
            <Text style={styles.reviewSectionTitle}>Personal Info</Text>
            <ReviewRow label="Name" value={registerData.full_name} />
            <ReviewRow label="Email" value={registerData.email} />
            <ReviewRow label="Phone" value={registerData.phone} />

            <View style={styles.reviewDivider} />
            <Text style={styles.reviewSectionTitle}>Business Info</Text>
            <ReviewRow label="Business" value={registerData.business_name} />
            <ReviewRow label="Address" value={registerData.address} />
            <ReviewRow label="City" value={registerData.city} />
            <ReviewRow label="State" value={registerData.state} />
            <ReviewRow label="Zip" value={`${registerData.zip_code || ''}`} />

            <View style={styles.reviewDivider} />
            <Text style={styles.reviewSectionTitle}>Documents</Text>
            <ReviewRow
              label="Proof"
              value={registerData.registration_proof_file?.name || 'Not uploaded'}
            />
          </View>

          <CustomButton
            title="Submit Registration"
            onPress={handleSubmit}
            loading={loading}
            style={styles.btn}
          />

          <Text style={styles.termsText}>
            By registering, you agree to FarmerEats' Terms of Service and Privacy Policy.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const ReviewRow = ({ label, value }) => (
  <View style={styles.reviewRow}>
    <Text style={styles.reviewLabel}>{label}</Text>
    <Text style={styles.reviewValue} numberOfLines={2}>{value || '-'}</Text>
  </View>
);

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
  content: { paddingHorizontal: 28, paddingTop: 8 },
  title: { fontSize: 28, fontFamily: 'BeVietnamPro_700Bold', color: Colors.dark, marginBottom: 6 },
  subtitle: { fontSize: 15, fontFamily: 'BeVietnamPro_400Regular', color: Colors.textLight, marginBottom: 24 },
  reviewCard: {
    backgroundColor: Colors.inputBg,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
  },
  reviewSectionTitle: {
    fontSize: 14,
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.primary,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  reviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
    gap: 8,
  },
  reviewLabel: {
    fontSize: 13,
    fontFamily: 'BeVietnamPro_500Medium',
    color: Colors.textLight,
    width: 60,
  },
  reviewValue: {
    flex: 1,
    fontSize: 13,
    fontFamily: 'BeVietnamPro_600SemiBold',
    color: Colors.dark,
    textAlign: 'right',
  },
  reviewDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 12,
  },
  btn: { marginBottom: 16 },
  termsText: {
    fontSize: 12,
    color: Colors.textLight,
    fontFamily: 'BeVietnamPro_400Regular',
    textAlign: 'center',
    lineHeight: 18,
  },
  // Success screen
  successContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  successContent: { alignItems: 'center', width: '100%' },
  successIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(94, 162, 95, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  checkEmoji: { fontSize: 56 },
  successTitle: {
    fontSize: 32,
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.dark,
    marginBottom: 12,
    textAlign: 'center',
  },
  successSubtitle: {
    fontSize: 16,
    fontFamily: 'BeVietnamPro_400Regular',
    color: Colors.textLight,
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 28,
  },
  confettiRow: { flexDirection: 'row', gap: 8, marginBottom: 40 },
  confettiEmoji: { fontSize: 24 },
  homeBtn: { width: '100%', marginBottom: 12 },
  loginBtn: { width: '100%' },
});

export default RegisterStep5Screen;
