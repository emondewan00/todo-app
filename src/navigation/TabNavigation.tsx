/* eslint-disable react/no-unstable-nested-components */
import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import AddNew from '../screens/AddNew';
import Calender from '../screens/Calender';
import type {TabParamList} from '../types/navigation';
import {Image, Modal, View} from 'react-native';
import Icon from '@react-native-vector-icons/fontawesome6';
import TabButton from '../components/TabButton';
import AddTabButton from '../components/AddTabButton';
import AddTask from '../components/AddTask';
const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigation = () => {
  const [isShowCreateModal, setIsShowCreateModal] = useState(false);
  return (
    <>
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
            tabBarButton: props => (
              <AddTabButton
                {...props}
                onPress={() => setIsShowCreateModal(true)}
              />
            ),
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

      {/* modal for create task screen  */}
      <Modal
        visible={isShowCreateModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsShowCreateModal(false)}>
        <View className="flex-1 justify-end bg-black/40">
          <AddTask onClose={() => setIsShowCreateModal(false)} />
        </View>
      </Modal>
    </>
  );
};

export default TabNavigation;
