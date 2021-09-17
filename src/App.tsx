import React, { FunctionComponent } from 'react';

import { useAppSelector } from './store/hooks';

import { AuthenticatedApp, UnauthenticatedApp } from './views';

const App: FunctionComponent = () => {
   const isUserLogged = useAppSelector(state => state.auth.isUserLogged);

   return isUserLogged ? <AuthenticatedApp /> : <UnauthenticatedApp />;
};

export default App;
