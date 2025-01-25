// screens/ChatListScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { db, auth } from '../../firebaseConfig';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

export default function ChatListScreen({ navigation }) {
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    const currentUid = auth.currentUser?.uid;
    if (!currentUid) return;

    // Example: only show chatRooms where participants array includes current user
    const chatRef = collection(db, 'chatRooms');
    const q = query(chatRef, where('participants', 'array-contains', currentUid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const rooms = [];
      snapshot.forEach((docSnap) => {
        rooms.push({ id: docSnap.id, ...docSnap.data() });
      });
      setChatRooms(rooms);
    }, (error) => {
      console.error('Error in ChatList:', error);
      Alert.alert('Error', 'Failed to load chats.');
    });

    return () => unsubscribe();
  }, []);

  const renderRoom = ({ item }) => {
    // e.g., participants might be ['patientUid', 'doctorUid']
    return (
      <TouchableOpacity
        style={styles.roomItem}
        onPress={() => navigation.navigate('ChatDetail', { chatRoomId: item.id })}
      >
        <Text style={styles.roomTitle}>Chat Room: {item.id}</Text>
        <Text style={styles.roomSub}>Participants: {item.participants?.join(', ')}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chats</Text>
      <FlatList
        data={chatRooms}
        keyExtractor={(item) => item.id}
        renderItem={renderRoom}
        ListEmptyComponent={<Text style={styles.empty}>No chats found.</Text>}
      />
    </View>
  );
}

// ----------------
// Styles
// ----------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  roomItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  roomTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  roomSub: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#777',
  },
});
