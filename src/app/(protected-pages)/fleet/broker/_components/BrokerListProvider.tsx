'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useBrokerListStore } from '../_store/brokerListStore'
import type { Broker } from '../types'

interface BrokerListContextType {
    selectedBroker: Broker[]
    setSelectedBroker: (checked: boolean, broker: Broker) => void
    setSelectAllBroker: (brokers: Broker[]) => void
}

const BrokerListContext = createContext<BrokerListContextType | undefined>(undefined)

interface BrokerListProviderProps {
    children: ReactNode
}

export const BrokerListProvider = ({ children }: BrokerListProviderProps) => {
    const selectedBroker = useBrokerListStore((state) => state.selectedBroker)
    const setSelectedBroker = useBrokerListStore((state) => state.setSelectedBroker)
    const setSelectAllBroker = useBrokerListStore((state) => state.setSelectAllBroker)

    return (
        <BrokerListContext.Provider
            value={{
                selectedBroker,
                setSelectedBroker,
                setSelectAllBroker,
            }}
        >
            {children}
        </BrokerListContext.Provider>
    )
}

export const useBrokerListContext = () => {
    const context = useContext(BrokerListContext)
    if (context === undefined) {
        throw new Error('useBrokerListContext must be used within a BrokerListProvider')
    }
    return context
}

