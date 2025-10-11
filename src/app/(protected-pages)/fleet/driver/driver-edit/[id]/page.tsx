'use client'

import { useParams } from 'next/navigation'
import DriverEdit from './_components/DriverEdit'
import NoUserFound from '@/assets/svg/NoUserFound'
import { useDriver } from '../../_hooks/useDriver'

export default function Page() {
    const params = useParams()
    const id = params.id as string

    const { driver: data, loading, error } = useDriver(id)

    if (loading) {
        return (
            <div className="h-full flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
                <h2 className="mt-4">Loading driver details...</h2>
            </div>
        )
    }

    if (error || !data) {
        return (
            <div className="h-full flex flex-col items-center justify-center">
                <NoUserFound height={280} width={280} />
                <h2 className="mt-4">No driver found!</h2>
                <p className="text-gray-500 mt-2">{error || 'Driver not found'}</p>
            </div>
        )
    }

    return <DriverEdit data={data} />
}
