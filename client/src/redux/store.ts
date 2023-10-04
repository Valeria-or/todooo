
import UserReducer from './user.reduser';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    UserReducer,
  },
});
export default store;