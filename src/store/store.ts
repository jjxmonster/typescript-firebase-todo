import { createStore, combineReducers } from '@reduxjs/toolkit';

import authReducer from '../reducers/userAuth.reducer';

const reducers = combineReducers({
   auth: authReducer,
});

export const store = createStore(reducers);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
