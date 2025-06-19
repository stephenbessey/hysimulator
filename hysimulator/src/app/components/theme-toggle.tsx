'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../providers/theme-provider'
import { BaseButton } from './ui/base-button'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <BaseButton
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="relative"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </BaseButton>
  )
}