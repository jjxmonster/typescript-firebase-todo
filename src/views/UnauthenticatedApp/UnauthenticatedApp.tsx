import React, { FunctionComponent, useState } from 'react';

import { LoginView, RegisterView, AppWrapper } from '../../components';

const UnauthenticatedApp: FunctionComponent = () => {
   const [isUserHaveAccount, setIsUserHaveAccount] = useState(true);

   const changeView = () => {
      setIsUserHaveAccount(!isUserHaveAccount);
   };

   return (
      <AppWrapper>
         {isUserHaveAccount ? <LoginView /> : <RegisterView />}
      </AppWrapper>
   );
};

export default UnauthenticatedApp;
