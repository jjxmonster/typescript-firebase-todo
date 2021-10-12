import { configureStore, createStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from '../reducers/userAuth.reducer';

import { loadState } from '../localStorage/localStorage';

const reducers = combineReducers({
   auth: authReducer,
});

const persistedState = loadState();

export const store = createStore(reducers, persistedState);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
