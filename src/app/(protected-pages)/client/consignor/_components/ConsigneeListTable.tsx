// Replica of BrokerListTable for Consignee
'use client'

import { useMemo } from 'react'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/DataTable'
import { useConsigneeListStore } from '../_store/consigneeListStore'
import useAppendQueryParams from '@/utils/hooks/useAppendQueryParams'
import { useConsignees } from '../_hooks/useConsignees'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { TbPencil } from 'react-icons/tb'
import type { OnSortParam, ColumnDef, Row } from '@/components/shared/DataTable'
import type { Consignee } from '../types'

type ConsigneeListTableProps = {
    pageIndex?: number
    pageSize?: number
}

const NameColumn = ({ row }: { row: Consignee }) => {
    return (
        <div className="flex items-center">
            <Link
                className={`hover:text-primary font-semibold text-gray-900 dark:text-gray-100`}
                href={`/concepts/consignees/consignee-details/${row.id}`}
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

const ConsigneeListTable = ({ pageIndex = 1, pageSize = 10 }: ConsigneeListTableProps) => {
    const router = useRouter()

    const selectedConsignee = useConsigneeListStore((state) => state.selectedConsignee)
    const setSelectedConsignee = useConsigneeListStore((state) => state.setSelectedConsignee)
    const setSelectAllConsignee = useConsigneeListStore((state) => state.setSelectAllConsignee)
    const { onAppendQueryParams } = useAppendQueryParams()

    // Fetch real consignees data
    const { consignees: consigneeList, total, loading: isInitialLoading } = useConsignees({
        page: pageIndex,
        limit: pageSize,
    })

    const handleEdit = (consignee: Consignee) => {
        router.push(`/client/consignee/consignee-edit/${consignee.id}`)
    }

    const columns: ColumnDef<Consignee>[] = useMemo(
        () => [
            {
                header: 'Consignee Name',
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

    const handleRowSelect = (checked: boolean, row: Consignee) => {
        setSelectedConsignee(checked, row)
    }

    const handleAllRowSelect = (checked: boolean, rows: Row<Consignee>[]) => {
        if (checked) {
            const originalRows = rows.map((row) => row.original)
            setSelectAllConsignee(originalRows)
        } else {
            setSelectAllConsignee([])
        }
    }

    return (
        <DataTable
            selectable
            columns={columns}
            data={consigneeList}
            noData={consigneeList.length === 0}
            loading={isInitialLoading}
            pagingData={{
                total: total,
                pageIndex,
                pageSize,
            }}
            checkboxChecked={(row) => selectedConsignee.some((selected) => selected.id === row.id)}
            onPaginationChange={handlePaginationChange}
            onSelectChange={handleSelectChange}
            onSort={handleSort}
            onCheckBoxChange={handleRowSelect}
            onIndeterminateCheckBoxChange={handleAllRowSelect}
        />
    )
}

export default ConsigneeListTable
