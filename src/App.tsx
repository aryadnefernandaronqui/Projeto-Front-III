import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import themeDefault from './config/theme/themeDefault';
import AppRoutes from './routes/AppRoutes';
import { persistor, store } from './store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <ThemeProvider theme={themeDefault}>
      <CssBaseline />
      <AppRoutes />;
      </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
