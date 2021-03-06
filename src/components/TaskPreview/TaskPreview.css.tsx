import styled from 'styled-components';

export interface TaskLevelProps {
   isImportant: boolean;
}
export interface CarouselProps {
   openDoneTasks: boolean;
}

export const StyledTaskListElement = styled.li`
   height: 60px;
   width: 100%;
   display: flex;
   position: relative;
   overflow: hidden;
   cursor: pointer;
   justify-content: space-between;
   align-items: center;
   box-shadow: 0px 0px 24px -11px ${({ theme }) => theme.colors.grey.normal};
   margin-bottom: 5px;
   background: white;
   padding: 0 2%;
   border-radius: 10px;
   &:hover {
      > span:not(#complete-date) {
         opacity: 0.5;
      }
      > #delete-task {
         margin-left: 0px;
      }
      > h3 {
         transform: translateX(50px);
      }
   }
   > #complete-date {
      display: flex;
      justify-content: space-between;
      align-items: center;
   }
   > span {
      transition: 0.3s ease;
   }
   > h3 {
      transition: 0.3s ease;
   }
`;

export const StyledTaskLevelSign = styled.div<TaskLevelProps>`
   width: 100px;
   height: 25px;
   border-radius: 60px;
   display: flex;
   justify-content: center;
   align-items: center;
   user-select: none;
   ${({ isImportant, theme }) =>
      isImportant
         ? `
      background:red;
   `
         : `
      background: ${theme.colors.grey.normal};
   `}
   > span {
      color: white;
      font-weight: 500;
      font-size: 0.8rem;
   }
`;

export const StyledCarouselWrapper = styled.div<CarouselProps>`
   width: 200%;
   height: 100%;
   display: flex;
   transition: 0.5s ease-in-out;
   ${({ openDoneTasks }) =>
      openDoneTasks
         ? `
      margin-left:-105%;
   `
         : `
      margin-left:0%;
   `}
   > div:nth-child(1) {
      width: 55%;
      height: 100%;
      display: flex;
      flex-direction: column;
      margin-right: 5%;
      position: relative;
      padding-bottom: 40px;
   }
`;

export const StyledList = styled.ul`
   flex: 5;
   overflow-y: scroll;
   overflow-x: none;

   &::-webkit-scrollbar {
      width: 5px;
      height: 5px;
   }
   &::-webkit-scrollbar-track {
      background-color: ${({ theme }) => theme.colors.grey.normal};
      border-radius: 10px;
   }
   &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.colors.green.normal};
      border-radius: 10px;
   }
`;

export const StyledDoneTasksListWrapper = styled.div`
   width: 50%;
   height: 100%;
   display: flex;
   align-items: center;
   justify-content: space-around;
   flex-direction: column;
`;
