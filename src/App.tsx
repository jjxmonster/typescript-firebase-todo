import React, { FunctionComponent } from 'react';

import { useAppSelector } from './store/hooks';

const App: FunctionComponent = () => {
   const isUserLogged = useAppSelector(state => state.auth);

   return <div>TODO</div>;
};

export default App;
