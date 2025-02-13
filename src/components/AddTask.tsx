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
import {addTask, updateTask} from '../features/todo/todoSlice';
import {
  toggleDateModal,
  togglePriorityModal,
  toggleTimeModal,
} from '../features/modal/modalSlice';

interface AddTaskProps {
  onClose: () => void;
  task?: Task;
  status?: string;
}

interface OnChangeArgs {
  name: keyof Task;
  value: string | boolean | number;
}

const defaultTask = {
  id: Date.now().toString(),
  title: '',
  description: '',
  dueDate: Date.now(),
  dueTime: Date.now(),
  priority: 1,
  completed: false,
};

const AddTask: React.FC<AddTaskProps> = ({
  onClose,
  task = defaultTask,
  status,
}) => {
  const inputRef = useRef<TextInput | null>(null);
  const {showDate, showTime, showPriority} = useAppSelector(
    state => state.modal,
  );
  const dispatch = useAppDispatch();

  const [taskData, setTaskData] = useState<Task>(task);

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

    if (status) {
      dispatch(
        updateTask({
          status,
          taskId: taskData.id,
          taskData: taskData,
        }),
      );
    } else {
      dispatch(addTask({...taskData, id: Date.now().toString()}));
    }

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
          value={taskData.title}
          onChangeText={text => onChange({name: 'title', value: text})}
          placeholder="Do math homework"
        />
        <TextInput
          className="border mt-3 border-white px-4 py-2 rounded text-white"
          placeholderTextColor={'white'}
          value={taskData.description}
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
            value={new Date(taskData.dueDate)}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
        {/* time modal  */}
        {showTime && (
          <RNDateTimePicker
            testID="timePicker"
            value={new Date(taskData.dueTime)}
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
