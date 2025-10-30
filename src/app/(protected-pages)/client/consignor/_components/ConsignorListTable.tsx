// Replica of BrokerListTable for Consignor
'use client'

import { useMemo } from 'react'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/DataTable'
import { useConsignorListStore } from '../_store/consignorListStore'
import useAppendQueryParams from '@/utils/hooks/useAppendQueryParams'
import { useConsignors } from '../_hooks/useConsignors'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { TbPencil } from 'react-icons/tb'
import type { OnSortParam, ColumnDef, Row } from '@/components/shared/DataTable'
import type { Consignor } from '../types'

type ConsignorListTableProps = {
    pageIndex?: number
    pageSize?: number
}

const NameColumn = ({ row }: { row: Consignor }) => {
    return (
        <div className="flex items-center">
            <Link
                className={`hover:text-primary font-semibold text-gray-900 dark:text-gray-100`}
                href={`/concepts/consignors/consignor-details/${row.id}`}
            >
                {row.name}
            </Link>
        </div>
    )
}

const ActionColumn = ({ onEdit }: { onEdit: () => void }) => {
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

const ConsignorListTable = ({ pageIndex = 1, pageSize = 10 }: ConsignorListTableProps) => {
    const router = useRouter()

    const selectedConsignor = useConsignorListStore((state) => state.selectedConsignor)
    const setSelectedConsignor = useConsignorListStore((state) => state.setSelectedConsignor)
    const setSelectAllConsignor = useConsignorListStore((state) => state.setSelectAllConsignor)
    const { onAppendQueryParams } = useAppendQueryParams()

    // Fetch real consignors data
    const { consignors: consignorList, total, loading: isInitialLoading } = useConsignors({
        page: pageIndex,
        limit: pageSize,
    })

    const handleEdit = (consignor: Consignor) => {
        router.push(`/client/consignor/consignor-edit/${consignor.id}`)
    }

    const columns: ColumnDef<Consignor>[] = useMemo(
        () => [
            {
                header: 'Consignor Name',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original
                    return <NameColumn row={row} />
                },
            },
            {
                header: 'Phone',
                accessorKey: 'personalInfo.phoneNumber',
            },
            {
                header: 'City',
                accessorKey: 'personalInfo.city',
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

    const handleRowSelect = (checked: boolean, row: Consignor) => {
        setSelectedConsignor(checked, row)
    }

    const handleAllRowSelect = (checked: boolean, rows: Row<Consignor>[]) => {
        if (checked) {
            const originalRows = rows.map((row) => row.original)
            setSelectAllConsignor(originalRows)
        } else {
            setSelectAllConsignor([])
        }
    }

    return (
        <DataTable
            selectable
            columns={columns}
            data={consignorList}
            noData={consignorList.length === 0}
            loading={isInitialLoading}
            pagingData={{
                total: total,
                pageIndex,
                pageSize,
            }}
            checkboxChecked={(row) => selectedConsignor.some((selected) => selected.id === row.id)}
            onPaginationChange={handlePaginationChange}
            onSelectChange={handleSelectChange}
            onSort={handleSort}
            onCheckBoxChange={handleRowSelect}
            onIndeterminateCheckBoxChange={handleAllRowSelect}
        />
    )
}

export default ConsignorListTable
