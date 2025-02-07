import {View, Image, Text} from 'react-native';
import React from 'react';

const EmptyTask = () => {
  return (
    <View className="flex items-center justify-center flex-1 ">
      <View>
        <Image
          source={require('../assets/images/Checklist-rafiki.png')}
          alt="check list image "
        />
        <Text className="text-xl text-center text-white">
          What do you want to do today?
        </Text>
        <Text className="text-base text-white text-center">
          Tap + to add your tasks
        </Text>
      </View>
    </View>
  );
};

export default EmptyTask;
