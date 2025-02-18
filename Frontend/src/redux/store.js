import { configureStore, createSlice } from "@reduxjs/toolkit";
import filterReducer from "./filterSlice";
import authReducer from "./authSlice"; // ✅ Imported authentication reducer

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todo: [
      { id: "1", title: "Brainstorming", description: "Description of Task 1", status: "todo" },
      { id: "2", title: "WireFrames", description: "Description of Task 2", status: "todo" },
    ],
    inProgress: [
      { id: "3", title: "Design Utility", description: "Description of Task 1", status: "inProgress" },
      { id: "4", title: "Work on ", description: "Description of Task 2", status: "inProgress" },
    ],
    done: [
      { id: "5", title: "Pull request Accepted", description: "Description of Task 1", status: "done" },
      { id: "6", title: "Deployed Successfully", description: "Description of Task 2", status: "done" },
    ],
  },
  reducers: {
    addTodo: (state, action) => {
      state.todo.push({ id: Date.now().toString(), ...action.payload, status: "todo" });
    },
    updateTodos: (state, action) => {
      return action.payload;
    },
    moveTodo: (state, action) => {
      const { id, from, to } = action.payload;

      // Find and remove the task from the source list
      const taskIndex = state[from].findIndex(task => task.id === id);
      if (taskIndex === -1) return; // Task not found

      const [movedTask] = state[from].splice(taskIndex, 1);

      // Update task status and push it to the destination list
      movedTask.status = to;
      state[to].push(movedTask);
    },
  },
});

export const { addTodo, updateTodos, moveTodo } = todoSlice.actions;

const store = configureStore({
  reducer: {
    todos: todoSlice.reducer,
    filter: filterReducer,
    auth: authReducer, // ✅ Integrated authentication reducer
  },
});

export default store;
