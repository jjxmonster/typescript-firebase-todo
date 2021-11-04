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
import { StyledTitle } from '../DoneTasks/DoneTasks.css';

import DoneTasks from '../DoneTasks';

// types
import { Task } from '../../data/firebase/taskFetch';

// material
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';
import { ArrowRightAlt } from '@material-ui/icons';

import {
   Button,
   ButtonGroup,
   Dialog,
   DialogContent,
   IconButton,
   makeStyles,
   Snackbar,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import { ReactComponent as EmptyListPicture } from '../../assets/images/empty-list.svg';

const useStyles = makeStyles(() => ({
   paper: { maxWidth: '100vw' },
}));

const TasksList: FunctionComponent = () => {
   const user = useAppSelector(state => state.auth.user);

   const classes = useStyles();

   const [tasks, setTasks] = useState<Task[]>();
   const [doneTasks, setDoneTasks] = useState<Task[]>([]);
   const [activeTask, setActiveTask] = useState<Task | null>();
   const [openDoneTasks, setOpenDoneTasks] = useState(false);
   const [openAlert, setOpenAlert] = React.useState(false);
   const [isError, setIsError] = useState(false);
   const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

   const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
      if (reason === 'clickaway') {
         return;
      }

      setOpenAlert(false);
   };

   const handleDeleteTask = (task: Task, e: MouseEvent) => {
      e.stopPropagation();
      setIsTaskModalOpen(false);
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
      setIsTaskModalOpen(false);
      if (user !== undefined) {
         addDoneTask(task, user).then(res => {
            setIsError(res.error);
            setOpenAlert(true);
         });
      } else {
         return `This scenario will never happend but TS tell it's could be error idk`;
      }
   };

   const handleOpenDoneTasks = () => {
      setOpenDoneTasks(!openDoneTasks);
   };
   const handleTaskClick = (task: Task) => {
      setActiveTask(task);
      setIsTaskModalOpen(true);
   };

   useEffect(() => {
      if (user !== undefined && user.id !== undefined) {
         onSnapshot(doc(db, 'users', user.id), doc => {
            setTasks(doc.get('todo')?.filter((task: Task) => !task.isDone));
            setDoneTasks(doc.get('todo')?.filter((task: Task) => task.isDone));
         });
      }
   }, []);

   return (
      <StyledTaskListContainer>
         <StyledCarouselWrapper openDoneTasks={openDoneTasks}>
            <div>
               <StyledTitle
                  smallBorder
                  style={{
                     marginBottom: 10,
                     fontSize: '2rem',
                     textAlign: 'center',
                  }}
               >
                  Your tasks
               </StyledTitle>
               {tasks?.length ? (
                  <StyledList>
                     {tasks?.map(task => {
                        return (
                           <StyledTaskListElement
                              key={task.name}
                              onClick={() => handleTaskClick(task)}
                           >
                              <span
                                 style={{
                                    fontSize: '1.2rem',
                                 }}
                              >
                                 {task.name}
                              </span>
                              <StyledTaskLevelSign
                                 isImportant={task.isImportant}
                              >
                                 <span>
                                    {task.isImportant ? 'IMPORTANT' : 'NORMAL'}
                                 </span>
                              </StyledTaskLevelSign>
                           </StyledTaskListElement>
                        );
                     })}
                  </StyledList>
               ) : (
                  <StyledEmptyListWrapper>
                     <EmptyListPicture width='300px' height='150px' />
                     <h3>Nothing here, add some task!</h3>
                  </StyledEmptyListWrapper>
               )}
            </div>
            <StyledDoneTasksListWrapper>
               <DoneTasks doneTasks={doneTasks} />
            </StyledDoneTasksListWrapper>
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
            {openDoneTasks ? 'ACTIVE TASKS' : 'DONE TASKS'}
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
                  Congratulations, task added to done list!
               </Alert>
            )}
         </Snackbar>
         <Dialog
            classes={{ paper: classes.paper }}
            aria-describedby='alert-dialog-slide-description'
            keepMounted
            open={isTaskModalOpen}
            onClose={() => setIsTaskModalOpen(false)}
         >
            <DialogContent>
               <StyledTaskWrapper>
                  {activeTask ? (
                     <>
                        <div id='top-bar-task'>
                           <div>
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
                        </div>
                        <div id='bottom-bar-task'>
                           <ButtonGroup
                              variant='text'
                              aria-label='text button group'
                           >
                              <IconButton
                                 onClick={e => handleAddDoneTask(activeTask, e)}
                              >
                                 <DoneIcon
                                    style={{
                                       color: 'green',
                                    }}
                                 />
                              </IconButton>
                              <IconButton
                                 onClick={e => handleDeleteTask(activeTask, e)}
                              >
                                 <DeleteIcon
                                    style={{
                                       color: 'red',
                                    }}
                                 />
                              </IconButton>
                           </ButtonGroup>
                        </div>
                     </>
                  ) : (
                     <StyledEmptyActiveTaskWrapper>
                        <h3>Select a task from the list</h3>
                     </StyledEmptyActiveTaskWrapper>
                  )}
               </StyledTaskWrapper>
            </DialogContent>
         </Dialog>
      </StyledTaskListContainer>
   );
};

export default TasksList;
