import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import type { HomeStackParamList } from '@/navigation/types';

type HomeScreenNavigation = NativeStackNavigationProp<
  HomeStackParamList,
  'HomeScreen'
>;

interface QuestionItem {
  id: number;
  questionId: string;
  company: string;
  logo: string;
}

const QUESTIONS: QuestionItem[] = [
  { id: 1, questionId: 'q1', company: 'PhonePe', logo: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/phonepe-icon.png' },
  { id: 2, questionId: 'q2', company: 'Amazon', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLcLzvCZpIXZYzZNfibcbHTm4buIZLsuWZ7Q&s' },
  { id: 3, questionId: 'q3', company: 'PhonePe', logo: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/phonepe-icon.png' },
  { id: 4, questionId: 'q4', company: 'Google', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt3SlMjJIfui7ID0cIvHD4HNWgAzWPLZroWA&s' },
  { id: 5, questionId: 'q5', company: 'Microsoft', logo: 'https://mailmeteor.com/logos/assets/PNG/Microsoft_Logo_512px.png' },
];

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigation>();
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const getTheme = (item: QuestionItem) => {
    if (expandedId === item.id) {
      return {
        main: '#fef0b8',
        shadow: '#e5b722',
        circle: '#fdd853',
        textColor: '#000',
      };
    }
    if (expandedId !== null) {
      return {
        main: '#f2f2f2',
        shadow: '#d9d9d9',
        circle: '#e6e6e6',
        textColor: '#000',
      };
    }
    if (item.id === 1) {
      return {
        main: '#d0f5d3',
        shadow: '#75d37d',
        circle: '#9be6a2',
        textColor: '#000',
      };
    }
    if (item.id === 2) {
      return {
        main: '#fef0b8',
        shadow: '#e5b722',
        circle: '#fdd853',
        textColor: '#000',
      };
    }
    return {
      main: '#f2f2f2',
      shadow: '#d9d9d9',
      circle: '#e6e6e6',
      textColor: '#000',
    };
  };

  const renderItem = (item: QuestionItem) => {
    const theme = getTheme(item);
    const isExpanded = expandedId === item.id;
    const isStartNode = expandedId === null && item.id === 2;

    let alignStyle = {};
    if (item.id === 1) alignStyle = { alignSelf: 'flex-start', marginLeft: 60 };
    else if (item.id === 2) alignStyle = { alignSelf: 'flex-end', marginRight: 120 };
    else if (item.id === 3) alignStyle = { alignSelf: 'center', marginLeft: 100 };
    else if (item.id === 4) alignStyle = { alignSelf: 'flex-end', marginRight: 40 };
    else if (item.id === 5) alignStyle = { alignSelf: 'center', marginLeft: -20 };

    return (
      <View key={item.id} style={[styles.itemWrapper, alignStyle]}>
        {isStartNode && (
          <View style={styles.startTooltip}>
            <Text style={styles.startTooltipText}>START</Text>
            <View style={styles.startTooltipTriangle} />
          </View>
        )}

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => toggleExpand(item.id)}
          style={[styles.pillContainer, { backgroundColor: theme.main, borderBottomColor: theme.shadow }]}
        >
          <View style={styles.pillLeft}>
            <Text style={styles.companyText}>{item.company}</Text>
            <Image source={{ uri: item.logo }} style={styles.companyLogo} />
          </View>
          <View style={[styles.numberCircle, { backgroundColor: theme.circle, borderBottomColor: theme.shadow }]}>
            <Text style={styles.numberText}>{item.id}</Text>
          </View>
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.expandedContainer}>
            <View style={styles.expandedTriangle} />
            <View style={styles.expandedCard}>
              <Text style={styles.expandedQuestion}>
                API latency is variable & app is sluggish, How do you design UI safely?
              </Text>
              <View style={styles.expandedMeta}>
                <Text style={styles.metaText}>Asked by {item.company}</Text>
                <View style={styles.timerContainer}>
                  <Ionicons name="timer-outline" size={14} color="#666" />
                  <Text style={styles.metaText}> 2 mins</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.feedbackBtn}
                onPress={() =>
                  navigation.navigate('SessionResult', {
                    questionId: item.questionId,
                  })
                }
              >
                <Text style={styles.feedbackText}>FEEDBACK</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.aiBtn}>
                <Ionicons name="headset" size={16} color="#fff" />
                <Text style={styles.aiText}> AI VS AI (LISTEN)</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Image
          source={require('../../../../assets/text-logo.png')}
          style={styles.readyImage}
        />
        <View style={styles.headerRight}>
          <View style={styles.lightningPill}>
            <Ionicons name="flash" size={14} color="#fff" />
            <Text style={styles.lightningText}>8</Text>
          </View>
          <TouchableOpacity style={styles.menuBtn}>
            <Ionicons name="menu" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        <View style={styles.subHeader}>
          <Text style={styles.muscleEmoji}>💪</Text>
          <View style={styles.subHeaderTextContainer}>
            <Text style={styles.subHeaderTextLine1}>Practicing Top 50 Questions for</Text>
            <Text style={styles.subHeaderTextLine2}>Big Tech Companies</Text>
          </View>
          <Ionicons name="chevron-down" size={20} color="#666" />
        </View>

        {QUESTIONS.slice(0, 3).map(renderItem)}

        <View style={styles.separatorContainer}>
          <View style={styles.dashedLine} />
          <View style={styles.separatorContent}>
            <Ionicons name="flag" size={14} color="#c6a237" />
            <Text style={styles.separatorText}>2,312 users completed Question 3 today</Text>
            <Ionicons name="flag" size={14} color="#c6a237" />
          </View>
        </View>

        {QUESTIONS.slice(3).map(renderItem)}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
  },
  readyImage: {
    width: 90,
    height: 35,
    resizeMode: 'contain',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lightningPill: {
    backgroundColor: '#55c97f',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 10,
  },
  lightningText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 4,
    fontSize: 14,
  },
  menuBtn: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  subHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fcf3d7',
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#f2e5ba',
    borderBottomWidth: 4,
    marginBottom: 30,
  },
  muscleEmoji: {
    fontSize: 24,
    marginRight: 15,
  },
  subHeaderTextContainer: {
    flex: 1,
  },
  subHeaderTextLine1: {
    fontSize: 12,
    color: '#666',
  },
  subHeaderTextLine2: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 2,
  },
  itemWrapper: {
    marginBottom: 20,
    position: 'relative',
  },
  pillContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
    width: 190,
    borderRadius: 27,
    borderBottomWidth: 4,
    paddingLeft: 10,
    paddingRight: 50,
  },
  pillLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:"space-around",
    flex: 1,
  },
  companyLogo: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  companyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  numberCircle: {
    position: 'absolute',
    right: -10,
    top: -4,
    width: 62,
    height: 62,
    borderRadius: 31,
    borderBottomWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: {
    fontSize: 26,
    fontWeight: '900',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  startTooltip: {
    position: 'absolute',
    top: -45,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 10,
  },
  startTooltipText: {
    color: '#55c97f',
    fontWeight: 'bold',
    fontSize: 12,
  },
  startTooltipTriangle: {
    position: 'absolute',
    bottom: -6,
    alignSelf: 'center',
    borderTopWidth: 6,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopColor: '#fff',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  expandedContainer: {
    marginTop: 10,
    alignItems: 'center',
    width: 300,
    alignSelf: 'center',
  },
  expandedTriangle: {
    width: 0,
    height: 0,
    borderBottomWidth: 10,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomColor: '#fdd853',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  expandedCard: {
    backgroundColor: '#fdd853',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  expandedQuestion: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    lineHeight: 22,
    marginBottom: 15,
  },
  expandedMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  metaText: {
    fontSize: 12,
    color: '#555',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  feedbackBtn: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  feedbackText: {
    color: '#00b873',
    fontWeight: 'bold',
    fontSize: 13,
  },
  aiBtn: {
    backgroundColor: '#8c7b4c',
    borderRadius: 10,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  aiText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
    marginLeft: 6,
  },
  separatorContainer: {
    marginVertical: 30,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  dashedLine: {
    position: 'absolute',
    width: '100%',
    height: 1,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#e0c984',
    top: '50%',
  },
  separatorContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
  separatorText: {
    color: '#c6a237',
    fontSize: 11,
    fontWeight: '600',
    marginHorizontal: 8,
  },
});