// screens/AddFamilyMemberScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../../firebaseConfig';

export default function AddFamilyMemberScreen({ route, navigation }) {
  const { existingFamily = [], onAddComplete } = route.params || {};
  const [memberName, setMemberName] = useState('');
  const [memberAge, setMemberAge] = useState('');

  const handleSave = async () => {
    if (!memberName.trim() || !memberAge.trim()) {
      Alert.alert('Error', 'Please enter both name and age.');
      return;
    }
    // parse age
    const ageNum = parseInt(memberAge, 10);
    if (isNaN(ageNum) || ageNum <= 0) {
      Alert.alert('Error', 'Please enter a valid age.');
      return;
    }

    // check limit
    if (existingFamily.length >= 5) {
      Alert.alert('Limit Reached', 'Max 5 family members allowed.');
      navigation.goBack();
      return;
    }

    const newMember = { name: memberName, age: ageNum };
    const updatedArray = [...existingFamily, newMember];

    try {
      const user = auth.currentUser;
      if (user) {
        await updateDoc(doc(db, 'users', user.uid), {
          familyMembers: updatedArray,
        });
      }
      // Callback to update local state in PatientProfileScreen
      if (onAddComplete) {
        onAddComplete(updatedArray);
      }
      Alert.alert('Success', 'Family member added.');
      navigation.goBack();
    } catch (error) {
      console.error('Error adding family member:', error);
      Alert.alert('Error', 'Failed to add family member.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Family Member</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={memberName}
        onChangeText={setMemberName}
        placeholder="e.g., John"
      />

      <Text style={styles.label}>Age</Text>
      <TextInput
        style={styles.input}
        value={memberAge}
        onChangeText={setMemberAge}
        placeholder="e.g., 30"
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Add Member</Text>
      </TouchableOpacity>
    </View>
  );
}

// --- Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20 },
  title: { fontSize: 20, marginBottom: 15, textAlign: 'center', fontWeight: 'bold' },
  label: { fontSize: 16, marginBottom: 5, color: '#333' },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  saveButton: {
    backgroundColor: 'green',
    borderRadius: 20,
    paddingVertical: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  saveButtonText: { color: '#fff', fontWeight: 'bold' },
});
