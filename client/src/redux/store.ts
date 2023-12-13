import TodosReducer from './todo.reduser';
import NotebooksReducer from './notebook.reduser';
import UserReducer from './user.reduser';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    UserReducer,
    NotebooksReducer,
    TodosReducer,
  },
});
export default store;