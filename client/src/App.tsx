import React from 'react';

import { theme } from '@constants/theme';
import { ThemeProvider } from '@mui/material/styles';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className='App'></div>
    </ThemeProvider>
  );
};

export default App;
