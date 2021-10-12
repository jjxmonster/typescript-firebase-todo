import React, { FunctionComponent } from 'react';

import { useAppSelector } from './store/hooks';

import { AuthenticatedApp, UnauthenticatedApp } from './views';

import { saveState } from './data/localStorage/localStorage';
import { store } from './store/store';

store.subscribe(() => {
   saveState(store.getState());
});

const App: FunctionComponent = () => {
   const isUserLogged = useAppSelector(state => state.auth.isUserLogged);

   return isUserLogged ? <AuthenticatedApp /> : <UnauthenticatedApp />;
};

export default App;
