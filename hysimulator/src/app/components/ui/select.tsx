import { SelectHTMLAttributes, forwardRef } from 'react'
import { cn } from '../../lib/utils'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, ...props }, ref) => {
    return (
      <select
        className={cn(
          'flex h-12 w-full rounded-lg border-2 border-hyrox-orange/20 bg-white px-4 py-3 text-sm font-semibold text-hyrox-black placeholder:text-hyrox-gray-medium focus:outline-none focus:ring-2 focus:ring-hyrox-orange focus:border-hyrox-orange disabled:cursor-not-allowed disabled:opacity-50 dark:border-hyrox-gray-medium dark:bg-hyrox-gray-dark dark:text-white dark:placeholder:text-hyrox-gray-light transition-all duration-200 hover:border-hyrox-orange/40',
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