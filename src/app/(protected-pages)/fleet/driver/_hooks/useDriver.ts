'use client'

import { useState, useEffect } from 'react'
import type { Driver } from '../types'

interface UseDriverReturn {
    driver: Driver | null
    loading: boolean
    error: string | null
    refetch: () => void
}

export const useDriver = (id: string): UseDriverReturn => {
    const [driver, setDriver] = useState<Driver | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchDriver = async () => {
        if (!id) {
            setError('Driver ID is required')
            setLoading(false)
            return
        }

        try {
            setLoading(true)
            setError(null)

            const response = await fetch(`/api/driver/${id}`)
            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.message || 'Failed to fetch driver')
            }

            setDriver(result.data)
        } catch (err) {
            console.error('Error fetching driver:', err)
            setError(err instanceof Error ? err.message : 'Failed to fetch driver')
            setDriver(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchDriver()
    }, [id])

    return {
        driver,
        loading,
        error,
        refetch: fetchDriver,
    }
}
