'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Station } from '../types'

interface UseStationsParams {
    page: number
    limit: number
    search?: string
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
}

interface UseStationsReturn {
    stations: Station[]
    total: number
    loading: boolean
    error: string | null
    refetch: () => void
}

export const useStations = ({
    page,
    limit,
    search = '',
    sortBy = 'id',
    sortOrder = 'desc',
}: UseStationsParams): UseStationsReturn => {
    const [stations, setStations] = useState<Station[]>([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchStations = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)

            const response = await fetch(
                `/api/station/list?page=${page}&limit=${limit}&search=${search}&sortBy=${sortBy}&sortOrder=${sortOrder}`
            )
            
            if (!response.ok) {
                throw new Error('Failed to fetch stations')
            }
            
            const data = await response.json()

            if (data.status === 'success') {
                setStations(data.data)
                setTotal(data.total)
            } else {
                throw new Error(data.message || 'Failed to fetch stations')
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch stations')
        } finally {
            setLoading(false)
        }
    }, [page, limit, search, sortBy, sortOrder])

    useEffect(() => {
        fetchStations()
    }, [fetchStations])

    return {
        stations,
        total,
        loading,
        error,
        refetch: fetchStations,
    }
}

