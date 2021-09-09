import React, { FunctionComponent } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

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

   const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

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
               {...register('name', {
                  required: true,
                  maxLength: 10,
                  minLength: 2,
               })}
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
               <span>Username must be 2 to 10 characters long.</span>
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
               {...register('password', {
                  required: true,
                  maxLength: 15,
                  minLength: 5,
               })}
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
               label='Repeat password'
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
            Already have an account?{' '}
            <span onClick={() => changeView()}>Log in</span>
         </StyledBottomText>
      </StyledFormContainer>
   );
};

export default RegisterView;
