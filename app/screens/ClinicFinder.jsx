import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';

const mockClinics = [
  { id: '1', name: 'City Clinic', location: 'Downtown', image: require('../assets/clinic1.png') },
  { id: '2', name: 'HealthCare Plus', location: 'Uptown', image: require('../assets/clinic2.png') },
  { id: '3', name: 'Family Health Center', location: 'Midtown', image: require('../assets/clinic3.png') },
];

const ClinicFinder = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [clinics, setClinics] = useState(mockClinics);

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      setClinics(mockClinics);
    } else {
      const filteredClinics = mockClinics.filter((clinic) =>
        clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        clinic.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setClinics(filteredClinics);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  const renderClinic = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardSubtitle}>{item.location}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AppointmentBooking', { clinicId: item.id })}
        >
          <Text style={styles.buttonText}>Book Appointment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find a Clinic</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search by clinic name or location"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />

      <FlatList
        data={clinics}
        keyExtractor={(item) => item.id}
        renderItem={renderClinic}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.noResults}>No clinics found.</Text>}
      />
    </View>
  );
};

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
    marginBottom: 20,
    textAlign: 'center',
  },
  searchInput: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  cardContent: {
    flex: 1,
    padding: 10,
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
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  noResults: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ClinicFinder;
