// screens/ChatDetailScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { db, auth } from '../../firebaseConfig';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';

export default function ChatDetailScreen({ route }) {
  const { chatRoomId } = route.params; // from ChatList
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    if (!chatRoomId) return;

    const msgsRef = collection(db, `chatRooms/${chatRoomId}/messages`);
    const q = query(msgsRef, orderBy('createdAt', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgsArray = [];
      snapshot.forEach((docSnap) => {
        msgsArray.push({ id: docSnap.id, ...docSnap.data() });
      });
      setMessages(msgsArray);
    });

    return () => unsubscribe();
  }, [chatRoomId]);

  const handleSend = async () => {
    if (!text.trim()) return;

    try {
      const msgsRef = collection(db, `chatRooms/${chatRoomId}/messages`);
      await addDoc(msgsRef, {
        text,
        senderId: auth.currentUser?.uid,
        createdAt: serverTimestamp(),
      });
      setText('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const renderItem = ({ item }) => {
    const isMe = item.senderId === auth.currentUser?.uid;
    return (
      <View style={[styles.messageContainer, isMe ? styles.me : styles.them]}>
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.chatList}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={{ color: '#fff' }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ----------------
// Styles
// ----------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatList: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  messageContainer: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 8,
    maxWidth: '80%',
  },
  me: {
    backgroundColor: '#007BFF',
    alignSelf: 'flex-end',
  },
  them: {
    backgroundColor: '#ccc',
    alignSelf: 'flex-start',
  },
  messageText: {
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    backgroundColor: '#eee',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007BFF',
    borderRadius: 20,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
});
