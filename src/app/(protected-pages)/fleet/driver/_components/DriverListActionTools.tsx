'use client'

import Button from '@/components/ui/Button'
import { TbCloudDownload, TbUserPlus } from 'react-icons/tb'
import { useRouter } from 'next/navigation'
import { useDriverListStore } from '../_store/driverListStore'
import dynamic from 'next/dynamic'

const CSVLink = dynamic(() =>
    import('react-csv').then((mod) => mod.CSVLink), {
        ssr: false,
    }
)

const DriverListActionTools = () => {
    const router = useRouter()

    const driverList = useDriverListStore((state) => state.driverList)

    return (
        <div className="flex flex-col md:flex-row gap-3">
            <Button
                variant="solid"
                icon={<TbUserPlus className="text-xl" />}
                onClick={() =>
                    router.push('/fleet/driver/driver-create')
                }
            >
                Add new
            </Button>
        </div>
    )
}

export default DriverListActionTools
