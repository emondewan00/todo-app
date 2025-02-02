import {View, Text, StyleSheet, Button} from 'react-native';
import React from 'react';
import {decrement, increment, reset} from '../features/counter/counterSlice';
import {useAppDispatch, useAppSelector} from '../hooks';

const Home = () => {
  const {count} = useAppSelector(state => state.counter);
  const dispatch = useAppDispatch();
  return (
    <View style={styles.container}>
      <Text style={styles.text} className="text-red-400">
        Counter: {count}
      </Text>
      <View style={styles.buttonContainer}>
        <Button title="Increment" onPress={() => dispatch(increment())} />
        <Button title="Decrement" onPress={() => dispatch(decrement())} />
        <Button title="Reset" onPress={() => dispatch(reset())} />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 20,
  },
});
