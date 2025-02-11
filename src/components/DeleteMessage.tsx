import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

interface DeleteMessageProps {
  onClose: () => void;
  onDeleteTask: () => void;
  title: string;
}

const DeleteMessage: React.FC<DeleteMessageProps> = ({
  onClose,
  onDeleteTask,
  title,
}) => {
  return (
    <View className="px-6 flex justify-center flex-1 bg-black/20">
      <View className="bg-[#363636] px-3 pb-2 rounded">
        <Text className="text-white text-center font-bold py-4 border-b-[0.5px] border-b-[#979797]">
          Task Priority
        </Text>
        <View className="my-6">
          <Text className="text-white text-lg font-medium text-center">
            Are You sure you want to delete this task?
          </Text>
          <Text className="text-white text-lg font-medium text-center">
            Task title : {title}
          </Text>
        </View>
        <View className="flex-row justify-between ">
          <TouchableOpacity onPress={onClose} className="w-[48%]">
            <Text className="text-[#8875FF] text-center px-6 py-3">Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDeleteTask} className="w-[48%]">
            <Text className="text-white bg-[#8687E7] text-center px-6 py-3 rounded">
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DeleteMessage;
