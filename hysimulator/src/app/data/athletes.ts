import { Athlete } from '../types/athlete'

export const HYROX_EVENTS = [
  { name: '1km Run', color: '#feed00' },
  { name: '1000m SkiErgQ', color: '#feed00' },
  { name: '1km Run', color: '#feed00' },
  { name: '50m Sled Push', color: '#feed00' },
  { name: '1km Run', color: '#feed00' },
  { name: '50m Sled Pull', color: '#feed00' },
  { name: '1km Run', color: '#feed00' },
  { name: '80m Burpee Broad Jumps', color: '#feed00' },
  { name: '1km Run', color: '#feed00' },
  { name: '100m Rowing', color: '#feed00' },
  { name: '1km Run', color: '#feed00' },
  { name: '200m Farmers Carry', color: '#feed00' },
  { name: '1km Run', color: '#feed00' },
  { name: '100m Sandbag Lunges', color: '#feed00' },
  { name: '1km Run', color: '#feed00' },
  { name: '75/100 Wall Balls', color: '#feed00' },
]

export const PRO_ATHLETES: Athlete[] = [
  {
    id: 'hunter-mcintyre',
    name: 'Hunter McIntyre',
    category: 'men',
    totalTime: 3420, // 57:00
    events: [
      { name: '1km Run', duration: 180, color: '#feed00' },
      { name: '1000m SkiErgQ', duration: 195, color: '#feed00' },
      { name: '1km Run', duration: 185, color: '#feed00' },
      { name: '50m Sled Push', duration: 75, color: '#feed00' },
      { name: '1km Run', duration: 190, color: '#feed00' },
      { name: '50m Sled Pull', duration: 85, color: '#feed00' },
      { name: '1km Run', duration: 188, color: '#feed00' },
      { name: '80m Burpee Broad Jumps', duration: 210, color: '#feed00' },
      { name: '1km Run', duration: 192, color: '#feed00' },
      { name: '100m Rowing', duration: 195, color: '#feed00' },
      { name: '1km Run', duration: 190, color: '#feed00' },
      { name: '200m Farmers Carry', duration: 180, color: '#feed00' },
      { name: '1km Run', duration: 195, color: '#feed00' },
      { name: '100m Sandbag Lunges', duration: 240, color: '#feed00' },
      { name: '1km Run', duration: 200, color: '#feed00' },
      { name: '100 Wall Balls', duration: 510, color: '#feed00' },
    ]
  },
  {
    id: 'lauren-weeks',
    name: 'Lauren Weeks',
    category: 'women',
    totalTime: 3840, // 64:00
    events: [
      { name: '1km Run', duration: 210, color: '#feed00' },
      { name: '1000m SkiErgQ', duration: 195, color: '#feed00' },
      { name: '1km Run', duration: 215, color: '#feed00' },
      { name: '50m Sled Push', duration: 95, color: '#feed00' },
      { name: '1km Run', duration: 220, color: '#feed00' },
      { name: '50m Sled Pull', duration: 105, color: '#feed00' },
      { name: '1km Run', duration: 218, color: '#feed00' },
      { name: '80m Burpee Broad Jumps', duration: 280, color: '#feed00' },
      { name: '1km Run', duration: 222, color: '#feed00' },
      { name: '100m Rowing', duration: 225, color: '#feed00' },
      { name: '1km Run', duration: 220, color: '#feed00' },
      { name: '200m Farmers Carry', duration: 210, color: '#feed00' },
      { name: '1km Run', duration: 225, color: '#feed00' },
      { name: '100m Sandbag Lunges', duration: 300, color: '#feed00' },
      { name: '1km Run', duration: 230, color: '#feed00' },
      { name: '75 Wall Balls', duration: 420, color: '#feed00' },
    ]
  }
]