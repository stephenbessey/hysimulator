'use client'

import { motion } from 'framer-motion'
import { Users } from 'lucide-react'
import { Athlete } from '../types/athlete'
import { Select } from './ui/select'

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
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-hyrox-orange/10 rounded-lg">
          <Users className="w-5 h-5 text-hyrox-orange" />
        </div>
        <div>
          <label htmlFor="athlete-select" className="block text-lg font-black text-hyrox-black dark:text-white">
            SELECT YOUR ATHLETE
          </label>
          <p className="text-sm text-hyrox-gray-medium dark:text-hyrox-gray-light">
            Choose a professional athlete to train with their exact times
          </p>
        </div>
      </div>
      
      <Select
        id="athlete-select"
        value={selectedAthlete?.id || ''}
        onChange={handleChange}
        disabled={disabled}
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
      </Select>

      {selectedAthlete && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-hyrox-orange/5 dark:bg-hyrox-orange/10 rounded-lg border border-hyrox-orange/20"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-black text-hyrox-black dark:text-white">
                {selectedAthlete.name.toUpperCase()}
              </h3>
              <p className="text-sm text-hyrox-gray-medium dark:text-hyrox-gray-light">
                {selectedAthlete.category === 'men' ? 'Men\'s' : 'Women\'s'} Division
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black text-hyrox-orange">
                {formatTime(selectedAthlete.totalTime)}
              </div>
              <div className="text-xs text-hyrox-gray-medium dark:text-hyrox-gray-light font-semibold">
                TOTAL TIME
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
export default AthleteSelector