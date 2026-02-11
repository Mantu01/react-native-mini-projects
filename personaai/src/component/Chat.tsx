import { View, Text, TextInput, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform, StatusBar } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

const Chat = ({ navigation, route }) => {
  const { key, name, role, image } = route.params;
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: `Hi! I'm ${name}. How can I help you today?`,
      sender: 'bot',
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef(null);

  const sendMessage = () => {
    if (inputText.trim().length === 0) return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    setTimeout(() => {
      const botResponse = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(inputText),
        sender: 'bot',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const generateResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return `Hello! It's great to connect with you. How are you doing today?`;
    }
    else if (input.includes('how are you')) {
      return `I'm doing wonderful, thank you for asking! I'm excited to chat with you.`;
    }
    else if (input.includes('who are you')) {
      return `I'm ${name}, ${role}. I'm here to chat and help you with anything you'd like to know!`;
    }
    else if (input.includes('what do you do') || input.includes('your work')) {
      return `As ${role}, I focus on making a positive impact. Would you like to know more about my journey?`;
    }
    else if (input.includes('thank')) {
      return `You're absolutely welcome! It's my pleasure to chat with you. 😊`;
    }
    else if (input.includes('bye') || input.includes('goodbye')) {
      return `It was wonderful talking with you! Hope to chat again soon. Take care! 👋`;
    }
    else if (input.includes('inspire') || input.includes('inspiration')) {
      return `Remember: Every great achievement begins with a dream. Keep pushing forward! ✨`;
    }
    else {
      const responses = [
        `That's an interesting perspective! Tell me more about that.`,
        `I appreciate you sharing that with me. How does that make you feel?`,
        `I completely understand what you mean. Would you like to elaborate?`,
        `That's a thoughtful question. Let me share my perspective on this.`,
        `I love this conversation! What else is on your mind?`
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderMessage = ({ item }) => (
    <View style={[
      styles.messageContainer,
      item.sender === 'user' ? styles.userMessage : styles.botMessage
    ]}>
      {item.sender === 'bot' && (
        <View style={styles.botAvatarContainer}>
          <View style={styles.botAvatar}>
            <Text style={styles.botAvatarText}>🤖</Text>
          </View>
        </View>
      )}
      <View style={[
        styles.messageBubble,
        item.sender === 'user' ? styles.userBubble : styles.botBubble
      ]}>
        <Text style={[
          styles.messageText,
          item.sender === 'user' ? styles.userMessageText : styles.botMessageText
        ]}>
          {item.text}
        </Text>
        <Text style={[
          styles.timestamp,
          item.sender === 'user' ? styles.userTimestamp : styles.botTimestamp
        ]}>
          {formatTime(item.timestamp)}
        </Text>
      </View>
    </View>
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.headerContainer}>
          <View style={styles.headerImageContainer}>
            <Text style={styles.headerImageText}>👤</Text>
          </View>
          <View>
            <Text style={styles.headerName}>{name}</Text>
            <Text style={styles.headerRole} numberOfLines={1}>{role}</Text>
          </View>
        </View>
      ),
      headerStyle: {
        backgroundColor: '#F97316',
      },
      headerTintColor: '#FFFFFF',
    });
  }, [navigation, name, role]);

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <StatusBar barStyle="light-content" backgroundColor="#F97316" />
      
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
        onLayout={() => flatListRef.current?.scrollToEnd()}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          placeholderTextColor="#B45309"
          value={inputText}
          onChangeText={setInputText}
          multiline
          maxLength={500}
        />
        <TouchableOpacity 
          style={[
            styles.sendButton,
            !inputText.trim() && styles.sendButtonDisabled
          ]} 
          onPress={sendMessage}
          disabled={!inputText.trim()}
        >
          <Icon name="send" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#FFF7ED',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: Platform.OS === 'ios' ? 0 : -16,
  },
  headerImageContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FED7AA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerImageText: {
    fontSize: 20,
  },
  headerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  headerRole: {
    fontSize: 12,
    color: '#FFEDD5',
    maxWidth: 200,
  },
  messagesList: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    maxWidth: '100%',
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  botMessage: {
    justifyContent: 'flex-start',
  },
  botAvatarContainer: {
    marginRight: 8,
    alignSelf: 'flex-end',
  },
  botAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F97316',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  botAvatarText: {
    fontSize: 16,
  },
  messageBubble: {
    maxWidth: '75%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  userBubble: {
    backgroundColor: '#F97316',
    borderBottomRightRadius: 4,
    alignSelf: 'flex-end',
  },
  botBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  botMessageText: {
    color: '#422006',
  },
  timestamp: {
    fontSize: 10,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  userTimestamp: {
    color: '#FFEDD5',
  },
  botTimestamp: {
    color: '#B45309',
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#FED7AA',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    backgroundColor: '#FFF7ED',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    paddingRight: 16,
    fontSize: 15,
    maxHeight: 100,
    color: '#422006',
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  sendButton: {
    backgroundColor: '#F97316',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    marginBottom: 0,
  },
  sendButtonDisabled: {
    backgroundColor: '#FED7AA',
  },
};

export default Chat;