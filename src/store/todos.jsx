import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
  editingId: null,
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: {
      reducer: (state, action) => {
        state.todos.push(action.payload);
      },
      prepare: (text) => {
        return {
          payload: {
            id: nanoid(),
            text,
            completed: false,
          },
        };
      },
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    startEditTodo: (state, action) => {
      state.editingId = action.payload;
    },
    saveEditTodo: (state, action) => {
      const { id, newText } = action.payload;
      const todo = state.todos.find(todo => todo.id === id);
      if (todo) {
        todo.text = newText;
        state.editingId = null;
      }
    },
    cancelEdit: (state) => {
      state.editingId = null;
    },
  },
});

export const {
  addTodo,
  deleteTodo,
  toggleTodo,
  startEditTodo,
  saveEditTodo,
  cancelEdit,
} = todosSlice.actions;

export default todosSlice.reducer;