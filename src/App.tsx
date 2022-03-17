import React, { FunctionComponent, useEffect } from 'react';

import { useAppSelector, useAppDispatch } from './store/hooks';

import { AuthenticatedApp, UnauthenticatedApp } from './views';

import { login } from './reducers/userAuth.reducer';

import { firebaseApp } from './firebase/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth(firebaseApp);

const App: FunctionComponent = () => {
   const isUserLogged = useAppSelector(state => state.auth.isUserLogged);
   const dispatch = useAppDispatch();

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, firebaseUser => {
         dispatch(login(firebaseUser));
      });

      return unsubscribe;
   }, []);

   return isUserLogged ? <AuthenticatedApp /> : <UnauthenticatedApp />;
};

export default App;
