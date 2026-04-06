import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Colors } from '../theme/colors';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  const logoScale = useRef(new Animated.Value(0.3)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const bgScale = useRef(new Animated.Value(1.3)).current;

  useEffect(() => {
    StatusBar.setBarStyle('light-content');

    Animated.sequence([
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(bgScale, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(taglineOpacity, {
        toValue: 1,
        duration: 500,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />

      {/* Decorative circles */}
      <Animated.View style={[styles.circle1, { transform: [{ scale: bgScale }] }]} />
      <Animated.View style={[styles.circle2, { transform: [{ scale: bgScale }] }]} />

      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: logoOpacity,
            transform: [{ scale: logoScale }],
          },
        ]}
      >
        {/* Leaf icon */}
        <View style={styles.iconWrapper}>
          <Text style={styles.leafIcon}>🌿</Text>
        </View>

        <Text style={styles.logoText}>
          Farmer<Text style={styles.logoHighlight}>Eats</Text>
        </Text>

        <Animated.Text style={[styles.tagline, { opacity: taglineOpacity }]}>
          Farm Fresh, Delivered Local
        </Animated.Text>
      </Animated.View>

      <Animated.View style={[styles.bottomWave, { opacity: taglineOpacity }]}>
        <Text style={styles.bottomText}>Connecting farmers to your table</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle1: {
    position: 'absolute',
    width: width * 1.2,
    height: width * 1.2,
    borderRadius: width * 0.6,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    top: -width * 0.3,
    left: -width * 0.1,
  },
  circle2: {
    position: 'absolute',
    width: width * 0.9,
    height: width * 0.9,
    borderRadius: width * 0.45,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    bottom: -width * 0.2,
    right: -width * 0.2,
  },
  logoContainer: {
    alignItems: 'center',
  },
  iconWrapper: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  leafIcon: {
    fontSize: 42,
  },
  logoText: {
    fontSize: 42,
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.white,
    letterSpacing: 1,
  },
  logoHighlight: {
    color: Colors.secondary,
  },
  tagline: {
    fontSize: 15,
    fontFamily: 'BeVietnamPro_400Regular',
    color: 'rgba(255,255,255,0.85)',
    marginTop: 10,
    letterSpacing: 0.5,
  },
  bottomWave: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
  },
  bottomText: {
    color: 'rgba(255,255,255,0.6)',
    fontFamily: 'BeVietnamPro_400Regular',
    fontSize: 13,
  },
});

export default SplashScreen;
