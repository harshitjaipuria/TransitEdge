'use client'

import { useState, useEffect } from 'react'
import type { Lorry } from '../types'

interface UseLorriesParams {
    page?: number
    limit?: number
    search?: string
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
}

interface UseLorriesReturn {
    lorries: Lorry[]
    total: number
    loading: boolean
    error: string | null
    refetch: () => void
}

export const useLorries = (params: UseLorriesParams = {}): UseLorriesReturn => {
    const [lorries, setLorries] = useState<Lorry[]>([])
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

    const fetchLorries = async () => {
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

            const response = await fetch(`/api/lorry/list?${queryParams}`)
            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.message || 'Failed to fetch lorries')
            }

            setLorries(result.data.list)
            setTotal(result.data.total)
        } catch (err) {
            console.error('Error fetching lorries:', err)
            setError(err instanceof Error ? err.message : 'Failed to fetch lorries')
            setLorries([])
            setTotal(0)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchLorries()
    }, [page, limit, search, sortBy, sortOrder])

    return {
        lorries,
        total,
        loading,
        error,
        refetch: fetchLorries,
    }
}


