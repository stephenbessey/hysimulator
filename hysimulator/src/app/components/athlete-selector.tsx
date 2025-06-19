'use client'

import { motion } from 'framer-motion'
import { Users } from 'lucide-react'
import { Athlete } from '../types/athlete'
import { SectionHeader } from './ui/section-header'
import { formatTime } from '../lib/time-utils'

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

  return (
    <div className="space-y-4">
      <SectionHeader 
        icon={Users}
        title="SELECT YOUR ATHLETE"
      />
      
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
                {selectedAthlete.category === 'men' ? 'Men\'s Division' : 'Women\'s Division'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-[#feed00]">
                {formatTime(selectedAthlete.totalTime)}
              </p>
              <p className="text-sm text-gray-500">Total Time</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}