import React, { FunctionComponent } from 'react';
import { useAppSelector } from '../../store/hooks';

//components
import AddTaskForm from '../AddTaskForm';
import TasksList from '../TasksList';

import {
   StyledPanelContainer,
   StyledLeftBox,
   StyledRightBox,
   StyledTopBar,
   StyledFormWrapper,
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
            <StyledFormWrapper>
               <AddTaskForm />
            </StyledFormWrapper>
         </StyledLeftBox>
         <StyledRightBox>
            <TasksList />
         </StyledRightBox>
      </StyledPanelContainer>
   );
};

export default UserPanelContainer;
