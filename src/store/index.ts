import { configureStore } from '@reduxjs/toolkit';

import listReducer from '../features/listSlice';

const store = configureStore({
  reducer: {
    list: listReducer,
  },
});

export type RootStore = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
