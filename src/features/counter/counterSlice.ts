import {createSlice} from '@reduxjs/toolkit';

interface AppState {
  count: number;
}

const initialState: AppState = {
  count: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: state => {
      state.count += 1;
    },
    decrement: state => {
      if (state.count === 0) {
        throw new Error('Cannot decrement below 0');
      } else {
        state.count -= 1;
      }
    },
    reset: state => {
      state.count = 0;
    },
  },
});

export const {increment, decrement, reset} = counterSlice.actions;

export default counterSlice.reducer;
