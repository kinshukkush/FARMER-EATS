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
import { registerData } from './RegisterStep1Screen';

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
  'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
  'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma',
  'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
  'West Virginia', 'Wisconsin', 'Wyoming',
];

const RegisterStep2Screen = ({ navigation }) => {
  const [businessName, setBusinessName] = useState('');
  const [informalName, setInformalName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [showStateList, setShowStateList] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!businessName.trim()) newErrors.businessName = 'Business name is required';
    if (!address.trim()) newErrors.address = 'Address is required';
    if (!city.trim()) newErrors.city = 'City is required';
    if (!state.trim()) newErrors.state = 'State is required';
    if (!zipCode.trim()) newErrors.zipCode = 'Zip code is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validate()) return;
    Object.assign(registerData, {
      business_name: businessName.trim(),
      informal_name: informalName.trim(),
      address: address.trim(),
      city: city.trim(),
      state: state.trim(),
      zip_code: parseInt(zipCode),
      role: 'farmer',
    });
    navigation.navigate('Register3');
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
          <StepIndicator currentStep={2} totalSteps={5} />
          <Text style={styles.title}>Farm Info</Text>
          <Text style={styles.subtitle}>Tell us about your farm or business</Text>

          <View style={styles.form}>
            <CustomInput
              placeholder="Business Name"
              value={businessName}
              onChangeText={setBusinessName}
              leftIcon={<Text style={styles.icon}>🏪</Text>}
              error={errors.businessName}
            />
            <CustomInput
              placeholder="Informal Name (optional)"
              value={informalName}
              onChangeText={setInformalName}
              leftIcon={<Text style={styles.icon}>🏷️</Text>}
            />
            <CustomInput
              placeholder="Street Address"
              value={address}
              onChangeText={setAddress}
              leftIcon={<Text style={styles.icon}>📍</Text>}
              error={errors.address}
            />
            <CustomInput
              placeholder="City"
              value={city}
              onChangeText={setCity}
              leftIcon={<Text style={styles.icon}>🏙️</Text>}
              error={errors.city}
            />

            {/* State selector */}
            <TouchableOpacity
              style={[styles.stateSelector, errors.state && styles.errorBorder]}
              onPress={() => setShowStateList(!showStateList)}
            >
              <Text style={styles.stateIcon}>🗺️</Text>
              <Text style={[styles.stateText, !state && styles.placeholder]}>
                {state || 'Select State'}
              </Text>
              <Text style={styles.chevron}>{showStateList ? '▲' : '▼'}</Text>
            </TouchableOpacity>
            {errors.state && <Text style={styles.errorText}>{errors.state}</Text>}

            {showStateList && (
              <View style={styles.stateList}>
                <ScrollView nestedScrollEnabled style={{ maxHeight: 200 }}>
                  {US_STATES.map((s) => (
                    <TouchableOpacity
                      key={s}
                      style={[styles.stateItem, state === s && styles.selectedState]}
                      onPress={() => {
                        setState(s);
                        setShowStateList(false);
                      }}
                    >
                      <Text style={[styles.stateItemText, state === s && styles.selectedStateText]}>
                        {s}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}

            <CustomInput
              placeholder="Zip Code"
              value={zipCode}
              onChangeText={setZipCode}
              keyboardType="numeric"
              leftIcon={<Text style={styles.icon}>📮</Text>}
              error={errors.zipCode}
            />
          </View>

          <CustomButton title="Continue" onPress={handleNext} style={styles.btn} />
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
  content: { paddingHorizontal: 28, paddingTop: 8 },
  title: { fontSize: 28, fontFamily: 'BeVietnamPro_700Bold', color: Colors.dark, marginBottom: 6 },
  subtitle: { fontSize: 15, fontFamily: 'BeVietnamPro_400Regular', color: Colors.textLight, marginBottom: 24 },
  form: { gap: 4, marginBottom: 24 },
  icon: { fontSize: 16 },
  btn: { marginBottom: 20 },
  stateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.inputBg,
    borderRadius: 10,
    height: 52,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderColor: 'transparent',
    marginBottom: 12,
  },
  errorBorder: { borderColor: Colors.error },
  stateIcon: { fontSize: 16, marginRight: 10 },
  stateText: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'BeVietnamPro_400Regular',
    color: Colors.dark,
  },
  placeholder: { color: Colors.placeholder },
  chevron: { fontSize: 12, color: Colors.textLight },
  stateList: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: -8,
    marginBottom: 12,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  stateItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.inputBg,
  },
  selectedState: { backgroundColor: 'rgba(213,113,91,0.08)' },
  stateItemText: {
    fontSize: 14,
    fontFamily: 'BeVietnamPro_400Regular',
    color: Colors.dark,
  },
  selectedStateText: { color: Colors.primary, fontFamily: 'BeVietnamPro_600SemiBold' },
  errorText: { color: Colors.error, fontSize: 12, fontFamily: 'BeVietnamPro_400Regular', marginTop: -8, marginBottom: 12, marginLeft: 4 },
});

export default RegisterStep2Screen;
