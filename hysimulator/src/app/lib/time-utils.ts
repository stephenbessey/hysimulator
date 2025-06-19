export const formatTime = (seconds: number): string => {
  const mins = Math.floor(Math.abs(seconds) / 60)
  const secs = Math.abs(seconds) % 60
  const sign = seconds < 0 ? '-' : ''
  return `${sign}${mins}:${String(secs).padStart(2, '0')}`
}

export const formatDisplayTime = (seconds: number): string => {
  const hours = Math.floor(Math.abs(seconds) / 3600)
  const mins = Math.floor((Math.abs(seconds) % 3600) / 60)
  const secs = Math.abs(seconds) % 60
  const sign = seconds < 0 ? '-' : ''
  
  if (hours > 0) {
    return `${sign}${hours}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }
  return `${sign}${mins}:${String(secs).padStart(2, '0')}`
}