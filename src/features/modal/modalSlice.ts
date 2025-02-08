import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

interface Modals {
  showDate: boolean;
  showTime: boolean;
  showPriority: boolean;
  showAddTask: boolean;
}

const initialState: Modals = {
  showDate: false,
  showTime: false,
  showPriority: false,
  showAddTask: false,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    toggleDateModal: (state, action: PayloadAction<boolean>) => {
      state.showDate = action.payload;
    },
    toggleTimeModal: (state, action: PayloadAction<boolean>) => {
      state.showTime = action.payload;
    },
    togglePriorityModal: state => {
      state.showPriority = !state.showPriority;
    },
    toggleAddTaskModal: state => {
      state.showAddTask = !state.showAddTask;
    },
  },
});

export const {
  toggleAddTaskModal,
  toggleDateModal,
  togglePriorityModal,
  toggleTimeModal,
} = modalsSlice.actions;

export default modalsSlice.reducer;
