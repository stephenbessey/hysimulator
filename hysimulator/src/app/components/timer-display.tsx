'use client'

import { motion } from 'framer-motion'
import { Target } from 'lucide-react'
import { TimerDisplayProps } from '../types/athlete'
import { formatDisplayTime } from '../lib/time-utils'

export function TimerDisplay({
  athlete,
  timerState,
  currentEvent
}: TimerDisplayProps) {
  const progressPercentage = currentEvent 
    ? ((currentEvent.duration - timerState.timeRemaining) / currentEvent.duration) * 100
    : 0

  const getTimerClassName = () => {
    let baseClasses = 'text-8xl md:text-9xl font-black font-mono text-black dark:text-white'
    
    if (timerState.timeRemaining <= 10 && timerState.timeRemaining > 0) {
      return `${baseClasses} timer-warning`
    }
    if (timerState.isRunning && !timerState.isPaused) {
      return `${baseClasses} timer-running`
    }
    if (timerState.timeRemaining === 0 && timerState.currentEventIndex === athlete.events.length - 1) {
      return `${baseClasses} timer-complete`
    }
    return baseClasses
  }

  return (
    <div className="text-center space-y-6">
      {/* Current Event */}
      {currentEvent && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
        >
          <div className="flex items-center justify-center mb-4">
            <Target className="text-[#feed00] mr-3" size={28} />
            <h2 className="text-2xl font-black text-black dark:text-white">
              {currentEvent.name.toUpperCase()}
            </h2>
          </div>
          
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div 
              className="bg-[#feed00] h-3 rounded-full transition-all duration-1000"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Event {timerState.currentEventIndex + 1} of {athlete.events.length}
          </p>
        </motion.div>
      )}

      {/* Timer Display */}
      <motion.div
        className={getTimerClassName()}
        animate={{ scale: timerState.isRunning && !timerState.isPaused ? [1, 1.02, 1] : 1 }}
        transition={{ duration: 1, repeat: timerState.isRunning && !timerState.isPaused ? Infinity : 0 }}
      >
        {formatDisplayTime(timerState.timeRemaining)}
      </motion.div>

      {/* Total Time */}
      <div className="text-lg text-gray-600 dark:text-gray-400">
        Total Elapsed: {formatDisplayTime(timerState.totalElapsed)}
      </div>
    </div>
  )
}