import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Alert,
  Modal,
} from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
import FAIcon from '@react-native-vector-icons/fontawesome6';
import RNDateTimePicker, {
  type DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import Priority from './Priority';
import type {Task} from '../types/task';
import {useAppDispatch, useAppSelector} from '../hooks';
import {addTask} from '../features/todo/todoSlice';
import {
  toggleDateModal,
  togglePriorityModal,
  toggleTimeModal,
} from '../features/modal/modalSlice';

interface OnChangeArgs {
  name: keyof Task;
  value: string | boolean | number;
}

const AddTask = ({onClose}: {onClose: () => void}) => {
  const inputRef = useRef<TextInput | null>(null);
  const {showDate, showTime, showPriority} = useAppSelector(
    state => state.modal,
  );
  const dispatch = useAppDispatch();

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [taskData, setTaskData] = useState<Task>({
    id: Date.now(),
    title: '',
    description: '',
    dueDate: Date.now(),
    dueTime: Date.now(),
    priority: 1,
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

  const handleDateChange = (event: DateTimePickerEvent, date?: Date) => {
    if (date) {
      setSelectedDate(date);
      setTaskData({
        ...taskData,
        dueDate: date.getTime(),
      });
      dispatch(toggleDateModal(false));
      dispatch(toggleTimeModal(true));
    }
  };

  const handleTimeChange = (event: DateTimePickerEvent, date?: Date) => {
    if (date) {
      setTaskData({
        ...taskData,
        dueTime: date.getTime(),
      });
    }
    dispatch(toggleTimeModal(false));
  };

  const onChange = ({name, value}: OnChangeArgs) => {
    setTaskData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (!taskData.title || !taskData.description) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    dispatch(addTask({...taskData, id: Date.now()}));
    onClose();
  };

  return (
    <View className="flex-1 justify-end bg-black/40">
      <View
        className={`bg-[#363636] p-6 rounded-t-xl ${
          showPriority ? 'hidden' : 'block'
        }`}>
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
                dispatch(toggleDateModal(true));
                Keyboard.dismiss();
              }}>
              <Icon name="timer-outline" size={24} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity>
              <FAIcon name="tag" size={24} color="#fff" iconStyle="solid" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => dispatch(togglePriorityModal())}>
              <Icon name="flag-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={handleSave}>
            <Icon name="save-outline" size={24} color="#8687E7" />
          </TouchableOpacity>
        </View>

        {/* modals  */}
        {/* date modal  */}
        {showDate && (
          <RNDateTimePicker
            testID="dateTimePicker"
            value={selectedDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
        {/* time modal  */}
        {showTime && (
          <RNDateTimePicker
            testID="timePicker"
            value={selectedDate}
            mode="time"
            display="default"
            onChange={handleTimeChange}
          />
        )}
      </View>

      {/* priority modal  */}
      <Modal
        visible={showPriority}
        transparent={true}
        animationType="slide"
        onRequestClose={() => dispatch(togglePriorityModal())}>
        <Priority
          onClose={() => dispatch(togglePriorityModal())}
          onChangePriority={(value: number) =>
            onChange({name: 'priority', value})
          }
        />
      </Modal>
    </View>
  );
};

export default AddTask;
