import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Animated,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import { Colors } from '../theme/colors';
import CustomButton from '../components/CustomButton';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Quality',
    subtitle: 'Hand-picked, farm-fresh produce\ndelivered straight to your door.',
    emoji: '🌾',
    color: Colors.tertiary,
    bgLight: 'rgba(94, 162, 95, 0.08)',
  },
  {
    id: '2',
    title: 'Convenient',
    subtitle: 'Order from local farmers on\nyour schedule, any time.',
    emoji: '📱',
    color: Colors.primary,
    bgLight: 'rgba(213, 113, 91, 0.08)',
  },
  {
    id: '3',
    title: 'Local',
    subtitle: 'Support your community.\nBuy local, eat fresh.',
    emoji: '🏡',
    color: Colors.secondary,
    bgLight: 'rgba(242, 201, 76, 0.12)',
  },
];

const OnboardingScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.replace('Login');
    }
  };

  const handleSkip = () => {
    navigation.replace('Login');
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const renderSlide = ({ item, index }) => {
    return (
      <View style={[styles.slide, { backgroundColor: Colors.white }]}>
        {/* Illustration card */}
        <View style={[styles.illustrationCard, { backgroundColor: item.bgLight }]}>
          <View style={[styles.iconCircle, { backgroundColor: item.color }]}>
            <Text style={styles.emoji}>{item.emoji}</Text>
          </View>
          {/* Decorative blobs */}
          <View style={[styles.blob1, { backgroundColor: item.color, opacity: 0.15 }]} />
          <View style={[styles.blob2, { backgroundColor: item.color, opacity: 0.08 }]} />
        </View>

        {/* Text Content */}
        <View style={styles.textContent}>
          <View style={[styles.badge, { backgroundColor: item.bgLight }]}>
            <Text style={[styles.badgeText, { color: item.color }]}>FarmerEats</Text>
          </View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
      </View>
    );
  };

  const currentSlide = slides[currentIndex];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />

      {/* Skip button */}
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <Animated.FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        scrollEventThrottle={16}
      />

      {/* Bottom Controls */}
      <View style={styles.bottomControls}>
        {/* Dot indicators */}
        <View style={styles.dotsRow}>
          {slides.map((_, index) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];
            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [8, 24, 8],
              extrapolate: 'clamp',
            });
            const dotColor = scrollX.interpolate({
              inputRange,
              outputRange: [
                'rgba(38, 28, 18, 0.2)',
                currentSlide.color,
                'rgba(38, 28, 18, 0.2)',
              ],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={index}
                style={[styles.dot, { width: dotWidth, backgroundColor: dotColor }]}
              />
            );
          })}
        </View>

        <CustomButton
          title={currentIndex === slides.length - 1 ? 'Get Started' : 'Join the movement!'}
          onPress={handleNext}
          style={[styles.cta, { backgroundColor: currentSlide.color }]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  skipButton: {
    position: 'absolute',
    top: 52,
    right: 24,
    zIndex: 10,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: Colors.inputBg,
  },
  skipText: {
    color: Colors.textLight,
    fontFamily: 'BeVietnamPro_500Medium',
    fontSize: 14,
  },
  slide: {
    width,
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 80,
  },
  illustrationCard: {
    width: '100%',
    height: height * 0.4,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: 36,
  },
  iconCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  emoji: {
    fontSize: 58,
  },
  blob1: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    top: -40,
    right: -40,
  },
  blob2: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    bottom: -30,
    left: -30,
  },
  textContent: {
    alignItems: 'flex-start',
  },
  badge: {
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 12,
  },
  badgeText: {
    fontSize: 13,
    fontFamily: 'BeVietnamPro_600SemiBold',
  },
  title: {
    fontSize: 38,
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.dark,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'BeVietnamPro_400Regular',
    color: Colors.textLight,
    lineHeight: 26,
  },
  bottomControls: {
    paddingHorizontal: 28,
    paddingBottom: 48,
    gap: 20,
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  cta: {
    width: '100%',
  },
});

export default OnboardingScreen;
