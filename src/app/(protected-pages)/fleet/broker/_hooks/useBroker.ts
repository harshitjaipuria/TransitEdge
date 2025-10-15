'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Broker } from '../types'

interface UseBrokerParams {
    id: string
}

interface UseBrokerReturn {
    broker: Broker | null
    loading: boolean
    error: string | null
    refetch: () => void
}

export const useBroker = ({ id }: UseBrokerParams): UseBrokerReturn => {
    const [broker, setBroker] = useState<Broker | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchBroker = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)

            const response = await fetch(`/api/broker/${id}`)
            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.message || 'Failed to fetch broker')
            }

            setBroker(result.data)
        } catch (err) {
            console.error('Error fetching broker:', err)
            setError(err instanceof Error ? err.message : 'Failed to fetch broker')
            setBroker(null)
        } finally {
            setLoading(false)
        }
    }, [id])

    useEffect(() => {
        if (id) {
            fetchBroker()
        }
    }, [id, fetchBroker])

    return {
        broker,
        loading,
        error,
        refetch: fetchBroker,
    }
}
