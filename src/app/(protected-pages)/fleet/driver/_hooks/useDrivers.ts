'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Driver } from '../types'

interface UseDriversParams {
    page?: number
    limit?: number
    search?: string
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
}

interface UseDriversReturn {
    drivers: Driver[]
    total: number
    loading: boolean
    error: string | null
    refetch: () => void
}

export const useDrivers = (params: UseDriversParams = {}): UseDriversReturn => {
    const [drivers, setDrivers] = useState<Driver[]>([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const {
        page = 1,
        limit = 10,
        search = '',
        sortBy = 'ID',
        sortOrder = 'desc',
    } = params

    const fetchDrivers = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)

            const queryParams = new URLSearchParams({
                page: page.toString(),
                limit: limit.toString(),
                sortBy,
                sortOrder,
            })

            if (search) {
                queryParams.append('search', search)
            }

            const response = await fetch(`/api/driver/list?${queryParams}`)
            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.message || 'Failed to fetch drivers')
            }

            setDrivers(result.data.list)
            setTotal(result.data.total)
        } catch (err) {
            console.error('Error fetching drivers:', err)
            setError(err instanceof Error ? err.message : 'Failed to fetch drivers')
            setDrivers([])
            setTotal(0)
        } finally {
            setLoading(false)
        }
    }, [page, limit, search, sortBy, sortOrder])

    useEffect(() => {
        fetchDrivers()
    }, [page, limit, search, sortBy, sortOrder, fetchDrivers])

    return {
        drivers,
        total,
        loading,
        error,
        refetch: fetchDrivers,
    }
}
