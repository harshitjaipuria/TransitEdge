"use client"
import React from 'react'
import Input from '@/components/ui/Input'
import { OwnerFormValues } from './types'

type OwnerFormFieldsProps = {
    values: OwnerFormValues
    onChange: (field: keyof OwnerFormValues, value: string) => void
}

const OwnerFormFields: React.FC<OwnerFormFieldsProps> = ({ values, onChange }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
                <label className="form-label text-black mb-2">Owner Name <span className="text-red-500">*</span></label>
                <Input
                    type="text"
                    value={values.ownerName}
                    onChange={(e) => onChange('ownerName', (e.target as HTMLInputElement).value)}
                    placeholder="Owner name"
                    className="mb-2"
                />
            </div>
            <div className="form-group">
                <label className="form-label text-black mb-2">Father Name <span className="text-red-500">*</span></label>
                <Input
                    type="text"
                    value={values.fatherName}
                    onChange={(e) => onChange('fatherName', (e.target as HTMLInputElement).value)}
                    placeholder="Father name"
                    className="mb-2"
                />
            </div>
            <div className="form-group md:col-span-2">
                <label className="form-label text-black mb-2">Address <span className="text-red-500">*</span></label>
                <Input
                    textArea
                    rows={3}
                    value={values.address}
                    onChange={(e) => onChange('address', (e.target as HTMLTextAreaElement).value)}
                    placeholder="Full address"
                    className="mb-2"
                />
            </div>
            <div className="form-group">
                <label className="form-label text-black mb-2">Phone Number <span className="text-red-500">*</span></label>
                <Input
                    type="tel"
                    value={values.phoneNumber}
                    inputMode="numeric"
                    maxLength={10}
                    autoComplete="tel"
                    onChange={(e) => {
                        const next = (e.target as HTMLInputElement).value
                            .replace(/[^0-9]/g, '')
                            .slice(0, 10)
                        onChange('phoneNumber', next)
                    }}
                    placeholder="Enter 10 digit phone number"
                    className="mb-2"
                />
            </div>
            <div className="form-group">
                <label className="form-label text-black mb-2">PAN Number <span className="text-red-500">*</span></label>
                <Input
                    type="text"
                    value={values.panNumber}
                    maxLength={10}
                    pattern="[A-Za-z0-9]{10}"
                    onChange={(e) => {
                        const next = (e.target as HTMLInputElement).value
                            .replace(/[^A-Za-z0-9]/g, '')
                            .slice(0, 10)
                        onChange('panNumber', next)
                    }}
                    placeholder="Enter 10 character PAN"
                    className="mb-2"
                />
            </div>
        </div>
    )
}

export default OwnerFormFields


