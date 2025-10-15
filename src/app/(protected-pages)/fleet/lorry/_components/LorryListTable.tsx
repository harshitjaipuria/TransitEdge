'use client'

import { useMemo } from 'react'
import DataTable from '@/components/shared/DataTable'
import useAppendQueryParams from '@/utils/hooks/useAppendQueryParams'
import { useLorries } from '../_hooks/useLorries'
import { useLorryListStore } from '../_store/lorryListStore'
import { useRouter } from 'next/navigation'
import type { OnSortParam, ColumnDef, Row } from '@/components/shared/DataTable'
import type { Lorry } from '../types'

type LorryListTableProps = {
    pageIndex?: number
    pageSize?: number
}

const LorryListTable = ({
    pageIndex = 1,
    pageSize = 10,
}: LorryListTableProps) => {
    const router = useRouter()

    const selectedLorry = useLorryListStore((state) => state.selectedLorry)
    const setSelectedLorry = useLorryListStore((state) => state.setSelectedLorry)
    const setSelectAllLorry = useLorryListStore((state) => state.setSelectAllLorry)

    const { onAppendQueryParams } = useAppendQueryParams()

    const { lorries: lorryList, total, loading: isInitialLoading } = useLorries({
        page: pageIndex,
        limit: pageSize,
    })

    const handleEdit = (lorry: Lorry) => {
        router.push(`/fleet/lorry/lorry-edit/${lorry.id}`)
    }

    const columns: ColumnDef<Lorry>[] = useMemo(
        () => [
            {
                header: 'Lorry Name',
                accessorKey: 'name',
            },
            {
                header: 'Reg. No',
                accessorKey: 'registrationNumber',
            },
            {
                header: 'City',
                accessorKey: 'personalInfo.city',
            },
            {
                header: 'Status',
                accessorKey: 'status',
            },
        ],
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

    const handleRowSelect = (checked: boolean, row: Lorry) => {
        setSelectedLorry(checked, row)
    }

    const handleAllRowSelect = (checked: boolean, rows: Row<Lorry>[]) => {
        if (checked) {
            const originalRows = rows.map((row) => row.original)
            setSelectAllLorry(originalRows)
        } else {
            setSelectAllLorry([])
        }
    }

    return (
        <DataTable
            selectable
            columns={columns}
            data={lorryList}
            noData={lorryList.length === 0}
            loading={isInitialLoading}
            pagingData={{
                total,
                pageIndex,
                pageSize,
            }}
            checkboxChecked={(row) =>
                selectedLorry.some((selected) => selected.id === row.id)
            }
            onPaginationChange={handlePaginationChange}
            onSelectChange={handleSelectChange}
            onSort={handleSort}
            onCheckBoxChange={handleRowSelect}
            onIndeterminateCheckBoxChange={handleAllRowSelect}
        />
    )
}

export default LorryListTable


