import React, { FunctionComponent } from 'react';

import { Task } from '../../data/firebase/taskFetch';
import { StyledTaskListElement } from '../TasksList/TasksList.css';

import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';

import {
   StyledTitle,
   StyledDoneTasksList,
   StyledDeleteTaskButtonWrapper,
} from './DoneTasks.css';
import { Button } from '@material-ui/core';

interface DoneTasksProps {
   doneTasks: Task[];
}

const DoneTasks: FunctionComponent<DoneTasksProps> = ({ doneTasks }) => {
   return (
      <>
         <StyledTitle>
            {doneTasks.length > 0
               ? 'Congratulations! Here is list of your done tasks'
               : 'Nothing here!'}
         </StyledTitle>
         <StyledDoneTasksList>
            {doneTasks
               ? doneTasks.map(task => (
                    <StyledTaskListElement>
                       <StyledDeleteTaskButtonWrapper id='delete-task'>
                          <Button
                             style={{
                                width: '100%',
                                height: '100%',
                             }}
                          >
                             <DeleteIcon
                                style={{
                                   color: 'white',
                                   fontSize: '2.5rem',
                                }}
                             />
                          </Button>
                       </StyledDeleteTaskButtonWrapper>
                       <h3>{task.name}</h3>
                       <span id='complete-date'>
                          <DoneIcon
                             style={{
                                color: 'green',
                             }}
                          />
                          {task.date}
                       </span>
                    </StyledTaskListElement>
                 ))
               : null}
         </StyledDoneTasksList>
      </>
   );
};

export default DoneTasks;
