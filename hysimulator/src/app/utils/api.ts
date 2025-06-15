import { Athlete } from '../types/athlete'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://hysimulator-backend.onrender.com'


function transformAthleteData(backendAthlete: any): Athlete {
  return {
    id: backendAthlete.id.toString(),
    name: backendAthlete.name,
    category: backendAthlete.category,
    totalTime: backendAthlete.total_time,
    events: backendAthlete.events.map((event: any) => ({
      name: event.name,
      duration: event.duration,
      color: event.color
    }))
  }
}

export async function fetchAthletes(): Promise<Athlete[]> {
  try {
    console.log('Fetching athletes from:', `${API_BASE_URL}/api/athletes`)
    
    const response = await fetch(`${API_BASE_URL}/api/athletes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const backendAthletes = await response.json()
    console.log('Raw backend response:', backendAthletes)
    
    const athletes = backendAthletes.map(transformAthleteData)
    console.log('Transformed athletes:', athletes)
    
    return athletes
  } catch (error) {
    console.error('Error fetching athletes:', error)
    throw new Error('Failed to fetch athletes from backend')
  }
}

export async function fetchAthlete(id: string): Promise<Athlete> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/athletes/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const backendAthlete = await response.json()
    return transformAthleteData(backendAthlete)
  } catch (error) {
    console.error('Error fetching athlete:', error)
    throw new Error('Failed to fetch athlete from backend')
  }
}

export async function checkBackendHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`)
    return response.ok
  } catch (error) {
    console.error('Backend health check failed:', error)
    return false
  }
}