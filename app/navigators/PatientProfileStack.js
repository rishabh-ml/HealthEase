// navigators/PatientProfileStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PatientProfileScreen from '../screens/PatientProfileScreen';
import AddFamilyMemberScreen from '../screens/AddFamilyMemberScreen';

const Stack = createStackNavigator();

export default function PatientProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PatientProfileMain"
        component={PatientProfileScreen}
        options={{ title: 'Profile' }}
      />
      <Stack.Screen
        name="AddFamilyMemberScreen"
        component={AddFamilyMemberScreen}
        options={{ title: 'Add Member' }}
      />
    </Stack.Navigator>
  );
}
