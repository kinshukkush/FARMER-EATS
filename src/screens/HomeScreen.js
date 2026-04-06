import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
  Platform,
} from 'react-native';
import { Colors } from '../theme/colors';
import CustomButton from '../components/CustomButton';
import { useAuth } from '../context/AuthContext';

const HomeScreen = ({ navigation }) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await logout();
          navigation.replace('Login');
        },
      },
    ]);
  };

  const features = [
    { emoji: '🌾', title: 'Browse Products', desc: 'Shop fresh farm produce' },
    { emoji: '🛒', title: 'My Orders', desc: 'Track your deliveries' },
    { emoji: '🤝', title: 'Farm Network', desc: 'Connect with local farmers' },
    { emoji: '📊', title: 'Analytics', desc: 'View your farm stats' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>Welcome back! 👋</Text>
            <Text style={styles.brand}>FarmerEats</Text>
          </View>
          <TouchableOpacity style={styles.avatarBtn}>
            <Text style={styles.avatar}>🧑‍🌾</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>12</Text>
            <Text style={styles.statLabel}>Products</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statCard}>
            <Text style={styles.statNum}>8</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statCard}>
            <Text style={styles.statNum}>4.8⭐</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        {/* Banner */}
        <View style={styles.banner}>
          <View style={styles.bannerText}>
            <Text style={styles.bannerTitle}>Ready to sell?</Text>
            <Text style={styles.bannerSubtitle}>List your products and reach hundreds of local buyers today.</Text>
          </View>
          <Text style={styles.bannerEmoji}>🚀</Text>
        </View>

        <Text style={styles.sectionTitle}>Quick Actions</Text>

        <View style={styles.featuresGrid}>
          {features.map((feat, i) => (
            <TouchableOpacity key={i} style={styles.featureCard} activeOpacity={0.8}>
              <View style={styles.featureIcon}>
                <Text style={styles.featureEmoji}>{feat.emoji}</Text>
              </View>
              <Text style={styles.featureTitle}>{feat.title}</Text>
              <Text style={styles.featureDesc}>{feat.desc}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <CustomButton
          title="Logout"
          onPress={handleLogout}
          variant="outline"
          style={styles.logoutBtn}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F5F2' },
  header: {
    backgroundColor: Colors.primary,
    paddingTop: 52,
    paddingHorizontal: 24,
    paddingBottom: 28,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    fontFamily: 'BeVietnamPro_400Regular',
  },
  brand: {
    fontSize: 28,
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.white,
  },
  avatarBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: { fontSize: 24 },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  statCard: { flex: 1, alignItems: 'center' },
  statNum: { fontSize: 20, fontFamily: 'BeVietnamPro_700Bold', color: Colors.white, marginBottom: 2 },
  statLabel: { fontSize: 12, color: 'rgba(255,255,255,0.75)', fontFamily: 'BeVietnamPro_400Regular' },
  statDivider: { width: 1, height: 32, backgroundColor: 'rgba(255,255,255,0.3)' },
  body: { flex: 1, paddingHorizontal: 24, paddingTop: 24 },
  banner: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  bannerText: { flex: 1, paddingRight: 12 },
  bannerTitle: { fontSize: 18, fontFamily: 'BeVietnamPro_700Bold', color: Colors.dark, marginBottom: 4 },
  bannerSubtitle: { fontSize: 13, fontFamily: 'BeVietnamPro_400Regular', color: Colors.textLight, lineHeight: 20 },
  bannerEmoji: { fontSize: 40 },
  sectionTitle: { fontSize: 18, fontFamily: 'BeVietnamPro_700Bold', color: Colors.dark, marginBottom: 16 },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 28,
  },
  featureCard: {
    width: '47%',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  featureIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(213, 113, 91, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  featureEmoji: { fontSize: 22 },
  featureTitle: { fontSize: 14, fontFamily: 'BeVietnamPro_600SemiBold', color: Colors.dark, marginBottom: 4 },
  featureDesc: { fontSize: 12, fontFamily: 'BeVietnamPro_400Regular', color: Colors.textLight },
  logoutBtn: { marginBottom: 40 },
});

export default HomeScreen;
