import React, { FunctionComponent, useState } from 'react';

import { LoginView, RegisterView, AppWrapper } from '../../components';

const UnauthenticatedApp: FunctionComponent = () => {
   const [isUserHaveAccount, setIsUserHaveAccount] = useState(false);

   const changeView = () => {
      setIsUserHaveAccount(!isUserHaveAccount);
   };

   return (
      <AppWrapper>
         {isUserHaveAccount ? (
            <LoginView changeView={changeView} />
         ) : (
            <RegisterView changeView={changeView} />
         )}
      </AppWrapper>
   );
};

export default UnauthenticatedApp;
