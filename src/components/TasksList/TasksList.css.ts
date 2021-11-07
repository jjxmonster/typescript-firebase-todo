import styled from 'styled-components';

export const StyledTaskListContainer = styled.div`
   width: 100%;
   height: 100%;
   background: white;
   border-radius: 20px;
   display: flex;
   flex-direction: column;
   overflow: hidden;
   position: relative;
   padding: 5%;
   > .mobile-add-icon {
      position: absolute;
      color: ${({ theme }) => theme.colors.green.normal};
      left: 5%;
      bottom: 2%;
      @media (min-width: 1150px) {
         display: none;
      }
   }
`;

export const StyledTaskWrapper = styled.div`
   width: 700px;
   min-height: 400px;
   padding: 20px;
   border-radius: 20px;
   background: white;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   /* border-bottom: 1px solid grey; */
   > #top-bar-task {
      display: flex;
      flex-direction: column;
      > p {
         font-size: 1.3rem;
      }
      > div {
         display: flex;
         justify-content: space-between;
      }
   }
   > #bottom-bar-task {
      width: 100%;
      display: flex;
      justify-content: flex-end;
   }
   > div h2 {
      font-size: 2vw;
      margin-bottom: 10px;
   }
   > p {
      font-size: 1.1vw;
   }
   @media (max-width: 1150px) {
      width: 70vw;
      min-height: 70vh;
      > div h2 {
         font-size: 2rem;
      }
      > p {
         font-size: 1rem;
      }
   }
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
      color: ${({ theme }) => theme.colors.grey.normal};
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
      color: ${({ theme }) => theme.colors.grey.normal};
   }
`;
