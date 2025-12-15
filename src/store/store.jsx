import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../store/todos';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});