'use client'

import { Play, Pause, Square, RotateCcw } from 'lucide-react'
import { TimerControlButton } from './ui/timer-control-button'
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
  return (
    <div className="text-center">
      <h3 className="text-lg font-black text-black dark:text-white mb-4">TIMER CONTROLS</h3>
      
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
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <div className={`w-2 h-2 rounded-full ${
            timerState.isRunning && !timerState.isPaused ? 'bg-green-500' :
            timerState.isPaused ? 'bg-yellow-500' : 'bg-gray-500'
          }`} />
          <span>
            {timerState.isRunning && !timerState.isPaused ? 'Running' :
             timerState.isPaused ? 'Paused' : 'Stopped'}
          </span>
        </div>
      </div>
    </div>
  )
}