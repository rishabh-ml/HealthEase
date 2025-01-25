// screens/PatientProfileScreen.js
import React, { useEffect, useState } from 'react';
import {
    View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Alert
} from 'react-native';
import { auth, db } from '../../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

export default function PatientProfileScreen({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [familyMembers, setFamilyMembers] = useState([]);

    // For demonstration
    const currentUser = auth.currentUser;

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            if (!currentUser) return;
            const userDocRef = doc(db, 'users', currentUser.uid);
            const snapshot = await getDoc(userDocRef);
            if (snapshot.exists()) {
                const userData = snapshot.data();
                setName(userData.name || '');
                setEmail(userData.email || '');
                setFamilyMembers(userData.familyMembers || []);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleUpdateProfile = async () => {
        try {
            if (!currentUser) return;
            const userDocRef = doc(db, 'users', currentUser.uid);
            await updateDoc(userDocRef, { name, email });
            Alert.alert('Success', 'Profile updated!');
        } catch (error) {
            console.error('Error updating profile:', error);
            Alert.alert('Error', 'Failed to update profile.');
        }
    };

    // Navigate to AddFamilyMemberScreen
    const handleAddFamilyMember = () => {
        // Check if total < 6
        if (familyMembers.length >= 5) {
            Alert.alert('Limit Reached', 'You cannot add more than 5 additional family members.');
            return;
        }
        navigation.navigate('AddFamilyMemberScreen', {
            existingFamily: familyMembers,
            onAddComplete: (updatedMembers) => {
                setFamilyMembers(updatedMembers);
            },
        });
    };

    const handleRemoveFamilyMember = async (indexToRemove) => {
        try {
            const updatedMembers = familyMembers.filter((_, idx) => idx !== indexToRemove);
            const userDocRef = doc(db, 'users', currentUser.uid);
            await updateDoc(userDocRef, { familyMembers: updatedMembers });
            setFamilyMembers(updatedMembers);
        } catch (error) {
            console.error('Error removing family member:', error);
        }
    };

    const renderFamilyMember = ({ item, index }) => (
        <View style={styles.familyCard}>
            <Text style={styles.memberText}>Name: {item.name}</Text>
            <Text style={styles.memberText}>Age: {item.age}</Text>
            <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveFamilyMember(index)}
            >
                <Text style={styles.buttonText}>Remove</Text>
            </TouchableOpacity>
        </View>
    );

    const handleLogout = async () => {
        try {
            await signOut(auth);
            // This triggers auth.onAuthStateChanged to return user = null, leading you back to Auth screens
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Patient Profile</Text>

            {/* Basic Fields */}
            <Text style={styles.label}>Name</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} />

            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} />

            <TouchableOpacity style={styles.updateButton} onPress={handleUpdateProfile}>
                <Text style={styles.buttonText}>Update Profile</Text>
            </TouchableOpacity>

            {/* Family Members */}
            <Text style={styles.subTitle}>Family Members ({familyMembers.length}/5)</Text>

            <FlatList
                data={familyMembers}
                keyExtractor={(_, i) => i.toString()}
                renderItem={renderFamilyMember}
                ListEmptyComponent={<Text style={styles.empty}>No family members added.</Text>}
            />

            <TouchableOpacity style={styles.addButton} onPress={handleAddFamilyMember}>
                <Text style={styles.buttonText}>Add Family Member</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

// --- Styles
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20 },
    title: { fontSize: 22, marginBottom: 15, textAlign: 'center', fontWeight: 'bold' },
    label: { fontSize: 16, marginBottom: 5, color: '#333' },
    input: {
        backgroundColor: '#fff',
        borderRadius: 8,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    updateButton: {
        backgroundColor: '#007BFF',
        borderRadius: 20,
        paddingVertical: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    subTitle: {
        fontSize: 18, marginBottom: 10, marginTop: 10, fontWeight: 'bold', textAlign: 'center',
    },
    familyCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 10,
        padding: 10,
        elevation: 2,
    },
    memberText: { fontSize: 14, color: '#333', marginBottom: 5 },
    removeButton: {
        backgroundColor: 'red',
        borderRadius: 6,
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignSelf: 'flex-start',
    },
    buttonText: { color: '#fff', fontWeight: 'bold' },
    empty: { textAlign: 'center', marginTop: 15, color: '#666' },
    addButton: {
        backgroundColor: 'green',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignSelf: 'center',
    },
});
