'use client'

import { Play, Pause, Square, RotateCcw } from 'lucide-react'

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
    <div className="text-center">
      <h3 className="text-lg font-black text-white mb-4">TIMER CONTROLS</h3>
      <div className="flex justify-center space-x-4 flex-wrap">
        {!isRunning || isPaused ? (
          <button
            onClick={onStart}
            disabled={disabled}
            className="flex items-center space-x-2 bg-yellow-400 text-black px-6 py-3 rounded font-bold hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play size={20} />
            <span>{!isRunning ? 'START' : 'RESUME'}</span>
          </button>
        ) : (
          <button
            onClick={onPause}
            className="flex items-center space-x-2 bg-gray-600 text-white px-6 py-3 rounded font-bold hover:bg-gray-500 transition-colors"
          >
            <Pause size={20} />
            <span>PAUSE</span>
          </button>
        )}

        <button
          onClick={onStop}
          disabled={!isRunning && !isPaused}
          className="flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded font-bold hover:bg-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Square size={20} />
          <span>STOP</span>
        </button>

        <button
          onClick={onReset}
          className="flex items-center space-x-2 bg-gray-700 border border-gray-600 text-white px-6 py-3 rounded font-bold hover:bg-gray-600 transition-colors"
        >
          <RotateCcw size={20} />
          <span>RESET</span>
        </button>
      </div>
    </div>
  )
}