'use client'

import { useEffect } from 'react'
import { useDriverListStore } from '../_store/driverListStore'
import type { Driver } from '../types'
import type { CommonProps } from '@/@types/common'

interface DriverListProviderProps extends CommonProps {
    driverList: Driver[]
}

const DriverListProvider = ({
    driverList,
    children,
}: DriverListProviderProps) => {
    const setDriverList = useDriverListStore(
        (state) => state.setDriverList,
    )

    const setInitialLoading = useDriverListStore(
        (state) => state.setInitialLoading,
    )

    useEffect(() => {
        setDriverList(driverList)

        setInitialLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [driverList])

    return <>{children}</>
}

export default DriverListProvider
