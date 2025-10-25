'use client'

import { useState, useEffect } from 'react'
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

    const fetchStations = async () => {
        try {
            setLoading(true)
            setError(null)

            // TODO: Replace with actual API call
            // const response = await fetch(
            //     `/api/station/list?page=${page}&limit=${limit}&search=${search}&sortBy=${sortBy}&sortOrder=${sortOrder}`
            // )
            // const data = await response.json()

            // Mock data for now
            const mockStations: Station[] = [
                {
                    id: 1,
                    station_code: 'STN001',
                    station_name: 'Main Station',
                    address: '123 Main Street',
                    city: 'Mumbai',
                    zip_code: 400001,
                    country: 'India',
                    display_name: 'Main Station Mumbai',
                    telephone: 9876543210,
                    email_id: 'main@station.com',
                    contact_person: 'John Doe',
                    activity_1: 1,
                    activity_2: 0,
                    activity_3: 1,
                    activity_4: 0,
                    activity_5: 1,
                    activity_6: 0,
                    created_at: '2024-01-01T00:00:00Z'
                },
                {
                    id: 2,
                    station_code: 'STN002',
                    station_name: 'Central Station',
                    address: '456 Central Avenue',
                    city: 'Delhi',
                    zip_code: 110001,
                    country: 'India',
                    display_name: 'Central Station Delhi',
                    telephone: 9876543211,
                    email_id: 'central@station.com',
                    contact_person: 'Jane Smith',
                    activity_1: 1,
                    activity_2: 1,
                    activity_3: 0,
                    activity_4: 1,
                    activity_5: 0,
                    activity_6: 1,
                    created_at: '2024-01-02T00:00:00Z'
                }
            ]

            console.log('useStations - Setting stations:', mockStations)
            setStations(mockStations)
            setTotal(mockStations.length)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch stations')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchStations()
    }, [page, limit, search, sortBy, sortOrder])

    return {
        stations,
        total,
        loading,
        error,
        refetch: fetchStations,
    }
}

