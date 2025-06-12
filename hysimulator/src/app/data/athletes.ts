import { Athlete } from '../types/athlete'

export const HYROX_EVENTS = [
  { name: '1km Run', color: '#FFFF00' },
  { name: '1000m SkiErgQ', color: '#FFFF00' },
  { name: '1km Run', color: '#FFFF00' },
  { name: '50m Sled Push', color: '#FFFF00' },
  { name: '1km Run', color: '#FFFF00' },
  { name: '50m Sled Pull', color: '#FFFF00' },
  { name: '1km Run', color: '#FFFF00' },
  { name: '80m Burpee Broad Jumps', color: '#FFFF00' },
  { name: '1km Run', color: '#FFFF00' },
  { name: '100m Rowing', color: '#FFFF00' },
  { name: '1km Run', color: '#FFFF00' },
  { name: '200m Farmers Carry', color: '#FFFF00' },
  { name: '1km Run', color: '#FFFF00' },
  { name: '100m Sandbag Lunges', color: '#FFFF00' },
  { name: '1km Run', color: '#FFFF00' },
  { name: '75/100 Wall Balls', color: '#FFFF00' },
]

export const PRO_ATHLETES: Athlete[] = [
  {
    id: 'hunter-mcintyre',
    name: 'Hunter McIntyre',
    category: 'men',
    totalTime: 3420, // 57:00
    events: [
      { name: '1km Run', duration: 180, color: '#FFFF00' },
      { name: '1000m SkiErgQ', duration: 195, color: '#FFFF00' },
      { name: '1km Run', duration: 185, color: '#FFFF00' },
      { name: '50m Sled Push', duration: 75, color: '#FFFF00' },
      { name: '1km Run', duration: 190, color: '#FFFF00' },
      { name: '50m Sled Pull', duration: 85, color: '#FFFF00' },
      { name: '1km Run', duration: 188, color: '#FFFF00' },
      { name: '80m Burpee Broad Jumps', duration: 210, color: '#FFFF00' },
      { name: '1km Run', duration: 192, color: '#FFFF00' },
      { name: '100m Rowing', duration: 195, color: '#FFFF00' },
      { name: '1km Run', duration: 190, color: '#FFFF00' },
      { name: '200m Farmers Carry', duration: 180, color: '#FFFF00' },
      { name: '1km Run', duration: 195, color: '#FFFF00' },
      { name: '100m Sandbag Lunges', duration: 240, color: '#FFFF00' },
      { name: '1km Run', duration: 200, color: '#FFFF00' },
      { name: '100 Wall Balls', duration: 510, color: '#FFFF00' },
    ]
  },
  {
    id: 'lauren-weeks',
    name: 'Lauren Weeks',
    category: 'women',
    totalTime: 3840, // 64:00
    events: [
      { name: '1km Run', duration: 210, color: '#FFFF00' },
      { name: '1000m SkiErgQ', duration: 195, color: '#FFFF00' },
      { name: '1km Run', duration: 215, color: '#FFFF00' },
      { name: '50m Sled Push', duration: 95, color: '#FFFF00' },
      { name: '1km Run', duration: 220, color: '#FFFF00' },
      { name: '50m Sled Pull', duration: 105, color: '#FFFF00' },
      { name: '1km Run', duration: 218, color: '#FFFF00' },
      { name: '80m Burpee Broad Jumps', duration: 280, color: '#FFFF00' },
      { name: '1km Run', duration: 222, color: '#FFFF00' },
      { name: '100m Rowing', duration: 225, color: '#FFFF00' },
      { name: '1km Run', duration: 220, color: '#FFFF00' },
      { name: '200m Farmers Carry', duration: 210, color: '#FFFF00' },
      { name: '1km Run', duration: 225, color: '#FFFF00' },
      { name: '100m Sandbag Lunges', duration: 300, color: '#FFFF00' },
      { name: '1km Run', duration: 230, color: '#FFFF00' },
      { name: '75 Wall Balls', duration: 420, color: '#FFFF00' },
    ]
  }
]