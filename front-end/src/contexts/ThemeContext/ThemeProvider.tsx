import { useEffect, type ReactNode } from 'react'

import { ThemeContext } from './ThemeContext'
import { useLocalStorage } from '../../hooks/useLocalStorage'

import type { Theme } from './ThemeContext'

type ThemeProviderProps = {
  children: ReactNode
}

const THEME_STORAGE_KEY = 'reviewbox:theme'

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useLocalStorage<Theme>(THEME_STORAGE_KEY, 'dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  function toggleTheme() {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'))
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}