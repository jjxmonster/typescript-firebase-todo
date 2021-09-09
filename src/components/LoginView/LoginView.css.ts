import styled from 'styled-components';

export const StyledFormContainer = styled.div`
   width: 30vw;
   height: 60vh;
   background: white;
   padding: 0 5%;
   border-radius: 20px;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   > h2 {
      color: black;
      font-weight: 700;
      font-size: 5vh;
   }
   > form {
      height: 60%;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
   }
`;
export const StyledBottomText = styled.p`
   color: black;
   font-size: 20px;
   > span {
      cursor: pointer;
      color: ${({ theme }) => theme.colors.green.normal};
   }
`;
