'use client';
import { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Theme, toggleTheme as getNextTheme } from '@/lib/theme/theme';

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>(Theme.DARK);

  const handleToggle = () => {
    const newTheme = getNextTheme(theme);
    setTheme(newTheme);
    // Theme switching logic will be implemented later
  };

  return (
    <button
      onClick={handleToggle}
      className="gap-md px-md py-sm hover:text-on-surface flex w-full items-center rounded-lg text-on-surface-variant transition-all hover:bg-surface-container-high"
    >
      {theme === Theme.LIGHT ? (
        <>
          <Moon className="h-5 w-5" />
          <span>Dark Mode</span>
        </>
      ) : (
        <>
          <Sun className="h-5 w-5" />
          <span>Light Mode</span>
        </>
      )}
    </button>
  );
};
