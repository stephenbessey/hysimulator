import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '../../lib/utils'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-lg text-sm font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hyrox-orange focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none transform active:scale-95',
          {
            'hyrox-gradient text-white shadow-lg hover:shadow-xl hover:scale-105': variant === 'default',
            'bg-red-500 text-white hover:bg-red-600 shadow-lg hover:shadow-xl': variant === 'destructive',
            'border-2 border-hyrox-orange text-hyrox-orange hover:bg-hyrox-orange hover:text-white dark:border-hyrox-orange dark:text-hyrox-orange': variant === 'outline',
            'bg-hyrox-gray-medium text-white hover:bg-hyrox-gray-dark dark:bg-hyrox-gray-dark dark:hover:bg-hyrox-gray-medium': variant === 'secondary',
            'hover:bg-hyrox-orange/10 text-hyrox-gray-dark dark:text-hyrox-gray-light': variant === 'ghost',
            'text-hyrox-orange underline-offset-4 hover:underline font-semibold': variant === 'link',
          },
          {
            'h-12 py-3 px-6': size === 'default',
            'h-10 px-4 text-xs': size === 'sm',
            'h-14 px-8 text-lg': size === 'lg',
            'h-12 w-12': size === 'icon',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button }