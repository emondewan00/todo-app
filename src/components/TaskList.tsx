import {View, Text, TextInput, FlatList} from 'react-native';
import React from 'react';
import Icon from '@react-native-vector-icons/fontawesome6';
import Ionicons from '@react-native-vector-icons/ionicons';

const TaskList = () => {
  return (
    <View className="px-6 pt-4">
      <View className="flex flex-row items-center mb-4 border border-[#979797] rounded p-3 bg-[#1D1D1D] gap-x-3">
        <Ionicons name="search-outline" size={24} color={'#AFAFAF'} />
        <TextInput
          className="grow text-white"
          placeholderTextColor={'white'}
          placeholder="Search for your task..."
        />
      </View>

      <FlatList
        data={[1, 2, 3, 4, 5]}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="gap-y-4"
        renderItem={() => {
          return (
            <View className="bg-[#363636] py-3 px-[10px] rounded flex flex-row gap-x-4 items-center">
              <View>
                <View className="border border-white p-3 rounded-full" />
              </View>
              <View className="grow">
                <Text className="text-white ">Math homework</Text>
                <View className="flex flex-row justify-between mt-1.5">
                  <Text className="text-[#AFAFAF] text-sm">Today At 16:45</Text>
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
                      <Text className="text-white text-sm">1</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default TaskList;
