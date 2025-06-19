'use client'

import { Play, Pause, Square, RotateCcw } from 'lucide-react'
import { TimerControlButton } from './ui/timer-control-button'
import { StatusIndicator } from './ui/status-indicator'
import { SectionHeader } from './ui/section-header'
import { TimerState } from '../types/athlete'

interface TimerControlsProps {
  timerState: TimerState
  onStart: () => void
  onPause: () => void
  onStop: () => void
  onReset: () => void
  disabled?: boolean
}

export function TimerControls({
  timerState,
  onStart,
  onPause,
  onStop,
  onReset,
  disabled = false
}: TimerControlsProps) {
  const getTimerStatus = () => {
    if (timerState.isRunning && !timerState.isPaused) return 'running'
    if (timerState.isPaused) return 'paused'
    return 'stopped'
  }

  return (
    <div className="text-center">
      <SectionHeader title="TIMER CONTROLS" />
      
      {/* Mobile: Stack vertically, Desktop: Horizontal */}
      <div className="flex flex-col sm:flex-row justify-center items-center sm:space-x-4 space-y-3 sm:space-y-0">
        {!timerState.isRunning || timerState.isPaused ? (
          <TimerControlButton
            icon={Play}
            label={!timerState.isRunning ? 'START' : 'RESUME'}
            onClick={onStart}
            variant="primary"
            disabled={disabled}
            size="lg"
            className="w-full sm:w-auto max-w-xs"
          />
        ) : (
          <TimerControlButton
            icon={Pause}
            label="PAUSE"
            onClick={onPause}
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto max-w-xs"
          />
        )}

        <TimerControlButton
          icon={Square}
          label="STOP"
          onClick={onStop}
          variant="danger"
          disabled={!timerState.isRunning && !timerState.isPaused}
          size="lg"
          className="w-full sm:w-auto max-w-xs"
        />

        <TimerControlButton
          icon={RotateCcw}
          label="RESET"
          onClick={onReset}
          variant="secondary"
          size="lg"
          className="w-full sm:w-auto max-w-xs"
        />
      </div>
      
      {/* Status indicator for mobile */}
      <div className="mt-4 sm:hidden">
        <StatusIndicator 
          status={getTimerStatus()}
          className="justify-center"
        />
      </div>
    </div>
  )
}