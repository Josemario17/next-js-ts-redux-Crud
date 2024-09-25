// store.ts
import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './ModalSlice';
import usersReducer from '@/Store/UserSlice'

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    users: usersReducer,
  }, 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
