import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {TabButtonProps} from '../types/navigation';
import Icon from '@react-native-vector-icons/fontawesome6';

const TabButton = ({
  onPress,
  accessibilityState,
  title,
  iconName,
}: TabButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={accessibilityState?.selected}
      className="flex-1 items-center justify-center">
      <Icon name={iconName} iconStyle="solid" size={24} color={'white'} />
      <Text className="text-white text-sm mt-0.5">{title}</Text>
    </TouchableOpacity>
  );
};
export default TabButton;
