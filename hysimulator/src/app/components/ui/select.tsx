import { SelectHTMLAttributes, forwardRef } from 'react'
import { cn } from '../../lib/utils'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, ...props }, ref) => {
    return (
      <select
        className={cn(
          'flex h-12 w-full rounded-lg border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-black px-4 py-3 text-sm font-semibold text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#feed00] focus:border-[#feed00] disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 hover:border-[#feed00]/40',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Select.displayName = 'Select'

export { Select }