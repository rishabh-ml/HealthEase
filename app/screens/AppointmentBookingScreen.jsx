// screens/AppointmentBookingScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { db } from '../../firebaseConfig';
import { auth } from '../../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function AppointmentBookingScreen({ route, navigation }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  
  // If we navigate with doctorId
  const doctorId = route.params?.doctorId || null;
  const currentUser = auth.currentUser; // The patient (if we are in patient flow)

  const handleBookAppointment = async () => {
    if (!date || !time || !doctorId) {
      Alert.alert('Error', 'Please fill in all fields and ensure a doctor is chosen.');
      return;
    }

    try {
      const appointmentsRef = collection(db, 'appointments');
      await addDoc(appointmentsRef, {
        patientUid: currentUser.uid,
        patientName: currentUser.displayName,
        doctorUid: doctorId,
        date,
        time,
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      Alert.alert('Success', 'Appointment booked successfully!');
      navigation.goBack(); // or navigate to appointment list
    } catch (error) {
      console.error('Error booking appointment:', error);
      Alert.alert('Error', 'Failed to book appointment.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book Appointment</Text>
      
      <Text style={styles.label}>Date (YYYY-MM-DD):</Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
        placeholder="2025-02-01"
      />

      <Text style={styles.label}>Time (e.g., 10:00 AM):</Text>
      <TextInput
        style={styles.input}
        value={time}
        onChangeText={setTime}
        placeholder="10:00 AM"
      />

      <TouchableOpacity style={styles.button} onPress={handleBookAppointment}>
        <Text style={styles.buttonText}>Confirm Booking</Text>
      </TouchableOpacity>
    </View>
  );
}

// -----------------
// Styles
// -----------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginVertical: 5,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
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
