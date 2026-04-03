import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { getSessionResultForQuestion } from '@/lib/session-result';
import type { HomeStackScreenProps } from '@/navigation/types';

type Tab = 'Smart summary' | 'Key moments';

function formatMmSs(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function SessionResultScreen({
  navigation,
  route,
}: HomeStackScreenProps<'SessionResult'>) {
  const data = getSessionResultForQuestion(route.params.questionId);
  const [activeTab, setActiveTab] = useState<Tab>('Smart summary');

  const renderContent = () => {
    if (activeTab === 'Smart summary') {
      return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <Text style={styles.sectionHeader}>What worked well</Text>
          {data.smartSummary.whatWorkedWell.map((line, index) => (
            <View key={`well-${index}`} style={styles.bulletItem}>
              <Text style={styles.bulletPoint}>✦</Text>
              <Text style={styles.bulletText}>{line}</Text>
            </View>
          ))}

          <Text style={[styles.sectionHeader, { marginTop: 24 }]}>Overall takeaways</Text>
          {data.smartSummary.overallTakeaways.map((line, index) => (
            <View key={`takeaway-${index}`} style={styles.bulletItem}>
              <Text style={styles.bulletPoint}>✦</Text>
              <Text style={styles.bulletText}>{line}</Text>
            </View>
          ))}
        </ScrollView>
      );
    }

    const endTime = formatMmSs(data.audioDurationSeconds);

    return (
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.audioPlayer}>
          <TouchableOpacity style={styles.playButton}>
            <Ionicons name="play" size={24} color="#E67E22" />
          </TouchableOpacity>
          <View style={styles.audioInfo}>
            <Text style={styles.audioLabel}>Mock Interview</Text>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: '40%' }]} />
            </View>
            <View style={styles.timeLabels}>
              <Text style={styles.timeText}>00:00</Text>
              <Text style={styles.timeText}>{endTime}</Text>
            </View>
          </View>
        </View>

        {data.keyMoments.map((moment, index) => (
          <View key={index} style={styles.momentItem}>
            <Text style={styles.momentTime}>{moment.timestamp}</Text>
            <Text style={styles.momentDescription}>{moment.description}</Text>
          </View>
        ))}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarWrapper}>
            <Image
              source={require('../../../../assets/boy-face.png')}
              style={styles.avatar}
              cachePolicy="memory-disk"
              />
          </View>
          <View style={[styles.avatarWrapper, { marginLeft: -15 }]}>
            <Image
              source={require('../../../../assets/girl-face.png')}
              style={styles.avatar}
              cachePolicy="memory-disk"
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Close"
        >
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.questionCard}>
        <Text style={styles.questionText}>{data.questionText}</Text>
        <View style={styles.companyRow}>
          <Image
            source={{ uri: data.companyLogoUrl }}
            style={styles.companyLogo}
            contentFit="contain"
            cachePolicy="memory-disk"
          />
          <Text style={styles.askedByText}>Asked by {data.companyName}</Text>
        </View>
        <View style={styles.cardArrow} />
      </View>

      <View style={styles.bottomSheet}>
        <View style={styles.tabBar}>
          <TouchableOpacity
            onPress={() => setActiveTab('Smart summary')}
            style={[styles.tabItem, activeTab === 'Smart summary' && styles.activeTabItem]}
          >
            <Text style={[styles.tabText, activeTab === 'Smart summary' && styles.activeTabText]}>
              Smart summary
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('Key moments')}
            style={[styles.tabItem, activeTab === 'Key moments' && styles.activeTabItem]}
          >
            <Text style={[styles.tabText, activeTab === 'Key moments' && styles.activeTabText]}>
              Key moments
            </Text>
          </TouchableOpacity>
        </View>

        {renderContent()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F2F1',
    paddingVertical:20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  avatarWrapper: {
    width: 85,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: 'white',
    overflow: 'hidden',
    backgroundColor: '#FFF',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#A5D6A7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionCard: {
    backgroundColor: '#26C678',
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    zIndex: 1,
  },
  questionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 22,
  },
  companyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  companyLogo: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  askedByText: {
    color: 'white',
    marginLeft: 8,
    fontSize: 13,
    fontWeight: '500',
  },
  cardArrow: {
    position: 'absolute',
    bottom: -10,
    width: 20,
    height: 20,
    backgroundColor: '#26C678',
    transform: [{ rotate: '45deg' }],
  },
  bottomSheet: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 25,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 10,
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    marginHorizontal: 20,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTabItem: {
    borderBottomWidth: 2,
    borderBottomColor: '#333',
  },
  tabText: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#333',
  },
  scrollContent: {
    padding: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: '#444',
    marginBottom: 15,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  bulletPoint: {
    fontSize: 12,
    color: '#999',
    marginRight: 8,
    marginTop: 2,
  },
  bulletText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
    lineHeight: 20,
  },
  audioPlayer: {
    backgroundColor: '#FFF5EE',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  playButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  audioInfo: {
    flex: 1,
    marginLeft: 15,
  },
  audioLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E67E22',
    marginBottom: 8,
  },
  progressBarBg: {
    height: 4,
    backgroundColor: '#FFDAB9',
    borderRadius: 2,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#E67E22',
    borderRadius: 2,
  },
  timeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  timeText: {
    fontSize: 11,
    color: '#A0522D',
  },
  momentItem: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  momentTime: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4A90E2',
    marginBottom: 6,
  },
  momentDescription: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
});
