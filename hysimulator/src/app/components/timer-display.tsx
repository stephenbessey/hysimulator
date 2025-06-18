'use client'

import { motion } from 'framer-motion'
import { Target } from 'lucide-react'
import { Athlete, TimerState } from '../types/athlete'

interface TimerDisplayProps {
  athlete: Athlete
  timerState: TimerState
  currentEvent: any
}

export function TimerDisplay({
  athlete,
  timerState,
  currentEvent
}: TimerDisplayProps) {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(Math.abs(seconds) / 60)
    const secs = Math.abs(seconds) % 60
    const sign = seconds < 0 ? '-' : ''
    return `${sign}${mins}:${String(Math.floor(secs)).padStart(2, '0')}`
  }

  const getTimerClass = (): string => {
    if (!timerState.isRunning) return 'text-gray-500'
    if (timerState.timeRemaining <= 10 && timerState.timeRemaining > 0) return 'text-red-500'
    if (timerState.timeRemaining <= 0) return 'text-green-500'
    return 'text-[#feed00]'
  }

  const getProgressPercentage = (): number => {
    if (!currentEvent || !currentEvent.duration || currentEvent.duration <= 0) {
      return 0
    }
    
    const elapsed = currentEvent.duration - timerState.timeRemaining
    const percentage = (elapsed / currentEvent.duration) * 100
    
    if (isNaN(percentage)) return 0
    return Math.max(0, Math.min(100, percentage))
  }

  const getOverallProgress = (): number => {
    if (!athlete || !athlete.events || athlete.events.length === 0) {
      return 0
    }
    
    const progress = ((timerState.currentEventIndex + 1) / athlete.events.length) * 100
    
    if (isNaN(progress)) return 0
    return Math.max(0, Math.min(100, progress))
  }

  return (
    <div className="text-center">
      {currentEvent && (
        <motion.div
          key={timerState.currentEventIndex}
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
                Event {timerState.currentEventIndex + 1} of {athlete.events.length}
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
                initial={{ width: "0%" }}
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
          animate={timerState.timeRemaining <= 0 ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 0.3, repeat: timerState.timeRemaining <= 0 ? 3 : 0 }}
        >
          {formatTime(timerState.timeRemaining)}
        </motion.div>
        
        {/* Timer Status Indicators */}
        <div className="absolute -top-4 -right-4">
          {timerState.isRunning && !timerState.isPaused && (
            <motion.div
              className="w-4 h-4 bg-green-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
          {timerState.isPaused && (
            <div className="w-4 h-4 bg-yellow-500 rounded-full" />
          )}
          {!timerState.isRunning && !timerState.isPaused && (
            <div className="w-4 h-4 bg-gray-500 rounded-full" />
          )}
        </div>
      </div>
      
      {/* Status Messages */}
      {timerState.isPaused && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center space-x-2 bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 px-4 py-2 rounded-lg font-bold mb-4"
        >
          <span>PAUSED</span>
        </motion.div>
      )}

      {timerState.timeRemaining <= 0 && timerState.isRunning && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center space-x-2 bg-green-500/20 border border-green-500/30 text-green-400 px-4 py-2 rounded-lg font-bold mb-4"
        >
          <span>EVENT COMPLETE!</span>
        </motion.div>
      )}

      {/* Overall Progress Section */}
      <motion.div
        className="bg-gray-100 dark:bg-gray-900 rounded-lg p-6 mt-8 border border-gray-200 dark:border-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="mb-6">
          <div className="flex justify-between items-center text-sm font-bold text-gray-600 dark:text-gray-400 mb-3">
            <span>RACE PROGRESS</span>
            <span className="text-black px-3 py-1 rounded-full text-xs font-black bg-[#feed00]">
              {timerState.currentEventIndex + 1} / {athlete.events.length}
            </span>
          </div>
          <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-3 rounded-full bg-[#feed00]"
              initial={{ width: "0%" }}
              animate={{ width: `${getOverallProgress()}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Event Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {athlete.events.map((event, index) => (
            <motion.div
              key={index}
              className={`p-3 rounded text-xs font-bold transition-all duration-300 ${
                index === timerState.currentEventIndex
                  ? 'text-black bg-[#feed00] transform scale-105'
                  : index < timerState.currentEventIndex
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center space-x-2 mb-2">
                <div
                  className={`w-3 h-3 rounded-full border-2 ${
                    index <= timerState.currentEventIndex
                      ? 'bg-[#feed00] border-[#feed00]'
                      : 'border-gray-400'
                  }`}
                />
                <span className="text-xs">
                  {index + 1}
                </span>
              </div>
              <div className="text-center">
                <div className="font-black text-xs mb-1">
                  {event.name}
                </div>
                <div className="text-xs opacity-75">
                  {formatTime(event.duration)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}