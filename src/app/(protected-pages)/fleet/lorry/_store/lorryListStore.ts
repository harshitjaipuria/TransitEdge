import { create } from 'zustand'
import type { Lorry, Filter } from '../types'

export const initialFilterData = {
    lorryName: '',
    status: ['Active', 'Inactive', 'Under Maintenance'],
}

export type LorriesListState = {
    initialLoading: boolean
    lorryList: Lorry[]
    filterData: Filter
    selectedLorry: Lorry[]
    setLorryList: (lorryList: Lorry[]) => void
    setFilterData: (filterData: Filter) => void
    setSelectedLorry: (checked: boolean, lorry: Lorry) => void
    setSelectAllLorry: (lorries: Lorry[]) => void
    setInitialLoading: (loading: boolean) => void
}

export const useLorryListStore = create<LorriesListState>((set) => ({
    initialLoading: true,
    lorryList: [],
    filterData: initialFilterData,
    selectedLorry: [],
    setLorryList: (lorryList) => set({ lorryList }),
    setFilterData: (filterData) => set({ filterData }),
    setSelectedLorry: (checked, lorry) =>
        set((state) => ({
            selectedLorry: checked
                ? [...state.selectedLorry, lorry]
                : state.selectedLorry.filter((item) => item.id !== lorry.id),
        })),
    setSelectAllLorry: (lorries) => set({ selectedLorry: lorries }),
    setInitialLoading: (loading) => set({ initialLoading: loading }),
}))


