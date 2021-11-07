import React, { FunctionComponent, useState } from 'react';

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
   StyledMobileFormModalContainer,
   StyledFormWrapper,
} from './UserPanel.css';

import { STORAGE_KEY } from '../../data/localStorage/localStorage';

// material
import LogoutIcon from '@mui/icons-material/Logout';
import { Dialog, IconButton, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
   paper: { maxWidth: '100vw', background: 'transparent' },
}));

const UserPanelContainer: FunctionComponent = () => {
   const classes = useStyles();

   const user = useAppSelector(state => state.auth.user);
   const dispatch = useDispatch();

   const [isFormModalOpen, setIsFormModalOpen] = useState(false);

   const handleLogout = () => {
      localStorage.removeItem(STORAGE_KEY);
      dispatch(logout());
   };

   const handleOpenFormModal = () => {
      setIsFormModalOpen(true);
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

            <Dialog
               classes={{ paper: classes.paper }}
               className='form-modal'
               aria-describedby='alert-dialog-slide-description'
               keepMounted
               open={isFormModalOpen}
               onClose={() => setIsFormModalOpen(false)}
            >
               <StyledMobileFormModalContainer>
                  <AddTaskForm />
               </StyledMobileFormModalContainer>
            </Dialog>
         </StyledLeftBox>
         <StyledRightBox>
            <TasksList handleOpenFormModal={handleOpenFormModal} />
         </StyledRightBox>
      </StyledPanelContainer>
   );
};

export default UserPanelContainer;
