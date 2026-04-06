import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import { Colors } from '../theme/colors';
import CustomButton from '../components/CustomButton';
import StepIndicator from '../components/StepIndicator';
import { registerData } from './RegisterStep1Screen';

const DAYS = [
  { key: 'mon', label: 'M' },
  { key: 'tue', label: 'T' },
  { key: 'wed', label: 'W' },
  { key: 'thu', label: 'T' },
  { key: 'fri', label: 'F' },
  { key: 'sat', label: 'S' },
  { key: 'sun', label: 'Su' },
];

const TIME_SLOTS = [
  '8:00am - 10:00am',
  '10:00am - 1:00pm',
  '1:00pm - 4:00pm',
  '4:00pm - 7:00pm',
  '7:00pm - 9:00pm',
];

const RegisterStep4Screen = ({ navigation }) => {
  const [selectedDay, setSelectedDay] = useState('mon');
  const [businessHours, setBusinessHours] = useState({
    mon: ['8:00am - 10:00am', '10:00am - 1:00pm'],
    tue: ['8:00am - 10:00am', '10:00am - 1:00pm'],
    wed: ['8:00am - 10:00am'],
    thu: [],
    fri: [],
    sat: [],
    sun: [],
  });

  const toggleSlot = (slot) => {
    setBusinessHours((prev) => {
      const daySlots = prev[selectedDay] || [];
      if (daySlots.includes(slot)) {
        return { ...prev, [selectedDay]: daySlots.filter((s) => s !== slot) };
      } else {
        return { ...prev, [selectedDay]: [...daySlots, slot] };
      }
    });
  };

  const handleNext = () => {
    Object.assign(registerData, { business_hours: businessHours });
    navigation.navigate('Register5');
  };

  const dayHasSlots = (dayKey) => (businessHours[dayKey] || []).length > 0;

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
          <StepIndicator currentStep={4} totalSteps={5} />
          <Text style={styles.title}>Business Hours</Text>
          <Text style={styles.subtitle}>
            Select when your farm is open for orders
          </Text>

          {/* Day selector */}
          <View style={styles.dayRow}>
            {DAYS.map((day) => (
              <TouchableOpacity
                key={day.key}
                style={[
                  styles.dayBtn,
                  selectedDay === day.key && styles.selectedDay,
                  dayHasSlots(day.key) && selectedDay !== day.key && styles.hasSlots,
                ]}
                onPress={() => setSelectedDay(day.key)}
              >
                <Text
                  style={[
                    styles.dayLabel,
                    selectedDay === day.key && styles.selectedDayLabel,
                    dayHasSlots(day.key) && selectedDay !== day.key && styles.hasSlotsLabel,
                  ]}
                >
                  {day.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Selected day info */}
          <View style={styles.dayInfoRow}>
            <Text style={styles.dayName}>
              {DAYS.find((d) => d.key === selectedDay)?.label} — {
                (businessHours[selectedDay] || []).length
              } slot(s) selected
            </Text>
          </View>

          {/* Time slots */}
          <View style={styles.slotsGrid}>
            {TIME_SLOTS.map((slot) => {
              const isSelected = (businessHours[selectedDay] || []).includes(slot);
              return (
                <TouchableOpacity
                  key={slot}
                  style={[styles.slotBtn, isSelected && styles.selectedSlot]}
                  onPress={() => toggleSlot(slot)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.slotText, isSelected && styles.selectedSlotText]}>
                    {slot}
                  </Text>
                  {isSelected && <Text style={styles.slotCheck}>✓</Text>}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Summary */}
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Schedule Summary</Text>
            {DAYS.map((day) => {
              const slots = businessHours[day.key] || [];
              if (slots.length === 0) return null;
              return (
                <View key={day.key} style={styles.summaryRow}>
                  <Text style={styles.summaryDay}>{day.key.toUpperCase()}</Text>
                  <Text style={styles.summarySlot} numberOfLines={2}>
                    {slots.join(', ')}
                  </Text>
                </View>
              );
            })}
            {DAYS.every((d) => (businessHours[d.key] || []).length === 0) && (
              <Text style={styles.noSchedule}>No hours set yet</Text>
            )}
          </View>

          <CustomButton title="Continue" onPress={handleNext} style={styles.btn} />
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
  subtitle: { fontSize: 15, fontFamily: 'BeVietnamPro_400Regular', color: Colors.textLight, marginBottom: 24 },
  dayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 6,
  },
  dayBtn: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.inputBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedDay: {
    backgroundColor: Colors.primary,
    ...Platform.select({
      ios: {
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  hasSlots: {
    backgroundColor: 'rgba(213, 113, 91, 0.15)',
  },
  dayLabel: {
    fontSize: 13,
    fontFamily: 'BeVietnamPro_600SemiBold',
    color: Colors.textLight,
  },
  selectedDayLabel: { color: Colors.white },
  hasSlotsLabel: { color: Colors.primary },
  dayInfoRow: { marginBottom: 16 },
  dayName: {
    fontSize: 14,
    fontFamily: 'BeVietnamPro_500Medium',
    color: Colors.textLight,
  },
  slotsGrid: { gap: 10, marginBottom: 24 },
  slotBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
    backgroundColor: Colors.inputBg,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  selectedSlot: {
    backgroundColor: 'rgba(213, 113, 91, 0.1)',
    borderColor: Colors.primary,
  },
  slotText: {
    fontSize: 14,
    fontFamily: 'BeVietnamPro_500Medium',
    color: Colors.dark,
  },
  selectedSlotText: { color: Colors.primary },
  slotCheck: { color: Colors.primary, fontSize: 16, fontFamily: 'BeVietnamPro_700Bold' },
  summaryCard: {
    backgroundColor: Colors.inputBg,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  summaryTitle: {
    fontSize: 15,
    fontFamily: 'BeVietnamPro_600SemiBold',
    color: Colors.dark,
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
    gap: 8,
  },
  summaryDay: {
    fontSize: 12,
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.primary,
    width: 30,
  },
  summarySlot: {
    flex: 1,
    fontSize: 12,
    fontFamily: 'BeVietnamPro_400Regular',
    color: Colors.textLight,
  },
  noSchedule: {
    fontSize: 13,
    color: Colors.textLight,
    fontFamily: 'BeVietnamPro_400Regular',
    textAlign: 'center',
    paddingVertical: 8,
  },
  btn: {},
});

export default RegisterStep4Screen;
