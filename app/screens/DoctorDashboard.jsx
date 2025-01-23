import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

const appointments = [
  { id: '1', patientName: 'John Doe', time: '10:00 AM', status: 'Confirmed' },
  { id: '2', patientName: 'Jane Smith', time: '11:30 AM', status: 'Pending' },
  { id: '3', patientName: 'Michael Brown', time: '1:00 PM', status: 'Confirmed' },
];

const DoctorDashboard = ({ navigation }) => {
  const renderAppointment = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>Patient: {item.patientName}</Text>
        <Text style={styles.cardSubtitle}>Time: {item.time}</Text>
        <Text style={styles.cardStatus}>Status: {item.status}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ChatScreen', { patientId: item.id })}
        >
          <Text style={styles.buttonText}>Chat with Patient</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Doctor Dashboard</Text>
      <Text style={styles.subtitle}>Today's Appointments</Text>

      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        renderItem={renderAppointment}
        contentContainerStyle={styles.list}
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
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
    marginBottom: 5,
  },
  cardStatus: {
    fontSize: 14,
    color: item => (item.status === 'Confirmed' ? 'green' : 'orange'),
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
});

export default DoctorDashboard;
