import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { store } from './store/store';

import { ThemeProvider } from 'styled-components';
import theme from './theme/theme';
import App from './App';

ReactDOM.render(
   <React.StrictMode>
      <Provider store={store}>
         <ThemeProvider theme={theme}>
            <App />
         </ThemeProvider>
      </Provider>
   </React.StrictMode>,
   document.getElementById('root')
);
