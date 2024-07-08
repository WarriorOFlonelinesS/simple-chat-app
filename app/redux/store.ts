import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../redux/rootReduser';

const store = configureStore({
  reducer: rootReducer,
});

export default store;
