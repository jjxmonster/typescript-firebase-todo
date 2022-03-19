import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { firebaseApp } from '../../firebase/firebase';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

import {
   StyledFormContainer,
   StyledBottomText,
} from '../LoginView/LoginView.css';
// material ui
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';

// material icons
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

interface RegisterViewProps {
   changeView: Function;
}

type Inputs = {
   email: string;
   password: string;
   repeatPassword: string;
};

const auth = getAuth(firebaseApp);

const RegisterView: FunctionComponent<RegisterViewProps> = ({ changeView }) => {
   const {
      register,
      handleSubmit,
      watch,
      setValue,
      formState: { errors },
   } = useForm<Inputs>();

   const [error, setErrorMessage] = useState(null);

   const password = useRef('');
   password.current = watch('password', '');

   const onSubmit: SubmitHandler<Inputs> = async data => {
      const { email, password } = data;

      await createUserWithEmailAndPassword(auth, email, password)
         .then(async res => {
            const { user } = res;
            return await addDoc(collection(db, 'users'), {
               uid: user.uid,
               todo: [],
            })
               .then(res => {
                  console.log('ok');
               })
               .catch(err => {
                  setErrorMessage(err.toString());
               });
         })
         .catch(err => {
            setErrorMessage(err.toString());
         });
   };

   useEffect(() => {
      // FORM VALIDATION
      register('email', {
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
               error={Boolean(errors?.email)}
               fullWidth
               id='standard-basic'
               onChange={e => setValue('email', e.target.value)}
               InputLabelProps={{
                  style: {
                     fontFamily: ` 'Urbanist', sans-serif`,
                     fontWeight: 600,
                     fontSize: '18px',
                  },
               }}
               label='Email'
            />
            {errors.email && (
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
            {error && <span style={{ color: 'red' }}>{error}</span>}
         </form>
         <StyledBottomText>
            Already have an account?{' '}
            <span onClick={() => changeView()}>Log in</span>
         </StyledBottomText>
      </StyledFormContainer>
   );
};

export default RegisterView;
