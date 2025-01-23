import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './app/screens/WelcomeScreen';
import LoginScreen from './app/screens/LoginScreen';
import SignUpScreen from './app/screens/SignUpScreen';
import PatientDashboard from './app/screens/PatientDashboard';
import DoctorDashboard from './app/screens/DoctorDashboard';
import ClinicFinder from './app/screens/ClinicFinder';
import AppointmentBooking from './app/screens/AppointmentBooking';
import ChatScreen from './app/screens/ChatScreen';
import MedicalRecords from './app/screens/MedicalRecords';
import AdminSettings from './app/screens/AdminSettings';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
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
        <Stack.Screen
          name="PatientDashboard"
          component={PatientDashboard}
          options={{ title: 'Patient Dashboard' }}
        />
        <Stack.Screen
          name="DoctorDashboard"
          component={DoctorDashboard}
          options={{ title: 'Doctor Dashboard' }}
        />
        <Stack.Screen
          name="ClinicFinder"
          component={ClinicFinder}
          options={{ title: 'Clinic Finder' }}
        />
        <Stack.Screen
          name="AppointmentBooking"
          component={AppointmentBooking}
          options={{ title: 'Book Appointment' }}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{ title: 'Chat' }}
        />
        <Stack.Screen
          name="MedicalRecords"
          component={MedicalRecords}
          options={{ title: 'Medical Records' }}
        />
        <Stack.Screen
          name="AdminSettings"
          component={AdminSettings}
          options={{ title: 'Admin Settings' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
