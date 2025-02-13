import {View, Text, TouchableOpacity, Pressable, Modal} from 'react-native';
import React, {useState} from 'react';
import type {TaskScreenProps} from '../types/navigation';
import Icon from '@react-native-vector-icons/fontawesome6';
import {useAppDispatch, useAppSelector} from '../hooks';

import type {Task as TaskType, TaskSection} from '../types/task';
import TaskInfoRow from '../components/TaskInfoRow';
import {SafeAreaView} from 'react-native-safe-area-context';
import {removeTask} from '../features/todo/todoSlice';
import DeleteMessage from '../components/DeleteMessage';
import {toggleShowDeleteMessageModal} from '../features/modal/modalSlice';
import AddTask from '../components/AddTask';

const Task: React.FC<TaskScreenProps> = ({route, navigation}) => {
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
  const {showDeleteMessage} = useAppSelector(state => state.modal);
  const task = useAppSelector(state => findTask(state.todo.tasks));
  const dispatch = useAppDispatch();
  const [editModal, setEditModal] = useState(false);

  const deleteTask = () => {
    dispatch(removeTask({status: sectionId, taskId}));
    navigation.goBack();
  };

  return (
    <SafeAreaView className="flex-1 bg-[#121212] px-6">
      <View className="flex-1">
        <View className="flex flex-row justify-between mt-2.5 mb-7">
          <TouchableOpacity onPress={() => navigation.goBack()}>
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
            <Pressable
              onPress={() => dispatch(toggleShowDeleteMessageModal())}
              className="flex flex-row gap-x-2 items-center mt-7">
              <Icon
                name="trash-can"
                color={'#FF4949'}
                size={24}
                iconStyle="solid"
              />
              <Text className="text-[#FF4949]">Delete Task</Text>
            </Pressable>
            {showDeleteMessage && (
              <Modal
                visible={showDeleteMessage}
                transparent={true}
                animationType="slide"
                onRequestClose={() => dispatch(toggleShowDeleteMessageModal())}>
                <DeleteMessage
                  onClose={() => dispatch(toggleShowDeleteMessageModal())}
                  onDeleteTask={deleteTask}
                  title={task?.title as string}
                />
              </Modal>
            )}
            <Pressable
              onPress={() => setEditModal(true)}
              className=" bg-[#8687E7]  py-3 rounded mt-auto mb-6">
              <Text className="text-white text-center">Edit Task</Text>
            </Pressable>

            {
              <Modal
                visible={editModal}
                animationType="fade"
                onRequestClose={() => setEditModal(false)}
                transparent>
                <AddTask
                  onClose={() => setEditModal(false)}
                  task={task}
                  status={sectionId}
                />
              </Modal>
            }
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Task;
