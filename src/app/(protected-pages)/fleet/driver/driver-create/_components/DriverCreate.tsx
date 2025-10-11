'use client'

import { useState, useEffect, useMemo } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { components } from 'react-select'
import CreatableSelect from 'react-select/creatable'
import isEmpty from 'lodash/isEmpty'

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

type DriverFormSchema = OverviewFields &
    AddressFields &
    TagsFields &
    LicenseFields &
    AccountField

// Validation Schema
const validationSchema = z.object({
    firstName: z.string().min(1, { message: 'Driver name required' }),
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
                    <Avatar
                        shape="circle"
                        size={20}
                        src={`/img/countries/${data.value}.png`}
                    />
                    <span>{data.dialCode}</span>
                </span>
            )}
        />
    )
}

const CustomControl = ({ children, ...props }: ControlProps<CountryOption>) => {
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

const CustomSelectOptionCountry = (props: OptionProps<CountryOption>) => {
    return (
        <DefaultOption<CountryOption>
            {...props}
            customLabel={(data, label) => (
                <span className="flex items-center gap-2">
                    <Avatar
                        shape="circle"
                        size={20}
                        src={`/img/countries/${data.value}.png`}
                    />
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

const DriverCreate = () => {
    const router = useRouter()

    const [discardConfirmationOpen, setDiscardConfirmationOpen] = useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)

    const defaultValues: DriverFormSchema = {
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
        reset,
        formState: { errors },
        control,
    } = useForm<DriverFormSchema>({
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


    const handleFormSubmit = async (values: DriverFormSchema) => {
        console.log('Submitted values', values)
        setIsSubmiting(true)
        
        try {
            const response = await fetch('/api/driver/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.message || 'Failed to create driver')
            }

            toast.push(
                <Notification type="success">Driver created successfully!</Notification>,
                { placement: 'top-center' },
            )
            router.push('/fleet/driver')
        } catch (error) {
            console.error('Error creating driver:', error)
            toast.push(
                <Notification type="danger">
                    {error instanceof Error ? error.message : 'Failed to create driver'}
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
            <Notification type="success">Driver discarded!</Notification>,
            { placement: 'top-center' },
        )
        router.push('/fleet/driver')
    }

    const handleDiscard = () => {
        setDiscardConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDiscardConfirmationOpen(false)
    }

    const onSubmit = (values: DriverFormSchema) => {
        handleFormSubmit(values)
    }

    return (
        <>
            <style jsx>{`
                .form-label:after {
                    content: ' *';
                    color: #ef4444;
                }
                .form-label-with-asterisk:after {
                    content: ' *';
                    color: #ef4444;
                }
            `}</style>
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
                                        label={
                                            <span>
                                                Driver Name <span className="text-red-500">*</span>
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
                                                    placeholder="Driver Name"
                                                    {...field}
                                                />
                                            )}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label={
                                            <span>
                                                Father's Name <span className="text-red-500">*</span>
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
                                        <label className="form-label mb-2">
                                            Phone number <span className="text-red-500"></span>
                                        </label>
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
                                                placeholder="Address"
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
                                                    placeholder="City"
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
                                <h4 className="mb-2">Driver Tags</h4>
                                <div className="mt-6">
                                    <Controller
                                        name="tags"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                isMulti
                                                isClearable
                                                instanceId="tags"
                                                placeholder="Add tags for driver..."
                                                componentAs={CreatableSelect}
                                                options={defaultTagOptions}
                                                onChange={(option) => field.onChange(option)}
                                            />
                                        )}
                                    />
                                </div>
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
                                <Button
                                    variant="solid"
                                    type="submit"
                                    loading={isSubmiting}
                                >
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
                <p>
                    Are you sure you want discard this? This action can&apos;t
                    be undo.{' '}
                </p>
            </ConfirmDialog>
        </>
    )
}

export default DriverCreate