'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { AthleteSelector } from './components/athlete-selector'
import { TimerDisplay } from './components/timer-display'
import { TimerControls } from './components/timer-controls'
import { ThemeToggle } from './components/theme-toggle'
import { ErrorBoundary } from './components/error-boundary'
import { LoadingSpinner } from './components/ui/loading-spinner'
import { BaseButton } from './components/ui/base-button'
import { useTimer } from './hooks/use-timer'
import { useAthleteData } from './hooks/use-athlete-data'
import { Athlete } from './types/athlete'
import { formatTime } from './lib/time-utils'

function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <LoadingSpinner size="lg" className="mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Loading Athletes...
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Connecting to backend service
        </p>
      </div>
    </div>
  )
}

function ErrorState({ error, onRetry }: { error: string; onRetry: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center p-8 max-w-md">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Connection Error
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {error}
        </p>
        <BaseButton onClick={onRetry} variant="primary">
          Try Again
        </BaseButton>
      </div>
    </div>
  )
}

function BackendStatusIndicator({ status }: { status: 'online' | 'offline' | 'loading' }) {
  if (status === 'loading') return null
  
  return (
    <div className="fixed top-4 right-20 z-50">
      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
        status === 'online' 
          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      }`}>
        {status === 'online' ? '● Backend Online' : '● Using Offline Data'}
      </div>
    </div>
  )
}

export default function Home() {
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null)
  const { athletes, loading, error, backendStatus, refetchAthletes } = useAthleteData()
  const { timerState, currentEvent, start, pause, stop, reset } = useTimer(selectedAthlete)

  if (loading) {
    return <LoadingState />
  }

  if (error) {
    return <ErrorState error={error} onRetry={refetchAthletes} />
  }

  const isTimerDisabled = !selectedAthlete

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-black dark:to-gray-900">
        {/* Header */}
        <header className="relative p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <motion.h1 
              className="text-3xl font-black text-black dark:text-white"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              HY SIMULATOR
            </motion.h1>
            
            <div className="flex items-center space-x-4">
              <BackendStatusIndicator status={backendStatus} />
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Sidebar - Athlete Selection */}
            <motion.div 
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg sticky top-6">
                <AthleteSelector
                  athletes={athletes}
                  selectedAthlete={selectedAthlete}
                  onAthleteSelect={setSelectedAthlete}
                  disabled={loading}
                />
                
                {athletes.length === 0 && (
                  <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      No athletes available. Please check your connection.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Center - Timer Display */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="space-y-8">
                
                {selectedAthlete ? (
                  <>
                    {/* Timer Display */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
                      <TimerDisplay
                        athlete={selectedAthlete}
                        timerState={timerState}
                        currentEvent={currentEvent}
                      />
                    </div>

                    {/* Timer Controls */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
                      <TimerControls
                        timerState={timerState}
                        onStart={start}
                        onPause={pause}
                        onStop={stop}
                        onReset={reset}
                        disabled={isTimerDisabled}
                      />
                    </div>

                    {/* Event List */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                      <h3 className="text-lg font-bold text-black dark:text-white mb-4">
                        EVENT BREAKDOWN
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedAthlete.events.map((event, index) => (
                          <motion.div
                            key={`${event.name}-${index}`}
                            className={`p-3 rounded-lg border-2 transition-all ${
                              index === timerState.currentEventIndex
                                ? 'border-[#feed00] bg-[#feed00]/10'
                                : index < timerState.currentEventIndex
                                ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                                : 'border-gray-200 dark:border-gray-700'
                            }`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-black dark:text-white">
                                {event.name}
                              </span>
                              <span className="text-sm font-mono text-gray-600 dark:text-gray-400">
                                {formatTime(event.duration)}
                              </span>
                            </div>
                            {index < timerState.currentEventIndex && (
                              <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                                ✓ Completed
                              </div>
                            )}
                            {index === timerState.currentEventIndex && (
                              <div className="text-xs text-[#feed00] mt-1">
                                ▶ Current Event
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  /* No Athlete Selected State */
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-12 shadow-lg text-center">
                    <div className="text-6xl mb-6">🏃‍♂️</div>
                    <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
                      Ready to Train?
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                      Select a professional athlete from the sidebar to start training with their exact timing and pacing.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                      <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="text-2xl mb-2">⏱️</div>
                        <h4 className="font-semibold text-black dark:text-white">Precise Timing</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Train with exact professional times
                        </p>
                      </div>
                      <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="text-2xl mb-2">🔊</div>
                        <h4 className="font-semibold text-black dark:text-white">Audio Alerts</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Get notified for event transitions
                        </p>
                      </div>
                      <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="text-2xl mb-2">📱</div>
                        <h4 className="font-semibold text-black dark:text-white">Mobile Ready</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Perfect for gym workouts
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-12 py-6 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-6 text-center text-gray-600 dark:text-gray-400">
            <p>© 2025 Hyrox Simulator - Train like a pro</p>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  )
}