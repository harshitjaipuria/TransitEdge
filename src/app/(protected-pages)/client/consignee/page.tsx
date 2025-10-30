"use client"

import { useSearchParams } from 'next/navigation'
import Container from '@/components/shared/Container'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import ConsigneeListTable from '../_components/ConsigneeListTable'
import ConsigneeListActionTools from '../_components/ConsigneeListActionTools'
import ConsigneesListTableTools from '../_components/ConsigneesListTableTools'
import ConsigneeListSelected from '../_components/ConsigneeListSelected'

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
                            <h3>Consignee Master List</h3>
                            <ConsigneeListActionTools />
                        </div>
                        <ConsigneesListTableTools />
                        <ConsigneeListTable
                            pageIndex={pageIndex}
                            pageSize={pageSize}
                        />
                    </div>
                </AdaptiveCard>
            </Container>
            <ConsigneeListSelected />
        </>
    )
}
