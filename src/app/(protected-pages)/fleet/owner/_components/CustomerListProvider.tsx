'use client'

import { useEffect } from 'react'
import { useCustomerListStore } from '../_store/customerListStore'
import type { Customer } from '../types'
import type { CommonProps } from '@/@types/common'

interface CustomerListProviderProps extends CommonProps {
    customerList: Customer[]
}

const CustomerListProvider = ({
    customerList,
    children,
}: CustomerListProviderProps) => {
    const setCustomerList = useCustomerListStore(
        (state) => state.setCustomerList,
    )

    const setInitialLoading = useCustomerListStore(
        (state) => state.setInitialLoading,
    )

    useEffect(() => {
        setCustomerList(customerList)

        setInitialLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customerList])

    return <>{children}</>
}

export default CustomerListProvider
