"use client"
import React from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import OwnerForm from './OwnerForm'
import { TbUserPlus } from 'react-icons/tb'
import Table from '@/components/ui/Table'
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import type { ColumnDef, ColumnSort } from '@tanstack/react-table'

type Owner = {
    id: string
    ownerName: string
    fatherName: string
    phoneNumber: string
    panNumber: string
}

type OwnerTableProps = {
    owners?: Owner[]
}

const OwnerTable: React.FC<OwnerTableProps> = ({ owners = [] }) => {
    const [query, setQuery] = React.useState('')
    const [showForm, setShowForm] = React.useState(false)
    const formRef = React.useRef<HTMLDivElement | null>(null)

    // Placeholder filter for future implementation
    const filteredOwners = owners

    const [sorting, setSorting] = React.useState<ColumnSort[]>([])

    const columns = React.useMemo<ColumnDef<Owner>[]>(
        () => [
            {
                id: 'serial',
                header: 'S.No',
                cell: (info) => info.row.index + 1,
                enableSorting: false,
            },
            { header: 'Owner Name', accessorKey: 'ownerName' },
            { header: 'Father Name', accessorKey: 'fatherName' },
            { header: 'Phone', accessorKey: 'phoneNumber' },
            { header: 'PAN', accessorKey: 'panNumber' },
        ],
        [],
    )

    const table = useReactTable({
        data: filteredOwners,
        columns,
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    return (
        <div className="">
            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
                <div className="w-full md:flex-1 min-w-0">
                    <Input
                        type="text"
                        placeholder="Search owners"
                        value={query}
                        onChange={(e) => setQuery((e.target as HTMLInputElement).value)}
                        className="w-full"
                    />
                </div>
                <div className="w-full md:w-auto md:ml-auto">
                    <Button
                        type="button"
                        variant="solid"
                        icon={<TbUserPlus className="text-xl" />}
                        className="w-full md:w-auto"
                        onClick={() => {
                            console.log('Button clicked')
                            setShowForm(!showForm)
                        }}
                    >
                        Create New
                    </Button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <Table>
                    <Table.THead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <Table.Tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <Table.Th key={header.id} colSpan={header.colSpan}>
                                        {header.isPlaceholder ? null : (
                                            <div
                                                className={header.column.getCanSort() ? 'cursor-pointer select-none' : ''}
                                                onClick={header.column.getToggleSortingHandler()}
                                            >
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                                <Table.Sorter sort={header.column.getIsSorted()} />
                                            </div>
                                        )}
                                    </Table.Th>
                                ))}
                            </Table.Tr>
                        ))}
                    </Table.THead>
                    <Table.TBody>
                        {table.getRowModel().rows.length === 0 ? (
                            <Table.Tr>
                                <Table.Td colSpan={5}>
                                    <span className="text-sm text-gray-500">No owners yet</span>
                                </Table.Td>
                            </Table.Tr>
                        ) : (
                            table.getRowModel().rows.map((row) => (
                                <Table.Tr key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <Table.Td key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </Table.Td>
                                    ))}
                                </Table.Tr>
                            ))
                        )}
                    </Table.TBody>
                </Table>
            </div>

            {showForm && (
                <div className="mt-6 p-4 border-2 border-red-500 bg-yellow-100">
                    <h3 className="text-lg font-medium mb-4">Create New Owner</h3>
                    <p className="text-sm text-gray-600 mb-4">Form is visible - testing without OwnerForm component</p>
                </div>
            )}
            {!showForm && (
                <div className="mt-6 p-4 bg-gray-100 rounded">
                    <p className="text-gray-600">Click "Create New" to add an owner</p>
                </div>
            )}
        </div>
    )
}

export default OwnerTable


