import React from 'react';
import EmptyTask from '../components/EmptyTask';
import {SafeAreaView} from 'react-native-safe-area-context';
import TaskList from '../components/TaskList';
import {useAppSelector} from '../hooks';

const Home = () => {
  const {renderAbleTasks} = useAppSelector(state => state.todo);

  return (
    <SafeAreaView className="flex-1 bg-[#121212]">
      {renderAbleTasks.length === 0 ? <EmptyTask /> : <TaskList />}
    </SafeAreaView>
  );
};

export default Home;
