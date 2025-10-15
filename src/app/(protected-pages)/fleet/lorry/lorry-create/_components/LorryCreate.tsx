'use client'

import { useState, useMemo } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { components } from 'react-select'

// UI Components
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Select, { Option as DefaultOption } from '@/components/ui/Select'
import Avatar from '@/components/ui/Avatar'
import NumericInput from '@/components/shared/NumericInput'
import DatePicker from '@/components/ui/DatePicker'
import { Form, FormItem } from '@/components/ui/Form'
import Radio from '@/components/ui/Radio'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'

// Icons
import { TbTrash } from 'react-icons/tb'

// Utils
import { countryList } from '@/constants/countries.constant'

// Types
import type { ControlProps, OptionProps } from 'react-select'

// Form Schema Types
type OverviewFields = {
    name: string
    registrationNumber: string
}

type VehicleFields = {
    make?: string // ISO date string (no future)
    model?: string
}

type AddressFields = {}

type ExtraFields = {
    bodyType?: string
    color?: string
    vehicleSize?: string
    chassisNumber: string
    engineNumber: string
    fitnessValidUpto?: string
    taxTokenNumber?: string
    roadPermitNumber?: string
    roadPermitIssueDate?: string
    permitValidStates?: string
    insuranceCompany?: string
    divisionBranchNumber?: string
    insuranceCertificateNumber?: string
    insuranceCertificateDate?: string
    complianceType?: 'TDS' | 'RC'
}

type LorryFormSchema = OverviewFields & VehicleFields & AddressFields & ExtraFields

// Validation Schema
const validationSchema = z.object({
    name: z.string().min(1, { message: 'Lorry name required' }),
    registrationNumber: z
        .string()
        .min(1, { message: 'Registration number required' })
        .max(20, { message: 'Registration number must be maximum 20 characters' })
        .regex(/^[A-Z0-9-]+$/i, { message: 'Only letters, numbers and hyphens allowed' }),
    make: z
        .string()
        .optional()
        .refine(
            (val) => {
                if (!val) return true
                const d = new Date(val)
                if (isNaN(d.getTime())) return false
                const today = new Date()
                today.setHours(0, 0, 0, 0)
                d.setHours(0, 0, 0, 0)
                return d.getTime() <= today.getTime()
            },
            { message: 'Date cannot be in the future' },
        ),
    model: z.string().optional(),
    // Address fields removed
    chassisNumber: z.string().min(1, { message: 'Chassis number required' }),
    engineNumber: z.string().min(1, { message: 'Engine number required' }),
    bodyType: z.string().optional(),
    color: z.string().optional(),
    vehicleSize: z.string().optional(),
    // Documentation & Validity fields
    fitnessValidUpto: z
        .string()
        .optional()
        .refine(
            (val) => {
                if (!val) return true
                const d = new Date(val)
                return !isNaN(d.getTime())
            },
            { message: 'Invalid date format' },
        ),
    taxTokenNumber: z.string().optional(),
    roadPermitNumber: z.string().optional(),
    roadPermitIssueDate: z
        .string()
        .optional()
        .refine((val) => {
            if (!val) return true
            const d = new Date(val)
            return !isNaN(d.getTime())
        }, { message: 'Invalid date format' }),
    permitValidStates: z.string().optional(),
    insuranceCompany: z.string().optional(),
    divisionBranchNumber: z.string().optional(),
    insuranceCertificateNumber: z.string().optional(),
    insuranceCertificateDate: z
        .string()
        .optional()
        .refine((val) => {
            if (!val) return true
            const d = new Date(val)
            return !isNaN(d.getTime())
        }, { message: 'Invalid date format' }),
})

type CountryOption = {
    label: string
    dialCode: string
    value: string
}

const { Control } = components

const CustomSelectOptionCountry = (props: OptionProps<CountryOption>) => {
    return (
        <DefaultOption<CountryOption>
            {...props}
            customLabel={(data, label) => (
                <span className="flex items-center gap-2">
                    <Avatar shape="circle" size={20} src={`/img/countries/${data.value}.png`} />
                    <span>{label}</span>
                </span>
            )}
        />
    )
}

const CustomControlCountry = ({ children, ...props }: ControlProps<CountryOption>) => {
    const selected = props.getValue()[0]
    return (
        <Control {...props}>
            {selected && (
                <Avatar
                    className="ltr:ml-4 rtl:mr-4"
                    shape="circle"
                    size={20}
                    src={`/img/countries/${selected.value}.png`}
                />
            )}
            {children}
        </Control>
    )
}

const LorryCreate = () => {
    const router = useRouter()

    const [discardConfirmationOpen, setDiscardConfirmationOpen] = useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)

    const defaultValues: LorryFormSchema = {
        name: '',
        registrationNumber: '',
        make: '',
        model: '',
        bodyType: '',
        color: '',
        vehicleSize: '',
        chassisNumber: '',
        engineNumber: '',
        fitnessValidUpto: '',
        taxTokenNumber: '',
        roadPermitNumber: '',
        roadPermitIssueDate: '',
        permitValidStates: '',
        insuranceCompany: '',
        divisionBranchNumber: '',
        insuranceCertificateNumber: '',
        insuranceCertificateDate: '',
        complianceType: 'TDS',
    }

    const {
        handleSubmit,
        reset,
        formState: { errors },
        control,
    } = useForm<LorryFormSchema>({
        defaultValues,
        resolver: zodResolver(validationSchema),
    })

    const countryOptions = useMemo(() => countryList, [])

    const handleFormSubmit = async (values: LorryFormSchema) => {
        setIsSubmiting(true)
        try {
            const payload = {
                ...values,
            }

            const response = await fetch('/api/lorry/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })

            const result = await response.json()
            if (!response.ok) {
                throw new Error(result.message || 'Failed to create lorry')
            }

            toast.push(
                <Notification type="success">Lorry created successfully!</Notification>,
                { placement: 'top-center' },
            )
            router.push('/fleet/lorry')
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Error creating lorry:', error)
            toast.push(
                <Notification type="danger">
                    {error instanceof Error ? error.message : 'Failed to create lorry'}
                </Notification>,
                { placement: 'top-center' },
            )
        } finally {
            setIsSubmiting(false)
        }
    }

    const handleConfirmDiscard = () => {
        setDiscardConfirmationOpen(false)
        toast.push(
            <Notification type="success">Lorry discarded!</Notification>,
            { placement: 'top-center' },
        )
        router.push('/fleet/lorry')
    }

    const handleDiscard = () => setDiscardConfirmationOpen(true)
    const handleCancel = () => setDiscardConfirmationOpen(false)

    const onSubmit = (values: LorryFormSchema) => handleFormSubmit(values)

    return (
        <>
            <style jsx>{`
                .form-label:after { content: ' *'; color: #ef4444; }
                .form-label-with-asterisk:after { content: ' *'; color: #ef4444; }
            `}</style>
            <Form
                className="flex w-full h-full"
                containerClassName="flex flex-col w-full justify-between"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Container>
                    <div className="flex flex-col md:flex-row gap-2">
                        <div className="gap-2 flex flex-col flex-auto">
                            {/* Basic Identification Section */}
                            <Card>
                                <h4 className="mb-6">Basic Identification</h4>
                                <div className="grid md:grid-cols-2 gap-2">
                                    <FormItem
                                        label={"Lorry Name *"}
                                        invalid={Boolean(errors.name)}
                                        errorMessage={errors.name?.message}
                                    >
                                        <Controller
                                            name="name"
                                            control={control}
                                            render={({ field }) => (
                                                <Input type="text" autoComplete="off" placeholder="Lorry Name" {...field} />
                                            )}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label={"Vehicle Registration Number *"}
                                        invalid={Boolean(errors.registrationNumber)}
                                        errorMessage={errors.registrationNumber?.message}
                                    >
                                        <Controller
                                            name="registrationNumber"
                                            control={control}
                                            render={({ field }) => (
                                                <Input
                                                    type="text"
                                                    autoComplete="off"
                                                    placeholder="Vehicle Registration Number"
                                                    maxLength={20}
                                                    {...field}
                                                    onChange={(e) => {
                                                        const value = e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, '')
                                                        field.onChange(value)
                                                    }}
                                                />
                                            )}
                                        />
                                    </FormItem>
                                    <FormItem label={"Body Type"} invalid={Boolean(errors.bodyType)} errorMessage={errors.bodyType?.toString()}>
                                        <Controller
                                            name="bodyType"
                                            control={control}
                                            render={({ field }) => (
                                                <Input type="text" autoComplete="off" placeholder="Body Type" {...field} />
                                            )}
                                        />
                                    </FormItem>
                                    <FormItem label={"Make"} invalid={Boolean(errors.make)} errorMessage={errors.make?.message}>
                                        <Controller
                                            name="make"
                                            control={control}
                                            render={({ field }) => (
                                                <DatePicker
                                                    placeholder="Select Date"
                                                    value={field.value ? new Date(field.value) : undefined}
                                                    onChange={(date) => {
                                                        if (!date) {
                                                            field.onChange('')
                                                            return
                                                        }
                                                        const today = new Date()
                                                        today.setHours(0, 0, 0, 0)
                                                        const picked = new Date(date)
                                                        picked.setHours(0, 0, 0, 0)
                                                        if (picked.getTime() > today.getTime()) {
                                                            // ignore future dates
                                                            return
                                                        }
                                                        field.onChange(picked.toISOString().split('T')[0])
                                                    }}
                                                />
                                            )}
                                        />
                                    </FormItem>
                                    <FormItem label={"Vehicle Model"} invalid={Boolean(errors.model)} errorMessage={errors.model?.message}>
                                        <Controller
                                            name="model"
                                            control={control}
                                            render={({ field }) => (
                                                <Input type="text" autoComplete="off" placeholder="Vehicle Model" {...field} />
                                            )}
                                        />
                                    </FormItem>
                                    <FormItem label={"Colour"} invalid={Boolean(errors.color)} errorMessage={errors.color?.toString()}>
                                        <Controller
                                            name="color"
                                            control={control}
                                            render={({ field }) => (
                                                <Input type="text" autoComplete="off" placeholder="Colour" {...field} />
                                            )}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label={"Vehicle Size / Capacity"}
                                        invalid={Boolean(errors.vehicleSize)}
                                        errorMessage={errors.vehicleSize?.toString()}
                                    >
                                        <Controller
                                            name="vehicleSize"
                                            control={control}
                                            render={({ field }) => (
                                                <Input type="text" autoComplete="off" placeholder="Vehicle Size / Capacity" {...field} />
                                            )}
                                        />
                                    </FormItem>
                                </div>
                            </Card>

                            {/* Documentation & Validity */}
                            <Card>
                                <h4 className="mb-6">Documentation & Validity</h4>
                                <div className="grid md:grid-cols-2 gap-2">
                                    <FormItem label={"Fitness Valid Upto"} invalid={Boolean(errors.fitnessValidUpto)} errorMessage={errors.fitnessValidUpto?.toString()}>
                                        <Controller
                                            name="fitnessValidUpto"
                                            control={control}
                                            render={({ field }) => (
                                                <DatePicker
                                                    placeholder="Select Date"
                                                    value={field.value ? new Date(field.value) : undefined}
                                                    onChange={(date) => field.onChange(date ? date.toISOString().split('T')[0] : '')}
                                                />
                                            )}
                                        />
                                    </FormItem>
                                    <FormItem label={"Tax Token Number"} invalid={Boolean(errors.taxTokenNumber)} errorMessage={errors.taxTokenNumber?.toString()}>
                                        <Controller
                                            name="taxTokenNumber"
                                            control={control}
                                            render={({ field }) => (
                                                <Input type="text" autoComplete="off" placeholder="Tax Token Number" {...field} />
                                            )}
                                        />
                                    </FormItem>
                                    <FormItem label={"Road Permit Number"} invalid={Boolean(errors.roadPermitNumber)} errorMessage={errors.roadPermitNumber?.toString()}>
                                        <Controller
                                            name="roadPermitNumber"
                                            control={control}
                                            render={({ field }) => (
                                                <Input type="text" autoComplete="off" placeholder="Road Permit Number" {...field} />
                                            )}
                                        />
                                    </FormItem>
                                    <FormItem label={"Road Permit Issue Date"} invalid={Boolean(errors.roadPermitIssueDate)} errorMessage={errors.roadPermitIssueDate?.toString()}>
                                        <Controller
                                            name="roadPermitIssueDate"
                                            control={control}
                                            render={({ field }) => (
                                                <DatePicker
                                                    placeholder="Select Date"
                                                    value={field.value ? new Date(field.value) : undefined}
                                                    onChange={(date) => field.onChange(date ? date.toISOString().split('T')[0] : '')}
                                                />
                                            )}
                                        />
                                    </FormItem>
                                    <FormItem label={"Permit Valid State(s)"} invalid={Boolean(errors.permitValidStates)} errorMessage={errors.permitValidStates?.toString()}>
                                        <Controller
                                            name="permitValidStates"
                                            control={control}
                                            render={({ field }) => (
                                                <Input type="text" autoComplete="off" placeholder="Permit Valid State(s)" {...field} />
                                            )}
                                        />
                                    </FormItem>
                                    <FormItem label={"Insurance Company"} invalid={Boolean(errors.insuranceCompany)} errorMessage={errors.insuranceCompany?.toString()}>
                                        <Controller
                                            name="insuranceCompany"
                                            control={control}
                                            render={({ field }) => (
                                                <Input type="text" autoComplete="off" placeholder="Insurance Company" {...field} />
                                            )}
                                        />
                                    </FormItem>
                                    <FormItem label={"Division / Branch Number"} invalid={Boolean(errors.divisionBranchNumber)} errorMessage={errors.divisionBranchNumber?.toString()}>
                                        <Controller
                                            name="divisionBranchNumber"
                                            control={control}
                                            render={({ field }) => (
                                                <Input type="text" autoComplete="off" placeholder="Division / Branch Number" {...field} />
                                            )}
                                        />
                                    </FormItem>
                                    <FormItem label={"Insurance Certificate Number"} invalid={Boolean(errors.insuranceCertificateNumber)} errorMessage={errors.insuranceCertificateNumber?.toString()}>
                                        <Controller
                                            name="insuranceCertificateNumber"
                                            control={control}
                                            render={({ field }) => (
                                                <Input type="text" autoComplete="off" placeholder="Insurance Certificate Number" {...field} />
                                            )}
                                        />
                                    </FormItem>
                                    <FormItem label={"Insurance Certificate Date"} invalid={Boolean(errors.insuranceCertificateDate)} errorMessage={errors.insuranceCertificateDate?.toString()}>
                                        <Controller
                                            name="insuranceCertificateDate"
                                            control={control}
                                            render={({ field }) => (
                                                <DatePicker
                                                    placeholder="Select Date"
                                                    value={field.value ? new Date(field.value) : undefined}
                                                    onChange={(date) => field.onChange(date ? date.toISOString().split('T')[0] : '')}
                                                />
                                            )}
                                        />
                                    </FormItem>
                                </div>
                            </Card>
                        </div>
                        <div className="md:w-[370px] gap-2 flex flex-col">
                            {/* Technical Specifications Section */}
                            <Card>
                                <h4 className="mb-6">Technical Specifications</h4>
                                <FormItem
                                    label={"Chassis Number *"}
                                    invalid={Boolean(errors.chassisNumber)}
                                    errorMessage={errors.chassisNumber?.message}
                                >
                                    <Controller
                                        name="chassisNumber"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                type="text"
                                                autoComplete="off"
                                                placeholder="Enter Chassis Number"
                                                {...field}
                                            />
                                        )}
                                    />
                                </FormItem>
                                <FormItem
                                    label={"Engine Number *"}
                                    invalid={Boolean(errors.engineNumber)}
                                    errorMessage={errors.engineNumber?.message}
                                >
                                    <Controller
                                        name="engineNumber"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                type="text"
                                                autoComplete="off"
                                                placeholder="Enter Engine Number"
                                                {...field}
                                            />
                                        )}
                                    />
                                </FormItem>
                            </Card>

                            {/* Compliance Section */}
                            <Card>
                                <h4 className="mb-6">Compliance</h4>
                                <FormItem label={""}>
                                    <Controller
                                        name="complianceType"
                                        control={control}
                                        render={({ field }) => (
                                            <Radio.Group
                                                name="complianceType"
                                                value={field.value}
                                                onChange={(val) => field.onChange(val as 'TDS' | 'RC')}
                                                className="flex items-center gap-2"
                                            >
                                                <Radio value="TDS">TDS</Radio>
                                                <Radio value="RC">RC</Radio>
                                            </Radio.Group>
                                        )}
                                    />
                                </FormItem>
                            </Card>
                        </div>
                    </div>
                </Container>
                <BottomStickyBar>
                    <Container>
                        <div className="flex items-center justify-between px-8">
                            <span></span>
                            <div className="flex items-center">
                                <Button
                                    className="ltr:mr-3 rtl:ml-3"
                                    type="button"
                                    customColorClass={() =>
                                        'border-error ring-1 ring-error text-error hover:border-error hover:ring-error hover:text-error bg-transparent'
                                    }
                                    icon={<TbTrash />}
                                    onClick={handleDiscard}
                                >
                                    Discard
                                </Button>
                                <Button variant="solid" type="submit" loading={isSubmiting}>
                                    Create
                                </Button>
                            </div>
                        </div>
                    </Container>
                </BottomStickyBar>
            </Form>
            <ConfirmDialog
                isOpen={discardConfirmationOpen}
                type="danger"
                title="Discard changes"
                onClose={handleCancel}
                onRequestClose={handleCancel}
                onCancel={handleCancel}
                onConfirm={handleConfirmDiscard}
            >
                <p>Are you sure you want discard this? This action can&apos;t be undo.</p>
            </ConfirmDialog>
        </>
    )
}

export default LorryCreate


