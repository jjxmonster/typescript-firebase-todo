import * as types from '../actions/types';
import { userLoggedAction } from '../actions/actions';

export interface UserLoginState {
   isUserLogged: boolean;
   user: UserType | undefined;
}
export type UserType = {
   name: string;
   todo: object;
};
const initialState: UserLoginState = {
   isUserLogged: false,
   user: undefined,
};

export const userLogin = (
   state: UserLoginState = initialState,
   action: actions
): UserLoginState => {
   const { type, payload } = action;
   switch (type) {
      case types.USER_LOGGED:
         return { ...state, isUserLogged: true, user: payload };
      case types.USER_LOGOUT:
         return { ...state, isUserLogged: false, user: undefined };
      default:
         return state;
   }
};

export {};
