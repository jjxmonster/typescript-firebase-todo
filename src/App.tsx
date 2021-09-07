import React, { FunctionComponent, useEffect } from 'react';

import { getUsers } from './data/usersFetch';

const App: FunctionComponent = () => {
   useEffect(() => {
      getUsers().then(res => {
         console.log(res);
      });
   }, []);
   return <div>TODO</div>;
};

export default App;
