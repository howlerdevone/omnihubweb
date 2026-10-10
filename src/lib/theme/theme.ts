export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export const getThemeIcon = (theme: Theme) => {
  return theme === Theme.LIGHT ? 'Moon' : 'Sun';
};

export const getThemeLabel = (theme: Theme) => {
  return theme === Theme.LIGHT ? 'Dark Mode' : 'Light Mode';
};

export const toggleTheme = (currentTheme: Theme): Theme => {
  return currentTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
};
