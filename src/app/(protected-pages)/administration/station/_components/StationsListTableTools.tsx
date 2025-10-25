'use client'

import { useState } from 'react'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import { HiSearch } from 'react-icons/hi'
import useAppendQueryParams from '@/utils/hooks/useAppendQueryParams'

const StationsListTableTools = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const { onAppendQueryParams } = useAppendQueryParams()

    const handleSearch = (value: string) => {
        setSearchTerm(value)
        onAppendQueryParams({
            search: value,
            pageIndex: '1',
        })
    }

    const pageSizeOptions = [
        { label: '10 per page', value: 10 },
        { label: '25 per page', value: 25 },
        { label: '50 per page', value: 50 },
        { label: '100 per page', value: 100 },
    ]

    return (
        <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
                <div className="relative">
                    <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                        placeholder="Search stations..."
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>
            <div className="flex gap-2">
                <Select
                    options={pageSizeOptions}
                    placeholder="Page size"
                    className="w-40"
                    onChange={(option) => {
                        onAppendQueryParams({
                            pageSize: String(option.value),
                            pageIndex: '1',
                        })
                    }}
                />
            </div>
        </div>
    )
}

export default StationsListTableTools

