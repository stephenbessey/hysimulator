export interface HyroxEvent {
  readonly name: string
  readonly duration: number // in seconds
  readonly color: string
}

export interface Athlete {
  readonly id: string
  readonly name: string
  readonly category: AthleteCategory
  readonly totalTime: number
  readonly events: readonly HyroxEvent[]
}

export type AthleteCategory = 'men' | 'women'
export type BackendStatus = 'loading' | 'online' | 'offline'

export interface TimerState {
  readonly isRunning: boolean
  readonly isPaused: boolean
  readonly currentEventIndex: number
  readonly timeRemaining: number
  readonly totalElapsed: number
}

export interface TimerDisplayProps {
  athlete: Athlete
  timerState: TimerState
  currentEvent: {
    readonly name: string
    readonly duration: number
    readonly color: string
  } | null
}