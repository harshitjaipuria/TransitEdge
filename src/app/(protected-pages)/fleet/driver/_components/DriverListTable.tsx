'use client'

import { useMemo } from 'react'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/DataTable'
import { useDriverListStore } from '../_store/driverListStore'
import useAppendQueryParams from '@/utils/hooks/useAppendQueryParams'
import { useDrivers } from '../_hooks/useDrivers'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { TbPencil } from 'react-icons/tb'
import type { OnSortParam, ColumnDef, Row } from '@/components/shared/DataTable'
import type { Driver } from '../types'

type DriverListTableProps = {
    driverListTotal: number
    pageIndex?: number
    pageSize?: number
}

const statusColor: Record<string, string> = {
    active: 'bg-emerald-200 dark:bg-emerald-200 text-gray-900 dark:text-gray-900',
    blocked: 'bg-red-200 dark:bg-red-200 text-gray-900 dark:text-gray-900',
}

const NameColumn = ({ row }: { row: Driver }) => {
    return (
        <div className="flex items-center">
            <Link
                className={`hover:text-primary font-semibold text-gray-900 dark:text-gray-100`}
                href={`/concepts/drivers/driver-details/${row.id}`}
            >
                {row.name}
            </Link>
        </div>
    )
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

const DriverListTable = ({
    driverListTotal,
    pageIndex = 1,
    pageSize = 10,
}: DriverListTableProps) => {
    const router = useRouter()

    const selectedDriver = useDriverListStore(
        (state) => state.selectedDriver,
    )
    const setSelectedDriver = useDriverListStore(
        (state) => state.setSelectedDriver,
    )
    const setSelectAllDriver = useDriverListStore(
        (state) => state.setSelectAllDriver,
    )

    const { onAppendQueryParams } = useAppendQueryParams()

    // Fetch real drivers data
    const { drivers: driverList, total, loading: isInitialLoading } = useDrivers({
        page: pageIndex,
        limit: pageSize,
    })

    const handleEdit = (driver: Driver) => {
        router.push(`/fleet/driver/driver-edit/${driver.id}`)
    }


    const columns: ColumnDef<Driver>[] = useMemo(
        () => [
            {
                header: 'Driver Name',
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
                header: 'License Number',
                accessorKey: 'licenseNumber',
                cell: (props) => {
                    const licenseNumber = props.row.original.licenseNumber
                    return <span>{licenseNumber || '-'}</span>
                },
            },
            {
                header: 'Expiry Date',
                accessorKey: 'licenseExpiry',
                cell: (props) => {
                    const expiryDate = props.row.original.licenseExpiry
                    return <span>{expiryDate || '-'}</span>
                },
            },
            // Tags column removed per requirement
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

    const handleRowSelect = (checked: boolean, row: Driver) => {
        setSelectedDriver(checked, row)
    }

    const handleAllRowSelect = (checked: boolean, rows: Row<Driver>[]) => {
        if (checked) {
            const originalRows = rows.map((row) => row.original)
            setSelectAllDriver(originalRows)
        } else {
            setSelectAllDriver([])
        }
    }

    return (
        <DataTable
            selectable
            columns={columns}
            data={driverList}
            noData={driverList.length === 0}
            loading={isInitialLoading}
            pagingData={{
                total: total,
                pageIndex,
                pageSize,
            }}
            checkboxChecked={(row) =>
                selectedDriver.some((selected) => selected.id === row.id)
            }
            onPaginationChange={handlePaginationChange}
            onSelectChange={handleSelectChange}
            onSort={handleSort}
            onCheckBoxChange={handleRowSelect}
            onIndeterminateCheckBoxChange={handleAllRowSelect}
        />
    )
}

export default DriverListTable
