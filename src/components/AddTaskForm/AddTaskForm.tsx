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
} from '@material-ui/core';

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

   const { handleSubmit, setValue, register, reset } = useForm<Inputs>();

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue('isImportant', event.target.checked);
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
            setIsMessageShow(true);
            setIsError(res.error);
            setErrorMessage(res.message);
            reset({ name: '', contents: '' });
            setTimeout(() => {
               setIsMessageShow(false);
            }, 10000);
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
            {isMessageShow && (
               <span style={{ color: isError ? 'red' : 'green' }}>
                  {errorMessage}
               </span>
            )}
         </form>
      </>
   );
};

export default AddTaskForm;
