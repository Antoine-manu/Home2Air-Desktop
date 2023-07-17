import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#036DDF',
    },
    danger: {
      main: '#E54E4E',
    },
    success: {
      main: '#00A67F',
    },
    info: {
      main: '#F2B82F',
    },
    purple: {
      main: '#56459E',
    },
    lightgrey: {
      light: '#F8F9F9',
      main: '#DADADA',
    },

    tonalOffset: 0.2,
  },
});

 