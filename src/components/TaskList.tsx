import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SectionList,
} from 'react-native';
import React from 'react';
import Icon from '@react-native-vector-icons/fontawesome6';
import Ionicons from '@react-native-vector-icons/ionicons';
import {useAppDispatch, useAppSelector} from '../hooks';
import {searchTasks} from '../features/todo/todoSlice';

type TaskListProps = {
  onClickTask: (taskId: string, sectionId: string) => void;
};

const TaskList: React.FC<TaskListProps> = ({onClickTask}) => {
  const {renderAbleTasks, searchTerm} = useAppSelector(state => state.todo);
  const dispatch = useAppDispatch();
  console.log(renderAbleTasks, searchTerm);
  return (
    <View className="px-6 pt-4 pb-20">
      <View className="flex flex-row items-center mb-4 border border-[#979797] rounded p-3 bg-[#1D1D1D] gap-x-3">
        <Ionicons name="search-outline" size={24} color={'#AFAFAF'} />
        <TextInput
        value={searchTerm}
          onChangeText={text => dispatch(searchTasks(text))}
          className="grow text-white"
          placeholderTextColor={'white'}
          placeholder="Search for your task..."
        />
      </View>

      <SectionList
        sections={renderAbleTasks}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="gap-y-4"
        renderItem={({item, section}) => {
          return (
            <TouchableOpacity
              onPress={() => onClickTask(item.id.toString(), section.title)}
              activeOpacity={0.6}
              className="bg-[#363636] py-3 px-[10px] rounded flex flex-row gap-x-4 items-center">
              <View>
                <View className="border border-white p-3 rounded-full" />
              </View>
              <View className="grow">
                <Text className="text-white">{item.title}</Text>
                <View className="flex flex-row justify-between mt-1.5">
                  <Text className="text-[#AFAFAF] text-sm">
                    Today At{' '}
                    {new Date(item.dueTime).toLocaleTimeString([], {
                      minute: '2-digit',
                      hour: '2-digit',
                    })}
                  </Text>
                  <View className="ml-auto flex flex-row gap-x-2">
                    <View className="bg-[#809CFF] py-1 px-2 rounded flex flex-row gap-x-1 items-center">
                      <Icon
                        name="graduation-cap"
                        size={14}
                        color={'white'}
                        iconStyle="solid"
                      />
                      <Text className="text-white">University</Text>
                    </View>
                    <View className="border border-[#8687E7] py-1 px-2 rounded flex flex-row gap-x-1 items-center">
                      <Icon name="flag" size={14} color={'white'} />
                      <Text className="text-white text-sm">
                        {item.priority}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        renderSectionHeader={({section: {title}}) => (
          <View className="bg-[#444444] py-1.5 px-2.5 rounded self-start">
            <Text className="text-white text-sm font-bold capitalize">
              {title}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default TaskList;
