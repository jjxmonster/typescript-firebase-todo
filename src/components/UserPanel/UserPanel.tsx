import React, { FunctionComponent } from 'react';
import { useAppSelector } from '../../store/hooks';

import {
   StyledPanelContainer,
   StyledLeftBox,
   StyledRightBox,
   StyledTopBar,
} from './UserPanel.css';

const UserPanelContainer: FunctionComponent = () => {
   const user = useAppSelector(state => state.auth.user);

   return (
      <StyledPanelContainer>
         <StyledLeftBox>
            <StyledTopBar>
               <h1>Hello, {user?.name}</h1>
               <p>Welcome back to your Todo List, we missed u!</p>
            </StyledTopBar>
         </StyledLeftBox>
         <StyledRightBox></StyledRightBox>
      </StyledPanelContainer>
   );
};

export default UserPanelContainer;
