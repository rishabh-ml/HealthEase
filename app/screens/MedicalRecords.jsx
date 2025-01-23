import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const mockRecords = [
  { id: '1', name: 'Blood Test Report', date: '2025-01-15' },
  { id: '2', name: 'X-Ray Results', date: '2025-01-10' },
  { id: '3', name: 'Prescription - Dr. Smith', date: '2025-01-05' },
];

const MedicalRecords = () => {
  const [records, setRecords] = useState(mockRecords);

  const renderRecord = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardSubtitle}>Date: {item.date}</Text>
        <TouchableOpacity style={styles.button} onPress={() => handleDownload(item.id)}>
          <Text style={styles.buttonText}>Download</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleDownload = (recordId) => {
    // Placeholder for actual download logic
    alert(`Downloading record with ID: ${recordId}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medical Records</Text>

      <FlatList
        data={records}
        keyExtractor={(item) => item.id}
        renderItem={renderRecord}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.noRecords}>No medical records found.</Text>}
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
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
    elevation: 3,
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
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  noRecords: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default MedicalRecords;
