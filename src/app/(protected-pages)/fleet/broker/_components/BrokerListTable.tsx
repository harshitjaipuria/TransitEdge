'use client'

import { useMemo } from 'react'
import Tag from '@/components/ui/Tag'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/DataTable'
import { useBrokerListStore } from '../_store/brokerListStore'
import useAppendQueryParams from '@/utils/hooks/useAppendQueryParams'
import { useBrokers } from '../_hooks/useBrokers'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { TbPencil } from 'react-icons/tb'
import type { OnSortParam, ColumnDef, Row } from '@/components/shared/DataTable'
import type { Broker } from '../types'

type BrokerListTableProps = {
    pageIndex?: number
    pageSize?: number
}


const NameColumn = ({ row }: { row: Broker }) => {
    return (
        <div className="flex items-center">
            <Link
                className={`hover:text-primary font-semibold text-gray-900 dark:text-gray-100`}
                href={`/concepts/brokers/broker-details/${row.id}`}
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

const BrokerListTable = ({
    pageIndex = 1,
    pageSize = 10,
}: BrokerListTableProps) => {
    const router = useRouter()

    const selectedBroker = useBrokerListStore(
        (state) => state.selectedBroker,
    )
    const setSelectedBroker = useBrokerListStore(
        (state) => state.setSelectedBroker,
    )
    const setSelectAllBroker = useBrokerListStore(
        (state) => state.setSelectAllBroker,
    )

    const { onAppendQueryParams } = useAppendQueryParams()

    // Fetch real brokers data
    const { brokers: brokerList, total, loading: isInitialLoading } = useBrokers({
        page: pageIndex,
        limit: pageSize,
    })

    const handleEdit = (broker: Broker) => {
        router.push(`/fleet/broker/broker-edit/${broker.id}`)
    }


    const columns: ColumnDef<Broker>[] = useMemo(
        () => [
            {
                header: 'Broker Name',
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
            // License columns removed per requirement
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

    const handleRowSelect = (checked: boolean, row: Broker) => {
        setSelectedBroker(checked, row)
    }

    const handleAllRowSelect = (checked: boolean, rows: Row<Broker>[]) => {
        if (checked) {
            const originalRows = rows.map((row) => row.original)
            setSelectAllBroker(originalRows)
        } else {
            setSelectAllBroker([])
        }
    }

    return (
        <DataTable
            selectable
            columns={columns}
            data={brokerList}
            noData={brokerList.length === 0}
            loading={isInitialLoading}
            pagingData={{
                total: total,
                pageIndex,
                pageSize,
            }}
            checkboxChecked={(row) =>
                selectedBroker.some((selected) => selected.id === row.id)
            }
            onPaginationChange={handlePaginationChange}
            onSelectChange={handleSelectChange}
            onSort={handleSort}
            onCheckBoxChange={handleRowSelect}
            onIndeterminateCheckBoxChange={handleAllRowSelect}
        />
    )
}

export default BrokerListTable
