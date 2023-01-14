import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#009688',
    },
    secondary: {
      main: '#94C720',
    },
    error: {
      main: '#C70038',
    },
    warning: {
      main: '#C70038',
    },
  },
  typography: {
    h1: {
      fontSize: 48,
      fontWeight: 700,
    },
    h2: {
      fontSize: 48,
      fontWeight: 400,
    },
    h3: {
      fontSize: 48,
      fontWeight: 700,
    },
    h4: {
      fontSize: 16,
      color: '#8D8D8D',
    },
    subtitle1: {
      fontSize: 24,
      fontWeight: 700,
    },
    body1: {
      fontSize: 16,
      fontWeight: 400,
    },
    allVariants: {
      color: '#404040',
    },
  },
});

export default theme;
