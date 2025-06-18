import { Athlete } from '../types/athlete'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:10000'

export interface BackendStatus {
  status: string;
  timestamp: string;
  message: string;
  version: string;
  athletes_count: number;
  scraping_enabled?: boolean;
}

export interface ScrapeStatus {
  enabled: boolean;
  config: {
    baseUrls: string[];
    maxAthletes: number;
    delayMs: number;
    enabled: boolean;
  };
  last_update: string;
  total_athletes: number;
}

export interface ScrapeResponse {
  success: boolean;
  message: string;
  athletes_count?: number;
  timestamp?: string;
  error?: string;
}

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
    })),
    lastUpdated: backendAthlete.lastUpdated,
    ranking: backendAthlete.ranking,
    year: backendAthlete.year,
    location: backendAthlete.location
  }
}

export async function fetchAthletes(options?: {
  category?: string;
  year?: number;
  limit?: number;
  bustCache?: boolean;
}): Promise<Athlete[]> {
  try {
    let url = `${API_BASE_URL}/api/athletes`
    const params = new URLSearchParams()
    
    if (options?.category) params.append('category', options.category)
    if (options?.year) params.append('year', options.year.toString())
    if (options?.limit) params.append('limit', options.limit.toString())
    
    if (options?.bustCache !== false) {
      params.append('_t', Date.now().toString())
    }
    
    if (params.toString()) {
      url += `?${params.toString()}`
    }
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      },
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const backendAthletes = await response.json()
    const athletes = backendAthletes.map(transformAthleteData)
    return athletes
  } catch (error) {
    console.error('Error fetching athletes:', error)
    throw new Error('Failed to fetch athletes from backend')
  }
}

export async function refreshAthleteData(): Promise<Athlete[]> {
  console.log('🔄 Refreshing athlete data...')
  return await fetchAthletes({ bustCache: true })
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
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      signal: AbortSignal.timeout(5000)
    })
    return response.ok
  } catch (error) {
    console.error('Backend health check failed:', error)
    return false
  }
}

export async function fetchBackendStatus(): Promise<BackendStatus> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching backend status:', error)
    throw new Error('Failed to fetch backend status')
  }
}

export async function fetchLeaderboard(options?: {
  category?: string;
  limit?: number;
}): Promise<Athlete[]> {
  try {
    let url = `${API_BASE_URL}/api/leaderboard`
    const params = new URLSearchParams()
    
    if (options?.category) params.append('category', options.category)
    if (options?.limit) params.append('limit', options.limit.toString())
    
    if (params.toString()) {
      url += `?${params.toString()}`
    }
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const leaderboard = await response.json()
    return leaderboard.map(transformAthleteData)
  } catch (error) {
    console.error('Error fetching leaderboard:', error)
    throw new Error('Failed to fetch leaderboard from backend')
  }
}

export async function triggerManualScrape(): Promise<ScrapeResponse> {
  try {
    console.log('Triggering manual scrape...')
    
    const response = await fetch(`${API_BASE_URL}/api/scrape`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(300000)
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const result = await response.json()
    console.log('Manual scrape result:', result)
    return result
  } catch (error) {
    console.error('Error triggering manual scrape:', error)
    if (error instanceof Error && error.name === 'TimeoutError') {
      throw new Error('Scraping operation timed out')
    }
    throw new Error('Failed to trigger manual scrape')
  }
}

export async function getScrapeStatus(): Promise<ScrapeStatus> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/scrape/status`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching scrape status:', error)
    throw new Error('Failed to fetch scrape status')
  }
}

export async function fetchEventStats(): Promise<{
  [eventName: string]: {
    name: string;
    count: number;
    average: number;
    fastest: number;
    slowest: number;
  }
}> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/stats/events`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching event stats:', error)
    throw new Error('Failed to fetch event statistics')
  }
}

export async function saveUserSession(sessionData: {
  userId: string;
  athleteId: string;
  eventIndex: number;
  timeRemaining: number;
  totalElapsed: number;
}): Promise<{success: boolean; session: any}> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sessionData)
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error saving user session:', error)
    throw new Error('Failed to save user session')
  }
}

export async function getUserSession(userId: string): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/sessions/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching user session:', error)
    throw new Error('Failed to fetch user session')
  }
}
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export function timeToSeconds(timeStr: string): number {
  const parts = timeStr.split(':')
  if (parts.length === 2) {
    return parseInt(parts[0]) * 60 + parseInt(parts[1])
  } else if (parts.length === 3) {
    return parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2])
  }
  return 0
}

export function isDataFresh(lastUpdated: string, maxAgeHours: number = 24): boolean {
  if (!lastUpdated || lastUpdated === 'Never') return false
  
  const lastUpdate = new Date(lastUpdated)
  const now = new Date()
  const ageHours = (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60)
  
  return ageHours < maxAgeHours
}
export function getDataFreshnessIndicator(lastUpdated: string): {
  status: 'fresh' | 'stale' | 'unknown';
  message: string;
  color: string;
} {
  if (!lastUpdated || lastUpdated === 'Never') {
    return {
      status: 'unknown',
      message: 'Data age unknown',
      color: 'gray'
    }
  }
  
  const lastUpdate = new Date(lastUpdated)
  const now = new Date()
  const ageHours = (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60)
  
  if (ageHours < 1) {
    return {
      status: 'fresh',
      message: 'Updated recently',
      color: 'green'
    }
  } else if (ageHours < 24) {
    return {
      status: 'fresh',
      message: `Updated ${Math.round(ageHours)} hours ago`,
      color: 'green'
    }
  } else {
    return {
      status: 'stale',
      message: `Updated ${Math.round(ageHours / 24)} days ago`,
      color: 'yellow'
    }
  }
}