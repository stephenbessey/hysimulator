'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { cn } from '../../lib/utils'
import { UI_CONSTANTS } from '../../constants'

export interface TimerControlButtonProps {
  icon: LucideIcon
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary' | 'danger' | 'warning'
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const VARIANT_STYLES = {
  primary: 'bg-[#feed00] text-black hover:bg-[#feed00]/90 shadow-lg hover:shadow-xl',
  secondary: 'bg-gray-600 text-white hover:bg-gray-500',
  danger: 'bg-red-600 text-white hover:bg-red-500',
  warning: 'bg-yellow-600 text-white hover:bg-yellow-500'
} as const

const SIZE_STYLES = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg'
} as const

const ICON_SIZES = {
  sm: 16,
  md: 20,
  lg: 24
} as const

export function TimerControlButton({
  icon: Icon,
  label,
  onClick,
  variant = 'primary',
  disabled = false,
  size = 'md',
  className
}: TimerControlButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex items-center space-x-2 rounded-lg font-bold transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-[#feed00] focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'transform active:scale-95',
        VARIANT_STYLES[variant],
        SIZE_STYLES[size],
        className
      )}
      whileHover={!disabled ? { scale: UI_CONSTANTS.ANIMATION.HOVER_SCALE, y: -1 } : {}}
      whileTap={!disabled ? { scale: UI_CONSTANTS.ANIMATION.ACTIVE_SCALE } : {}}
      transition={UI_CONSTANTS.ANIMATION.SPRING_CONFIG}
    >
      <Icon size={ICON_SIZES[size]} />
      <span>{label}</span>
    </motion.button>
  )
}