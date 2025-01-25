import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PatientHomeScreen from '../screens/PatientHomeScreen';
import PatientAppointmentsStack from './PatientAppointmentsStack';
import ClinicFinderScreen from '../screens/ClinicFinderScreen';
import PatientChatStack from './PatientChatStack';
import PatientProfileStack from './PatientProfileStack';

const Tab = createBottomTabNavigator();

export default function PatientTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={PatientHomeScreen} />
      <Tab.Screen name="Appointments" component={PatientAppointmentsStack} />
      <Tab.Screen name="ClinicFinder" component={ClinicFinderScreen} />
      <Tab.Screen name="Chat" component={PatientChatStack} />
      <Tab.Screen name="Profile" component={PatientProfileStack} />
    </Tab.Navigator>
  );
}
