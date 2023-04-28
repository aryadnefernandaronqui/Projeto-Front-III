import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';

import themeDefault from './config/theme/themeDefault';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <ThemeProvider theme={themeDefault}>
      <CssBaseline />
      <AppRoutes />;
    </ThemeProvider>
  );
}

export default App;
