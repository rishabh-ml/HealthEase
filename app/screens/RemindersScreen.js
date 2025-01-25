// screens/RemindersScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import { auth, db } from '../../firebaseConfig';
import { collection, addDoc, onSnapshot, doc, deleteDoc } from 'firebase/firestore';

export default function RemindersScreen() {
  const [reminders, setReminders] = useState([]);
  const [newReminderText, setNewReminderText] = useState('');

  const currentUser = auth.currentUser;

  useEffect(() => {
    if (!currentUser) return;
    const ref = collection(db, `users/${currentUser.uid}/reminders`);
    const unsubscribe = onSnapshot(ref, (snapshot) => {
      const list = [];
      snapshot.forEach((docSnap) => {
        list.push({ id: docSnap.id, ...docSnap.data() });
      });
      setReminders(list);
    });
    return () => unsubscribe();
  }, [currentUser]);

  const handleAddReminder = async () => {
    if (!newReminderText.trim()) return;
    try {
      const ref = collection(db, `users/${currentUser.uid}/reminders`);
      await addDoc(ref, { text: newReminderText, createdAt: new Date().toISOString() });
      setNewReminderText('');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to add reminder.');
    }
  };

  const handleDeleteReminder = async (id) => {
    try {
      await deleteDoc(doc(db, `users/${currentUser.uid}/reminders/${id}`));
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.reminderItem}>
      <Text style={styles.reminderText}>{item.text}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteReminder(item.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reminders</Text>

      <View style={styles.addContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter reminder..."
          value={newReminderText}
          onChangeText={setNewReminderText}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddReminder}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={reminders}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.empty}>No reminders set.</Text>}
      />
    </View>
  );
}

// styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  addContainer: { flexDirection: 'row', marginBottom: 10 },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  addButton: { backgroundColor: 'green', paddingHorizontal: 15, borderRadius: 8, justifyContent: 'center' },
  addButtonText: { color: '#fff', fontWeight: 'bold' },
  reminderItem: {
    backgroundColor: '#fff', borderRadius: 8, padding: 10, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  reminderText: { fontSize: 14, color: '#333' },
  deleteButton: { backgroundColor: 'red', borderRadius: 6, paddingHorizontal: 10, paddingVertical: 5 },
  deleteButtonText: { color: '#fff', fontWeight: 'bold' },
  empty: { textAlign: 'center', marginTop: 20, color: '#777' },
});
