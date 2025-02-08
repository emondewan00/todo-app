import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import todoReducer from '../features/todo/todoSlice';
import modalReducer from '../features/modal/modalSlice';

const store = configureStore({
  reducer: {
    todo: todoReducer,
    modal: modalReducer,
  }, // Add your reducers here
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
