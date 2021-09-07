import * as types from './types';
import { UserType } from '../reducers/userAuth.reducer';

export interface Action<T> {
   readonly type: string;
   readonly payload?: T;
}

export function createAction<T>(type: string, payload: T): Action<T> {
   return { type, payload };
}

//////////////////////////////////////////////////////////////////////////////////////////////// USER LOGIN
export type userLoggedAction = Action<UserType>;
export function userLogged(user: UserType): userLoggedAction {
   return createAction(types.USER_LOGGED, user);
}
export type userLogoutAction = Action<null>;
export function userLogout(): userLogoutAction {
   return createAction(types.USER_LOGOUT, null);
}
