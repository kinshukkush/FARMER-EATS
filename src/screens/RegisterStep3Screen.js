import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
  Alert,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Colors } from '../theme/colors';
import CustomButton from '../components/CustomButton';
import StepIndicator from '../components/StepIndicator';
import { registerData } from './RegisterStep1Screen';

const RegisterStep3Screen = ({ navigation }) => {
  const [document, setDocument] = useState(null);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setDocument(result.assets[0]);
        registerData.registration_proof_file = result.assets[0];
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to pick document. Please try again.');
    }
  };

  const handleNext = () => {
    // Document is optional in some cases; allow continue
    navigation.navigate('Register4');
  };

  const formatFileSize = (size) => {
    if (!size) return '';
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

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
          <StepIndicator currentStep={3} totalSteps={5} />
          <Text style={styles.title}>Verification</Text>
          <Text style={styles.subtitle}>
            Please attach proof of business registration to verify your farm.
          </Text>

          {/* Upload area */}
          <TouchableOpacity style={styles.uploadArea} onPress={pickDocument} activeOpacity={0.7}>
            {document ? (
              <View style={styles.filePreview}>
                <View style={styles.fileIcon}>
                  <Text style={styles.fileEmoji}>
                    {document.mimeType?.includes('pdf') ? '📄' : '🖼️'}
                  </Text>
                </View>
                <View style={styles.fileMeta}>
                  <Text style={styles.fileName} numberOfLines={2}>
                    {document.name}
                  </Text>
                  <Text style={styles.fileSize}>{formatFileSize(document.size)}</Text>
                </View>
                <View style={styles.checkBadge}>
                  <Text style={styles.checkMark}>✓</Text>
                </View>
              </View>
            ) : (
              <>
                <View style={styles.cameraCircle}>
                  <Text style={styles.cameraIcon}>📎</Text>
                </View>
                <Text style={styles.uploadTitle}>Attach proof of registration</Text>
                <Text style={styles.uploadSubtitle}>
                  PDF, JPG, PNG or any document{'\n'}Tap to browse files
                </Text>
              </>
            )}
          </TouchableOpacity>

          {document && (
            <TouchableOpacity style={styles.changeFile} onPress={pickDocument}>
              <Text style={styles.changeFileText}>Change file</Text>
            </TouchableOpacity>
          )}

          {/* Info card */}
          <View style={styles.infoCard}>
            <Text style={styles.infoEmoji}>ℹ️</Text>
            <Text style={styles.infoText}>
              Your registration proof helps us verify your business and keep the platform trustworthy for buyers.
            </Text>
          </View>

          <CustomButton
            title={document ? 'Continue' : 'Skip for now'}
            onPress={handleNext}
            style={styles.btn}
          />
        </View>
      </ScrollView>
    </View>
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
  subtitle: { fontSize: 15, fontFamily: 'BeVietnamPro_400Regular', color: Colors.textLight, marginBottom: 28, lineHeight: 22 },
  uploadArea: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: 'rgba(213, 113, 91, 0.4)',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    backgroundColor: 'rgba(213, 113, 91, 0.04)',
    marginBottom: 16,
    minHeight: 200,
    justifyContent: 'center',
  },
  cameraCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(213, 113, 91, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  cameraIcon: { fontSize: 36 },
  uploadTitle: {
    fontSize: 17,
    fontFamily: 'BeVietnamPro_600SemiBold',
    color: Colors.dark,
    marginBottom: 8,
  },
  uploadSubtitle: {
    fontSize: 13,
    fontFamily: 'BeVietnamPro_400Regular',
    color: Colors.textLight,
    textAlign: 'center',
    lineHeight: 20,
  },
  filePreview: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  fileIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: 'rgba(213, 113, 91, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileEmoji: { fontSize: 28 },
  fileMeta: { flex: 1 },
  fileName: {
    fontSize: 14,
    fontFamily: 'BeVietnamPro_600SemiBold',
    color: Colors.dark,
    marginBottom: 4,
  },
  fileSize: { fontSize: 12, color: Colors.textLight, fontFamily: 'BeVietnamPro_400Regular' },
  checkBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: { color: Colors.white, fontSize: 16, fontFamily: 'BeVietnamPro_700Bold' },
  changeFile: { alignSelf: 'center', marginBottom: 20 },
  changeFileText: { color: Colors.primary, fontFamily: 'BeVietnamPro_600SemiBold', fontSize: 14 },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(94, 162, 95, 0.08)',
    borderRadius: 12,
    padding: 14,
    marginBottom: 28,
    gap: 10,
    alignItems: 'flex-start',
  },
  infoEmoji: { fontSize: 18 },
  infoText: {
    flex: 1,
    fontSize: 13,
    fontFamily: 'BeVietnamPro_400Regular',
    color: Colors.tertiary,
    lineHeight: 20,
  },
  btn: {},
});

export default RegisterStep3Screen;
