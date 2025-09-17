"use client"
import React from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { OwnerFormValues } from './types'
import OwnerFormFields from './OwnerFormFields'

type OwnerFormProps = {
    initialValues?: OwnerFormValues
    onSubmit?: (values: OwnerFormValues) => void
}

const OwnerForm: React.FC<OwnerFormProps> = ({ initialValues, onSubmit }) => {
    const [values, setValues] = React.useState<OwnerFormValues>(
        initialValues || {
            ownerName: '',
            fatherName: '',
            address: '',
            phoneNumber: '',
            panNumber: ''
        }
    )

    const handleChange = (field: keyof OwnerFormValues, value: string) => {
        setValues(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const missing: string[] = []
        if (!values.ownerName.trim()) missing.push('Owner Name')
        if (!values.fatherName.trim()) missing.push('Father Name')
        if (!values.address.trim()) missing.push('Address')
        if (!/^\d{10}$/.test(values.phoneNumber)) missing.push('Phone Number (10 digits)')
        if (!/^[A-Za-z0-9]{10}$/.test(values.panNumber)) missing.push('PAN Number (10 alphanumeric)')

        if (missing.length) {
            toast.push(
                <Notification title="Please fill all required fields" type="danger" />,
            )
            return
        }

        onSubmit && onSubmit(values)
    }

    return (
        <Card bodyClass="p-0">
            <form onSubmit={handleSubmit} className="space-y-4 p-4">
                <OwnerFormFields values={values} onChange={handleChange} />
                <div className="flex justify-end">
                    <Button type="submit" variant="solid">Save</Button>
                </div>
            </form>
        </Card>
    )
}

export default OwnerForm


