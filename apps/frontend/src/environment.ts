declare global {
  interface Window {
    API_URL?: string;
  }
}

const windowAPIURL = window.API_URL === '__##CORE_URL##__' ? null : window.API_URL;

if (windowAPIURL) {
  // eslint-disable-next-line no-console
  console.log(`Using API from window env: ${windowAPIURL}`);
}

export const environment = {
  ENV: import.meta.env.VITE_NODE_ENV,
  API_MOCK: import.meta.env.VITE_REACT_APP_API_MOCKS ? (JSON.parse(import.meta.env.VITE_REACT_APP_API_MOCKS) as boolean) : false,
  I18_DEBUGGER_ENABLED: import.meta.env.VITE_REACT_APP_I18_DEBUGGER_ENABLED
    ? (JSON.parse(import.meta.env.VITE_REACT_APP_I18_DEBUGGER_ENABLED) as boolean)
    : false,
} as const;

export const isTestEnv = environment.ENV === 'test';

export const isDevelopment = environment.ENV === 'development';
