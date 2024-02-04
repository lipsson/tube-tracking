import { useTranslation } from 'react-i18next';

export type LanguagesType = 'pl' | 'en';

const languages: Record<string, LanguagesType> = {
  pl: 'pl',
  en: 'en',
};

const getLanguage = (language: string): LanguagesType => {
  const langToLowerCase = language?.substring(0, 2)?.toLowerCase();

  return languages[langToLowerCase] ?? 'pl';
};

export const useCurrentLanguage = (): LanguagesType => {
  const { i18n } = useTranslation();

  return getLanguage(i18n.language);
};
