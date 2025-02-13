import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import type {Task, TasksState} from '../../types/task';

const initialState: TasksState = {
  tasks: [
    {
      title: 'active',
      data: [],
    },
    {
      title: 'completed',
      data: [],
    },
  ],
  renderAbleTasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const category = state.tasks.find(t => t.title === 'active');
      if (category) {
        category.data.push(action.payload);
      }

      // Update render able Tasks
      state.renderAbleTasks = state.tasks.filter(
        section => section.data.length > 0,
      );
    },
    updateTask: (
      state,
      action: PayloadAction<{
        status: string;
        taskId: string;
        taskData: Task;
      }>,
    ) => {
      const {status, taskId, taskData} = action.payload;
      const category = state.tasks.find(t => t.title === status);
      if (category) {
        category.data = category.data.map(task =>
          task.id === taskId ? {...task, ...taskData} : task,
        );
      }
      // Update render able Tasks
      state.renderAbleTasks = state.tasks.filter(
        section => section.data.length > 0,
      );
    },
    removeTask: (state, action) => {
      const {status, taskId} = action.payload;
      const category = state.tasks.find(t => t.title === status);
      if (category) {
        category.data = category.data.filter(task => task.id !== taskId);
      }
      // Update render able Tasks
      state.renderAbleTasks = state.tasks.filter(
        section => section.data.length > 0,
      );
    },
  },
});

export const {addTask, removeTask, updateTask} = tasksSlice.actions;
export default tasksSlice.reducer;
