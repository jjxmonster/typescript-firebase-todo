import React, {
   FunctionComponent,
   MouseEvent,
   useEffect,
   useState,
} from 'react';

import { doc, onSnapshot } from '@firebase/firestore';
import { db } from '../../firebase/firebase';
import { deleteTask } from '../../data/firebase/taskFetch';

import { useAppSelector } from '../../store/hooks';

import {
   StyledTaskListContainer,
   StyledTaskWrapper,
   StyledList,
   StyledTaskListElement,
   StyledEmptyListWrapper,
   StyledEmptyActiveTaskWrapper,
   StyledTaskLevelSign,
} from './TasksList.css';

// types
import { Task } from '../../data/firebase/taskFetch';
import { UserType } from '../../reducers/userAuth.reducer';

// material
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';

import { ButtonGroup, IconButton } from '@material-ui/core';

import { ReactComponent as EmptyListPicture } from '../../assets/images/empty-list.svg';

const TasksList: FunctionComponent = () => {
   const user = useAppSelector(state => state.auth.user);

   const [tasks, setTasks] = useState<Task[]>();
   const [activeTask, setActiveTask] = useState<Task | null>();

   const handleDeleteTask = (task: Task, e: MouseEvent) => {
      e.stopPropagation();
      if (activeTask === task) {
         setActiveTask(null);
      }
      if (user !== undefined) {
         deleteTask(task, user);
      } else {
         return `This scenario will never happend but TS tell it's could be error idk`;
      }
   };

   useEffect(() => {
      onSnapshot(doc(db, 'users', 'kSShkwxbLD3jW36osSLb'), doc => {
         setTasks(doc.get('todo'));
      });
   }, []);

   return (
      <StyledTaskListContainer>
         <StyledTaskWrapper>
            {activeTask ? (
               <>
                  <div id='top-bar-task'>
                     <h2>
                        <StyledTaskLevelSign
                           isImportant={activeTask.isImportant}
                        >
                           <span>
                              {activeTask.isImportant ? 'IMPORTANT' : 'NORMAL'}
                           </span>
                        </StyledTaskLevelSign>
                        {activeTask.name}
                     </h2>
                     <span>{activeTask.date}</span>
                  </div>
                  <p>{activeTask.contents}</p>
               </>
            ) : (
               <StyledEmptyActiveTaskWrapper>
                  <h3>Select a task from the list</h3>
               </StyledEmptyActiveTaskWrapper>
            )}
         </StyledTaskWrapper>
         {tasks?.length ? (
            <StyledList>
               {tasks?.map(task => (
                  <StyledTaskListElement
                     key={task.name}
                     onClick={() => setActiveTask(task)}
                  >
                     <ButtonGroup variant='text' aria-label='text button group'>
                        <IconButton>
                           <DoneIcon
                              style={{
                                 color: 'green',
                              }}
                           />
                        </IconButton>
                        <IconButton onClick={e => handleDeleteTask(task, e)}>
                           <DeleteIcon
                              style={{
                                 color: 'red',
                              }}
                           />
                        </IconButton>
                     </ButtonGroup>
                     <span>{task.name}</span>
                     <StyledTaskLevelSign isImportant={task.isImportant}>
                        <span>{task.isImportant ? 'IMPORTANT' : 'NORMAL'}</span>
                     </StyledTaskLevelSign>
                  </StyledTaskListElement>
               ))}
            </StyledList>
         ) : (
            <StyledEmptyListWrapper>
               <EmptyListPicture width='300px' height='150px' />
               <h3>Nothing here, add your first task!</h3>
            </StyledEmptyListWrapper>
         )}
      </StyledTaskListContainer>
   );
};

export default TasksList;
