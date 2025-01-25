// navigators/DoctorAppointmentsStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DoctorAppointmentsScreen from '../screens/DoctorAppointmentsScreen';
import AppointmentBookingScreen from '../screens/AppointmentBookingScreen';

const Stack = createStackNavigator();

export default function DoctorAppointmentsStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: true }}>
            <Stack.Screen
                name="DoctorAppointmentsList"
                component={DoctorAppointmentsScreen}
                options={{ title: 'Appointments' }}
            />
            {/* If doctors also create appointments or reschedule, you can reuse the booking screen */}
            <Stack.Screen
                name="AppointmentBooking"
                component={AppointmentBookingScreen}
                options={{ title: 'Book/Edit Appointment' }}
            />
            <Stack.Screen
                name="RescheduleAppointment"
                component={AppointmentBookingScreen}
                options={{ title: 'Reschedule Appointment' }}
            />
        </Stack.Navigator>
    );
}
