'use client'

import { useSearchParams } from 'next/navigation'
import Container from '@/components/shared/Container'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import DriverListTable from './_components/DriverListTable'
import DriverListActionTools from './_components/DriverListActionTools'
import DriversListTableTools from './_components/DriversListTableTools'
import DriverListSelected from './_components/DriverListSelected'

export default function Page() {
    const searchParams = useSearchParams()
    const pageIndex = parseInt(searchParams.get('pageIndex') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '10')

    return (
        <>
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3>Driver Master List</h3>
                            <DriverListActionTools />
                        </div>
                        <DriversListTableTools />
                        <DriverListTable
                            driverListTotal={0} // This will be overridden by the hook
                            pageIndex={pageIndex}
                            pageSize={pageSize}
                        />
                    </div>
                </AdaptiveCard>
            </Container>
            <DriverListSelected />
        </>
    )
}