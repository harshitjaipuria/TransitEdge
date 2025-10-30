"use client"

import { useSearchParams } from 'next/navigation'
import Container from '@/components/shared/Container'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import ConsignorListTable from './_components/ConsignorListTable'
import ConsignorListActionTools from './_components/ConsignorListActionTools'
import ConsignorsListTableTools from './_components/ConsignorsListTableTools'
import ConsignorListSelected from './_components/ConsignorListSelected'

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
                            <h3>Consignor Master List</h3>
                            <ConsignorListActionTools />
                        </div>
                        <ConsignorsListTableTools />
                        <ConsignorListTable
                            pageIndex={pageIndex}
                            pageSize={pageSize}
                        />
                    </div>
                </AdaptiveCard>
            </Container>
            <ConsignorListSelected />
        </>
    )
}
