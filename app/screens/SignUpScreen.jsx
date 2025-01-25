import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

// Firestore imports:
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; // Make sure db is exported from firebaseConfig
import { Picker } from '@react-native-picker/picker';

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Patient');

  const handleSignUp = async () => {
    try {
      if (!name || !email || !password || !role) {
        Alert.alert('Error', 'Please fill in all the fields.');
        return;
      }

      // 1. Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // 2. Create user doc in Firestore
      // Convert role to lowercase so 'Patient' => 'patient'
      const userDocData = {
        name,
        email,
        role: role.toLowerCase(), // 'patient' or 'doctor'
        createdAt: serverTimestamp(),
        familyMembers: [], // Start with an empty array
      };

      await setDoc(doc(db, 'users', firebaseUser.uid), userDocData);

      Alert.alert('Success', 'Account created successfully!');
      navigation.navigate('LoginScreen');
    } catch (error) {
      // Handle common Auth errors
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Error', 'That email is already in use. Please log in or use a different one.');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Error', 'Invalid email format.');
      } else {
        console.error('SignUp Error:', error);
        Alert.alert('Error', error.message || 'An unexpected error occurred.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={role}
          onValueChange={(val) => setRole(val)}
          style={styles.picker}
        >
          <Picker.Item label="Patient" value="Patient" />
          <Picker.Item label="Doctor" value="Doctor" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.link}>Already have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

// -------------------------
// Styles
// -------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    width: '90%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  pickerContainer: {
    width: '90%',
    height: 51,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    marginBottom: 15,
  },
  picker: {
    width: '100%',
    height: '100%',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    color: '#007BFF',
    fontSize: 14,
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});

export default SignUpScreen;
