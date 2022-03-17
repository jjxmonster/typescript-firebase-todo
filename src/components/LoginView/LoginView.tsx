import React, { FunctionComponent, useState } from 'react';
import { useAppDispatch } from '../../store/hooks';

import { useForm, SubmitHandler } from 'react-hook-form';

import { Auth, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseApp } from '../../firebase/firebase';
import { login } from '../../reducers/userAuth.reducer';

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
   email: string;
   password: string;
};

const auth = getAuth(firebaseApp);

const LoginView: FunctionComponent<LoginViewProps> = ({ changeView }) => {
   const { handleSubmit, setValue, register } = useForm<Inputs>();
   const dispatch = useAppDispatch();

   const [error, setError] = useState(null);

   const onSubmit: SubmitHandler<Inputs> = async data => {
      const { email, password } = data;
      try {
         await signInWithEmailAndPassword(auth, email, password);
      } catch (error: any) {
         setError(error.toString());
      }
   };

   return (
      <StyledFormContainer>
         <h2>LOGIN</h2>
         <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
               style={{
                  marginBottom: '10px',
               }}
               {...(register('email'), { required: true })}
               onChange={e => setValue('email', e.target.value)}
               fullWidth
               id='standard-basic'
               InputLabelProps={{
                  style: {
                     fontFamily: ` 'Urbanist', sans-serif`,
                     fontWeight: 600,
                     fontSize: '18px',
                  },
               }}
               label='Email'
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
            {error && <span style={{ color: 'red' }}>{error}</span>}
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
