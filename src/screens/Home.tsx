import React from 'react';
import EmptyTask from '../components/EmptyTask';
import {SafeAreaView} from 'react-native-safe-area-context';
import TaskList from '../components/TaskList';

const Home = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#121212]">
      {/* <EmptyTask /> */}
      <TaskList />
    </SafeAreaView>
  );
};

export default Home;
