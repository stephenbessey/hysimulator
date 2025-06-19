import { ButtonHTMLAttributes, forwardRef } from 'react'
import { BaseButton, BaseButtonProps } from './base-button'

export interface ButtonProps extends BaseButtonProps {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <BaseButton
        ref={ref}
        variant={variant}
        size={size}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button }