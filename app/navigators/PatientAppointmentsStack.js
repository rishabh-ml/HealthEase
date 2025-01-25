// navigators/PatientAppointmentsStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import PatientAppointmentsScreen from '../screens/PatientAppointmentsScreen';
import AppointmentBookingScreen from '../screens/AppointmentBookingScreen';

const Stack = createStackNavigator();

export default function PatientAppointmentsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="PatientAppointmentsList"
        component={PatientAppointmentsScreen}
        options={{ title: 'My Appointments' }}
      />
      <Stack.Screen
        name="AppointmentBooking"
        component={AppointmentBookingScreen}
        options={{ title: 'Book Appointment' }}
      />
    </Stack.Navigator>
  );
}
