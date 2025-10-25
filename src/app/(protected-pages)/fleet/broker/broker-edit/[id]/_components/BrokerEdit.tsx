'use client'

import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { components } from 'react-select'
import CreatableSelect from 'react-select/creatable'

// UI Components
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import NumericInput from '@/components/shared/NumericInput'
import DatePicker from '@/components/ui/DatePicker'
import { Form, FormItem } from '@/components/ui/Form'
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
    firstName: string
    lastName: string
    email?: string
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

type LicenseFields = {
    licenseNumber: string
    issueBy: string
    licenseDate: string
}

type AccountField = {
    banAccount?: boolean
    accountVerified?: boolean
}

type BrokerFormSchema = OverviewFields &
    AddressFields &
    TagsFields &
    LicenseFields &
    AccountField

// Validation Schema
const validationSchema = z.object({
    firstName: z.string().min(1, { message: 'Broker name required' }),
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
    licenseNumber: z.string().min(1, { message: 'License number required' }).max(15, { message: 'License number must be maximum 15 characters' }),
    issueBy: z.string().min(1, { message: 'Issue by required' }),
    licenseDate: z.string().min(1, { message: 'License date required' }),
})

type CountryOption = {
    value: string
    label: string
    flag: string
    dialCode: string
}

const Control = ({ children, ...props }: ControlProps<CountryOption>) => {
    const selected = props.getValue()[0]
    return (
        <components.Control {...props}>
            {selected && (
                <img
                    className="w-4 h-4 ml-2"
                    src={`/img/countries/${selected.value}.png`}
                    alt={selected.value}
                />
            )}
            {children}
        </components.Control>
    )
}

const Option = ({ children, ...props }: OptionProps<CountryOption>) => {
    const { flag } = props.data
    return (
        <components.Option {...props}>
            <div className="flex items-center gap-2">
                <img className="w-4 h-4" src={`/img/countries/${flag}.png`} alt={flag} />
                {children}
            </div>
        </components.Option>
    )
}

interface BrokerEditProps {
    brokerId: string
}

const BrokerEdit = ({ brokerId }: BrokerEditProps) => {
    const router = useRouter()

    const [discardConfirmationOpen, setDiscardConfirmationOpen] = useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const defaultValues: BrokerFormSchema = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        dialCode: '',
        country: '',
        address: '',
        city: '',
        postcode: '',
        tags: [],
        licenseNumber: '',
        issueBy: '',
        licenseDate: '',
        banAccount: false,
        accountVerified: true,
    }

    const {
        handleSubmit,
        formState: { errors },
        control,
        setValue,
    } = useForm<BrokerFormSchema>({
        defaultValues,
        resolver: zodResolver(validationSchema),
    })

    const dialCodeList = [
        { value: 'IN', label: '+91', flag: 'IN', dialCode: '+91' },
        { value: 'US', label: '+1', flag: 'US', dialCode: '+1' },
        { value: 'GB', label: '+44', flag: 'GB', dialCode: '+44' },
    ]

    const defaultTagOptions = [
        { value: 'frequentShoppers', label: 'Active' },
        { value: 'inactiveCustomers', label: 'Inactive' },
        { value: 'newCustomers', label: 'Discarded' },
    ]

    // Load broker data
    useEffect(() => {
        const loadBrokerData = async () => {
            try {
                setIsLoading(true)
                const response = await fetch(`/api/broker/${brokerId}`)
                const result = await response.json()

                if (!response.ok) {
                    throw new Error(result.message || 'Failed to fetch broker')
                }

                const broker = result.data
                
                // Set form values
                setValue('firstName', broker.firstName || '')
                setValue('lastName', broker.lastName || '')
                setValue('email', broker.email || '')
                setValue('phoneNumber', broker.personalInfo?.phoneNumber || '')
                setValue('dialCode', broker.personalInfo?.dialCode || '+91')
                setValue('country', broker.personalInfo?.country || '')
                setValue('address', broker.personalInfo?.address || '')
                setValue('city', broker.personalInfo?.city || '')
                setValue('postcode', broker.personalInfo?.postcode || '')
                setValue('licenseNumber', broker.licenseNumber || '')
                setValue('issueBy', broker.issueBy || '')
                setValue('licenseDate', broker.licenseExpiry || '')
                
                // Set tags
                if (broker.tags) {
                    const tagArray = broker.tags.split(', ')
                    const formattedTags = tagArray.map((tag: string) => ({
                        value: tag.toLowerCase().replace(/\s+/g, ''),
                        label: tag
                    }))
                    setValue('tags', formattedTags)
                }

            } catch (error) {
                console.error('Error loading broker data:', error)
                toast.push(
                    <Notification type="danger">
                        {error instanceof Error ? error.message : 'Failed to load broker data'}
                    </Notification>,
                    { placement: 'top-center' },
                )
            } finally {
                setIsLoading(false)
            }
        }

        if (brokerId) {
            loadBrokerData()
        }
    }, [brokerId, setValue])

    const handleFormSubmit = async (values: BrokerFormSchema) => {
        console.log('Submitted values', values)
        setIsSubmiting(true)
        
        try {
            const response = await fetch(`/api/broker/${brokerId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.message || 'Failed to update broker')
            }

            toast.push(
                <Notification type="success">Broker updated successfully!</Notification>,
                { placement: 'top-center' },
            )
            router.push('/fleet/broker')
        } catch (error) {
            console.error('Error updating broker:', error)
            toast.push(
                <Notification type="danger">
                    {error instanceof Error ? error.message : 'Failed to update broker'}
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
            <Notification type="success">Broker discarded!</Notification>,
            { placement: 'top-center' },
        )
        router.push('/fleet/broker')
    }

    const handleDiscard = () => {
        setDiscardConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDiscardConfirmationOpen(false)
    }

    const onSubmit = (values: BrokerFormSchema) => {
        handleFormSubmit(values)
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-2 text-gray-600">Loading broker data...</p>
                </div>
            </div>
        )
    }

    return (
        <>
            <Form
                className="flex w-full h-full"
                containerClassName="flex flex-col w-full justify-between"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Container>
                    <div className="flex flex-col gap-4">
                        <div className="gap-4 flex flex-col flex-auto">
                            {/* Overview Section */}
                            <Card>
                                <h4 className="mb-6">Overview</h4>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <FormItem
                                        label={
                                            <span>
                                                Broker Name <span className="text-red-500">*</span>
                                            </span>
                                        }
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
                                                    placeholder="Enter broker name"
                                                    {...field}
                                                />
                                            )}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label={
                                            <span>
                                                Father&apos;s Name <span className="text-red-500">*</span>
                                            </span>
                                        }
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
                                                    placeholder="Enter father's name"
                                                    {...field}
                                                />
                                            )}
                                        />
                                    </FormItem>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4 mt-4">
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
                                                    placeholder="Enter email address"
                                                    {...field}
                                                />
                                            )}
                                        />
                                    </FormItem>
                                    <FormItem
                                        invalid={
                                            Boolean(errors.phoneNumber) || Boolean(errors.dialCode)
                                        }
                                    >
                                        <label className="form-label mb-2">
                                            Phone number <span className="text-red-500">*</span>
                                        </label>
                                        <Controller
                                            name="dialCode"
                                            control={control}
                                            render={({ field }) => (
                                                <Select<CountryOption>
                                                    className="mb-2"
                                                    placeholder="Country Code"
                                                    options={dialCodeList}
                                                    value={dialCodeList.find(
                                                        (country) => country.dialCode === field.value,
                                                    )}
                                                    onChange={(option) => field.onChange(option?.dialCode)}
                                                    components={{
                                                        Control,
                                                        Option,
                                                    }}
                                                />
                                            )}
                                        />
                                        <Controller
                                            name="phoneNumber"
                                            control={control}
                                            render={({ field }) => (
                                                <NumericInput
                                                    placeholder="Phone Number"
                                                    {...field}
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
                                    label={
                                        <span>
                                            Country <span className="text-red-500">*</span>
                                        </span>
                                    }
                                    invalid={Boolean(errors.country)}
                                    errorMessage={errors.country?.message}
                                >
                                    <Controller
                                        name="country"
                                        control={control}
                                        render={({ field }) => (
                                            <Select<CountryOption>
                                                placeholder="Select Country"
                                                options={countryList}
                                                value={countryList.find(
                                                    (country) => country.value === field.value,
                                                )}
                                                onChange={(option) => field.onChange(option?.value)}
                                                components={{
                                                    Control,
                                                    Option,
                                                }}
                                            />
                                        )}
                                    />
                                </FormItem>
                                <FormItem
                                    label={
                                        <span>
                                            Address <span className="text-red-500">*</span>
                                        </span>
                                    }
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
                                                placeholder="Enter address"
                                                {...field}
                                            />
                                        )}
                                    />
                                </FormItem>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormItem
                                        label={
                                            <span>
                                                City <span className="text-red-500">*</span>
                                            </span>
                                        }
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
                                                    placeholder="Enter city"
                                                    {...field}
                                                />
                                            )}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label={
                                            <span>
                                                Postal Code <span className="text-red-500">*</span>
                                            </span>
                                        }
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
                                                    placeholder="Enter postal code"
                                                    {...field}
                                                />
                                            )}
                                        />
                                    </FormItem>
                                </div>
                            </Card>

                            {/* Broker Tags Section */}
                            <Card>
                                <h4 className="mb-6">Broker Tags</h4>
                                <FormItem label="Broker Tags">
                                    <Controller
                                        name="tags"
                                        control={control}
                                        render={({ field }) => (
                                            <CreatableSelect
                                                isMulti
                                                placeholder="Select or create broker tags"
                                                options={defaultTagOptions}
                                                value={field.value}
                                                onChange={(value) => field.onChange(value)}
                                                className="react-select"
                                                classNamePrefix="select"
                                            />
                                        )}
                                    />
                                </FormItem>
                            </Card>

                            {/* License Details Section */}
                            <Card>
                                <h4 className="mb-6">License Details</h4>
                                <FormItem
                                    label={
                                        <span>
                                            License No <span className="text-red-500">*</span>
                                        </span>
                                    }
                                    invalid={Boolean(errors.licenseNumber)}
                                    errorMessage={errors.licenseNumber?.message}
                                >
                                    <Controller
                                        name="licenseNumber"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                type="text"
                                                autoComplete="off"
                                                placeholder="Enter License Number"
                                                maxLength={15}
                                                {...field}
                                                onChange={(e) => {
                                                    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '')
                                                    field.onChange(value)
                                                }}
                                            />
                                        )}
                                    />
                                </FormItem>
                                <FormItem
                                    label={
                                        <span>
                                            Issue By <span className="text-red-500">*</span>
                                        </span>
                                    }
                                    invalid={Boolean(errors.issueBy)}
                                    errorMessage={errors.issueBy?.message}
                                >
                                    <Controller
                                        name="issueBy"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                type="text"
                                                autoComplete="off"
                                                placeholder="Enter Issue By"
                                                {...field}
                                            />
                                        )}
                                    />
                                </FormItem>
                                <FormItem
                                    label={
                                        <span>
                                            License Date <span className="text-red-500">*</span>
                                        </span>
                                    }
                                    invalid={Boolean(errors.licenseDate)}
                                    errorMessage={errors.licenseDate?.message}
                                >
                                    <Controller
                                        name="licenseDate"
                                        control={control}
                                        render={({ field }) => (
                                            <DatePicker
                                                placeholder="Select License Date"
                                                value={field.value ? new Date(field.value) : undefined}
                                                onChange={(date) => field.onChange(date ? date.toISOString().split('T')[0] : '')}
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
                        <div className="flex items-center justify-between">
                            <Button
                                type="button"
                                variant="plain"
                                onClick={handleDiscard}
                                icon={<TbTrash />}
                            >
                                Discard
                            </Button>
                            <div className="flex items-center gap-2">
                                <Button
                                    type="button"
                                    variant="plain"
                                    onClick={() => router.push('/fleet/broker')}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="solid"
                                    loading={isSubmiting}
                                >
                                    Update Broker
                                </Button>
                            </div>
                        </div>
                    </Container>
                </BottomStickyBar>
            </Form>
            <ConfirmDialog
                isOpen={discardConfirmationOpen}
                onClose={handleCancel}
                onRequestClose={handleCancel}
                type="danger"
                title="Discard Broker"
                onCancel={handleCancel}
                onConfirm={handleConfirmDiscard}
            >
                <p>
                    Are you sure you want to discard this broker? All data will be
                    permanently deleted.
                </p>
            </ConfirmDialog>
        </>
    )
}

export default BrokerEdit
