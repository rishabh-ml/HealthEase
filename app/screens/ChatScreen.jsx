import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';

const ChatScreen = ({ route }) => {
  const { patientId } = route.params;

  const [messages, setMessages] = useState([
    { id: '1', text: 'Hello, how can I help you today?', sender: 'doctor' },
    { id: '2', text: 'I have a fever and headache.', sender: 'patient' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim() === '') return;

    const newMessageObject = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'patient',
    };
    setMessages((prevMessages) => [...prevMessages, newMessageObject]);
    setNewMessage('');
  };

  const renderMessage = ({ item }) => (
    <View
      style={
        item.sender === 'doctor' ? styles.doctorMessageContainer : styles.patientMessageContainer
      }
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Chat with Patient</Text>
        <Text style={styles.subHeaderText}>Patient ID: {patientId}</Text>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.messageList}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={newMessage}
          onChangeText={(text) => setNewMessage(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#007BFF',
    padding: 15,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subHeaderText: {
    color: '#ddd',
    fontSize: 14,
    marginTop: 5,
  },
  messageList: {
    flexGrow: 1,
    padding: 10,
  },
  doctorMessageContainer: {
    backgroundColor: '#007BFF',
    alignSelf: 'flex-start',
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    maxWidth: '70%',
  },
  patientMessageContainer: {
    backgroundColor: '#28A745',
    alignSelf: 'flex-end',
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    maxWidth: '70%',
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    padding: 10,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  sendButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginLeft: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ChatScreen;
