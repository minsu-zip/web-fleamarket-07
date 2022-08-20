import { createTheme } from '@mui/material/styles';
import { COLOR } from './style';

const theme = createTheme({
  palette: {
    primary: {
      main: COLOR.primary,
      contrastText: COLOR.titleActive,
      light: COLOR.primary2,
      dark: COLOR.primary3,
    },
    action: {
      hover: COLOR.primary3,
      selected: COLOR.primary2,
      disabledBackground: COLOR.primary3,
      disabled: COLOR.placeholder,
    },
  },
});

export { theme };
