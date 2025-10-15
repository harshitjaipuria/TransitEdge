'use client'

import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import { TbPlus } from 'react-icons/tb'

const LorryListActionTools = () => {
    const router = useRouter()

    const handleAddNew = () => {
        router.push('/fleet/lorry/lorry-create')
    }

    return (
        <div className="flex items-center gap-2">
            <Button icon={<TbPlus />} variant="solid" onClick={handleAddNew}>
                Add New Lorry
            </Button>
        </div>
    )
}

export default LorryListActionTools


