export const environment = {
  ENV: import.meta.env.VITE_NODE_ENV,
  API_MOCK: false,
  I18_DEBUGGER_ENABLED: false,
} as const;

export const isTestEnv = environment.ENV === 'test';

export const isDevelopment = environment.ENV === 'development';
