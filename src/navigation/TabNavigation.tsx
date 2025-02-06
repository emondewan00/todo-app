/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import AddNew from '../screens/AddNew';
import Calender from '../screens/Calender';
import type {TabParamList} from '../types/navigation';
import {Image, View} from 'react-native';
import Icon from '@react-native-vector-icons/fontawesome6';
import TabButton from '../components/TabButton';
import AddTabButton from '../components/AddTabButton';
const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#363636',
          height: 60,
          position: 'absolute',
          borderTopWidth: 0,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerLeft: () => (
            <View className="ml-6">
              <Icon name="bars" size={24} color="#fff" iconStyle="solid" />
            </View>
          ),
          headerRight: () => (
            <View className="mr-6">
              <Image
                source={require('../assets/images/person.png')}
                alt="profile photo "
              />
            </View>
          ),
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#121212',
            height: 80,
          },
          headerTitleStyle: {
            color: 'white',
            fontWeight: 'normal',
          },
          headerTitle: 'Index',
          tabBarButton: props => (
            <TabButton {...props} iconName="house" title="Home" />
          ),
        }}
      />
      <Tab.Screen
        name="AddNew"
        component={AddNew}
        options={{
          headerShown: false,
          tabBarButton: props => <AddTabButton {...props} />,
        }}
      />
      <Tab.Screen
        options={{
          tabBarButton: props => (
            <TabButton {...props} title="Calender" iconName="calendar-days" />
          ),
        }}
        name="Calender"
        component={Calender}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
