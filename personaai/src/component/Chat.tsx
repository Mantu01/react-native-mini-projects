import React, { useState, useEffect, useRef } from 'react';
import {View,Text,TextInput,FlatList,TouchableOpacity,KeyboardAvoidingView,StyleSheet, Image,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import apiClient from '../lib/api';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
}

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;

const Chat = ({ navigation,route }: Props) => {
  const { key,image,name,role } = route.params;

  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const sendMessage = async () => {
    if (!text.trim()) return;
    const userMsg: Message = {
      id: uuid.v4().toString(),
      content: text,
      role: 'user',
    };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setText('');
    try {
      const { data } = await apiClient.post('/persona', {
        messages: newMessages,
        personaKey: key,
      });
      const botMsg: Message = {
        id: uuid.v4().toString(),
        content: data.message?.content || '',
        role: 'assistant',
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    AsyncStorage.getItem(key).then(res => {
      if (res) setMessages(JSON.parse(res));
    });
  }, [key]);

  useEffect(() => {
    AsyncStorage.setItem(key, JSON.stringify(messages));
  }, [messages]);

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Start chatting</Text>
    </View>
  );

  useEffect(() => {
    navigation.setOptions({ headerTitle: () => ( 
    <View style={styles.header}> 
      <Image source={{ uri: image }} style={styles.headerImage} /> 
      <View>
        <Text style={styles.headerName}>{name}</Text> 
        <Text style={styles.headerRole}>{role}</Text>
      </View>
    </View> ),
    headerTintColor: '#000', });
  }, [navigation, name, role, image]);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.message,
              item.role === 'user' ? styles.user : styles.assistant,
            ]}
          >
            <Text>{item.content}</Text>
          </View>
        )}
        ListEmptyComponent={renderEmptyState()}
      />

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Type..."
        />
        <TouchableOpacity onPress={sendMessage}>
          <Text style={styles.send}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  message: {
    padding: 10,
    margin: 6,
    borderRadius: 8,
    paddingHorizontal:20
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
  }, 
  headerImage: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    marginRight: 12, 
  }, 
  headerName: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#000', 
  }, headerRole: { 
    fontSize: 12, 
    color: '#666', 
  },
  emptyContainer: { 
    height:800,
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
  }, 
  emptyText: { 
    fontSize: 18, 
    color: '#999', 
    fontWeight: '500'
  },
  user: {
    alignSelf: 'flex-end',
    backgroundColor: '#e6f0ff',
  },
  assistant: {
    alignSelf: 'flex-start',
    backgroundColor: '#f2f2f2',
  },
  inputRow: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  input: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 8,
    borderRadius: 6,
  },
  send: {
    marginLeft: 10,
    alignSelf: 'center',
    color: '#007aff',
    fontWeight: '600',
  },
});

export default Chat;