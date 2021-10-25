import React, { FunctionComponent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import { addTask } from '../../data/firebase/taskFetch';

import { useForm, SubmitHandler } from 'react-hook-form';

import crypto from 'crypto';

//material ui
import {
   Button,
   Checkbox,
   FormControlLabel,
   TextField,
   Snackbar,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

type Inputs = {
   name: string;
   contents: string;
   isImportant: boolean;
};

const AddTaskForm: FunctionComponent = () => {
   const user = useAppSelector(state => state.auth.user);
   const dispatch = useAppDispatch();

   const [isMessageShow, setIsMessageShow] = useState(false);
   const [isError, setIsError] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');
   const [openAlert, setOpenAlert] = React.useState(false);

   const { handleSubmit, setValue, register, reset } = useForm<Inputs>();

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue('isImportant', event.target.checked);
   };

   const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
      if (reason === 'clickaway') {
         return;
      }

      setOpenAlert(false);
   };

   const onSubmit: SubmitHandler<Inputs> = data => {
      const { name, contents, isImportant } = data;
      const taskId = crypto.randomBytes(10).toString('hex');
      if (user)
         addTask(
            {
               id: taskId,
               name,
               contents,
               isImportant: isImportant ? true : false,
               date: new Date().toLocaleString(),
               isDone: false,
            },
            user
         ).then(res => {
            setIsError(res.error);
            setOpenAlert(true);
            reset({ name: '', contents: '' });
         });
   };

   return (
      <>
         <h2>Add task</h2>
         <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
               style={{
                  marginBottom: '20px',
               }}
               {...(register('name'), { required: true })}
               onChange={e => setValue('name', e.target.value)}
               fullWidth
               id='white-input'
               InputLabelProps={{
                  style: {
                     fontFamily: ` 'Urbanist', sans-serif`,
                     fontWeight: 600,
                     color: 'grey',
                     fontSize: '18px',
                  },
               }}
               label='Task name'
            />
            <TextField
               style={{
                  marginBottom: '20px',
               }}
               {...register('contents')}
               onChange={e => setValue('contents', e.target.value)}
               fullWidth
               id='white-input'
               InputLabelProps={{
                  style: {
                     fontFamily: ` 'Urbanist', sans-serif`,
                     fontWeight: 600,
                     color: 'grey',
                     fontSize: '18px',
                  },
               }}
               label='Contents'
            />
            <FormControlLabel
               style={{
                  fontFamily: `'Urbanist', sans-serif`,
                  fontWeight: 600,
                  color: 'grey',
                  fontSize: '18px !important',
                  marginBottom: '20px',
               }}
               control={
                  <Checkbox
                     style={{
                        color: '#7cea9c',
                     }}
                     //  checked={checked}
                     onChange={e => handleChange(e)}
                  />
               }
               label='important'
            />
            <br></br>
            <Button
               type='submit'
               variant='contained'
               style={{
                  marginRight: '20px',
                  width: '120px',
                  background: '#7cea9c',
               }}
            >
               Add task
            </Button>

            <Snackbar
               anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
               open={openAlert}
               autoHideDuration={6000}
               onClose={handleClose}
            >
               {isError ? (
                  <Alert onClose={handleClose} severity='error'>
                     Something went wrong...
                  </Alert>
               ) : (
                  <Alert onClose={handleClose} severity='success'>
                     Task added successfully!
                  </Alert>
               )}
            </Snackbar>
         </form>
      </>
   );
};

export default AddTaskForm;
