import { createTheme } from '@mui/material';



const themeDefault = createTheme({
  palette: {
    primary: {
      main: '#546e7a',
      dark: '#2D3142',
    },
    secondary: {
      main: '#8fc5ea',
      contrastText: '#EF8354'
    },
  
  }
});

export default themeDefault;
