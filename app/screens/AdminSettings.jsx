import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

const AdminSettings = () => {
  const [clinicName, setClinicName] = useState('');
  const [address, setAddress] = useState('');
  const [workingHours, setWorkingHours] = useState('');

  const handleSave = () => {
    if (!clinicName || !address || !workingHours) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    // Placeholder for backend API integration
    Alert.alert('Success', 'Settings saved successfully!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Settings</Text>

      <TextInput
        style={styles.input}
        placeholder="Clinic Name"
        value={clinicName}
        onChangeText={(text) => setClinicName(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Clinic Address"
        value={address}
        onChangeText={(text) => setAddress(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Working Hours (e.g., 9:00 AM - 5:00 PM)"
        value={workingHours}
        onChangeText={(text) => setWorkingHours(text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

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
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AdminSettings;
