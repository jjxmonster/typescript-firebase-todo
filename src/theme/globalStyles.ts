import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
*{
    padding:0;
    margin:0;
    box-sizing:border-box;
    font-family: 'Urbanist', sans-serif;
  }
  body{
    background:#172434;
  }
  button{
    cursor:pointer;
    border:0;
    background:transparent;
    outline:none;
  }
  ul{
    list-style:none;
  }
  .MuiInput-underline:after{
    border-bottom: 2px solid #7cea9c !important;
  }
  .MuiFormLabel-root.Mui-focused{
    color:#7cea9c !important;
  }
`;
