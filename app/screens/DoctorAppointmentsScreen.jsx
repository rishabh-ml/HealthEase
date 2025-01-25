// screens/DoctorAppointmentsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { auth, db } from '../../firebaseConfig';
import { collection, query, where, onSnapshot, updateDoc, doc } from 'firebase/firestore';

export default function DoctorAppointmentsScreen() {
  const [appointments, setAppointments] = useState([]);
  const userUid = auth.currentUser?.uid; // The doctor

  useEffect(() => {
    if (!userUid) return;

    const apptRef = collection(db, 'appointments');
    const q = query(apptRef, where('doctorUid', '==', userUid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const apptArray = [];
      snapshot.forEach((docSnap) => {
        apptArray.push({ id: docSnap.id, ...docSnap.data() });
      });
      setAppointments(apptArray);
    });

    return () => unsubscribe();
  }, [userUid]);

  const handleConfirm = async (appointmentId) => {
    try {
      const apptDocRef = doc(db, 'appointments', appointmentId);
      await updateDoc(apptDocRef, { status: 'confirmed' });
    } catch (error) {
      console.error('Error confirming appointment:', error);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Patient: {item.patientName}</Text>
        <Text style={styles.cardText}>Date: {item.date}</Text>
        <Text style={styles.cardText}>Time: {item.time}</Text>
        <Text style={styles.cardText}>Status: {item.status}</Text>
  
        {item.status !== 'confirmed' && item.status !== 'cancelled' && (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: 'green' }]}
            onPress={() => handleConfirm(item.id)}
          >
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
        )}
  
        {item.status !== 'cancelled' && (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: 'orange' }]}
            onPress={() => handleReschedule(item)}
          >
            <Text style={styles.buttonText}>Reschedule</Text>
          </TouchableOpacity>
        )}
  
        {item.status !== 'cancelled' && (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: 'red' }]}
            onPress={() => handleCancel(item.id)}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };
  
  // -------------
  async function handleCancel(apptId) {
    try {
      const apptDocRef = doc(db, 'appointments', apptId);
      await updateDoc(apptDocRef, { status: 'cancelled' });
    } catch (error) {
      console.error(error);
    }
  }
  
  function handleReschedule(item) {
    // Option 1: show a modal or navigate to a RescheduleAppointmentScreen
    navigation.navigate('Appointments', {
      screen: 'RescheduleAppointment',
      params: { appointmentId: item.id },
    });
  }  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Doctor Appointments</Text>
      <FlatList
        data={appointments}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.empty}>No appointments found.</Text>}
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
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardText: {
    fontSize: 14,
    color: '#555',
  },
  button: {
    backgroundColor: 'green',
    borderRadius: 6,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  empty: {
    textAlign: 'center',
    marginTop: 30,
    color: '#777',
  },
});
