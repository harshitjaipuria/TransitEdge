import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import { TbPlus } from 'react-icons/tb'

const ConsignorListActionTools = () => {
    const router = useRouter()

    const handleAddNew = () => {
        router.push('/client/consignor/consignor-create')
    }

    return (
        <div className="flex items-center gap-2">
            <Button
                icon={<TbPlus />}
                variant="solid"
                onClick={handleAddNew}
            >
                Add New Consignor
            </Button>
        </div>
    )
}

export default ConsignorListActionTools
