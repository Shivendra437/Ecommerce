import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/AuthSlice'
import productReducer from '../slices/ProductSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    product:productReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
