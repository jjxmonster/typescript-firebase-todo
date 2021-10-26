import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import bcrypt from 'bcryptjs';

import {
   StyledFormContainer,
   StyledBottomText,
} from '../LoginView/LoginView.css';
// material ui
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';

// material icons
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { addUser } from '../../data/firebase/usersFetch';

interface RegisterViewProps {
   changeView: Function;
}

type Inputs = {
   name: string;
   password: string;
   repeatPassword: string;
};

const RegisterView: FunctionComponent<RegisterViewProps> = ({ changeView }) => {
   const {
      register,
      handleSubmit,
      watch,
      setValue,

      formState: { errors },
   } = useForm<Inputs>();

   const [isError, setIsError] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');

   const password = useRef('');
   password.current = watch('password', '');

   const onSubmit: SubmitHandler<Inputs> = data => {
      const { name, password } = data;

      addUser({
         name,

         password: bcrypt.hashSync(password, 10),
         todo: [],
         doneTasks: [],
      }).then(res => {
         if (res.error) {
            setIsError(true);
            setErrorMessage(res.message);
         } else {
            changeView();
         }
      });
   };

   useEffect(() => {
      // FORM VALIDATION
      register('name', {
         validate: value => value?.length >= 3 && value.length < 20,
      });
      register('password', {
         validate: value => value?.length >= 5 && value.length < 15,
      });
      register('repeatPassword', {
         validate: value => value === password.current,
      });
   }, [register]);

   return (
      <StyledFormContainer>
         <h2>REGISTER</h2>
         <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
               style={{
                  marginBottom: '10px',
               }}
               error={Boolean(errors?.name)}
               fullWidth
               id='standard-basic'
               onChange={e => setValue('name', e.target.value)}
               InputLabelProps={{
                  style: {
                     fontFamily: ` 'Urbanist', sans-serif`,
                     fontWeight: 600,
                     fontSize: '18px',
                  },
               }}
               label='Username'
            />
            {errors.name && (
               <span>Username must be 3 to 10 characters long.</span>
            )}
            <br></br>
            <TextField
               style={{
                  marginBottom: '10px',
               }}
               type='password'
               error={Boolean(errors?.password)}
               fullWidth
               id='standard-basic'
               onChange={e => setValue('password', e.target.value)}
               InputLabelProps={{
                  style: {
                     fontFamily: ` 'Urbanist', sans-serif`,
                     fontWeight: 600,
                     fontSize: '18px',
                  },
               }}
               label='Password'
            />
            {errors.password && (
               <span>Username must be 5 to 15 characters long.</span>
            )}
            <br></br>
            <TextField
               fullWidth
               style={{
                  marginBottom: '10px',
               }}
               id='standard-basic'
               error={Boolean(errors?.repeatPassword)}
               inputProps={{
                  type: 'password',
               }}
               onChange={e => setValue('repeatPassword', e.target.value)}
               InputLabelProps={{
                  style: {
                     fontFamily: ` 'Urbanist', sans-serif`,
                     fontWeight: 600,
                     fontSize: '18px',
                  },
               }}
               label='Repeat password'
            />
            {errors.repeatPassword && <span>The passwords do not match</span>}
            <IconButton aria-label='login' type='submit'>
               <ExitToAppIcon
                  style={{
                     color: '#7cea9c',
                     fontSize: '4.2vh',
                  }}
               />
            </IconButton>
            {isError && <span style={{ color: 'red' }}>{errorMessage}</span>}
         </form>
         <StyledBottomText>
            Already have an account?{' '}
            <span onClick={() => changeView()}>Log in</span>
         </StyledBottomText>
      </StyledFormContainer>
   );
};

export default RegisterView;
