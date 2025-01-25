// App.js

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { auth, db } from './firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

// --- Screens for Auth Flow ---
import WelcomeScreen from './app/screens/WelcomeScreen';
import LoginScreen from './app/screens/LoginScreen';
import SignUpScreen from './app/screens/SignUpScreen';

// --- Tab Navigators ---
import PatientTabNavigator from './app/navigators/PatientTabNavigator';
import DoctorTabNavigator from './app/navigators/DoctorTabNavigator';

const Stack = createStackNavigator();

/**
 * AuthStack: Contains the Welcome, Login, SignUp flows only
 */
function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="WelcomeScreen">
      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ title: 'Login' }}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{ title: 'Sign Up' }}
      />
    </Stack.Navigator>
  );
}

/**
 * Main App: If the user is not logged in, show AuthStack.
 * Otherwise, show DoctorTabNavigator or PatientTabNavigator
 * based on user.role from Firestore.
 */
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        // Logged in
        try {
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setUserRole(userData.role); // "doctor" or "patient"
          } else {
            console.log('No user document found in Firestore');
          }
          setIsLoggedIn(true);
        } catch (error) {
          console.error('Error fetching user role:', error);
        }
      } else {
        // Not logged in
        setIsLoggedIn(false);
        setUserRole(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      {!isLoggedIn ? (
        // Show the Auth flow if not logged in
        <AuthStack />
      ) : userRole === 'doctor' ? (
        // If doctor
        <DoctorTabNavigator />
      ) : (
        // Otherwise, assume patient
        <PatientTabNavigator />
      )}
    </NavigationContainer>
  );
}
