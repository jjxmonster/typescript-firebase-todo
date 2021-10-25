import React, {
   FunctionComponent,
   MouseEvent,
   useEffect,
   useState,
} from 'react';

import { doc, onSnapshot } from '@firebase/firestore';
import { db } from '../../firebase/firebase';
import { addDoneTask, deleteTask } from '../../data/firebase/taskFetch';

import { useAppSelector } from '../../store/hooks';

import {
   StyledTaskListContainer,
   StyledTaskWrapper,
   StyledList,
   StyledTaskListElement,
   StyledEmptyListWrapper,
   StyledEmptyActiveTaskWrapper,
   StyledTaskLevelSign,
   StyledCarouselWrapper,
   StyledDoneTasksListWrapper,
} from './TasksList.css';

// types
import { Task } from '../../data/firebase/taskFetch';
import { UserType } from '../../reducers/userAuth.reducer';

// material
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';
import { ArrowRightAlt } from '@material-ui/icons';

import { Button, ButtonGroup, IconButton } from '@material-ui/core';

import { ReactComponent as EmptyListPicture } from '../../assets/images/empty-list.svg';

const TasksList: FunctionComponent = () => {
   const user = useAppSelector(state => state.auth.user);

   const [tasks, setTasks] = useState<Task[]>();
   const [activeTask, setActiveTask] = useState<Task | null>();
   const [openDoneTasks, setOpenDoneTasks] = useState(false);

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

   const handleAddDoneTask = (task: Task, e: MouseEvent) => {
      e.stopPropagation();
      if (user !== undefined) {
         addDoneTask(task, user);
      } else {
         return `This scenario will never happend but TS tell it's could be error idk`;
      }
   };

   const handleOpenDoneTasks = () => {
      setOpenDoneTasks(!openDoneTasks);
   };

   useEffect(() => {
      if (user !== undefined && user.id !== undefined) {
         onSnapshot(doc(db, 'users', user.id), doc => {
            setTasks(doc.get('todo'));
         });
      }
   });

   return (
      <StyledTaskListContainer>
         <StyledCarouselWrapper openDoneTasks={openDoneTasks}>
            <div>
               <StyledTaskWrapper>
                  {activeTask ? (
                     <>
                        <div id='top-bar-task'>
                           <h2>
                              <StyledTaskLevelSign
                                 isImportant={activeTask.isImportant}
                              >
                                 <span>
                                    {activeTask.isImportant
                                       ? 'IMPORTANT'
                                       : 'NORMAL'}
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
                           <ButtonGroup
                              variant='text'
                              aria-label='text button group'
                           >
                              <IconButton
                                 onClick={e => handleAddDoneTask(task, e)}
                              >
                                 <DoneIcon
                                    style={{
                                       color: 'green',
                                    }}
                                 />
                              </IconButton>
                              <IconButton
                                 onClick={e => handleDeleteTask(task, e)}
                              >
                                 <DeleteIcon
                                    style={{
                                       color: 'red',
                                    }}
                                 />
                              </IconButton>
                           </ButtonGroup>
                           <span>{task.name}</span>
                           <StyledTaskLevelSign isImportant={task.isImportant}>
                              <span>
                                 {task.isImportant ? 'IMPORTANT' : 'NORMAL'}
                              </span>
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
            </div>
            <StyledDoneTasksListWrapper></StyledDoneTasksListWrapper>
         </StyledCarouselWrapper>
         <Button
            onClick={handleOpenDoneTasks}
            variant='contained'
            endIcon={
               <ArrowRightAlt
                  style={{
                     transition: '.3s ease',
                     transform: openDoneTasks ? 'rotate(-180deg)' : 'none',
                  }}
               />
            }
            style={{
               color: '#7cea9c',
               background: '#172434',
               position: 'absolute',
               right: '5%',
               bottom: '5%',
            }}
         >
            Done tasks
         </Button>
      </StyledTaskListContainer>
   );
};

export default TasksList;
