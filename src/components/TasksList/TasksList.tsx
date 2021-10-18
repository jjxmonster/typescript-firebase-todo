import React, { FunctionComponent, useState } from 'react';

import { doc, onSnapshot } from '@firebase/firestore';
import { db } from '../../firebase/firebase';

import { useAppSelector } from '../../store/hooks';

import {
   StyledTaskListContainer,
   StyledTaskWrapper,
   StyledList,
} from './TasksList.css';

// types
import { Task } from '../../data/firebase/taskFetch';

const TasksList: FunctionComponent = () => {
   const user = useAppSelector(state => state.auth.user);
   const [tasks, setTasks] = useState<Task[]>();

   onSnapshot(doc(db, 'users', 'kSShkwxbLD3jW36osSLb'), doc => {
      setTasks(doc.get('todo'));
   });

   return (
      <StyledTaskListContainer>
         <StyledTaskWrapper></StyledTaskWrapper>
         <StyledList>
            {tasks?.map(task => (
               <p>{task.name}</p>
            ))}
         </StyledList>
      </StyledTaskListContainer>
   );
};

export default TasksList;
