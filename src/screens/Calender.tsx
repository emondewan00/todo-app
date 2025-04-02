import {View, Text, FlatList, TouchableOpacity, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from '@react-native-vector-icons/ionicons';
import {useAppSelector} from '../hooks';
import getRelativeTime from '../utils/getRelativeTime';
import {CalenderScreenProps} from '../types/navigation';

const Calender: React.FC<CalenderScreenProps> = ({navigation}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [days, setDays] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('active');
  const {tasks} = useAppSelector(state => state.todo);
  const dates = (daysFor: Date) => {
    const daysArr = [];
    const date = new Date(daysFor);
    date.setDate(1);
    const acceptedMonth = new Date(daysFor).getMonth();
    for (let i = 0; i < 31; i++) {
      const month = date.getMonth();
      if (month !== acceptedMonth) {
        break;
      }
      daysArr.push(date.toISOString());
      date.setDate(date.getDate() + 1);
    }
    return daysArr;
  };

  useEffect(() => {
    setDays(dates(selectedMonth));
  }, [selectedMonth]);

  const dateFormatter = new Intl.DateTimeFormat('en', {day: 'numeric'});

  const filterTasks = () => {
    const taskSection = tasks
      .filter(section => {
        if (section.title === activeTab) {
          return true;
        } else {
          return false;
        }
      })
      .pop();

    const filteredTasks =
      taskSection !== undefined &&
      taskSection.data.filter(task => {
        return (
          new Date(task.dueDate).setHours(0, 0, 0, 0) ===
          new Date(selectedDate).setHours(0, 0, 0, 0)
        );
      });

    return filteredTasks || [];
  };
  const onClickTask = (id: string, sectionId: string) => {
    navigation.navigate('Task', {taskId: id, sectionId});
  };
  return (
    <SafeAreaView className="flex-1 bg-[#121212] pb-32">
      <View className=" bg-[#363636] p-4">
        <View className="flex flex-row justify-between items-center">
          <TouchableOpacity
            onPress={() =>
              setSelectedMonth(
                new Date(selectedMonth.setMonth(selectedMonth.getMonth() - 1)),
              )
            }>
            <Icon name="arrow-back-sharp" size={24} color="white" />
          </TouchableOpacity>
          <View>
            <Text className="text-white text-2xl font-bold">
              {selectedMonth.toLocaleString('en', {month: 'long'})}
            </Text>
            <Text className="text-white text-sm text-center">
              {selectedMonth.getFullYear()}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              setSelectedMonth(
                new Date(selectedMonth.setMonth(selectedMonth.getMonth() + 1)),
              )
            }>
            <Icon name="arrow-forward-sharp" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={days}
          keyExtractor={item => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="gap-x-4 mt-4"
          renderItem={item => {
            const day = new Date(item.item);
            const isSelected =
              selectedDate.getDate() === day.getDate() &&
              selectedDate.getMonth() === day.getMonth();

            return (
              <TouchableOpacity
                onPress={() => setSelectedDate(new Date(item.item))}
                activeOpacity={0.6}
                className={`items-center px-4 py-2 ${
                  isSelected ? 'bg-[#8687E7]' : 'bg-[#272727]'
                }`}>
                <Text className="text-white text-sm">
                  {new Date(item.item).toLocaleDateString('en', {
                    weekday: 'short',
                  })}
                </Text>
                <Text className="text-white text-sm font-bold">
                  {dateFormatter.format(new Date(item.item))}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View className="px-4 flex-row gap-x-2 my-4">
        <Pressable
          className={`w-1/2 p-4 rounded ${
            activeTab === 'active' ? 'bg-[#8687E7]' : 'bg-[#363636]'
          }`}
          onPress={() => setActiveTab('active')}>
          <Text className="text-white text-lg font-bold text-center">
            Active
          </Text>
        </Pressable>
        <Pressable
          className={`w-1/2 p-4 rounded ${
            activeTab === 'completed' ? 'bg-[#8687E7]' : 'bg-[#363636]'
          }`}
          onPress={() => setActiveTab('completed')}>
          <Text className="text-white text-lg font-bold text-center">
            Completed
          </Text>
        </Pressable>
      </View>

      <FlatList
        data={filterTasks()}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="gap-y-4 px-4"
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => onClickTask(item.id.toString(), activeTab)}
              activeOpacity={0.6}
              className="bg-[#363636] py-3 px-[10px] rounded flex flex-row gap-x-4 items-center">
              <View>
                <View className="border border-white p-3 rounded-full" />
              </View>
              <View className="grow">
                <Text className="text-white">{item.title}</Text>
                <View className="flex flex-row justify-between mt-1.5">
                  <Text className="text-[#AFAFAF] text-sm">
                    {getRelativeTime(item.dueTime)}
                  </Text>
                  <View className="ml-auto flex flex-row gap-x-2">
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
      />
    </SafeAreaView>
  );
};

export default Calender;
