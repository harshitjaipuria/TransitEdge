import { useState, useEffect, useCallback } from 'react'
import type { Customer } from '../types'

interface UseOwnersParams {
    page?: number
    limit?: number
    search?: string
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
}

interface UseOwnersReturn {
    owners: Customer[]
    total: number
    loading: boolean
    error: string | null
    refetch: () => void
}

export const useOwners = (params: UseOwnersParams = {}): UseOwnersReturn => {
    const [owners, setOwners] = useState<Customer[]>([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const {
        page = 1,
        limit = 10,
        search = '',
        sortBy = 'sn_no',
        sortOrder = 'desc',
    } = params

    const fetchOwners = useCallback(async () => {
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

            const response = await fetch(`/api/owner/list?${queryParams}`)
            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.message || 'Failed to fetch owners')
            }

            setOwners(result.data.list)
            setTotal(result.data.total)
        } catch (err) {
            console.error('Error fetching owners:', err)
            setError(err instanceof Error ? err.message : 'Failed to fetch owners')
            setOwners([])
            setTotal(0)
        } finally {
            setLoading(false)
        }
    }, [page, limit, search, sortBy, sortOrder])

    useEffect(() => {
        fetchOwners()
    }, [page, limit, search, sortBy, sortOrder, fetchOwners])

    return {
        owners,
        total,
        loading,
        error,
        refetch: fetchOwners,
    }
}
