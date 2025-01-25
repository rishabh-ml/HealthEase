import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { db } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export default function ClinicFinderScreen({ navigation }) {
  const [clinics, setClinics] = useState([]);

  useEffect(() => {
    fetchClinics();
  }, []);

  const fetchClinics = async () => {
    try {
      const clinicsRef = collection(db, 'clinics');
      const snapshot = await getDocs(clinicsRef);
      const clinicArray = [];
      snapshot.forEach((docSnap) => {
        clinicArray.push({ id: docSnap.id, ...docSnap.data() });
      });
      setClinics(clinicArray);
    } catch (error) {
      console.error('Error fetching clinics:', error);
      Alert.alert('Error', 'Failed to load clinics.');
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        {item.imageUrl ? (
          <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
        ) : (
          <Image
            source={require('../assets/clinic-placeholder.png')}
            style={styles.cardImage}
          />
        )}

        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardSubtitle}>{item.address}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              // Navigate to nested route in 'Appointments' tab
              navigation.navigate('Appointments', {
                screen: 'AppointmentBooking',
                params: { clinicId: item.id },
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
      <Text style={styles.title}>Clinic Finder</Text>
      <FlatList
        data={clinics}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No clinics found.</Text>}
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
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 15,
        flexDirection: 'row',
        elevation: 2,
    },
    cardImage: {
        width: 90,
        height: 90,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
    },
    cardContent: {
        flex: 1,
        padding: 10,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 3,
    },
    cardSubtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    button: {
        backgroundColor: '#007BFF',
        borderRadius: 6,
        paddingVertical: 6,
        paddingHorizontal: 15,
        alignSelf: 'flex-start',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 40,
        color: '#777',
    },
});