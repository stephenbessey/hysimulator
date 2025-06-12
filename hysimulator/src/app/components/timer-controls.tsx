'use client'

import { Play, Pause, Square, RotateCcw } from 'lucide-react'
import { Button } from './ui/button'

interface TimerControlsProps {
  isRunning: boolean
  isPaused: boolean
  onStart: () => void
  onPause: () => void
  onStop: () => void
  onReset: () => void
  disabled?: boolean
}

export function TimerControls({
  isRunning,
  isPaused,
  onStart,
  onPause,
  onStop,
  onReset,
  disabled = false
}: TimerControlsProps) {
  return (
    <div className="flex flex-col space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-black text-hyrox-black dark:text-white mb-2">
          TIMER CONTROLS
        </h3>
        <p className="text-sm text-hyrox-gray-medium dark:text-hyrox-gray-light">
          Control your training session
        </p>
      </div>
      
      <div className="flex flex-wrap justify-center gap-4">
        {!isRunning || isPaused ? (
          <Button
            onClick={onStart}
            disabled={disabled}
            size="lg"
            className="flex items-center space-x-3 min-w-[140px]"
          >
            <Play className="w-5 h-5" />
            <span className="font-black">{!isRunning ? 'START' : 'RESUME'}</span>
          </Button>
        ) : (
          <Button
            onClick={onPause}
            variant="secondary"
            size="lg"
            className="flex items-center space-x-3 min-w-[140px]"
          >
            <Pause className="w-5 h-5" />
            <span className="font-black">PAUSE</span>
          </Button>
        )}
        
        <Button
          onClick={onStop}
          variant="destructive"
          size="lg"
          disabled={!isRunning && !isPaused}
          className="flex items-center space-x-3 min-w-[140px]"
        >
          <Square className="w-5 h-5" />
          <span className="font-black">STOP</span>
        </Button>
        
        <Button
          onClick={onReset}
          variant="outline"
          size="lg"
          className="flex items-center space-x-3 min-w-[140px]"
        >
          <RotateCcw className="w-5 h-5" />
          <span className="font-black">RESET</span>
        </Button>
      </div>
    </div>
  )
}
