import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { db } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const PatientHomeScreen = ({ navigation }) => {
  const [doctors, setDoctors] = useState([]);
  const userName = 'Rishabh'; // Example placeholder; fetch real name from Auth/Firestore if desired.

  useEffect(() => {
    fetchDoctorsFromFirestore();
  }, []);

  const fetchDoctorsFromFirestore = async () => {
    try {
      // 1. Reference the "users" collection
      const usersRef = collection(db, 'users');
      const snapshot = await getDocs(usersRef);

      // 2. Filter docs where user.role === 'doctor'
      const docsArray = [];
      snapshot.forEach((docSnap) => {
        const userData = docSnap.data();
        if (userData.role === 'doctor') {
          docsArray.push({ id: docSnap.id, ...userData });
        }
      });
      setDoctors(docsArray);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const renderDoctor = ({ item }) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.name || 'Doctor Name'}</Text>
          <Text style={styles.cardSubtitle}>Specialist or {item.email}</Text>
          
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              // Navigate to booking screen, pass doctor ID or doc info
              navigation.navigate('Appointments', {
                screen: 'AppointmentBooking',  // The child route in that stack
                params: { doctorId: item.id },
              });              
            }}
          >
            <Text style={styles.buttonText}>Book Appointment</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello, {userName}!</Text>
      <Text style={styles.subtitle}>Find Your Doctor</Text>

      <FlatList
        data={doctors}
        keyExtractor={(item) => item.id}
        renderItem={renderDoctor}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.emptyText}>No doctors found.</Text>}
      />
    </View>
  );
};

// -----------------------
// Styles
// -----------------------
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
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
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
    marginBottom: 15,
    overflow: 'hidden',
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

export default PatientHomeScreen;
