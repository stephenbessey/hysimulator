'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { AthleteSelector } from './components/athlete-selector'
import { TimerDisplay } from './components/timer-display'
import { TimerControls } from './components/timer-controls'
import { ThemeToggle } from './components/theme-toggle'
import { useTimer } from './hooks/use-timer'
import { PRO_ATHLETES } from './data/athletes'
import { Athlete } from './types/athlete'

export default function Home() {
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null)
  const { timerState, currentEvent, start, pause, stop, reset } = useTimer(selectedAthlete)

  const handleAthleteSelect = (athlete: Athlete | null) => {
    if (timerState.isRunning) {
      stop()
    }
    setSelectedAthlete(athlete)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <h1 className="text-4xl font-black tracking-wider text-white">
                HYROX
              </h1>
              <span className="font-bold text-sm px-3 py-1 rounded" style={{
                color: '#feed00',
                backgroundColor: 'rgba(254, 237, 0, 0.2)'
              }}>
                SIMULATOR
              </span>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Yellow Hero Section */}
        <motion.div
          className="text-black p-8 rounded-lg mb-8"
          style={{ backgroundColor: '#feed00' }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center">
            <h2 className="text-4xl font-black mb-4">TRAIN LIKE A PRO</h2>
            <p className="text-xl font-semibold">
              Experience the exact timing of world-class HYROX athletes
            </p>
          </div>
        </motion.div>

        {/* Athlete Selection */}
        <motion.div
          className="bg-gray-900 rounded-lg p-6 mb-8 border border-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <AthleteSelector
            athletes={PRO_ATHLETES}
            selectedAthlete={selectedAthlete}
            onAthleteSelect={handleAthleteSelect}
            disabled={timerState.isRunning}
          />
        </motion.div>

        {/* Timer Section */}
        {selectedAthlete && (
          <motion.div
            className="bg-gray-900 rounded-lg p-8 mb-8 border border-gray-800"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <TimerDisplay
              currentEvent={currentEvent}
              timeRemaining={timerState.timeRemaining}
              isRunning={timerState.isRunning}
              isPaused={timerState.isPaused}
              eventIndex={timerState.currentEventIndex}
              totalEvents={selectedAthlete.events.length}
            />
          </motion.div>
        )}

        {/* Controls */}
        {selectedAthlete && (
          <motion.div
            className="bg-gray-900 rounded-lg p-6 mb-8 border border-gray-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <TimerControls
              isRunning={timerState.isRunning}
              isPaused={timerState.isPaused}
              onStart={start}
              onPause={pause}
              onStop={stop}
              onReset={reset}
              disabled={!selectedAthlete}
            />
          </motion.div>
        )}

        {/* Progress Section */}
        {selectedAthlete && (
          <motion.div
            className="bg-gray-900 rounded-lg p-6 mb-8 border border-gray-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="mb-6">
              <div className="flex justify-between items-center text-sm font-bold text-gray-400 mb-3">
                <span>RACE PROGRESS</span>
                <span className="text-black px-3 py-1 rounded-full text-xs font-black" style={{
                  backgroundColor: '#feed00'
                }}>
                  {timerState.currentEventIndex + 1} / {selectedAthlete.events.length}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                <motion.div
                  className="h-3 rounded-full"
                  style={{ backgroundColor: '#feed00' }}
                  initial={{ width: 0 }}
                  animate={{
                    width: `${((timerState.currentEventIndex + 1) / selectedAthlete.events.length) * 100}%`,
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Event Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
              {selectedAthlete.events.map((event, index) => (
                <motion.div
                  key={index}
                  className={`p-3 rounded text-xs font-bold transition-all duration-300 ${
                    index === timerState.currentEventIndex
                      ? 'text-black transform scale-105'
                      : index < timerState.currentEventIndex
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-700 text-gray-400'
                  }`}
                  style={index === timerState.currentEventIndex ? { backgroundColor: '#feed00' } : {}}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <div
                      className={`w-3 h-3 rounded-full border-2 ${
                        index <= timerState.currentEventIndex ? 'bg-current' : 'border-current'
                      }`}
                    />
                    <span className="text-xs font-black">#{index + 1}</span>
                  </div>
                  <div className="text-xs font-bold leading-tight mb-1">
                    {event.name.toUpperCase()}
                  </div>
                  <div className="text-xs opacity-80 font-semibold">
                    {Math.floor(event.duration / 60)}:{String(event.duration % 60).padStart(2, '0')}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Welcome Section */}
        {!selectedAthlete && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="max-w-4xl mx-auto">
              <h2 className="text-5xl font-black text-white mb-6">
                HYROX IS <span style={{ color: '#feed00' }}>FITNESS RACING</span>
              </h2>
              <p className="text-xl text-gray-400 font-medium mb-12 leading-relaxed">
                HYROX combines both running & functional workout stations, where participants run 1km, 
                followed by 1 functional workout station, repeated eight times.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div
                  className="bg-gray-900 p-8 rounded-lg border border-gray-800 transition-colors"
                  style={{ 
                    '&:hover': { borderColor: '#feed00' }
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = '#feed00'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = '#374151'}
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="text-4xl mb-4">🏃‍♂️</div>
                  <h3 className="font-black text-xl mb-3 text-white">PRO ATHLETE TIMES</h3>
                  <p className="text-gray-400 font-medium">
                    Train with exact timing from world-championship level HYROX competitors
                  </p>
                </motion.div>
                
                <motion.div
                  className="bg-gray-900 p-8 rounded-lg border border-gray-800 transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = '#feed00'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = '#374151'}
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="text-4xl mb-4">⏱️</div>
                  <h3 className="font-black text-xl mb-3 text-white">AUDIO ALERTS</h3>
                  <p className="text-gray-400 font-medium">
                    Get notified with sound alerts when it's time to transition to the next event
                  </p>
                </motion.div>
                
                <motion.div
                  className="bg-gray-900 p-8 rounded-lg border border-gray-800 transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = '#feed00'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = '#374151'}
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="text-4xl mb-4">📱</div>
                  <h3 className="font-black text-xl mb-3 text-white">MOBILE OPTIMIZED</h3>
                  <p className="text-gray-400 font-medium">
                    Perfect for use during your workouts - works flawlessly on all devices
                  </p>
                </motion.div>
              </div>

              <motion.div
                className="mt-12 p-6 rounded-lg border"
                style={{ 
                  backgroundColor: 'rgba(254, 237, 0, 0.1)',
                  borderColor: 'rgba(254, 237, 0, 0.3)'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <p className="font-bold text-lg" style={{ color: '#feed00' }}>
                  🔥 Ready to join the race? Select an athlete above and start your training!
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}