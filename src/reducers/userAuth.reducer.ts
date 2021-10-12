import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserAuthState {
   isUserLogged: boolean;
   user: UserType | undefined;
}
export type UserType = {
   name: string;
   password: string;
   id?: string;
   todo: [];
};
const initialState: UserAuthState = {
   isUserLogged: false,
   user: undefined,
};

export const userAuthSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      login: (state, action: PayloadAction<UserType>) => {
         state.isUserLogged = true;
         state.user = action.payload;
      },
   },
});

export const { login } = userAuthSlice.actions;
export default userAuthSlice.reducer;
