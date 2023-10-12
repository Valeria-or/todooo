
import NotebooksReducer from './notebook.reduser';
import UserReducer from './user.reduser';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    UserReducer,
    NotebooksReducer
  },
});
export default store;