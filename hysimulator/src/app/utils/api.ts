import { Athlete } from '../types/athlete'
import { ENV } from '../config/env'

function transformAthleteData(backendAthlete: any): Athlete {
  const categoryStr = backendAthlete.category?.toLowerCase() || ''
  const category: 'men' | 'women' = categoryStr.includes('women') || categoryStr.includes('female') 
    ? 'women' 
    : 'men'

  return {
    id: backendAthlete.id.toString(),
    name: backendAthlete.name,
    category,
    totalTime: backendAthlete.total_time,
    events: backendAthlete.events.map((event: any) => ({
      name: event.name,
      duration: event.duration,
      color: event.color || '#feed00'
    }))
  }
}

export async function fetchAthletes(): Promise<Athlete[]> {
  try {
    console.log('Fetching athletes from:', `${ENV.API_URL}/api/athletes`)
    
    const response = await fetch(`${ENV.API_URL}/api/athletes`, {
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
    const response = await fetch(`${ENV.API_URL}/api/athletes/${id}`, {
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
    const response = await fetch(`${ENV.API_URL}/health`, {
      method: 'GET',
      signal: AbortSignal.timeout(5000)
    })
    return response.ok
  } catch (error) {
    console.error('Backend health check failed:', error)
    return false
  }
}