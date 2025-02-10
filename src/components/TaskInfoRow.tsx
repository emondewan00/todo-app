import {View, Text} from 'react-native';
import React from 'react';
import Icon from '@react-native-vector-icons/fontawesome6';

type TaskInfoRowProps = {
  iconName: 'clock' | 'flag' | 'tag';
  title: string;
  content: string;
};

const TaskInfoRow: React.FC<TaskInfoRowProps> = ({
  content,
  iconName,
  title,
}) => {
  return (
    <View className="flex flex-row justify-between mt-8">
      <View className="flex flex-row gap-x-2 items-center">
        <Icon name={iconName} color={'white'} size={24} iconStyle="solid" />
        <Text className="text-white">{title}</Text>
      </View>
      <View className="rounded-md px-4 py-2 bg-[#444444]">
        <Text className="text-white">{content}</Text>
      </View>
    </View>
  );
};

export default TaskInfoRow;
