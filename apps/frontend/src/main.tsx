import ReactDOM from 'react-dom/client';

import { CssBaseline } from '@mui/material';

import { App } from './App';
import { AppContextProvider } from './providers/app-context.provider';

import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <AppContextProvider>
    <>
      <CssBaseline />
      <App />
    </>
  </AppContextProvider>,
);
