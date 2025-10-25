'use client'

import Button from '@/components/ui/Button'
import { TbUserPlus } from 'react-icons/tb'
import { useRouter } from 'next/navigation'

const DriverListActionTools = () => {
    const router = useRouter()

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
