'use client'

import { useMemo } from 'react'
import Tag from '@/components/ui/Tag'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/DataTable'
import { useCustomerListStore } from '../_store/customerListStore'
import useAppendQueryParams from '@/utils/hooks/useAppendQueryParams'
import { useOwners } from '../_hooks/useOwners'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { TbPencil } from 'react-icons/tb'
import type { OnSortParam, ColumnDef, Row } from '@/components/shared/DataTable'
import type { Customer } from '../types'

type CustomerListTableProps = {
    customerListTotal: number
    pageIndex?: number
    pageSize?: number
}

const statusColor: Record<string, string> = {
    active: 'bg-emerald-200 dark:bg-emerald-200 text-gray-900 dark:text-gray-900',
    blocked: 'bg-red-200 dark:bg-red-200 text-gray-900 dark:text-gray-900',
}

const NameColumn = ({ row }: { row: Customer }) => {
    return (
        <div className="flex items-center">
            <Link
                className={`hover:text-primary font-semibold text-gray-900 dark:text-gray-100`}
                href={`/concepts/customers/customer-details/${row.id}`}
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

const CustomerListTable = ({
    customerListTotal,
    pageIndex = 1,
    pageSize = 10,
}: CustomerListTableProps) => {
    const router = useRouter()

    const selectedCustomer = useCustomerListStore(
        (state) => state.selectedCustomer,
    )
    const setSelectedCustomer = useCustomerListStore(
        (state) => state.setSelectedCustomer,
    )
    const setSelectAllCustomer = useCustomerListStore(
        (state) => state.setSelectAllCustomer,
    )

    const { onAppendQueryParams } = useAppendQueryParams()

    // Fetch real owners data
    const { owners: customerList, total, loading: isInitialLoading } = useOwners({
        page: pageIndex,
        limit: pageSize,
    })

    const handleEdit = (customer: Customer) => {
        router.push(`/fleet/owner/customer-edit/${customer.id}`)
    }


    const columns: ColumnDef<Customer>[] = useMemo(
        () => [
            {
                header: 'Owner Name',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original
                    return <NameColumn row={row} />
                },
            },
            {
                header: 'Father Name',
                accessorKey: 'lastName',
            },
            {
                header: 'Email',
                accessorKey: 'email',
            },
            {
                header: 'Phone',
                accessorKey: 'personalInfo.phoneNumber',
            },
            {
                header: 'Location',
                accessorKey: 'personalInfo.location',
            },
            // Tags column removed per requirement; PAN retained
            {
                header: 'PAN Number',
                accessorKey: 'panNumber',
                cell: (props) => {
                    const panNumber = props.row.original.panNumber
                    return <span>{panNumber || '-'}</span>
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

    const handleRowSelect = (checked: boolean, row: Customer) => {
        setSelectedCustomer(checked, row)
    }

    const handleAllRowSelect = (checked: boolean, rows: Row<Customer>[]) => {
        if (checked) {
            const originalRows = rows.map((row) => row.original)
            setSelectAllCustomer(originalRows)
        } else {
            setSelectAllCustomer([])
        }
    }

    return (
        <DataTable
            selectable
            columns={columns}
            data={customerList}
            noData={customerList.length === 0}
            loading={isInitialLoading}
            pagingData={{
                total: total,
                pageIndex,
                pageSize,
            }}
            checkboxChecked={(row) =>
                selectedCustomer.some((selected) => selected.id === row.id)
            }
            onPaginationChange={handlePaginationChange}
            onSelectChange={handleSelectChange}
            onSort={handleSort}
            onCheckBoxChange={handleRowSelect}
            onIndeterminateCheckBoxChange={handleAllRowSelect}
        />
    )
}

export default CustomerListTable
