import React, { FunctionComponent } from 'react';

import { useAppSelector } from './store/hooks';

import { AuthenticatedApp, UnauthenticatedApp } from './views';

const App: FunctionComponent = () => {
   const isUserLogged = useAppSelector(state => state.auth);

   return <UnauthenticatedApp />;
};

export default App;
