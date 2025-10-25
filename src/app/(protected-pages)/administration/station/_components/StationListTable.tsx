'use client'

import { useMemo } from 'react'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/DataTable'
import { useStationListStore } from '../_store/stationListStore'
import useAppendQueryParams from '@/utils/hooks/useAppendQueryParams'
import { useStations } from '../_hooks/useStations'
import { useRouter } from 'next/navigation'
import { TbPencil } from 'react-icons/tb'
import type { OnSortParam, ColumnDef, Row } from '@/components/shared/DataTable'
import type { Station } from '../types'

type StationListTableProps = {
    stationListTotal: number
    pageIndex?: number
    pageSize?: number
}



const ActionColumn = ({
    onEdit,
}: {
    onEdit: () => void
}) => {
    return (
        <div className="flex items-center gap-3">
            <Tooltip title="Edit">
                <div
                    className={`text-xl cursor-pointer select-none font-semibold`}
                    role="button"
                    onClick={onEdit}
                >
                    <TbPencil />
                </div>
            </Tooltip>
        </div>
    )
}

const StationListTable = ({
    pageIndex = 1,
    pageSize = 10,
}: StationListTableProps) => {
    const router = useRouter()

    const selectedStation = useStationListStore(
        (state) => state.selectedStation,
    )
    const setSelectedStation = useStationListStore(
        (state) => state.setSelectedStation,
    )
    const setSelectAllStation = useStationListStore(
        (state) => state.setSelectAllStation,
    )

    const { onAppendQueryParams } = useAppendQueryParams()

    // Fetch real stations data
    const { stations: stationList, total, loading: isInitialLoading } = useStations({
        page: pageIndex,
        limit: pageSize,
    })

    console.log('StationListTable - stationList:', stationList)
    console.log('StationListTable - total:', total)
    console.log('StationListTable - loading:', isInitialLoading)

    const handleEdit = (station: Station) => {
        router.push(`/administration/station/station-edit/${station.id}`)
    }

    const columns: ColumnDef<Station>[] = useMemo(
        () => [
            {
                header: 'Station Name',
                accessorKey: 'station_name',
            },
            {
                header: 'City',
                accessorKey: 'city',
            },
            {
                header: 'Contact Person',
                accessorKey: 'contact_person',
            },
            {
                header: 'Email',
                accessorKey: 'email_id',
            },
            {
                header: 'Phone',
                accessorKey: 'telephone',
                cell: (props) => {
                    const phone = props.row.original.telephone
                    return <span>{phone ? phone.toString() : '-'}</span>
                },
            },
            {
                header: '',
                id: 'action',
                cell: (props) => (
                    <ActionColumn
                        onEdit={() => handleEdit(props.row.original)}
                    />
                ),
            },
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    )

    const handlePaginationChange = (page: number) => {
        onAppendQueryParams({
            pageIndex: String(page),
        })
    }

    const handleSelectChange = (value: number) => {
        onAppendQueryParams({
            pageSize: String(value),
            pageIndex: '1',
        })
    }

    const handleSort = (sort: OnSortParam) => {
        onAppendQueryParams({
            order: sort.order,
            sortKey: sort.key,
        })
    }

    const handleRowSelect = (checked: boolean, row: Station) => {
        setSelectedStation(checked, row)
    }

    const handleAllRowSelect = (checked: boolean, rows: Row<Station>[]) => {
        if (checked) {
            const originalRows = rows.map((row) => row.original)
            setSelectAllStation(originalRows)
        } else {
            setSelectAllStation([])
        }
    }

    return (
        <div>
            <DataTable
                selectable
                columns={columns}
                data={stationList}
                noData={stationList.length === 0}
                loading={isInitialLoading}
                pagingData={{
                    total: total,
                    pageIndex,
                    pageSize,
                }}
                checkboxChecked={(row) =>
                    selectedStation.some((selected) => selected.id === row.id)
                }
                onPaginationChange={handlePaginationChange}
                onSelectChange={handleSelectChange}
                onSort={handleSort}
                onCheckBoxChange={handleRowSelect}
                onIndeterminateCheckBoxChange={handleAllRowSelect}
            />
        </div>
    )
}

export default StationListTable
