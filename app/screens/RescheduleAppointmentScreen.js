import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { auth, db } from '../../firebaseConfig';
import { collection, query, where, onSnapshot, updateDoc, doc } from 'firebase/firestore';


export default function RescheduleAppointment({ route, navigation }) {
    const { appointmentId } = route.params;
    const [newDate, setNewDate] = useState('');
    const [newTime, setNewTime] = useState('');
  
    async function handleSave() {
      try {
        await updateDoc(doc(db, 'appointments', appointmentId), {
          date: newDate,
          time: newTime,
        });
        Alert.alert('Success', 'Appointment rescheduled!');
        navigation.goBack();
      } catch (error) {
        console.error(error);
      }
    }
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Reschedule Appointment</Text>
        <TextInput value={newDate} onChangeText={setNewDate} placeholder="YYYY-MM-DD" />
        <TextInput value={newTime} onChangeText={setNewTime} placeholder="10:00 AM" />
        <TouchableOpacity onPress={handleSave}>
          <Text>Save</Text>
        </TouchableOpacity>
      </View>
    );
  }
  