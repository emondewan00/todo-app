import {View, Text} from 'react-native';
import React from 'react';
import {RootStackParamList} from '../types/navigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'Task'>;

const Task: React.FC<Props> = ({route}) => {
  const {taskId} = route.params;
  console.log(taskId);
  return (
    <View>
      <Text>Task</Text>
    </View>
  );
};

export default Task;
