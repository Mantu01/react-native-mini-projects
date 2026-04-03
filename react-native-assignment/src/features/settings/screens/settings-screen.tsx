import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Image } from 'expo-image';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import userData from '@/mock-data/user.json';
import { useAuth } from '@/context/auth-context';
import type { User } from '@/types/user';
import type { MainTabScreenProps } from '@/navigation/types';

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  isLast?: boolean;
  onPress?: () => void;
}

const COLORS = {
  background: '#F7F8FA',
  white: '#FFFFFF',
  black: '#1A1A1A',
  gold: '#FFD700',
  textSecondary: '#9E9E9E',
  border: '#F0F0F0',
  successLight: '#E8F5F1',
  successDark: '#50B498',
  bannerBg: '#1C1C1E',
  bannerBtn: '#FFF8E7',
  bannerBtnText: '#8B6B23',
};

export function SettingsScreen({
  navigation,
}: MainTabScreenProps<'Settings'>) {
  const user = userData as User;
  const { logout, phoneDigits } = useAuth();
  const phoneDisplay = phoneDigits ? `+91 ${phoneDigits}` : user.phone;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          onPress={() => navigation.navigate('Home')}
        >
          <Feather name="chevron-left" size={28} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Profile</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.banner}>
          <View style={styles.bannerLeft}>
            <Text style={styles.bannerTitle}>3 days free trial for</Text>
            <Text style={styles.bannerPrice}>₹1</Text>
            <Text style={styles.bannerSubtitle}>Then ₹299/month</Text>

            <TouchableOpacity style={styles.bannerCTA} activeOpacity={0.8}>
              <Text style={styles.bannerCTAText}>START 3 DAYS TRIAL @ ₹1</Text>
            </TouchableOpacity>
          </View>

          <Image
            source={require('../../../../assets/profile-pic.png')}
            style={styles.bannerCharacter}
            contentFit="contain"
          />
        </View>

        <View style={styles.updateCard}>
          <View style={styles.row}>
            <MaterialCommunityIcons name="grid-large" size={20} color={COLORS.textSecondary} />
            <Text style={styles.cardText}>New update available</Text>
          </View>
          <View style={styles.downloadBadge}>
            <Feather name="download" size={14} color={COLORS.successDark} />
          </View>
        </View>

        <View style={styles.sectionCard}>
          <InfoRow
            icon={<Feather name="phone" size={18} color={COLORS.textSecondary} />}
            label="Phone number"
            value={phoneDisplay}
          />
          <InfoRow
            icon={<MaterialCommunityIcons name="clock-outline" size={19} color={COLORS.textSecondary} />}
            label="Learning since"
            value="August 17, 2025"
            isLast
          />
        </View>

        <View style={styles.sectionCard}>
          <MenuListItem
            icon={<Ionicons name="chatbubble-outline" size={20} color={COLORS.textSecondary} />}
            label="Chat with us"
          />
          <MenuListItem
            icon={<Feather name="share" size={19} color={COLORS.textSecondary} />}
            label="Share the app"
          />
          <MenuListItem
            icon={<Feather name="star" size={19} color={COLORS.textSecondary} />}
            label="Rate the app"
          />
          <MenuListItem
            icon={<Feather name="log-out" size={19} color={COLORS.textSecondary} />}
            label="Log out"
            isLast
            onPress={logout}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>App version v2.14.2</Text>
          <Text style={styles.footerText}>Made with ❤️ from India</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const InfoRow: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
  isLast?: boolean;
}> = ({ icon, label, value, isLast }) => (
  <View style={[styles.infoRow, isLast && { borderBottomWidth: 0 }]}>
    <View style={styles.row}>
      {icon}
      <Text style={styles.cardText}>{label}</Text>
    </View>
    <Text style={styles.valueText}>{value}</Text>
  </View>
);

const MenuListItem: React.FC<MenuItemProps> = ({ icon, label, isLast, onPress }) => (
  <TouchableOpacity
    style={[styles.menuItem, isLast && { borderBottomWidth: 0 }]}
    onPress={onPress}
    activeOpacity={0.6}
  >
    <View style={styles.row}>
      {icon}
      <Text style={styles.cardText}>{label}</Text>
    </View>
    <Feather name="chevron-right" size={20} color="#D1D1D6" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 25,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.black,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  banner: {
    backgroundColor: COLORS.bannerBg,
    borderRadius: 24,
    height: 190,
    flexDirection: 'row',
    padding: 24,
    marginBottom: 16,
    overflow: 'hidden',
  },
  bannerLeft: {
    flex: 1,
    justifyContent: 'center',
    zIndex: 10,
  },
  bannerTitle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
  bannerPrice: {
    color: COLORS.gold,
    fontSize: 36,
    fontWeight: '900',
    marginVertical: -2,
  },
  bannerSubtitle: {
    color: '#929292',
    fontSize: 12,
    marginBottom: 16,
  },
  bannerCTA: {
    width: '100%',
    backgroundColor: COLORS.bannerBtn,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
    minWidth: 200,
  },
  bannerCTAText: {
    color: COLORS.bannerBtnText,
    fontSize: 13,
    fontWeight: '800',
    textAlign: 'center',
  },
  bannerCharacter: {
    width: 140,
    height: '200%',
    position: 'absolute',
    right: 0,
    bottom: -10,
  },
  updateCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sectionCard: {
    backgroundColor: COLORS.white,
    borderRadius: 22,
    paddingHorizontal: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cardText: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.black,
  },
  valueText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  downloadBadge: {
    backgroundColor: COLORS.successLight,
    padding: 6,
    borderRadius: 8,
  },
  footer: {
    alignItems: 'center',
    marginTop: 44,
    gap: 4,
  },
  footerText: {
    fontSize: 13,
    color: '#BBBBBB',
  },
});
