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
    border-bottom: 2px solid #7cea9c;
  }
  .MuiFormLabel-root.Mui-focused{
    color:#7cea9c !important;
  }
  #white-input{
    color:white !important;
  }
  .MuiButtonGroup-groupedTextHorizontal:not(:last-child){
    border-right: 2px solid #f0f1f3 !important; 
  }
  #form-checkbox span {
    font-size:1rem !important;
  }
`;
