'use client'

import { motion } from 'framer-motion'
import { Users } from 'lucide-react'
import { Athlete } from '../types/athlete'

interface AthleteSelectorProps {
  athletes: Athlete[]
  selectedAthlete: Athlete | null
  onAthleteSelect: (athlete: Athlete | null) => void
  disabled?: boolean
}

export function AthleteSelector({ 
  athletes, 
  selectedAthlete, 
  onAthleteSelect, 
  disabled = false 
}: AthleteSelectorProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const athleteId = e.target.value
    if (athleteId === '') {
      onAthleteSelect(null)
    } else {
      const athlete = athletes.find(a => a.id === athleteId)
      onAthleteSelect(athlete || null)
    }
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${String(secs).padStart(2, '0')}`
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center mb-4">
        <Users className="text-[#feed00] mr-3" size={24} />
        <h3 className="text-xl font-bold text-black dark:text-white">SELECT YOUR ATHLETE</h3>
      </div>
      
      <select
        value={selectedAthlete?.id || ''}
        onChange={handleChange}
        disabled={disabled}
        className="w-full p-3 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded text-black dark:text-white font-semibold focus:border-[#feed00] focus:outline-none disabled:opacity-50"
      >
        <option value="">Choose an athlete...</option>
        <optgroup label="🥇 MEN'S DIVISION">
          {athletes.filter(a => a.category === 'men').map(athlete => (
            <option key={athlete.id} value={athlete.id}>
              {athlete.name} - {formatTime(athlete.totalTime)} total
            </option>
          ))}
        </optgroup>
        <optgroup label="🥇 WOMEN'S DIVISION">
          {athletes.filter(a => a.category === 'women').map(athlete => (
            <option key={athlete.id} value={athlete.id}>
              {athlete.name} - {formatTime(athlete.totalTime)} total
            </option>
          ))}
        </optgroup>
      </select>

      {selectedAthlete && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-[#feed00]/10 border border-[#feed00]/30 rounded"
        >
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-black text-black dark:text-white text-lg">
                {selectedAthlete.name.toUpperCase()}
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                {selectedAthlete.category === 'men' ? 'Men\'s' : 'Women\'s'} Division
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black text-[#feed00]">
                {formatTime(selectedAthlete.totalTime)}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 font-semibold">
                TOTAL TIME
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}