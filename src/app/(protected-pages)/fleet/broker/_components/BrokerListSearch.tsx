'use client'

import { useState } from 'react'
import Input from '@/components/ui/Input'
import { TbSearch } from 'react-icons/tb'
import useAppendQueryParams from '@/utils/hooks/useAppendQueryParams'

const BrokerListSearch = () => {
    const [searchValue, setSearchValue] = useState('')
    const { onAppendQueryParams } = useAppendQueryParams()

    const handleSearch = (value: string) => {
        setSearchValue(value)
        onAppendQueryParams({
            search: value,
            pageIndex: '1',
        })
    }

    return (
        <Input
            type="text"
            placeholder="Search brokers..."
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            prefix={<TbSearch />}
            className="max-w-md"
        />
    )
}

export default BrokerListSearch

