import React from 'react';
import { RecoilRoot } from 'recoil';

import { theme } from '@constants/theme';
import { ThemeProvider } from '@mui/material/styles';
import GlobalStyle from '@src/GlobalStyles';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RecoilRoot>
        <div className='App'></div>
      </RecoilRoot>
    </ThemeProvider>
  );
};

export default App;
