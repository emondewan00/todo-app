import {View, Text, FlatList, Pressable, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Icon from '@react-native-vector-icons/fontawesome6';

// TODO: close modals and set priority data to task data object

// 1. Close modal function
// 2. Set priority data function

interface Props {
  onClose: () => void;
  onChangePriority: (priority: number) => void;
}

const Priority = ({onChangePriority, onClose}: Props) => {
  const [selectedPriority, setSelectedPriority] = useState(1);

  return (
    <View className="px-6 flex justify-center flex-1">
      <View className="bg-[#363636] px-3 pb-2 rounded">
        <Text className="text-white text-center font-bold py-4 border-b-[0.5px] border-b-[#979797]">
          Task Priority
        </Text>
        <View>
          <FlatList
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
            scrollEnabled={false}
            numColumns={4}
            columnWrapperClassName="gap-4 justify-between"
            contentContainerClassName="flex gap-y-4 my-5"
            renderItem={({item}) => {
              const isSelected = selectedPriority === item;

              return (
                <Pressable
                  onPress={() => setSelectedPriority(item)}
                  className={`size-[72px] items-center justify-center rounded  ${
                    isSelected ? 'bg-[#8687E7]' : 'bg-[#272727]'
                  }`}>
                  <Icon
                    name="flag"
                    color={'white'}
                    iconStyle="regular"
                    size={20}
                  />
                  <Text className="text-white  mt-1 text-lg">{item}</Text>
                </Pressable>
              );
            }}
          />
        </View>

        <View className="flex-row justify-between ">
          <TouchableOpacity onPress={onClose} className="w-[48%]">
            <Text className="text-[#8875FF] text-center px-6 py-3">Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onChangePriority(selectedPriority);
              onClose();
            }}
            className="w-[48%]">
            <Text className="text-white bg-[#8687E7] text-center px-6 py-3 rounded">
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Priority;
