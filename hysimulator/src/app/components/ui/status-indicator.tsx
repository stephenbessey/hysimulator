'use client'

import { cn } from '../../lib/utils'

interface StatusIndicatorProps {
  status: 'running' | 'paused' | 'stopped'
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const STATUS_CONFIG = {
  running: { color: 'bg-green-500', label: 'Running' },
  paused: { color: 'bg-yellow-500', label: 'Paused' },
  stopped: { color: 'bg-gray-500', label: 'Stopped' }
} as const

const SIZE_CLASSES = {
  sm: 'w-1.5 h-1.5',
  md: 'w-2 h-2', 
  lg: 'w-3 h-3'
} as const

export function StatusIndicator({ 
  status, 
  showLabel = true, 
  size = 'md',
  className 
}: StatusIndicatorProps) {
  const config = STATUS_CONFIG[status]
  
  return (
    <div className={cn(
      "flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400",
      className
    )}>
      <div className={cn(
        "rounded-full",
        config.color,
        SIZE_CLASSES[size]
      )} />
      {showLabel && <span>{config.label}</span>}
    </div>
  )
}
