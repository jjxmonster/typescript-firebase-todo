import React, { FunctionComponent } from 'react';

// types
import { Task } from '../../data/firebase/taskFetch';

import DoneTasks from '../DoneTasks';

import { StyledEmptyListWrapper } from '../TasksList/TasksList.css';
import { StyledTitle } from '../DoneTasks/DoneTasks.css';
import {
   StyledCarouselWrapper,
   StyledList,
   StyledTaskListElement,
   StyledTaskLevelSign,
   StyledDoneTasksListWrapper,
} from './TaskPreview.css';

import { ReactComponent as EmptyListPicture } from '../../assets/images/empty-list.svg';

interface TaskPreviewProps {
   tasks: Task[] | undefined;
   doneTasks: Task[];
   openDoneTasks: boolean;
   handleTaskClick: (task: Task) => void;
}

const TaskPreview: FunctionComponent<TaskPreviewProps> = ({
   tasks,
   doneTasks,
   openDoneTasks,
   handleTaskClick,
}) => {
   return (
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
                           <StyledTaskLevelSign isImportant={task.isImportant}>
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
   );
};

export default TaskPreview;
