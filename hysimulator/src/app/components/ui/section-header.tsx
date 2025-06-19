'use client'

import { LucideIcon } from 'lucide-react'
import { cn } from '../../lib/utils'

interface SectionHeaderProps {
  icon?: LucideIcon
  title: string
  iconColor?: string
  className?: string
}

export function SectionHeader({ 
  icon: Icon, 
  title, 
  iconColor = 'text-[#feed00]', 
  className 
}: SectionHeaderProps) {
  return (
    <div className={cn("flex items-center mb-4", className)}>
      {Icon && <Icon className={cn("mr-3", iconColor)} size={24} />}
      <h3 className="text-xl font-bold text-black dark:text-white">{title}</h3>
    </div>
  )
}