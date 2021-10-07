import React, { FunctionComponent } from 'react';

import {
   StyledTaskListContainer,
   StyledTaskWrapper,
   StyledList,
} from './TasksList.css';

const TasksList: FunctionComponent = () => {
   return (
      <StyledTaskListContainer>
         <StyledTaskWrapper></StyledTaskWrapper>
         <StyledList>W</StyledList>
      </StyledTaskListContainer>
   );
};

export default TasksList;
