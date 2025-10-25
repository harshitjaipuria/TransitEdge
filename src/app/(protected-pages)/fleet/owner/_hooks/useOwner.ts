import { useState, useEffect, useCallback } from 'react'
import type { Customer } from '../types'

interface UseOwnerReturn {
    owner: Customer | null
    loading: boolean
    error: string | null
    refetch: () => void
}

export const useOwner = (id: string): UseOwnerReturn => {
    const [owner, setOwner] = useState<Customer | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchOwner = useCallback(async () => {
        if (!id) {
            setError('Owner ID is required')
            setLoading(false)
            return
        }

        try {
            setLoading(true)
            setError(null)

            const response = await fetch(`/api/owner/${id}`)
            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.message || 'Failed to fetch owner')
            }

            setOwner(result.data)
        } catch (err) {
            console.error('Error fetching owner:', err)
            setError(err instanceof Error ? err.message : 'Failed to fetch owner')
            setOwner(null)
        } finally {
            setLoading(false)
        }
    }, [id])

    useEffect(() => {
        fetchOwner()
    }, [id, fetchOwner])

    return {
        owner,
        loading,
        error,
        refetch: fetchOwner,
    }
}
