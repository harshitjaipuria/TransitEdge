import { create } from 'zustand'
import type { Customer, Filter } from '../types'

export const initialFilterData = {
    purchasedProducts: '',
    purchaseChannel: [
        'Retail Stores',
        'Online Retailers',
        'Resellers',
        'Mobile Apps',
        'Direct Sales',
    ],
}

export type CustomersListState = {
    initialLoading: boolean
    customerList: Customer[]
    filterData: Filter
    selectedCustomer: Partial<Customer>[]
}

type CustomersListAction = {
    setCustomerList: (customerList: Customer[]) => void
    setFilterData: (payload: Filter) => void
    setSelectedCustomer: (checked: boolean, customer: Customer) => void
    setSelectAllCustomer: (customer: Customer[]) => void
    setInitialLoading: (payload: boolean) => void
}

const initialState: CustomersListState = {
    initialLoading: true,
    customerList: [],
    filterData: initialFilterData,
    selectedCustomer: [],
}

export const useCustomerListStore = create<
    CustomersListState & CustomersListAction
>((set) => ({
    ...initialState,
    setFilterData: (payload) => set(() => ({ filterData: payload })),
    setSelectedCustomer: (checked, row) =>
        set((state) => {
            const prevData = state.selectedCustomer
            if (checked) {
                return { selectedCustomer: [...prevData, ...[row]] }
            } else {
                if (
                    prevData.some((prevCustomer) => row.id === prevCustomer.id)
                ) {
                    return {
                        selectedCustomer: prevData.filter(
                            (prevCustomer) => prevCustomer.id !== row.id,
                        ),
                    }
                }
                return { selectedCustomer: prevData }
            }
        }),
    setSelectAllCustomer: (row) => set(() => ({ selectedCustomer: row })),
    setCustomerList: (customerList) => set(() => ({ customerList })),
    setInitialLoading: (payload) => set(() => ({ initialLoading: payload })),
}))
