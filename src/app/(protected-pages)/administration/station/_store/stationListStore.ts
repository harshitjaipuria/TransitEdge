'use client'

import { create } from 'zustand'
import type { Station } from '../types'

interface StationListStore {
    stationList: Station[]
    selectedStation: Station[]
    setStationList: (stations: Station[]) => void
    setSelectedStation: (checked: boolean, station: Station) => void
    setSelectAllStation: (stations: Station[]) => void
    clearSelectedStation: () => void
}

const useStationListStore = create<StationListStore>((set) => ({
    stationList: [],
    selectedStation: [],
    setStationList: (stations) => set({ stationList: stations }),
    setSelectedStation: (checked, station) =>
        set((state) => ({
            selectedStation: checked
                ? [...state.selectedStation, station]
                : state.selectedStation.filter((s) => s.id !== station.id),
        })),
    setSelectAllStation: (stations) => set({ selectedStation: stations }),
    clearSelectedStation: () => set({ selectedStation: [] }),
}))

export { useStationListStore }

