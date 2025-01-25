import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DoctorHomeScreen from '../screens/DoctorHomeScreen';
import DoctorAppointmentsStack from './DoctorAppointmentsStack';
import DoctorChatStack from './DoctorChatStack';
import DoctorProfileScreen from '../screens/DoctorProfileScreen';

const Tab = createBottomTabNavigator();

export default function DoctorTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={DoctorHomeScreen} />
      <Tab.Screen name="Appointments" component={DoctorAppointmentsStack} />
      <Tab.Screen name="Chat" component={DoctorChatStack} />
      <Tab.Screen name="Profile" component={DoctorProfileScreen} />
    </Tab.Navigator>
  );
}
