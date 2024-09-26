// store.ts
import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './ModalSlice';
import usersReducer from '@/Store/UserSlice';
import {usersApi} from './UserApi'; // Make sure this import is correct

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    users: usersReducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
