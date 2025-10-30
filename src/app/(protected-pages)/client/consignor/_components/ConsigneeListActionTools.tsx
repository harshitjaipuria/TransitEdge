import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import { TbPlus } from 'react-icons/tb'

const ConsigneeListActionTools = () => {
    const router = useRouter()

    const handleAddNew = () => {
        router.push('/client/consignee/consignee-create')
    }

    return (
        <div className="flex items-center gap-2">
            <Button
                icon={<TbPlus />}
                variant="solid"
                onClick={handleAddNew}
            >
                Add New Consignee
            </Button>
        </div>
    )
}

export default ConsigneeListActionTools
