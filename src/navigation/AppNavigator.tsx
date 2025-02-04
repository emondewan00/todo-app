import React from 'react';
import Task from '../screens/Task';
import {RootStackParamList} from '../types/navigation';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigation from './TabNavigation';
const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeTabs" component={TabNavigation} />
      <Stack.Screen name="Task" component={Task} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
