// screens/UpdatePasswordScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { auth } from '../../firebaseConfig';
import { updatePassword } from 'firebase/auth';

export default function UpdatePasswordScreen() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleUpdate = async () => {
    try {
      // 1. Re-authenticate user if needed
      // For example, signInWithEmailAndPassword(auth, auth.currentUser.email, currentPassword).
      // 2. Then:
      await updatePassword(auth.currentUser, newPassword);
      Alert.alert('Success', 'Password updated successfully.');
    } catch (error) {
      console.error('Error updating password:', error);
      Alert.alert('Error', error.message || 'Failed to update password.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Password</Text>

      <Text style={styles.label}>Current Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />

      <Text style={styles.label}>New Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />

      <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
        <Text style={styles.updateButtonText}>Update Password</Text>
      </TouchableOpacity>
    </View>
  );
}

// styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 5 },
  input: {
    backgroundColor: '#fff', borderRadius: 8, borderColor: '#ccc', borderWidth: 1,
    marginBottom: 15, paddingHorizontal: 10, paddingVertical: 8,
  },
  updateButton: { backgroundColor: '#007BFF', borderRadius: 20, paddingVertical: 12, alignItems: 'center' },
  updateButtonText: { color: '#fff', fontWeight: 'bold' },
});
