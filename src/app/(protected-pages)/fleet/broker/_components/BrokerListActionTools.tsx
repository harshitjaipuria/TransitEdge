'use client'

import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import { TbPlus } from 'react-icons/tb'

const BrokerListActionTools = () => {
    const router = useRouter()

    const handleAddNew = () => {
        router.push('/fleet/broker/broker-create')
    }

    return (
        <div className="flex items-center gap-2">
            <Button
                icon={<TbPlus />}
                variant="solid"
                onClick={handleAddNew}
            >
                Add New Broker
            </Button>
        </div>
    )
}

export default BrokerListActionTools

