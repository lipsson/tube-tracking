import { FC, createContext, useState } from 'react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';
import { themeCreator } from './base';

import { ChildrenNodeType } from '@/common/types/children-element.types';

export const ThemeContext = createContext(
  (_themeName: string): void => { }
);

const ThemeProviderWrapper: FC<ChildrenNodeType> = (props) => {
  const curThemeName = localStorage.getItem('appTheme') || 'PureLightTheme';

  const [themeName, _setThemeName] = useState(curThemeName);

  const theme = themeCreator(themeName);

  const setThemeName = (themeName: string): void => {
    localStorage.setItem('appTheme', themeName);
    setThemeName(themeName);
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeContext.Provider value={setThemeName}>
        <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
      </ThemeContext.Provider>
    </StyledEngineProvider>
  );
};

export default ThemeProviderWrapper;
