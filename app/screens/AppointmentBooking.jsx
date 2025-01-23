import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

const AppointmentBooking = ({ route, navigation }) => {
  const { clinicId } = route.params;
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');

  const handleBooking = () => {
    if (!date || !time) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    // Placeholder for backend API integration
    Alert.alert('Success', 'Appointment booked successfully!');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book Appointment</Text>
      <Text style={styles.subtitle}>Clinic ID: {clinicId}</Text>

      <TextInput
        style={styles.input}
        placeholder="Select Date (YYYY-MM-DD)"
        value={date}
        onChangeText={(text) => setDate(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Select Time (HH:MM AM/PM)"
        value={time}
        onChangeText={(text) => setTime(text)}
      />

      <TextInput
        style={[styles.input, styles.notesInput]}
        placeholder="Additional Notes (Optional)"
        value={notes}
        onChangeText={(text) => setNotes(text)}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleBooking}>
        <Text style={styles.buttonText}>Confirm Booking</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
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
  notesInput: {
    height: 100,
    textAlignVertical: 'top',
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
  cancelButton: {
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#FF0000',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default AppointmentBooking;
