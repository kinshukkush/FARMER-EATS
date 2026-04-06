import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../theme/colors';

const StepIndicator = ({ currentStep, totalSteps }) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index + 1 === currentStep && styles.activeDot,
            index + 1 < currentStep && styles.completedDot,
          ]}
        />
      ))}
      <Text style={styles.stepText}>
        Step {currentStep} of {totalSteps}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.border,
  },
  activeDot: {
    width: 24,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  completedDot: {
    backgroundColor: Colors.primary,
    opacity: 0.5,
  },
  stepText: {
    marginLeft: 8,
    fontSize: 12,
    color: Colors.textLight,
    fontFamily: 'BeVietnamPro_400Regular',
  },
});

export default StepIndicator;
