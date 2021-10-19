import styled from 'styled-components';

export interface TaskLevelProps {
   isImportant: boolean;
}

export const StyledTaskListContainer = styled.div`
   width: 100%;
   height: 100%;
   background: white;
   border-radius: 20px;
   display: flex;
   flex-direction: column;
   overflow: hidden;
   padding: 5%;
`;

export const StyledTaskWrapper = styled.div`
   flex: 3.5;
   border-bottom: 1px solid grey;
   > h2 {
      font-size: 2rem;
      margin-bottom: 10px;
   }
   > p {
      font-size: 1.1rem;
   }
`;
export const StyledList = styled.ul`
   flex: 5;
`;
export const StyledEmptyListWrapper = styled.div`
   flex: 5;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   > h3 {
      margin-top: 5px;
      font-weight: 400;
      color: ${({ theme }) => theme.colors.grey.light};
   }
`;

export const StyledEmptyActiveTaskWrapper = styled.div`
   width: 100%;
   height: 100%;
   display: flex;
   justify-content: center;
   align-items: center;
   > h3 {
      font-weight: 400;
      font-size: 1rem;
      color: ${({ theme }) => theme.colors.grey.light};
   }
`;

export const StyledTaskListElement = styled.li`
   height: 50px;
   width: 100%;
   display: flex;
   position: relative;
   cursor: pointer;
   justify-content: space-between;
   align-items: center;
   margin-bottom: 5px;
   &:hover {
      > span {
         opacity: 0.5;
      }
   }
   > span {
      transition: 0.3s ease;
   }
`;

export const StyledTaskLevelSign = styled.div<TaskLevelProps>`
   width: 100px;
   height: 50%;
   border-radius: 60px;
   display: flex;
   justify-content: center;
   align-items: center;
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
