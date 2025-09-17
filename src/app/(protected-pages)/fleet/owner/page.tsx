import React from 'react'
import Card from '@/components/ui/Card'
import { OwnerTable } from './component'

const OwnerPage = () => {
    return (
        <Card bodyClass="p-4">
            <h1 className="text-xl font-semibold mb-4">Create New Owner</h1>
            <div className="mb-6">
                <OwnerTable />
            </div>
        </Card>
    )
}

export default OwnerPage


