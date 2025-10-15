'use client'

import { useSearchParams } from 'next/navigation'
import Container from '@/components/shared/Container'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import LorryListTable from './_components/LorryListTable'
import LorryListActionTools from './_components/LorryListActionTools'
import LorriesListTableTools from './_components/LorriesListTableTools'
import LorryListSelected from './_components/LorryListSelected'

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
                            <h3>Lorry Master List</h3>
                            <LorryListActionTools />
                        </div>
                        <LorriesListTableTools />
                        <LorryListTable
                            pageIndex={pageIndex}
                            pageSize={pageSize}
                        />
                    </div>
                </AdaptiveCard>
            </Container>
            <LorryListSelected />
        </>
    )
}



