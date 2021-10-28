import styled from 'styled-components';

export const StyledTitle = styled.h2`
   color: ${({ theme }) => theme.colors.grey.normal};
   font-weight: 400;
   position: relative;
   &:after {
      position: absolute;
      bottom: -10px;
      left: 0;
      right: 0;
      margin: auto;
      content: '';
      border: 1px solid ${({ theme }) => theme.colors.green.normal};
      width: 50%;
   }
`;

export const StyledDoneTasksList = styled.ul`
   width: 100%;
   height: 80%;
`;

export const StyledDeleteTaskButtonWrapper = styled.div`
   height: 100%;
   width: 50px;
   background: red;
   position: absolute;
   left: 0;
   margin-left: -50px;
   transition: 0.3s ease;
   display: flex;
   align-items: center;
   justify-content: center;
   overflow: hidden;
`;
