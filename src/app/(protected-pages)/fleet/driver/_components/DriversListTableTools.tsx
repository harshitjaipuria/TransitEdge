'use client'

import DriverListSearch from './DriverListSearch'
import DriverTableFilter from './DriverListTableFilter'
import useAppendQueryParams from '@/utils/hooks/useAppendQueryParams'

const DriversListTableTools = () => {
    const { onAppendQueryParams } = useAppendQueryParams()

    const handleInputChange = (query: string) => {
        onAppendQueryParams({
            query,
        })
    }

    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <DriverListSearch onInputChange={handleInputChange} />
            <DriverTableFilter />
        </div>
    )
}

export default DriversListTableTools
