'use client'

import { useStationListStore } from '../_store/stationListStore'
import Button from '@/components/ui/Button'
import { TbTrash, TbEdit } from 'react-icons/tb'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'

const StationListSelected = () => {
    const selectedStation = useStationListStore((state) => state.selectedStation)
    const clearSelectedStation = useStationListStore((state) => state.clearSelectedStation)

    if (selectedStation.length === 0) {
        return null
    }

    const handleBulkEdit = () => {
        // TODO: Implement bulk edit functionality
        toast.push(
            <Notification type="info">Bulk edit functionality coming soon</Notification>,
            { placement: 'top-center' }
        )
    }

    const handleBulkDelete = () => {
        // TODO: Implement bulk delete functionality
        toast.push(
            <Notification type="info">Bulk delete functionality coming soon</Notification>,
            { placement: 'top-center' }
        )
        clearSelectedStation()
    }

    return (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        {selectedStation.length} station{selectedStation.length > 1 ? 's' : ''} selected
                    </span>
                    <div className="flex gap-2">
                        <Button
                            size="sm"
                            variant="plain"
                            icon={<TbEdit />}
                            onClick={handleBulkEdit}
                        >
                            Edit
                        </Button>
                        <Button
                            size="sm"
                            variant="plain"
                            icon={<TbTrash />}
                            onClick={handleBulkDelete}
                        >
                            Delete
                        </Button>
                        <Button
                            size="sm"
                            variant="plain"
                            onClick={clearSelectedStation}
                        >
                            Clear
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StationListSelected

