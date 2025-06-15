// src/app/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AthleteSelector } from './components/athlete-selector'
import { TimerDisplay } from './components/timer-display'
import { TimerControls } from './components/timer-controls'
import { ThemeToggle } from './components/theme-toggle'
import { useTimer } from './hooks/use-timer'
import { fetchAthletes, checkBackendHealth } from './utils/api'
import { Athlete } from './types/athlete'
import { PRO_ATHLETES } from './data/athletes'

export default function Home() {
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null)
  const [athletes, setAthletes] = useState<Athlete[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [backendStatus, setBackendStatus] = useState<'loading' | 'online' | 'offline'>('loading')
  
  const { timerState, currentEvent, start, pause, stop, reset } = useTimer(selectedAthlete)

  useEffect(() => {
    let isMounted = true

    const loadAthletes = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const isHealthy = await checkBackendHealth()
        setBackendStatus(isHealthy ? 'online' : 'offline')
        
        if (isHealthy) {
          const fetchedAthletes = await fetchAthletes()
          if (isMounted) {
            setAthletes(fetchedAthletes)
            console.log('✅ Successfully loaded athletes from backend:', fetchedAthletes.length)
          }
        } else {
          throw new Error('Backend is not responding')
        }
      } catch (err) {
        console.warn('⚠️ Backend unavailable, using fallback data:', err)
        setBackendStatus('offline')
        
        if (isMounted) {
          setAthletes(PRO_ATHLETES)
          setError('Using offline data - backend connection failed')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadAthletes()
    
    return () => {
      isMounted = false
    }
  }, [])

  const handleAthleteSelect = (athlete: Athlete | null) => {
    if (timerState?.isRunning) {
      stop()
    }
    setSelectedAthlete(athlete)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#feed00] mx-auto mb-4"></div>
          <h2 className="text-xl font-bold mb-2">Loading Athletes...</h2>
          <p className="text-gray-600 dark:text-gray-400">Connecting to backend</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <h1 className="text-4xl font-black tracking-wider text-black dark:text-white">
                HYROX
              </h1>
              <span className="font-bold text-sm px-3 py-1 rounded text-black bg-[#feed00]">
                SIMULATOR
              </span>
              {/* Backend Status Indicator */}
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  backendStatus === 'online' ? 'bg-green-500' : 
                  backendStatus === 'offline' ? 'bg-red-500' : 'bg-yellow-500'
                }`}></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {backendStatus === 'online' ? 'Live Data' : 
                   backendStatus === 'offline' ? 'Offline Mode' : 'Connecting...'}
                </span>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 rounded-lg"
          >
            <p className="text-yellow-800 dark:text-yellow-200 text-sm">
              ⚠️ {error}
            </p>
          </motion.div>
        )}

        {/* Yellow Hero Section */}
        <motion.div
          className="text-black p-8 rounded-lg mb-8 bg-[#feed00]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center">
            <h2 className="text-4xl font-black mb-4">TRAIN LIKE A PRO</h2>
            <p className="text-lg font-semibold">
              Follow the exact timing of world-class HYROX athletes
            </p>
            <div className="mt-4 flex justify-center items-center space-x-4 text-sm">
              <span>🏃‍♂️ {athletes.filter(a => a.category === 'men').length} Men's Athletes</span>
              <span>🏃‍♀️ {athletes.filter(a => a.category === 'women').length} Women's Athletes</span>
              <span>🎯 {athletes.length} Total Profiles</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Athlete Selection */}
          <div className="lg:col-span-1">
            <AthleteSelector
              athletes={athletes}
              selectedAthlete={selectedAthlete}
              onAthleteSelect={handleAthleteSelect}
              disabled={timerState?.isRunning || false}
            />
          </div>

          {/* Right Column - Timer */}
          <div className="lg:col-span-2">
            {selectedAthlete ? (
              <div className="space-y-6">
                <TimerDisplay
                  athlete={selectedAthlete}
                  timerState={timerState}
                  currentEvent={currentEvent}
                />
                <TimerControls
                  timerState={timerState}
                  onStart={start}
                  onPause={pause}
                  onStop={stop}
                  onReset={reset}
                  disabled={!selectedAthlete}
                />
              </div>
            ) : (
              <motion.div
                className="text-center p-12 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h3 className="text-2xl font-bold text-gray-500 dark:text-gray-400 mb-4">
                  SELECT AN ATHLETE TO BEGIN
                </h3>
                <p className="text-gray-400 dark:text-gray-500">
                  Choose a professional athlete from the sidebar to start your HYROX simulation
                </p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Footer with backend info */}
        <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <p>
              {backendStatus === 'online' ? 
                '🚀 Connected to live backend API' : 
                '📱 Running in offline mode with cached data'
              }
            </p>
            {athletes.length > 0 && (
              <p className="mt-1">
                Serving {athletes.length} professional athlete profiles
              </p>
            )}
          </div>
        </footer>
      </div>
    </div>
  )
}