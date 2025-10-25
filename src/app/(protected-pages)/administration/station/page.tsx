'use client'

import { useSearchParams } from 'next/navigation'
import Container from '@/components/shared/Container'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import StationListTable from './_components/StationListTable'
import StationListActionTools from './_components/StationListActionTools'
import StationsListTableTools from './_components/StationsListTableTools'
import StationListSelected from './_components/StationListSelected'

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
                            <h3>Station Master List</h3>
                            <StationListActionTools />
                        </div>
                        <StationsListTableTools />
                        <StationListTable
                            stationListTotal={0} // This will be overridden by the hook
                            pageIndex={pageIndex}
                            pageSize={pageSize}
                        />
                    </div>
                </AdaptiveCard>
            </Container>
            <StationListSelected />
        </>
    )
}
