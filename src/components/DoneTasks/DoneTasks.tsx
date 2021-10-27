import React, { FunctionComponent } from 'react';

import { Task } from '../../data/firebase/taskFetch';
import { StyledTaskListElement } from '../TasksList/TasksList.css';

import { StyledTitle, StyledDoneTasksList } from './DoneTasks.css';

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
                    <StyledTaskListElement>{task.name}</StyledTaskListElement>
                 ))
               : null}
         </StyledDoneTasksList>
      </>
   );
};

export default DoneTasks;
