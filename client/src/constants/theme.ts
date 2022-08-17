import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2ac1bc',
      contrastText: '#FFFFFF',
      light: '#a0e1e0',
      dark: '#219a95',
    },
    action: {
      hover: '#219a95',
      selected: '#a0e1e0',
      disabledBackground: '#a0e1e0',
      disabled: '#ffffff',
    },
  },
});

export { theme };
