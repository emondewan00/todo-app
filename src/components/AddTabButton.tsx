import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import {BottomTabBarButtonProps} from '@react-navigation/bottom-tabs';
import Icon from '@react-native-vector-icons/fontawesome6';

const AddTabButton: React.FC<BottomTabBarButtonProps> = ({onPress}) => {
  return (
    <View className="flex-1 items-center justify-center">
      <TouchableOpacity
        onPress={onPress}
        className="items-center bg-[#8687E7] size-16 justify-center rounded-full absolute bottom-1/2">
        <Icon name="plus" size={24} iconStyle="solid" color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default AddTabButton;
