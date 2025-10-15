'use client'

import { useSearchParams } from 'next/navigation'
import Container from '@/components/shared/Container'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import BrokerListTable from './_components/BrokerListTable'
import BrokerListActionTools from './_components/BrokerListActionTools'
import BrokersListTableTools from './_components/BrokersListTableTools'
import BrokerListSelected from './_components/BrokerListSelected'

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
                            <h3>Broker Master List</h3>
                            <BrokerListActionTools />
                        </div>
                        <BrokersListTableTools />
                        <BrokerListTable
                            pageIndex={pageIndex}
                            pageSize={pageSize}
                        />
                    </div>
                </AdaptiveCard>
            </Container>
            <BrokerListSelected />
        </>
    )
}