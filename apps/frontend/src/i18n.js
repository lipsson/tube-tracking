/* eslint-disable @typescript-eslint/no-floating-promises */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { environment } from './environment';

i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init({
  fallbackLng: 'pl',
  debug: environment.I18_DEBUGGER_ENABLED,
  returnNull: false,
});

export { i18n };
