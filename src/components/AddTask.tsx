import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Alert,
} from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
import FAIcon from '@react-native-vector-icons/fontawesome6';
import RNDateTimePicker from '@react-native-community/datetimepicker';

interface Task {
  title: string;
  description: string;
  dueDate: number;
  dueTime: number;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
}

interface OnChangeArgs {
  name: keyof Task;
  value: string | boolean | number;
}

const AddTask = ({onClose}: {onClose: () => void}) => {
  const inputRef = useRef<TextInput | null>(null);
  const [showDateTime, setShowDateTime] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showTimeModal, setShowTimeModal] = useState(false);

  const [taskData, setTaskData] = useState<Task>({
    title: '',
    description: '',
    dueDate: Date.now(),
    dueTime: Date.now(),
    priority: 'low',
    completed: false,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleDateChange = (event: any, date?: Date) => {
    setShowDateTime(false);
    if (date) {
      setSelectedDate(date);
      setTaskData({
        ...taskData,
        dueDate: date.getTime(),
      });
      setShowTimeModal(true);
    }
  };

  const handleTimeChange = (event: any, date?: Date) => {
    setShowTimeModal(false);
    if (date) {
      setTaskData({
        ...taskData,
        dueTime: date.getTime(),
      });
    }
  };

  const onChange = ({name, value}: OnChangeArgs) => {
    setTaskData({
      ...taskData,
      [name]: value,
    });
  };

  const handleSave = () => {
    if (!taskData.title || !taskData.description) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    console.log(taskData);
  };

  return (
    <View className="bg-[#363636] p-6 rounded-t-xl">
      <Text className="text-white text-xl ">Add Task</Text>
      <TextInput
        className="border mt-3 border-white px-4 py-2 rounded text-white"
        placeholderTextColor={'white'}
        ref={inputRef}
        onChangeText={text => onChange({name: 'title', value: text})}
        placeholder="Do math homework"
      />
      <TextInput
        className="border mt-3 border-white px-4 py-2 rounded text-white"
        placeholderTextColor={'white'}
        onChangeText={text => onChange({name: 'description', value: text})}
        placeholder="Do chapter 2 for next week"
      />
      <View className="flex flex-row justify-between items-center mt-5">
        <View className="flex-row gap-4">
          <TouchableOpacity
            onPress={() => {
              setShowDateTime(true);
              Keyboard.dismiss();
            }}>
            <Icon name="timer-outline" size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onChange({name: 'priority', value: 'medium'})}>
            <FAIcon name="tag" size={24} color="#fff" iconStyle="solid" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onChange({name: 'priority', value: 'high'})}>
            <Icon name="flag-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleSave}>
          <Icon name="save-outline" size={24} color="#8687E7" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={onClose}
        className="flex items-center justify-center mt-5">
        <Text className="text-white text-sm">Close modal</Text>
      </TouchableOpacity>
      {showDateTime && (
        <RNDateTimePicker
          testID="dateTimePicker"
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      {showTimeModal && (
        <RNDateTimePicker
          testID="timePicker"
          value={selectedDate}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}
    </View>
  );
};

export default AddTask;
