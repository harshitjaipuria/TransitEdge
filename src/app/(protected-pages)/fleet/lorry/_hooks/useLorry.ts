'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Lorry } from '../types'

interface UseLorryReturn {
    lorry: Lorry | null
    loading: boolean
    error: string | null
    refetch: () => void
}

export const useLorry = (id: string): UseLorryReturn => {
    const [lorry, setLorry] = useState<Lorry | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchLorry = useCallback(async () => {
        if (!id) {
            setError('Lorry ID is required')
            setLoading(false)
            return
        }

        try {
            setLoading(true)
            setError(null)

            const response = await fetch(`/api/lorry/${id}`)
            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.message || 'Failed to fetch lorry')
            }

            setLorry(result.data)
        } catch (err) {
            console.error('Error fetching lorry:', err)
            setError(err instanceof Error ? err.message : 'Failed to fetch lorry')
            setLorry(null)
        } finally {
            setLoading(false)
        }
    }, [id])

    useEffect(() => {
        fetchLorry()
    }, [id, fetchLorry])

    return {
        lorry,
        loading,
        error,
        refetch: fetchLorry,
    }
}


