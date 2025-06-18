export interface Event {
  name: string
  duration: number
  color: string
}

export interface Athlete {
  id: string
  name: string
  category: 'men' | 'women'
  totalTime: number
  events: Event[]
  lastUpdated?: string
  ranking?: number
  year?: number
  location?: string
}

export interface AthleteStats {
  totalAthletes: number
  menCount: number
  womenCount: number
  averageTime: number
  fastestTime: number
  slowestTime: number
  lastUpdate: string
}

export interface EventStats {
  name: string
  count: number
  average: number
  fastest: number
  slowest: number
}

export interface LeaderboardEntry extends Athlete {
  position: number
}

export interface WorkoutSession {
  id: string
  athleteId: string
  userId: string
  startTime: string
  endTime?: string
  currentEventIndex: number
  timeRemaining: number
  totalElapsed: number
  isCompleted: boolean
  isPaused: boolean
}

export interface AthleteFilters {
  category?: 'all' | 'men' | 'women'
  year?: number
  limit?: number
  sortBy?: 'name' | 'totalTime' | 'ranking' | 'lastUpdated'
  sortOrder?: 'asc' | 'desc'
}

export type DataFreshness = 'fresh' | 'stale' | 'unknown'

export interface DataFreshnessInfo {
  status: DataFreshness
  message: string
  color: string
  lastUpdated?: string
}

export interface TimerState {
  isRunning: boolean
  isPaused: boolean
  currentEventIndex: number
  timeRemaining: number
  totalElapsed: number
}