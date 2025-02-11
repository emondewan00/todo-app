import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

interface Modals {
  showDate: boolean;
  showTime: boolean;
  showPriority: boolean;
  showAddTask: boolean;
  showDeleteMessage: boolean;
}

const initialState: Modals = {
  showDate: false,
  showTime: false,
  showPriority: false,
  showAddTask: false,
  showDeleteMessage: false,
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
    toggleShowDeleteMessageModal: state => {
      state.showDeleteMessage = !state.showDeleteMessage;
    },
  },
});

export const {
  toggleAddTaskModal,
  toggleDateModal,
  togglePriorityModal,
  toggleTimeModal,
  toggleShowDeleteMessageModal,
} = modalsSlice.actions;

export default modalsSlice.reducer;
