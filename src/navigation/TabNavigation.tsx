/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {
  createBottomTabNavigator,
  type BottomTabBarButtonProps,
} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import AddNew from '../screens/AddNew';
import Calender from '../screens/Calender';
import {TabParamList} from '../types/navigation';
import {Image, Text, TouchableOpacity, View} from 'react-native';

import Icon from '@react-native-vector-icons/fontawesome6';
const Tab = createBottomTabNavigator<TabParamList>();

const TabButton = ({
  onPress,
  accessibilityState,
  ...rest
}: BottomTabBarButtonProps) => {
  console.log('TabButton Props:', accessibilityState, rest);
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={accessibilityState?.selected}
      className="flex-1 items-center justify-center">
      <Icon name="house" iconStyle="solid" size={20} color={'green'} />
      <Text className="text-white text-sm mt-0.5">Home</Text>
    </TouchableOpacity>
  );
};

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
        tabBarButton: props => <TabButton {...props} />,
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
          tabBarIcon: ({size, color}) => {
            return (
              <Icon name="house" size={size} iconStyle="solid" color={color} />
            );
          },
          tabBarButton: props => <TabButton {...props} />,
        }}
      />
      <Tab.Screen
        name="AddNew"
        component={AddNew}
        options={{
          title: 'Add New',
          tabBarIcon: ({size, color}) => {
            return (
              <Icon name="plus" size={size} iconStyle="solid" color={color} />
            );
          },
        }}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({size}) => {
            return (
              <Icon
                name="calendar-days"
                size={size}
                iconStyle="solid"
                color={'white'}
              />
            );
          },
        }}
        name="Calender"
        component={Calender}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
