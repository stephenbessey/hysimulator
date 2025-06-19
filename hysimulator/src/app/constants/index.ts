export const UI_CONSTANTS = {
  TIMER: {
    BEEP_VOLUME: 0.5,
    UPDATE_INTERVAL_MS: 1000,
  },
  ANIMATION: {
    SPRING_CONFIG: { stiffness: 400, damping: 17 },
    HOVER_SCALE: 1.02,
    ACTIVE_SCALE: 0.98,
  },
  BREAKPOINTS: {
    MOBILE_MAX_WIDTH: '280px',
  },
  THEME: {
    STORAGE_KEY: 'hyrox-theme',
    COLORS: {
      PRIMARY: '#feed00',
      SUCCESS: '#22c55e', 
      WARNING: '#ef4444',
      GRAY: '#6b7280',
    },
  },
} as const

export const TIMER_STATES = {
  STOPPED: 'stopped',
  RUNNING: 'running', 
  PAUSED: 'paused',
} as const

export type TimerStatus = typeof TIMER_STATES[keyof typeof TIMER_STATES]
