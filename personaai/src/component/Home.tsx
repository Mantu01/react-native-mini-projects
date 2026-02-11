import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import apiClient from '../lib/api';

interface PersonaCategory {
  key: string;
  name: string;
  role: string;
  image: string;
}

const Home = ({navigation}) => {
  const [person, setPerson] = useState<Record<string, PersonaCategory[]>>({});
  const [keys, setKeys] = useState<string[]>([]);

  useEffect(() => {
    async function fetchPerson() {
      try {
        const { data } = await apiClient.get('/person', { withCredentials: true });
        setKeys(data.keys);
        setPerson(data.person);
      } catch (error) {
        console.log(error);
      }
    }

    fetchPerson();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {keys.map((categoryKey) => (
          <View key={categoryKey} style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>
              {categoryKey.toUpperCase()}
            </Text>

            {person[categoryKey]?.map((item) => (
              <TouchableOpacity onPress={()=>navigation.navigate('chat',{...item})}>
                <View key={item.key} style={styles.card}>
                  <Image 
                    source={{ uri: item.image }}
                    style={styles.image}
                  />
                  <View style={styles.info}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.role}>{item.role}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  categoryContainer: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  info: {
    marginLeft: 12,
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  role: {
    fontSize: 14,
    color: '#666',
  },
});
