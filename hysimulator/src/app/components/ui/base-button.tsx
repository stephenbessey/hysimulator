'use client'

import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { LoadingSpinner } from './loading-spinner'

export interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  children: ReactNode
}

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon'

const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-[#feed00] text-black hover:bg-[#feed00]/90 shadow-lg hover:shadow-xl',
  secondary: 'bg-gray-600 text-white hover:bg-gray-500',
  danger: 'bg-red-600 text-white hover:bg-red-500',
  outline: 'border-2 border-[#feed00] text-[#feed00] hover:bg-[#feed00] hover:text-black',
  ghost: 'hover:bg-[#feed00]/10 text-gray-700 dark:text-gray-300',
}

const BUTTON_SIZES: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-base',
  lg: 'h-12 px-6 text-lg',
  icon: 'h-10 w-10',
}

export const BaseButton = forwardRef<HTMLButtonElement, BaseButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading, children, className, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-bold transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#feed00] focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:pointer-events-none',
          'transform active:scale-95',
          BUTTON_VARIANTS[variant],
          BUTTON_SIZES[size],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <LoadingSpinner size="sm" className="mr-2" />
        ) : null}
        {children}
      </button>
    )
  }
)

BaseButton.displayName = 'BaseButton'