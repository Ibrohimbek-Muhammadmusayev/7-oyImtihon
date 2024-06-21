import { createSlice } from "@reduxjs/toolkit";

const todoSlices = createSlice({
  initialState: {
    total: 0,
    todos: [],
    count: 0,
  },
  name: "todo",

  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    editTodo: (state, action) => {
      const { id, ...newTodo } = action.payload;
      const index = state.todos.findIndex((todo) => todo.id === id);
      if (index !== -1) {
        state.todos[index] = { ...state.todos[index], ...newTodo };
        localStorage.setItem("todos", JSON.stringify(state.todos));
      }
    },

    deleteTodo: (state, action) => {

    },

    increment: (state, action) => {
      state.count + 1 ;
    },

    decrement: (state, action) => {
      state.count - 1;
    },
  },
});

export const { addTodo, deleteTodo, editTodo, increment, decrement } = todoSlices.actions;
export default todoSlices.reducer;
