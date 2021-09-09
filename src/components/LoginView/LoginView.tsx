import React, { FunctionComponent } from 'react';

import { StyledFormContainer, StyledBottomText } from './LoginView.css';
// material ui
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';

// material icons
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const LoginView: FunctionComponent = () => {
   return (
      <StyledFormContainer>
         <h2>LOGIN</h2>
         <form>
            <TextField
               style={{
                  marginBottom: '10px',
               }}
               fullWidth
               id='standard-basic'
               InputLabelProps={{
                  style: {
                     fontFamily: ` 'Urbanist', sans-serif`,
                     fontWeight: 600,
                     fontSize: '18px',
                  },
               }}
               label='Username'
            />
            <TextField
               fullWidth
               style={{
                  marginBottom: '10px',
               }}
               id='standard-basic'
               inputProps={{
                  type: 'password',
               }}
               InputLabelProps={{
                  style: {
                     fontFamily: ` 'Urbanist', sans-serif`,
                     fontWeight: 600,
                     fontSize: '18px',
                  },
               }}
               label='Password'
            />
            <IconButton aria-label='login'>
               <ExitToAppIcon
                  style={{
                     color: '#7cea9c',
                     fontSize: '4.2vh',
                  }}
               />
            </IconButton>
         </form>
         <StyledBottomText>
            Don't have an account? <span>Sign in</span>
         </StyledBottomText>
      </StyledFormContainer>
   );
};

export default LoginView;
