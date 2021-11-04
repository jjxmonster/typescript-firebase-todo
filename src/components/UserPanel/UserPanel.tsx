import React, { FunctionComponent } from 'react';

import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store/hooks';
import { logout } from '../../reducers/userAuth.reducer';

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

import { STORAGE_KEY } from '../../data/localStorage/localStorage';

// material
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton } from '@material-ui/core';

const UserPanelContainer: FunctionComponent = () => {
   const user = useAppSelector(state => state.auth.user);
   const dispatch = useDispatch();

   const handleLogout = () => {
      localStorage.removeItem(STORAGE_KEY);
      dispatch(logout());
   };

   return (
      <StyledPanelContainer>
         <StyledLeftBox>
            <StyledTopBar>
               <IconButton
                  onClick={handleLogout}
                  style={{
                     width: '5vh',
                  }}
               >
                  <LogoutIcon
                     style={{
                        fontSize: '5vh',
                        color: 'white',
                     }}
                  />
               </IconButton>
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
