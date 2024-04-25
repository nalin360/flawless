import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../reducers/userSlice';
import boardSlice from '../reducers/boardSlice';

const store = configureStore({
  reducer: {
    counter: userSlice,
    board: boardSlice,
  }
});

export default store;
