// screens/PatientAppointmentsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { auth, db } from '../../firebaseConfig';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

export default function PatientAppointmentsScreen() {
  const [appointments, setAppointments] = useState([]);
  const userUid = auth.currentUser?.uid;

  useEffect(() => {
    if (!userUid) return;
    const apptRef = collection(db, 'appointments');
    const q = query(apptRef, where('patientUid', '==', userUid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const apptArray = [];
      snapshot.forEach((docSnap) => {
        apptArray.push({ id: docSnap.id, ...docSnap.data() });
      });
      setAppointments(apptArray);
    });

    return () => unsubscribe();
  }, [userUid]);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Doctor ID: {item.doctorUid}</Text>
        <Text style={styles.cardText}>Date: {item.date}</Text>
        <Text style={styles.cardText}>Time: {item.time}</Text>
        <Text style={styles.cardText}>Status: {item.status}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Appointments</Text>
      <FlatList
        data={appointments}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.empty}>No appointments found.</Text>}
      />
    </View>
  );
}

// --------------
// Styles
// --------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
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
  empty: {
    textAlign: 'center',
    marginTop: 30,
    color: '#777',
  },
});
