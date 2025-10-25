'use client'

import Button from '@/components/ui/Button'
import { TbBuilding } from 'react-icons/tb'
import { useRouter } from 'next/navigation'

const StationListActionTools = () => {
    const router = useRouter()

    return (
        <div className="flex flex-col md:flex-row gap-3">
            <Button
                variant="solid"
                icon={<TbBuilding className="text-xl" />}
                onClick={() =>
                    router.push('/administration/station/station-create')
                }
            >
                Add new
            </Button>
        </div>
    )
}

export default StationListActionTools
