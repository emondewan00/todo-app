import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import type {TaskScreenProps} from '../types/navigation';
import Icon from '@react-native-vector-icons/fontawesome6';
import {useAppSelector} from '../hooks';

import type {Task as TaskType, TaskSection} from '../types/task';
import TaskInfoRow from '../components/TaskInfoRow';
import {SafeAreaView} from 'react-native-safe-area-context';

const Task: React.FC<TaskScreenProps> = ({route}) => {
  const {taskId, sectionId} = route.params;
  const findTask = (tasks: TaskSection[]) => {
    const sectionData = tasks.find(section => section.title === sectionId);
    // binary search for find task
    const task = (data: TaskType[]) => {
      let left = 0;
      let right = data.length - 1;
      while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (data[mid].id === taskId) {
          return data[mid];
        } else if (data[mid].id < taskId) {
          left = mid + 1;
        } else {
          right = mid - 1;
        }
      }
    };

    if (sectionData?.data.length) {
      return task(sectionData.data);
    }
    return null;
  };

  const task = useAppSelector(state => findTask(state.todo.tasks));

  return (
    <SafeAreaView className="flex-1 bg-[#121212] px-6">
      <View className="flex-1">
        <View className="flex flex-row justify-between mt-2.5 mb-7">
          <TouchableOpacity>
            <View className="rounded w-8 h-8 bg-[#1D1D1D] justify-center items-center p-1">
              <Text className="text-white ">X</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View className="rounded w-8 h-8 bg-[#1D1D1D] justify-center items-center p-1">
              <Icon name="repeat" iconStyle="solid" size={16} color="white" />
            </View>
          </TouchableOpacity>
        </View>

        {task === null ? (
          <View>
            <Text className="text-white">No task found with id: {taskId}</Text>
          </View>
        ) : (
          <View className="flex-1">
            <View className="flex-row gap-x-5 ">
              <View className="border border-white p-4 bg-[#363636] h-4 rounded-full" />
              <View className="">
                <Text className="text-xl text-white">{task?.title} </Text>
                <Text className="text-[#AFAFAF] text-base mt-4">
                  {task?.description}
                </Text>
              </View>
            </View>

            <TaskInfoRow
              content={'Today at 9:00 PM'}
              iconName="clock"
              title="Task Time:"
            />
            <TaskInfoRow
              content={'University'}
              iconName="tag"
              title="Task Category:"
            />
            <TaskInfoRow
              content={task?.priority.toString() as string}
              iconName="flag"
              title="Task Priority:"
            />

            <View className="flex flex-row gap-x-2 items-center mt-7">
              <Icon
                name="trash-can"
                color={'#FF4949'}
                size={24}
                iconStyle="solid"
              />
              <Text className="text-[#FF4949]">Delete Task</Text>
            </View>

            <View className=" bg-[#8687E7]  py-3 rounded mt-auto mb-6">
              <Text className="text-white text-center">Edit Task</Text>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Task;
