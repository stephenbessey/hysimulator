export interface HyroxEvent {
  name: string
  duration: number // in seconds
  color: string
}

export interface Athlete {
  id: string
  name: string
  category: 'men' | 'women'
  totalTime: number
  events: HyroxEvent[]
}

export interface TimerState {
  isRunning: boolean
  isPaused: boolean
  currentEventIndex: number
  timeRemaining: number
  totalElapsed: number
}
