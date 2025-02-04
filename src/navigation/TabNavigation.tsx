import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import AddNew from '../screens/AddNew';
import Calender from '../screens/Calender';
import {TabParamList} from '../types/navigation';

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen
        name="AddNew"
        component={AddNew}
        options={{
          title: 'Add New',
        }}
      />
      <Tab.Screen name="Calender" component={Calender} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
