import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface User {
    key: string;
    name: string;
    email: string;
    cargo: string;
}

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://thirdheart-b1751-default-rtdb.firebaseio.com/' }),
    endpoints: (builder) => ({
      getUsers: builder.query<User[], void>({
        query: () => 'usuarios.json',
        transformResponse: (response: Record<string, User>) => 
          response ? Object.values(response) : [],
      }),
    }),
  });
  
  export const { useGetUsersQuery } = userApi;
