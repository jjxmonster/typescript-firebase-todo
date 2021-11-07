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
   StyledEmptyActiveTaskWrapper,
} from './TasksList.css';

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
import AddIcon from '@material-ui/icons/AddCircle';
import Alert from '@material-ui/lab/Alert';

import { StyledTaskLevelSign } from '../TaskPreview/TaskPreview.css';

import TaskPreview from '../TaskPreview';

const useStyles = makeStyles(() => ({
   paper: { maxWidth: '100vw' },
}));

interface TaskListProps {
   handleOpenFormModal: () => void;
}

const TasksList: FunctionComponent<TaskListProps> = ({
   handleOpenFormModal,
}) => {
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
         <TaskPreview
            tasks={tasks}
            doneTasks={doneTasks}
            openDoneTasks={openDoneTasks}
            handleTaskClick={handleTaskClick}
         />
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
         <IconButton className='mobile-add-icon' onClick={handleOpenFormModal}>
            <AddIcon
               style={{
                  fontSize: '3rem',
               }}
            />
         </IconButton>
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
