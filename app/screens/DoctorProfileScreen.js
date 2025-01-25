// screens/DoctorProfileScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { auth, db } from '../../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default function DoctorProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [specialization, setSpecialization] = useState('');

  const currentUser = auth.currentUser;

  useEffect(() => {
    fetchDoctorData();
  }, []);

  const fetchDoctorData = async () => {
    try {
      if (!currentUser) return;
      const userDocRef = doc(db, 'users', currentUser.uid);
      const snapshot = await getDoc(userDocRef);
      if (snapshot.exists()) {
        const userData = snapshot.data();
        setName(userData.name || '');
        setEmail(userData.email || '');
        setSpecialization(userData.specialization || '');
      }
    } catch (error) {
      console.error('Error fetching doctor data:', error);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      if (!currentUser) return;
      const userDocRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userDocRef, { name, email, specialization });
      Alert.alert('Success', 'Doctor profile updated!');
    } catch (error) {
      console.error('Error updating doctor profile:', error);
      Alert.alert('Error', 'Failed to update doctor profile.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Doctor Profile</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput 
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput 
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Specialization</Text>
      <TextInput
        style={styles.input}
        value={specialization}
        onChangeText={setSpecialization}
        placeholder="e.g. Cardiology"
      />

      <TouchableOpacity style={styles.updateButton} onPress={handleUpdateProfile}>
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

// ---------------------
// Styles
// ---------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  updateButton: {
    backgroundColor: '#007BFF',
    borderRadius: 20,
    paddingVertical: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
