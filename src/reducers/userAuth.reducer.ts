import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';

export interface UserAuthState {
   isUserLogged: boolean;
   user: User | null;
}
export type UserType = User;

const initialState: UserAuthState = {
   isUserLogged: false,
   user: null,
};

export const userAuthSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      login: (state, action: PayloadAction<User | null>) => {
         state.isUserLogged = true;
         state.user = action.payload;
      },
      logout: state => {
         state.isUserLogged = false;
         state.user = null;
      },
      updateUser: (state, action) => {
         state.user = action.payload;
      },
   },
});

export const { login, logout } = userAuthSlice.actions;
export default userAuthSlice.reducer;
