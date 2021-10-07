import React, { FunctionComponent, MouseEvent } from 'react';
import { useAppSelector } from '../../store/hooks';

import { addTask } from '../../data/taskFetch';

import { useForm, SubmitHandler } from 'react-hook-form';
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

   const { handleSubmit, setValue, register } = useForm<Inputs>();

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue('isImportant', event.target.checked);
   };

   const onSubmit: SubmitHandler<Inputs> = data => {
      const { name, contents, isImportant } = data;
      addTask(
         {
            name,
            contents,
            isImportant,
            isDone: false,
         },
         user
      );
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
                  width: '120px',
                  background: '#7cea9c',
               }}
            >
               Add task
            </Button>
         </form>
      </>
   );
};

export default AddTaskForm;
