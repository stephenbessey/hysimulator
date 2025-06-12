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
    <main className="min-h-screen bg-gradient-to-br from-hyrox-gray-light via-white to-hyrox-gray-light dark:from-hyrox-black dark:via-hyrox-gray-dark dark:to-hyrox-black">
      <div className="container mx-auto max-w-6xl px-4 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-black text-hyrox-black dark:text-white tracking-tight">
              <span className="hyrox-text-gradient">HYROX</span>
            </h1>
            <p className="text-lg md:text-xl font-semibold text-hyrox-gray-medium dark:text-hyrox-gray-light mt-1">
              SIMULATOR
            </p>
          </motion.div>
          <ThemeToggle />
        </div>

        {/* Athlete Selection */}
        <motion.div
          className="athletic-card rounded-xl shadow-lg p-6 mb-8 border border-hyrox-orange/20"
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
            className="athletic-card rounded-xl shadow-2xl p-8 mb-8 border-2 border-hyrox-orange/30"
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
            className="athletic-card rounded-xl shadow-lg p-6 mb-8"
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
            className="athletic-card rounded-xl shadow-lg p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="mb-6">
              <div className="flex justify-between items-center text-sm font-semibold text-hyrox-gray-medium dark:text-hyrox-gray-light mb-3">
                <span>RACE PROGRESS</span>
                <span className="bg-hyrox-orange text-white px-3 py-1 rounded-full text-xs font-bold">
                  {timerState.currentEventIndex + 1} / {selectedAthlete.events.length}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-hyrox-gray-dark rounded-full h-3 overflow-hidden">
                <motion.div
                  className="hyrox-gradient h-3 rounded-full shadow-inner"
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
                  className={`p-3 rounded-lg text-xs font-bold transition-all duration-300 ${
                    index === timerState.currentEventIndex
                      ? 'event-card-active'
                      : index < timerState.currentEventIndex
                      ? 'event-card-completed'
                      : 'event-card-upcoming'
                  }`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <div
                      className="w-3 h-3 rounded-full border-2 border-current"
                      style={{
                        backgroundColor: index <= timerState.currentEventIndex ? 'currentColor' : 'transparent'
                      }}
                    />
                    <span className="text-[10px] font-black">#{index + 1}</span>
                  </div>
                  <div className="text-[10px] font-bold leading-tight mb-1">
                    {event.name.toUpperCase()}
                  </div>
                  <div className="text-[9px] opacity-80 font-semibold">
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
            className="athletic-card rounded-xl shadow-lg p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black text-hyrox-black dark:text-white mb-4">
                TRAIN LIKE A <span className="hyrox-text-gradient">PRO</span>
              </h2>
              <p className="text-lg text-hyrox-gray-medium dark:text-hyrox-gray-light font-medium mb-8 leading-relaxed">
                Experience the exact timing and intensity of world-class HYROX athletes. 
                Select a professional athlete above and follow their precise event splits 
                to elevate your training to the next level.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  className="bg-gradient-to-br from-hyrox-orange/10 to-hyrox-orange/5 dark:from-hyrox-orange/20 dark:to-hyrox-orange/10 p-6 rounded-xl border border-hyrox-orange/20"
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="text-3xl mb-3">🏃‍♂️</div>
                  <h3 className="font-black text-lg mb-2 text-hyrox-black dark:text-white">PRO ATHLETE TIMES</h3>
                  <p className="text-sm text-hyrox-gray-medium dark:text-hyrox-gray-light font-medium">
                    Train with exact timing from world-championship level HYROX competitors
                  </p>
                </motion.div>
                
                <motion.div
                  className="bg-gradient-to-br from-hyrox-orange/10 to-hyrox-orange/5 dark:from-hyrox-orange/20 dark:to-hyrox-orange/10 p-6 rounded-xl border border-hyrox-orange/20"
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="text-3xl mb-3">⏱️</div>
                  <h3 className="font-black text-lg mb-2 text-hyrox-black dark:text-white">AUDIO ALERTS</h3>
                  <p className="text-sm text-hyrox-gray-medium dark:text-hyrox-gray-light font-medium">
                    Get notified with sound alerts when it's time to transition to the next event
                  </p>
                </motion.div>
                
                <motion.div
                  className="bg-gradient-to-br from-hyrox-orange/10 to-hyrox-orange/5 dark:from-hyrox-orange/20 dark:to-hyrox-orange/10 p-6 rounded-xl border border-hyrox-orange/20"
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="text-3xl mb-3">📱</div>
                  <h3 className="font-black text-lg mb-2 text-hyrox-black dark:text-white">MOBILE OPTIMIZED</h3>
                  <p className="text-sm text-hyrox-gray-medium dark:text-hyrox-gray-light font-medium">
                    Perfect for use during your workouts - works flawlessly on all devices
                  </p>
                </motion.div>
              </div>

              <motion.div
                className="mt-8 p-4 bg-hyrox-orange/5 dark:bg-hyrox-orange/10 rounded-lg border border-hyrox-orange/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <p className="text-sm font-semibold text-hyrox-orange">
                  🔥 Ready to join the #HYSOCIETY? Select an athlete and start your training!
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  )
}