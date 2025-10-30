import { useConsigneeListStore } from '../_store/consigneeListStore'
import Button from '@/components/ui/Button'
import { TbTrash } from 'react-icons/tb'

const ConsigneeListSelected = () => {
    const selectedConsignee = useConsigneeListStore((state) => state.selectedConsignee)
    const setSelectAllConsignee = useConsigneeListStore((state) => state.setSelectAllConsignee)

    const handleDeleteSelected = () => {
        // TODO: Implement bulk delete functionality
        console.log('Delete selected consignees:', selectedConsignee)
    }

    const handleClearSelection = () => {
        setSelectAllConsignee([])
    }

    if (selectedConsignee.length === 0) {
        return null
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 shadow-lg z-50">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        {selectedConsignee.length} consignee(s) selected
                    </span>
                    <Button
                        size="sm"
                        variant="plain"
                        onClick={handleClearSelection}
                    >
                        Clear Selection
                    </Button>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        size="sm"
                        variant="solid"
                        color="red"
                        icon={<TbTrash />}
                        onClick={handleDeleteSelected}
                    >
                        Delete Selected
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ConsigneeListSelected
