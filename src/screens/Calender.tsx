import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from '@react-native-vector-icons/ionicons';

const Calender = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [days, setDays] = useState<string[]>([]);

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
            const isSelected =
              selectedDate.getDate() === new Date(item.item).getDate();

            return (
              <TouchableOpacity
                onPress={() => setSelectedDate(new Date(item.item))}
                activeOpacity={0.6}
                className={`items-center p-2 ${
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
    </SafeAreaView>
  );
};

export default Calender;
