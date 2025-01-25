// screens/DoctorHomeScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { auth, db } from '../../firebaseConfig';
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  doc,
  updateDoc,
  serverTimestamp
} from 'firebase/firestore';

export default function DoctorHomeScreen({ navigation }) {
  const [appointments, setAppointments] = useState([]);
  const doctorUid = auth.currentUser?.uid; // The logged-in doctor
  const doctorName = 'Dr. Smith'; // Example placeholder

  useEffect(() => {
    fetchAppointments();
  }, []);

  async function fetchAppointments() {
    try {
      // If you only want appointments for this doctor:
      // const q = query(collection(db, 'appointments'), where('doctorUid', '==', doctorUid));
      // const snapshot = await getDocs(q);

      // For now, let's fetch all appointments (example):
      const apptRef = collection(db, 'appointments');
      const snapshot = await getDocs(apptRef);

      const apptArray = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data()
      }));
      setAppointments(apptArray);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  }

  // This function checks if a chat room already exists for [doctorUid, patientUid].
  // If not, it creates one. Then navigates to ChatDetail with that room ID.
  async function startChatWithPatient(patientUid) {
    try {
      if (!doctorUid || !patientUid) return;

      // 1. Query existing rooms that contain doctorUid
      const roomsRef = collection(db, 'chatRooms');
      const qDoc = query(roomsRef, where('participants', 'array-contains', doctorUid));
      const snap = await getDocs(qDoc);

      let existingRoomId = null;
      snap.forEach(docSnap => {
        const data = docSnap.data();
        // If participants array has exactly these two UIDs:
        if (data.participants?.includes(doctorUid) && data.participants?.includes(patientUid)) {
          existingRoomId = docSnap.id;
        }
      });

      // 2. If no existing room, create one
      let chatRoomId = existingRoomId;
      if (!chatRoomId) {
        const newRoomRef = await addDoc(roomsRef, {
          participants: [doctorUid, patientUid],
          createdAt: serverTimestamp()
        });
        chatRoomId = newRoomRef.id;
      }

      // 3. Navigate to ChatDetail in the "Chat" tab
      navigation.navigate('Chat', {
        screen: 'ChatDetail',
        params: { chatRoomId: chatRoomId }
      });
    } catch (e) {
      console.error('startChatWithPatient error:', e);
    }
  }

  const renderAppointment = ({ item }) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Patient: {item.patientName || item.patientUid}</Text>
          <Text style={styles.cardSubtitle}>Time: {item.time || 'N/A'}</Text>
          <Text
            style={[
              styles.cardStatus,
              { color: item.status === 'confirmed' ? 'green' : 'orange' }
            ]}
          >
            Status: {item.status || 'pending'}
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => startChatWithPatient(item.patientUid)}
          >
            <Text style={styles.buttonText}>Chat with Patient</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {doctorName}!</Text>
      <Text style={styles.subtitle}>Today's Appointments</Text>

      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        renderItem={renderAppointment}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No appointments found.</Text>
        }
      />
    </View>
  );
}

// -------------------------
// Styles
// -------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#777',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
    padding: 10,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
  },
  cardStatus: {
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
