import React from 'react';

import { theme } from '@constants/theme';
import { ThemeProvider } from '@mui/material/styles';
import GlobalStyle from '@src/GlobalStyles';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div className='App'></div>
    </ThemeProvider>
  );
};

export default App;
