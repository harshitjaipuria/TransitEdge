'use client'

import { useParams } from 'next/navigation'
import Container from '@/components/shared/Container'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import BrokerEdit from './_components/BrokerEdit'

export default function Page() {
    const params = useParams()
    const brokerId = params.id as string

    return (
        <Container>
            <AdaptiveCard>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <h3>Edit Broker</h3>
                    </div>
                    <BrokerEdit brokerId={brokerId} />
                </div>
            </AdaptiveCard>
        </Container>
    )
}

