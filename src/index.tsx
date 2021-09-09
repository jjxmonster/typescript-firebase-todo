import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { store } from './store/store';

import { ThemeProvider } from 'styled-components';
import theme from './theme/theme';
import { GlobalStyles } from './theme/globalStyles';

import App from './App';

ReactDOM.render(
   <React.StrictMode>
      <Provider store={store}>
         <ThemeProvider theme={theme}>
            <GlobalStyles />
            <App />
         </ThemeProvider>
      </Provider>
   </React.StrictMode>,
   document.getElementById('root')
);
