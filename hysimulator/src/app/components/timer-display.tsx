'use client'

import { motion } from 'framer-motion'
import { Clock, Target } from 'lucide-react'
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
    if (!isRunning) return 'text-hyrox-gray-medium dark:text-hyrox-gray-light'
    if (timeRemaining <= 10 && timeRemaining > 0) return 'timer-warning'
    if (timeRemaining <= 0) return 'timer-complete'
    return 'timer-running text-hyrox-orange'
  }

  const getProgressPercentage = (): number => {
    if (!currentEvent) return 0
    const elapsed = currentEvent.duration - timeRemaining
    return (elapsed / currentEvent.duration) * 100
  }

  return (
    <div className="flex flex-col items-center space-y-6">
      {currentEvent && (
        <motion.div
          key={eventIndex}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center w-full"
        >
          {/* Event Header */}
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-2 bg-hyrox-orange/10 rounded-lg">
              <Target className="w-6 h-6 text-hyrox-orange" />
            </div>
            <div className="text-left">
              <h2 className="text-2xl md:text-3xl font-black text-hyrox-black dark:text-white">
                {currentEvent.name.toUpperCase()}
              </h2>
              <p className="text-sm font-semibold text-hyrox-gray-medium dark:text-hyrox-gray-light">
                Event {eventIndex + 1} of {totalEvents}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full max-w-md mx-auto mb-6">
            <div className="flex justify-between text-xs font-bold text-hyrox-gray-medium dark:text-hyrox-gray-light mb-2">
              <span>PROGRESS</span>
              <span>{Math.round(getProgressPercentage())}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-hyrox-gray-dark rounded-full h-2 overflow-hidden">
              <motion.div
                className="hyrox-gradient h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${getProgressPercentage()}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Main Timer */}
      <div className="relative">
        <motion.div
          className={`text-8xl md:text-9xl font-black font-mono ${getTimerClass()}`}
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
            <div className="w-4 h-4 bg-gray-400 rounded-full" />
          )}
        </div>
      </div>
      
      {/* Status Messages */}
      {isPaused && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center space-x-2 bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 dark:text-yellow-400 px-4 py-2 rounded-lg font-bold"
        >
          <Clock className="w-4 h-4" />
          <span>PAUSED</span>
        </motion.div>
      )}

      {timeRemaining <= 0 && isRunning && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center space-x-2 bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 px-4 py-2 rounded-lg font-bold"
        >
          <Target className="w-4 h-4" />
          <span>EVENT COMPLETE!</span>
        </motion.div>
      )}
    </div>
  )
}