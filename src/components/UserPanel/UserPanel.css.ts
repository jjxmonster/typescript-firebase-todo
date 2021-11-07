import styled from 'styled-components';

export const StyledPanelContainer = styled.div`
   width: 100%;
   height: 100vh;
   display: flex;
   padding: 50px 150px;
   @media (max-width: 1150px) {
      flex-direction: column;
      padding: 5px 15px;
   }
`;
export const StyledLeftBox = styled.div`
   flex: 1;
   padding: 5% 0;
   @media (max-width: 1150px) {
      flex: 0;
   }
`;
export const StyledRightBox = styled.div`
   flex: 1;
   padding: 5% 0;
`;

export const StyledTopBar = styled.div`
   width: 100%;
   height: 200px;
   display: flex;
   flex-direction: column;
   > h1 {
      font-size: 6vh;
      color: white;
   }
   > p {
      color: ${({ theme }) => theme.colors.grey.normal};
      font-size: 2vh;
   }
`;
export const StyledFormWrapper = styled.div`
   width: 450px;
   height: 80%;
   display: flex;
   justify-content: center;
   flex-direction: column;
   > h2 {
      font-size: 5vh;
      color: white;
      margin-bottom: 20px;
   }
   @media (max-width: 1150px) {
      display: none;
   }
`;

export const StyledMobileFormModalContainer = styled.div`
   width: 80vw;
   height: 60vh;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   padding: 0 5%;
   border-radius: 20px;
   background: ${({ theme }) => theme.colors.grey.dark};
   > h2 {
      color: white;
      font-size: 3rem;
   }
`;
