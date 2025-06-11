import { Athlete } from '../types/athlete'

export const HYROX_EVENTS = [
  { name: '1km Run', color: '#ef4444' },
  { name: '1000m SkiEerg', color: '#f97316' },
  { name: '1km Run', color: '#ef4444' },
  { name: '50m Sled Push', color: '#eab308' },
  { name: '1km Run', color: '#ef4444' },
  { name: '50m Sled Pull', color: '#22c55e' },
  { name: '1km Run', color: '#ef4444' },
  { name: '80m Burpee Broad Jumps', color: '#3b82f6' },
  { name: '1km Run', color: '#ef4444' },
  { name: '100m Rowing', color: '#8b5cf6' },
  { name: '1km Run', color: '#ef4444' },
  { name: '200m Farmers Carry', color: '#06b6d4' },
  { name: '1km Run', color: '#ef4444' },
  { name: '100m Sandbag Lunges', color: '#f59e0b' },
  { name: '1km Run', color: '#ef4444' },
  { name: '75/100 Wall Balls', color: '#10b981' },
]

export const PRO_ATHLETES: Athlete[] = [
  {
    id: 'hunter-mcintyre',
    name: 'Hunter McIntyre',
    category: 'men',
    totalTime: 3420, // 57:00
    events: [
      { name: '1km Run', duration: 180, color: '#ef4444' },
      { name: '1000m SkiEerg', duration: 195, color: '#f97316' },
      { name: '1km Run', duration: 185, color: '#ef4444' },
      { name: '50m Sled Push', duration: 75, color: '#eab308' },
      { name: '1km Run', duration: 190, color: '#ef4444' },
      { name: '50m Sled Pull', duration: 85, color: '#22c55e' },
      { name: '1km Run', duration: 188, color: '#ef4444' },
      { name: '80m Burpee Broad Jumps', duration: 210, color: '#3b82f6' },
      { name: '1km Run', duration: 192, color: '#ef4444' },
      { name: '100m Rowing', duration: 195, color: '#8b5cf6' },
      { name: '1km Run', duration: 190, color: '#ef4444' },
      { name: '200m Farmers Carry', duration: 180, color: '#06b6d4' },
      { name: '1km Run', duration: 195, color: '#ef4444' },
      { name: '100m Sandbag Lunges', duration: 240, color: '#f59e0b' },
      { name: '1km Run', duration: 200, color: '#ef4444' },
      { name: '100 Wall Balls', duration: 510, color: '#10b981' },
    ]
  },
  {
    id: 'lauren-weeks',
    name: 'Lauren Weeks',
    category: 'women',
    totalTime: 3840, // 64:00
    events: [
      { name: '1km Run', duration: 210, color: '#ef4444' },
      { name: '1000m SkiErgolor: '#f97316' },
      { name: '1km Run', duration: 215, color: '#ef4444' },
      { name: '50m Sled Push', duration: 95, color: '#eab308' },
      { name: '1km Run', duration: 220, color: '#ef4444' },
      { name: '50m Sled Pull', duration: 105, color: '#22c55e' },
      { name: '1km Run', duration: 218, color: '#ef4444' },
      { name: '80m Burpee Broad Jumps', duration: 280, color: '#3b82f6' },
      { name: '1km Run', duration: 222, color: '#ef4444' },
      { name: '100m Rowing', duration: 225, color: '#8b5cf6' },
      { name: '1km Run', duration: 220, color: '#ef4444' },
      { name: '200m Farmers Carry', duration: 210, color: '#06b6d4' },
      { name: '1km Run', duration: 225, color: '#ef4444' },
      { name: '100m Sandbag Lunges', duration: 300, color: '#f59e0b' },
      { name: '1km Run', duration: 230, color: '#ef4444' },
      { name: '75 Wall Balls', duration: 420, color: '#10b981' },
    ]
  }
]