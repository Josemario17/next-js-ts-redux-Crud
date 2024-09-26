
import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './ModalSlice';
import usersReducer from '@/Store/UserSlice';
import { userApi } from './UserApi'; 
import UserSlice from '@/Store/UserSlice';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    users: UserSlice,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;