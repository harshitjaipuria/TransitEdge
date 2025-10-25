'use client'

import { useState, useMemo } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter, useParams } from 'next/navigation'
import { components } from 'react-select'
import CreatableSelect from 'react-select/creatable'

// UI Components
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Select, { Option as DefaultOption } from '@/components/ui/Select'
import NumericInput from '@/components/shared/NumericInput'
import { Form, FormItem } from '@/components/ui/Form'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'

// Icons
import { TbTrash, TbArrowNarrowLeft } from 'react-icons/tb'

// Utils
import { countryList } from '@/constants/countries.constant'

// Types
import type { ControlProps, OptionProps } from 'react-select'
import type { Customer } from '../../../types'

// Form Schema Types
type OverviewFields = {
    firstName: string
    lastName: string
    email: string
    dialCode: string
    phoneNumber: string
}

type AddressFields = {
    country: string
    address: string
    postcode: string
    city: string
}

type TagsFields = {
    tags: Array<{ value: string; label: string }>
}

type PanFields = {
    panNumber: string
}

type CustomerFormSchema = OverviewFields &
    AddressFields &
    TagsFields &
    PanFields

// Validation Schema
const validationSchema = z.object({
    firstName: z.string().min(1, { message: 'Owner name required' }),
    lastName: z.string().min(1, { message: 'Father name required' }),
    email: z
        .string()
        .optional()
        .refine((val) => !val || z.string().email().safeParse(val).success, {
            message: 'Invalid email format',
        }),
    dialCode: z.string().min(1, { message: 'Please select your country code' }),
    phoneNumber: z
        .string()
        .min(1, { message: 'Please input your mobile number' })
        .length(10, { message: 'Phone number must be exactly 10 digits' })
        .regex(/^\d{10}$/, { message: 'Phone number must contain only digits' }),
    country: z.string().min(1, { message: 'Please select a country' }),
    address: z.string().min(1, { message: 'Address required' }),
    postcode: z.string().min(1, { message: 'Postcode required' }),
    city: z.string().min(1, { message: 'City required' }),
    tags: z.array(z.object({ value: z.string(), label: z.string() })),
    panNumber: z
        .string()
        .optional()
        .refine((val) => !val || val.length === 10, {
            message: 'PAN number must be exactly 10 characters',
        })
        .refine((val) => !val || /^[A-Z0-9]{10}$/.test(val), {
            message: 'PAN number must contain only uppercase letters and numbers',
        }),
})

type CountryOption = {
    label: string
    dialCode: string
    value: string
}

const { Control } = components

const CustomSelectOption = (props: OptionProps<CountryOption>) => {
    return (
        <DefaultOption<CountryOption>
            {...props}
            customLabel={(data) => (
                <span className="flex items-center gap-2">
                    <span>{data.dialCode}</span>
                </span>
            )}
        />
    )
}

const CustomControl = ({ children, ...props }: ControlProps<CountryOption>) => {
    return (
        <Control {...props}>
            {children}
        </Control>
    )
}

const CustomSelectOptionCountry = (props: OptionProps<CountryOption>) => {
    return (
        <DefaultOption<CountryOption>
            {...props}
            customLabel={(data, label) => (
                <span className="flex items-center gap-2">
                    <span>{label}</span>
                </span>
            )}
        />
    )
}

const CustomControlCountry = ({ children, ...props }: ControlProps<CountryOption>) => {
    return (
        <Control {...props}>
            {children}
        </Control>
    )
}

type CustomerEditProps = {
    data: Customer
}

const CustomerEdit = ({ data }: CustomerEditProps) => {
    const router = useRouter()
    const params = useParams()
    const ownerId = params.id as string

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)

    const defaultValues: CustomerFormSchema = {
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        email: data.email || '',
        phoneNumber: data.personalInfo.phoneNumber || '',
        dialCode: data.personalInfo.dialCode || '',
        country: data.personalInfo.country || '',
        address: data.personalInfo.address || '',
        city: data.personalInfo.city || '',
        postcode: data.personalInfo.postcode || '',
        tags: data.tags ? data.tags.split(', ').map((tag: string) => ({ value: tag, label: tag })) : [],
        panNumber: data.panNumber || '',
    }

    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<CustomerFormSchema>({
        defaultValues,
        resolver: zodResolver(validationSchema),
    })

    const dialCodeList = useMemo(() => {
        const newCountryList: Array<CountryOption> = JSON.parse(
            JSON.stringify(countryList),
        )

        return newCountryList.map((country) => {
            country.label = country.dialCode
            return country
        })
    }, [])

    const defaultTagOptions = [
        { value: 'frequentShoppers', label: 'Active' },
        { value: 'inactiveCustomers', label: 'Inactive' },
        { value: 'newCustomers', label: 'Discarded' },
    ]

    const handleFormSubmit = async (values: CustomerFormSchema) => {
        console.log('Submitted values', values)
        setIsSubmiting(true)
        
        try {
            const response = await fetch(`/api/owner/${ownerId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.message || 'Failed to update owner')
            }

            toast.push(
                <Notification type="success">Owner updated successfully!</Notification>,
                { placement: 'top-center' },
            )
            router.push('/fleet/owner')
        } catch (error) {
            console.error('Error updating owner:', error)
            toast.push(
                <Notification type="danger">
                    {error instanceof Error ? error.message : 'Failed to update owner'}
                </Notification>,
                { placement: 'top-center' },
            )
        } finally {
            setIsSubmiting(false)
        }
    }

    const handleConfirmDelete = async () => {
        try {
            const response = await fetch(`/api/owner/${ownerId}`, {
                method: 'DELETE',
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.message || 'Failed to delete owner')
            }

            toast.push(
                <Notification type="success">Owner deleted successfully!</Notification>,
                { placement: 'top-center' },
            )
            router.push('/fleet/owner')
        } catch (error) {
            console.error('Error deleting owner:', error)
        toast.push(
                <Notification type="danger">
                    {error instanceof Error ? error.message : 'Failed to delete owner'}
                </Notification>,
            { placement: 'top-center' },
        )
        } finally {
            setDeleteConfirmationOpen(false)
        }
    }

    const handleDelete = () => {
        setDeleteConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDeleteConfirmationOpen(false)
    }

    const handleBack = () => {
        router.push('/fleet/owner')
    }

    const onSubmit = (values: CustomerFormSchema) => {
        handleFormSubmit(values)
    }

    return (
        <>
            <Form
                className="flex w-full h-full"
                containerClassName="flex flex-col w-full justify-between"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Container>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="gap-4 flex flex-col flex-auto">
                            {/* Overview Section */}
                            <Card>
                                <h4 className="mb-6">Overview</h4>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <FormItem
                                        label="Owner Name"
                                        invalid={Boolean(errors.firstName)}
                                        errorMessage={errors.firstName?.message}
                                    >
                                        <Controller
                                            name="firstName"
                                            control={control}
                                            render={({ field }) => (
                                                <Input
                                                    type="text"
                                                    autoComplete="off"
                                                    placeholder="Owner Name"
                                                    {...field}
                                                />
                                            )}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Father's Name"
                                        invalid={Boolean(errors.lastName)}
                                        errorMessage={errors.lastName?.message}
                                    >
                                        <Controller
                                            name="lastName"
                                            control={control}
                                            render={({ field }) => (
                                                <Input
                                                    type="text"
                                                    autoComplete="off"
                                                    placeholder="Father's Name"
                                                    {...field}
                                                />
                                            )}
                                        />
                                    </FormItem>
                                </div>
                                <FormItem
                                    label="Email"
                                    invalid={Boolean(errors.email)}
                                    errorMessage={errors.email?.message}
                                >
                                    <Controller
                                        name="email"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                type="email"
                                                autoComplete="off"
                                                placeholder="Email"
                                                {...field}
                                            />
                                        )}
                                    />
                                </FormItem>
                                <div className="flex items-end gap-4 w-full">
                                    <FormItem
                                        invalid={
                                            Boolean(errors.phoneNumber) || Boolean(errors.dialCode)
                                        }
                                    >
                                        <label className="form-label mb-2">Phone number</label>
                                        <Controller
                                            name="dialCode"
                                            control={control}
                                            render={({ field }) => (
                                                <Select<CountryOption>
                                                    instanceId="dial-code"
                                                    options={dialCodeList}
                                                    {...field}
                                                    className="w-[150px]"
                                                    components={{
                                                        Option: CustomSelectOption,
                                                        Control: CustomControl,
                                                    }}
                                                    placeholder=""
                                                    value={dialCodeList.filter(
                                                        (option) => option.dialCode === field.value,
                                                    )}
                                                    onChange={(option) =>
                                                        field.onChange(option?.dialCode)
                                                    }
                                                />
                                            )}
                                        />
                                    </FormItem>
                                    <FormItem
                                        className="w-full"
                                        invalid={
                                            Boolean(errors.phoneNumber) || Boolean(errors.dialCode)
                                        }
                                        errorMessage={errors.phoneNumber?.message}
                                    >
                                        <Controller
                                            name="phoneNumber"
                                            control={control}
                                            render={({ field }) => (
                                                <NumericInput
                                                    autoComplete="off"
                                                    placeholder="Phone Number"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    onBlur={field.onBlur}
                                                    maxLength={10}
                                                />
                                            )}
                                        />
                                    </FormItem>
                                </div>
                            </Card>

                            {/* Address Section */}
                            <Card>
                                <h4 className="mb-6">Address Information</h4>
                                <FormItem
                                    label="Country"
                                    invalid={Boolean(errors.country)}
                                    errorMessage={errors.country?.message}
                                >
                                    <Controller
                                        name="country"
                                        control={control}
                                        render={({ field }) => (
                                            <Select<CountryOption>
                                                instanceId="country"
                                                options={countryList}
                                                {...field}
                                                components={{
                                                    Option: CustomSelectOptionCountry,
                                                    Control: CustomControlCountry,
                                                }}
                                                placeholder=""
                                                value={countryList.filter(
                                                    (option) => option.value === field.value,
                                                )}
                                                onChange={(option) => field.onChange(option?.value)}
                                            />
                                        )}
                                    />
                                </FormItem>
                                <FormItem
                                    label="Address"
                                    invalid={Boolean(errors.address)}
                                    errorMessage={errors.address?.message}
                                >
                                    <Controller
                                        name="address"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                type="text"
                                                autoComplete="off"
                                                placeholder="Address"
                                                {...field}
                                            />
                                        )}
                                    />
                                </FormItem>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormItem
                                        label="City"
                                        invalid={Boolean(errors.city)}
                                        errorMessage={errors.city?.message}
                                    >
                                        <Controller
                                            name="city"
                                            control={control}
                                            render={({ field }) => (
                                                <Input
                                                    type="text"
                                                    autoComplete="off"
                                                    placeholder="City"
                                                    {...field}
                                                />
                                            )}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Postal Code"
                                        invalid={Boolean(errors.postcode)}
                                        errorMessage={errors.postcode?.message}
                                    >
                                        <Controller
                                            name="postcode"
                                            control={control}
                                            render={({ field }) => (
                                                <Input
                                                    type="text"
                                                    autoComplete="off"
                                                    placeholder="Postal Code"
                                                    {...field}
                                                />
                                            )}
                                        />
                                    </FormItem>
                                </div>
                            </Card>
                        </div>
                        <div className="md:w-[370px] gap-4 flex flex-col">
                            {/* Tags Section */}
                            <Card>
                                <h4 className="mb-2">Customer Tags</h4>
                                <div className="mt-6">
                                    <Controller
                                        name="tags"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                isMulti
                                                isClearable
                                                instanceId="tags"
                                                placeholder="Add tags for customer..."
                                                componentAs={CreatableSelect}
                                                options={defaultTagOptions}
                                                onChange={(option) => field.onChange(option)}
                                            />
                                        )}
                                    />
                                </div>
                            </Card>

                            {/* PAN Details Section */}
                            <Card>
                                <h4 className="mb-6">PAN Details</h4>
                                <FormItem
                                    label="PAN Number"
                                    invalid={Boolean(errors.panNumber)}
                                    errorMessage={errors.panNumber?.message}
                                >
                                    <Controller
                                        name="panNumber"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                type="text"
                                                autoComplete="off"
                                                placeholder="Enter PAN Number (10 characters)"
                                                maxLength={10}
                                                style={{ textTransform: 'uppercase' }}
                                                {...field}
                                                onChange={(e) => {
                                                    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '')
                                                    field.onChange(value)
                                                }}
                                            />
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
                        <Button
                            className="ltr:mr-3 rtl:ml-3"
                            type="button"
                            variant="plain"
                            icon={<TbArrowNarrowLeft />}
                            onClick={handleBack}
                        >
                            Back
                        </Button>
                        <div className="flex items-center">
                            <Button
                                className="ltr:mr-3 rtl:ml-3"
                                type="button"
                                customColorClass={() =>
                                    'border-error ring-1 ring-error text-error hover:border-error hover:ring-error hover:text-error bg-transparent'
                                }
                                icon={<TbTrash />}
                                onClick={handleDelete}
                            >
                                Delete
                            </Button>
                            <Button
                                variant="solid"
                                type="submit"
                                loading={isSubmiting}
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </Container>
                </BottomStickyBar>
            </Form>
            <ConfirmDialog
                isOpen={deleteConfirmationOpen}
                type="danger"
                title="Remove owner"
                onClose={handleCancel}
                onRequestClose={handleCancel}
                onCancel={handleCancel}
                onConfirm={handleConfirmDelete}
            >
                <p>
                    Are you sure you want to remove this owner? This action
                    can&apos;t be undo.{' '}
                </p>
            </ConfirmDialog>
        </>
    )
}

export default CustomerEdit
