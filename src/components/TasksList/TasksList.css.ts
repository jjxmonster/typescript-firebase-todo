import styled from 'styled-components';

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
`;
export const StyledList = styled.ul`
   flex: 5;
`;
export const StyledEmptyListWrapper = styled.div`
   flex: 5;
   display: flex;
   justify-content: center;
   align-items: center;
   > h3 {
      font-weight: 400;
      color: ${({ theme }) => theme.colors.grey.light};
   }
`;
export const StyledTaskListElement = styled.li`
   height: 50px;
   width: 100%;
   display: flex;
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
