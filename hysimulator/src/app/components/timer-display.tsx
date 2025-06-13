'use client'

import { motion } from 'framer-motion'
import { Target } from 'lucide-react'
import { HyroxEvent } from '../types/athlete'

interface TimerDisplayProps {
  currentEvent: HyroxEvent | null
  timeRemaining: number
  isRunning: boolean
  isPaused: boolean
  eventIndex: number
  totalEvents: number
}

export function TimerDisplay({
  currentEvent,
  timeRemaining,
  isRunning,
  isPaused,
  eventIndex,
  totalEvents
}: TimerDisplayProps) {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(Math.abs(seconds) / 60)
    const secs = Math.abs(seconds) % 60
    const sign = seconds < 0 ? '-' : ''
    return `${sign}${mins}:${String(Math.floor(secs)).padStart(2, '0')}`
  }

  const getTimerClass = (): string => {
    if (!isRunning) return 'text-gray-500'
    if (timeRemaining <= 10 && timeRemaining > 0) return 'text-red-500'
    if (timeRemaining <= 0) return 'text-green-500'
    return 'text-[#feed00]'
  }

  const getProgressPercentage = (): number => {
    if (!currentEvent) return 0
    const elapsed = currentEvent.duration - timeRemaining
    return (elapsed / currentEvent.duration) * 100
  }

  return (
    <div className="text-center">
      {currentEvent && (
        <motion.div
          key={eventIndex}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          {/* Event Header */}
          <div className="flex items-center justify-center mb-4">
            <Target className="text-[#feed00] mr-3" size={28} />
            <div>
              <h2 className="text-3xl font-black text-black dark:text-white">
                {currentEvent.name.toUpperCase()}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 font-semibold">
                Event {eventIndex + 1} of {totalEvents}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="max-w-md mx-auto mb-6">
            <div className="flex justify-between text-xs font-bold text-gray-600 dark:text-gray-400 mb-2">
              <span>PROGRESS</span>
              <span>{Math.round(getProgressPercentage())}%</span>
            </div>
            <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-3">
              <motion.div
                className="bg-[#feed00] h-3 rounded-full transition-all duration-300"
                initial={{ width: 0 }}
                animate={{ width: `${getProgressPercentage()}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Main Timer */}
      <div className="relative mb-8">
        <motion.div
          className={`text-8xl font-black font-mono transition-colors duration-300 ${getTimerClass()}`}
          animate={timeRemaining <= 0 ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 0.3, repeat: timeRemaining <= 0 ? 3 : 0 }}
        >
          {formatTime(timeRemaining)}
        </motion.div>
        
        {/* Timer Status Indicators */}
        <div className="absolute -top-4 -right-4">
          {isRunning && !isPaused && (
            <motion.div
              className="w-4 h-4 bg-green-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
          {isPaused && (
            <div className="w-4 h-4 bg-yellow-500 rounded-full" />
          )}
          {!isRunning && !isPaused && (
            <div className="w-4 h-4 bg-gray-500 rounded-full" />
          )}
        </div>
      </div>
      
      {/* Status Messages */}
      {isPaused && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center space-x-2 bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 px-4 py-2 rounded-lg font-bold mb-4"
        >
          <span>PAUSED</span>
        </motion.div>
      )}

      {timeRemaining <= 0 && isRunning && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center space-x-2 bg-green-500/20 border border-green-500/30 text-green-400 px-4 py-2 rounded-lg font-bold mb-4"
        >
          <span>EVENT COMPLETE!</span>
        </motion.div>
      )}
    </div>
  )
}