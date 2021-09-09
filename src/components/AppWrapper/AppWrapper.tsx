import React, { FunctionComponent, ReactElement } from 'react';
import styled from 'styled-components';

interface AppWrapperProps {
   children: ReactElement;
}

const StyledAppWrapper = styled.main`
   width: 100vw;
   min-height: 100vh;
   display: flex;
   align-items: center;
   justify-content: center;
`;

const AppWrapper: FunctionComponent<AppWrapperProps> = ({ children }) => {
   return <StyledAppWrapper>{children}</StyledAppWrapper>;
};

export default AppWrapper;
