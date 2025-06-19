'use client'

import { useState, useEffect, useCallback } from 'react'
import { Athlete, BackendStatus } from '../types/athlete'
import { fetchAthletes, checkBackendHealth } from '../utils/api'
import { PRO_ATHLETES } from '../data/athletes'

interface UseAthleteDataReturn {
  athletes: Athlete[]
  loading: boolean
  error: string | null
  backendStatus: BackendStatus
  refetchAthletes: () => Promise<void>
}

export function useAthleteData(): UseAthleteDataReturn {
  const [athletes, setAthletes] = useState<Athlete[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [backendStatus, setBackendStatus] = useState<BackendStatus>('loading')

  const loadAthletes = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      const isHealthy = await checkBackendHealth()
      setBackendStatus(isHealthy ? 'online' : 'offline')
      
      if (isHealthy) {
        const data = await fetchAthletes()
        setAthletes(data)
      } else {
        setAthletes(PRO_ATHLETES)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load athletes'
      setError(errorMessage)
      setAthletes(PRO_ATHLETES)
      setBackendStatus('offline')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadAthletes()
  }, [loadAthletes])

  return { 
    athletes, 
    loading, 
    error, 
    backendStatus, 
    refetchAthletes: loadAthletes 
  }
}