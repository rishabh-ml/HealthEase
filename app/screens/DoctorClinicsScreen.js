// screens/DoctorClinicsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { auth, db } from '../../firebaseConfig';
import { doc, getDoc, updateDoc, collection, getDocs } from 'firebase/firestore';

export default function DoctorClinicsScreen() {
  const [myClinics, setMyClinics] = useState([]);
  const [allClinics, setAllClinics] = useState([]);
  const doctor = auth.currentUser;

  useEffect(() => {
    fetchAllClinics();
    fetchDoctorData();
  }, []);

  async function fetchAllClinics() {
    const snap = await getDocs(collection(db, 'clinics'));
    const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    setAllClinics(list);
  }

  async function fetchDoctorData() {
    if (!doctor) return;
    const docRef = doc(db, 'users', doctor.uid);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      const docData = snapshot.data();
      setMyClinics(docData.clinicIds || []); // e.g. array of clinic IDs
    }
  }

  async function handleAddClinic(clinicId) {
    const updated = [...myClinics, clinicId];
    await updateDoc(doc(db, 'users', doctor.uid), { clinicIds: updated });
    setMyClinics(updated);
  }

  const renderAllClinicItem = ({ item }) => {
    const alreadyHave = myClinics.includes(item.id);
    return (
      <View style={{ backgroundColor: '#eee', marginBottom: 10, padding: 10 }}>
        <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
        <Text>{item.address}</Text>
        {!alreadyHave && (
          <TouchableOpacity onPress={() => handleAddClinic(item.id)}>
            <Text style={{ color: 'blue' }}>Add This Clinic</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View>
      <Text>My Clinics</Text>
      <FlatList
        data={myClinics}
        keyExtractor={(id) => id}
        renderItem={({ item }) => <Text>{item}</Text>} 
      />
      <Text>All Clinics</Text>
      <FlatList
        data={allClinics}
        keyExtractor={(item) => item.id}
        renderItem={renderAllClinicItem}
      />
    </View>
  );
}
