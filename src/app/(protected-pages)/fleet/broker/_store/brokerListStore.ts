import { create } from 'zustand'
import type { Broker, Filter } from '../types'

export const initialFilterData = {
    brokerName: '',
    licenseStatus: [
        'Active',
        'Expired',
        'Expiring Soon',
        'Suspended',
        'Renewed',
    ],
}

export type BrokersListState = {
    initialLoading: boolean
    brokerList: Broker[]
    filterData: Filter
    selectedBroker: Broker[]
    setBrokerList: (brokerList: Broker[]) => void
    setFilterData: (filterData: Filter) => void
    setSelectedBroker: (checked: boolean, broker: Broker) => void
    setSelectAllBroker: (brokers: Broker[]) => void
    setInitialLoading: (loading: boolean) => void
}

export const useBrokerListStore = create<BrokersListState>((set) => ({
    initialLoading: true,
    brokerList: [],
    filterData: initialFilterData,
    selectedBroker: [],
    setBrokerList: (brokerList) => set({ brokerList }),
    setFilterData: (filterData) => set({ filterData }),
    setSelectedBroker: (checked, broker) =>
        set((state) => ({
            selectedBroker: checked
                ? [...state.selectedBroker, broker]
                : state.selectedBroker.filter((item) => item.id !== broker.id),
        })),
    setSelectAllBroker: (brokers) => set({ selectedBroker: brokers }),
    setInitialLoading: (loading) => set({ initialLoading: loading }),
}))

