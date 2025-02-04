import React from 'react';
import EmptyTask from '../components/EmptyTask';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, StyleSheet} from 'react-native';

const Home = () => {
  return (
    <ScrollView>
      <SafeAreaView className="flex-1 h-full bg-black">
        <EmptyTask />
      </SafeAreaView>
    </ScrollView>
  );
};

export default Home;
