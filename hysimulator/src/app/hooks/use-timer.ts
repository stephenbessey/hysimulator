'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Athlete, TimerState } from '../types/athlete'
import { UI_CONSTANTS } from '../constants'
import useSound from 'use-sound'

interface UseTimerReturn {
  timerState: TimerState
  currentEvent: {
    readonly name: string
    readonly duration: number
    readonly color: string
  } | null
  start: () => void
  pause: () => void
  stop: () => void
  reset: () => void
}

export function useTimer(selectedAthlete: Athlete | null): UseTimerReturn {
  const [timerState, setTimerState] = useState<TimerState>({
    isRunning: false,
    isPaused: false,
    currentEventIndex: 0,
    timeRemaining: 0,
    totalElapsed: 0,
  })

  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const [playBeep] = useSound('/beep.mp3', { 
    volume: UI_CONSTANTS.TIMER.BEEP_VOLUME 
  })

  const currentEvent = selectedAthlete?.events[timerState.currentEventIndex] || null

  const handleEventCompletion = useCallback((currentState: TimerState) => {
    try {
      playBeep()
    } catch (error) {
      console.warn('Audio playback failed:', error)
    }

    const nextEventIndex = currentState.currentEventIndex + 1
    const newTotalElapsed = currentState.totalElapsed + 1

    if (!selectedAthlete || nextEventIndex >= selectedAthlete.events.length) {
      return {
        ...currentState,
        isRunning: false,
        timeRemaining: 0,
        totalElapsed: newTotalElapsed,
      }
    }

    return {
      ...currentState,
      currentEventIndex: nextEventIndex,
      timeRemaining: selectedAthlete.events[nextEventIndex].duration,
      totalElapsed: newTotalElapsed,
    }
  }, [selectedAthlete, playBeep])

  const updateTimer = useCallback(() => {
    setTimerState(prev => {
      const newTimeRemaining = prev.timeRemaining - 1
      const newTotalElapsed = prev.totalElapsed + 1

      if (newTimeRemaining <= 0) {
        return handleEventCompletion(prev)
      }

      return {
        ...prev,
        timeRemaining: newTimeRemaining,
        totalElapsed: newTotalElapsed,
      }
    })
  }, [handleEventCompletion])

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

  useEffect(() => {
    if (timerState.isRunning && !timerState.isPaused && selectedAthlete) {
      intervalRef.current = setInterval(updateTimer, UI_CONSTANTS.TIMER.UPDATE_INTERVAL_MS)

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
      }
    }
  }, [timerState.isRunning, timerState.isPaused, selectedAthlete, updateTimer])

  useEffect(() => {
    if (selectedAthlete && !timerState.isRunning) {
      setTimerState(prev => ({
        ...prev,
        currentEventIndex: 0,
        timeRemaining: selectedAthlete.events[0]?.duration || 0,
        totalElapsed: 0,
      }))
    }
  }, [selectedAthlete, timerState.isRunning])

  return {
    timerState,
    currentEvent,
    start,
    pause,
    stop,
    reset,
  }
}