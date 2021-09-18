import styled from 'styled-components';

export const StyledPanelContainer = styled.div`
   width: 100%;
   height: 100vh;
   display: flex;
   padding: 50px 100px;
`;
export const StyledLeftBox = styled.div`
   flex: 1;
`;
export const StyledRightBox = styled.div`
   flex: 1;
`;

export const StyledTopBar = styled.div`
   width: 100%;
   height: 200px;
   display: flex;
   justify-content: flex-end;
   flex-direction: column;
   > h1 {
      font-size: 6vh;
      color: white;
   }
   > p {
      color: ${({ theme }) => theme.colors.grey.light};
      font-size: 2vh;
   }
`;
