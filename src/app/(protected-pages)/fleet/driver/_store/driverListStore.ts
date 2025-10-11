import { create } from 'zustand'
import type { Driver, Filter } from '../types'

export const initialFilterData = {
    driverName: '',
    licenseStatus: [
        'Active',
        'Expired',
        'Expiring Soon',
        'Suspended',
        'Renewed',
    ],
}

export type DriversListState = {
    initialLoading: boolean
    driverList: Driver[]
    filterData: Filter
    selectedDriver: Partial<Driver>[]
}

type DriversListAction = {
    setDriverList: (driverList: Driver[]) => void
    setFilterData: (payload: Filter) => void
    setSelectedDriver: (checked: boolean, driver: Driver) => void
    setSelectAllDriver: (driver: Driver[]) => void
    setInitialLoading: (payload: boolean) => void
}

const initialState: DriversListState = {
    initialLoading: true,
    driverList: [],
    filterData: initialFilterData,
    selectedDriver: [],
}

export const useDriverListStore = create<
    DriversListState & DriversListAction
>((set) => ({
    ...initialState,
    setFilterData: (payload) => set(() => ({ filterData: payload })),
    setSelectedDriver: (checked, row) =>
        set((state) => {
            const prevData = state.selectedDriver
            if (checked) {
                return { selectedDriver: [...prevData, ...[row]] }
            } else {
                if (
                    prevData.some((prevDriver) => row.id === prevDriver.id)
                ) {
                    return {
                        selectedDriver: prevData.filter(
                            (prevDriver) => prevDriver.id !== row.id,
                        ),
                    }
                }
                return { selectedDriver: prevData }
            }
        }),
    setSelectAllDriver: (row) => set(() => ({ selectedDriver: row })),
    setDriverList: (driverList) => set(() => ({ driverList })),
    setInitialLoading: (payload) => set(() => ({ initialLoading: payload })),
}))
