import React, { FunctionComponent, useState } from 'react';

import { doc, onSnapshot } from '@firebase/firestore';
import { db } from '../../firebase/firebase';

import { useAppSelector } from '../../store/hooks';

import {
   StyledTaskListContainer,
   StyledTaskWrapper,
   StyledList,
   StyledTaskListElement,
   StyledEmptyListWrapper,
} from './TasksList.css';

// types
import { Task } from '../../data/firebase/taskFetch';

// material
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';

import { IconButton } from '@material-ui/core';

const TasksList: FunctionComponent = () => {
   const user = useAppSelector(state => state.auth.user);

   const [tasks, setTasks] = useState<Task[]>();
   const [activeTask, setActiveTask] = useState<Task>();

   onSnapshot(doc(db, 'users', 'kSShkwxbLD3jW36osSLb'), doc => {
      setTasks(doc.get('todo'));
   });

   return (
      <StyledTaskListContainer>
         <StyledTaskWrapper>
            <h2></h2>
            <p></p>
         </StyledTaskWrapper>
         {tasks?.length ? (
            <StyledList>
               {tasks?.map(task => (
                  <StyledTaskListElement onClick={() => setActiveTask(task)}>
                     <IconButton>
                        <DoneIcon
                           style={{
                              color: 'green',
                           }}
                        />
                     </IconButton>
                     <span>{task.name}</span>
                     <IconButton>
                        <DeleteIcon
                           style={{
                              color: 'red',
                           }}
                        />
                     </IconButton>
                  </StyledTaskListElement>
               ))}
            </StyledList>
         ) : (
            <StyledEmptyListWrapper>
               <h3>Nothing here, add your first task!</h3>
            </StyledEmptyListWrapper>
         )}
      </StyledTaskListContainer>
   );
};

export default TasksList;
