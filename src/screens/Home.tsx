import React from 'react';
import EmptyTask from '../components/EmptyTask';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native';

const Home = () => {
  return (
    <ScrollView contentContainerClassName="flex-1 bg-[#121212]">
      <SafeAreaView className="flex-1">
        <EmptyTask />
      </SafeAreaView>
    </ScrollView>
  );
};

export default Home;
