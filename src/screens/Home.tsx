import React from 'react';
import EmptyTask from '../components/EmptyTask';
import {SafeAreaView} from 'react-native-safe-area-context';
import TaskList from '../components/TaskList';
import {useAppSelector} from '../hooks';
import {HomeScreenProps} from '../types/navigation';

const Home: React.FC<HomeScreenProps> = ({navigation}) => {
  const {taskCount} = useAppSelector(state => state.todo);

  const navigateTask = (id: string, sectionId: string) => {
    navigation.navigate('Task', {taskId: id, sectionId});
  };

  return (
    <SafeAreaView className="flex-1 bg-[#121212]">
      {taskCount === 0 ? (
        <EmptyTask />
      ) : (
        <TaskList onClickTask={navigateTask} />
      )}
    </SafeAreaView>
  );
};

export default Home;
