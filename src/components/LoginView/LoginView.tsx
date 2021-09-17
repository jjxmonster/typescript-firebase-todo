import React, { FunctionComponent } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';

import { authUser } from '../../data/usersFetch';

import { StyledFormContainer, StyledBottomText } from './LoginView.css';
// material ui
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
// material icons
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

interface LoginViewProps {
   changeView: Function;
}

type Inputs = {
   name: string;
   password: string;
};

const LoginView: FunctionComponent<LoginViewProps> = ({ changeView }) => {
   const { handleSubmit, setValue, register } = useForm<Inputs>();

   const onSubmit: SubmitHandler<Inputs> = data => {
      authUser(data).then(res => console.log(res));
   };

   return (
      <StyledFormContainer>
         <h2>LOGIN</h2>
         <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
               style={{
                  marginBottom: '10px',
               }}
               {...(register('name'), { required: true })}
               onChange={e => setValue('name', e.target.value)}
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
               {...(register('password'), { required: true })}
               onChange={e => setValue('password', e.target.value)}
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
            <IconButton aria-label='login' type='submit'>
               <ExitToAppIcon
                  style={{
                     color: '#7cea9c',
                     fontSize: '4.2vh',
                  }}
               />
            </IconButton>
         </form>
         <StyledBottomText>
            Don't have an account?{' '}
            <span onClick={() => changeView()}>Sign in</span>
         </StyledBottomText>
      </StyledFormContainer>
   );
};

export default LoginView;
