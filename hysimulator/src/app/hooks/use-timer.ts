'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Athlete, TimerState } from '../types/athlete'
import useSound from 'use-sound'

export function useTimer(selectedAthlete: Athlete | null) {
  const [timerState, setTimerState] = useState<TimerState>({
    isRunning: false,
    isPaused: false,
    currentEventIndex: 0,
    timeRemaining: 0,
    totalElapsed: 0,
  })

  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const [playBeep] = useSound('/beep.mp3', { volume: 0.5 })

  const currentEvent = selectedAthlete?.events[timerState.currentEventIndex] || null

  const start = useCallback(() => {
    if (!selectedAthlete) return

    setTimerState(prev => ({
      ...prev,
      isRunning: true,
      isPaused: false,
      timeRemaining: prev.timeRemaining || selectedAthlete.events[prev.currentEventIndex]?.duration || 0,
    }))
  }, [selectedAthlete])

  const pause = useCallback(() => {
    setTimerState(prev => ({
      ...prev,
      isPaused: true,
    }))
  }, [])

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setTimerState(prev => ({
      ...prev,
      isRunning: false,
      isPaused: false,
    }))
  }, [])

  const reset = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setTimerState({
      isRunning: false,
      isPaused: false,
      currentEventIndex: 0,
      timeRemaining: selectedAthlete?.events[0]?.duration || 0,
      totalElapsed: 0,
    })
  }, [selectedAthlete])

  // Timer effect
  useEffect(() => {
    if (timerState.isRunning && !timerState.isPaused && selectedAthlete) {
      intervalRef.current = setInterval(() => {
        setTimerState(prev => {
          const newTimeRemaining = prev.timeRemaining - 1
          const newTotalElapsed = prev.totalElapsed + 1

          // Event completed
          if (newTimeRemaining <= 0) {
            try {
              playBeep()
            } catch (error) {
              console.warn('Could not play sound:', error)
            }

            const nextEventIndex = prev.currentEventIndex + 1
            
            // All events completed
            if (nextEventIndex >= selectedAthlete.events.length) {
              return {
                ...prev,
                isRunning: false,
                timeRemaining: 0,
                totalElapsed: newTotalElapsed,
              }
            }

            // Move to next event
            return {
              ...prev,
              currentEventIndex: nextEventIndex,
              timeRemaining: selectedAthlete.events[nextEventIndex].duration,
              totalElapsed: newTotalElapsed,
            }
          }

          return {
            ...prev,
            timeRemaining: newTimeRemaining,
            totalElapsed: newTotalElapsed,
          }
        })
      }, 1000)

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
      }
    }
  }, [timerState.isRunning, timerState.isPaused, selectedAthlete, playBeep])

  // Initialize timer when athlete changes
  useEffect(() => {
    if (selectedAthlete && !timerState.isRunning) {
      setTimerState(prev => ({
        ...prev,
        currentEventIndex: 0,
        timeRemaining: selectedAthlete.events[0]?.duration || 0,
        totalElapsed: 0,
      }))
    }
  }, [selectedAthlete])

  return {
    timerState,
    currentEvent,
    start,
    pause,
    stop,
    reset,
  }
}