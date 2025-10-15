'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Broker } from '../types'

interface UseBrokersParams {
    page?: number
    limit?: number
    search?: string
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
}

interface UseBrokersReturn {
    brokers: Broker[]
    total: number
    loading: boolean
    error: string | null
    refetch: () => void
}

export const useBrokers = (params: UseBrokersParams = {}): UseBrokersReturn => {
    const [brokers, setBrokers] = useState<Broker[]>([])
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

    const fetchBrokers = useCallback(async () => {
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

            const response = await fetch(`/api/broker/list?${queryParams}`)
            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.message || 'Failed to fetch brokers')
            }

            setBrokers(result.data.list)
            setTotal(result.data.total)
        } catch (err) {
            console.error('Error fetching brokers:', err)
            setError(err instanceof Error ? err.message : 'Failed to fetch brokers')
            setBrokers([])
            setTotal(0)
        } finally {
            setLoading(false)
        }
    }, [page, limit, search, sortBy, sortOrder])

    useEffect(() => {
        fetchBrokers()
    }, [page, limit, search, sortBy, sortOrder, fetchBrokers])

    return {
        brokers,
        total,
        loading,
        error,
        refetch: fetchBrokers,
    }
}
