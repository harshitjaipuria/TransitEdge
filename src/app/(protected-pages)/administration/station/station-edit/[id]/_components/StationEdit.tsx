'use client'

import { useState, useEffect, useMemo } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter, useParams } from 'next/navigation'
import { components } from 'react-select'

// UI Components
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Select, { Option as DefaultOption } from '@/components/ui/Select'
import Avatar from '@/components/ui/Avatar'
import NumericInput from '@/components/shared/NumericInput'
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
    stationName: string
    stationCode: string
    displayName: string
    email?: string
    dialCode: string
    phoneNumber: string
}

type AddressFields = {
    country: string
    address: string
    city: string
    zipCode: string
}

type ContactFields = {
    contactPerson: string
}

type ActivityFields = {
    activity1: boolean
    activity2: boolean
    activity3: boolean
    activity4: boolean
    activity5: boolean
    activity6: boolean
}

type StationFormSchema = OverviewFields &
    AddressFields &
    ContactFields &
    ActivityFields

// Validation Schema
const validationSchema = z.object({
    stationName: z.string().min(1, { message: 'Station name required' }),
    stationCode: z.string().min(1, { message: 'Station code required' }),
    displayName: z.string().min(1, { message: 'Display name required' }),
    email: z
        .string()
        .optional()
        .refine((val) => !val || z.string().email().safeParse(val).success, {
            message: 'Invalid email format',
        }),
    dialCode: z.string().min(1, { message: 'Please select your country code' }),
    phoneNumber: z
        .string()
        .min(1, { message: 'Please input your phone number' })
        .length(10, { message: 'Phone number must be exactly 10 digits' })
        .regex(/^\d{10}$/, { message: 'Phone number must contain only digits' }),
    country: z.string().min(1, { message: 'Please select a country' }),
    address: z.string().min(1, { message: 'Address required' }),
    city: z.string().min(1, { message: 'City required' }),
    zipCode: z.string().min(1, { message: 'Zip code required' }),
    contactPerson: z.string().min(1, { message: 'Contact person required' }),
    activity1: z.boolean().optional(),
    activity2: z.boolean().optional(),
    activity3: z.boolean().optional(),
    activity4: z.boolean().optional(),
    activity5: z.boolean().optional(),
    activity6: z.boolean().optional(),
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

const StationEdit = () => {
    const router = useRouter()
    const params = useParams()
    const stationId = params.id

    const [discardConfirmationOpen, setDiscardConfirmationOpen] = useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)
    const [loading, setLoading] = useState(true)

    const defaultValues: StationFormSchema = {
        stationName: '',
        stationCode: '',
        displayName: '',
        email: '',
        phoneNumber: '',
        dialCode: '',
        country: '',
        address: '',
        city: '',
        zipCode: '',
        contactPerson: '',
        activity1: false,
        activity2: false,
        activity3: false,
        activity4: false,
        activity5: false,
        activity6: false,
    }

    const {
        handleSubmit,
        reset,
        formState: { errors },
        control,
    } = useForm<StationFormSchema>({
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

    // Load station data
    useEffect(() => {
        const loadStationData = async () => {
            try {
                // TODO: Implement station fetch API call
                // const response = await fetch(`/api/station/${stationId}`)
                // const station = await response.json()
                
                // Mock data for now
                const station = {
                    station_name: 'Main Station',
                    station_code: 'STN001',
                    display_name: 'Main Station Mumbai',
                    email_id: 'main@station.com',
                    telephone: '9876543210',
                    country: 'IN',
                    address: '123 Main Street',
                    city: 'Mumbai',
                    zip_code: '400001',
                    contact_person: 'John Doe',
                    activity_1: 1,
                    activity_2: 0,
                    activity_3: 1,
                    activity_4: 0,
                    activity_5: 1,
                    activity_6: 0,
                }

                reset({
                    stationName: station.station_name || '',
                    stationCode: station.station_code || '',
                    displayName: station.display_name || '',
                    email: station.email_id || '',
                    phoneNumber: station.telephone ? station.telephone.toString().slice(-10) : '',
                    dialCode: '+91',
                    country: station.country || '',
                    address: station.address || '',
                    city: station.city || '',
                    zipCode: station.zip_code || '',
                    contactPerson: station.contact_person || '',
                    activity1: station.activity_1 === 1,
                    activity2: station.activity_2 === 1,
                    activity3: station.activity_3 === 1,
                    activity4: station.activity_4 === 1,
                    activity5: station.activity_5 === 1,
                    activity6: station.activity_6 === 1,
                })
            } catch (error) {
                console.error('Error loading station:', error)
                toast.push(
                    <Notification type="danger">Failed to load station data</Notification>,
                    { placement: 'top-center' }
                )
            } finally {
                setLoading(false)
            }
        }

        if (stationId) {
            loadStationData()
        }
    }, [stationId, reset])

    const handleFormSubmit = async (values: StationFormSchema) => {
        console.log('Submitted values', values)
        setIsSubmiting(true)
        
        try {
            // TODO: Implement station update API call
            // const response = await fetch(`/api/station/${stationId}`, {
            //     method: 'PUT',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(values),
            // })

            // const result = await response.json()

            // if (!response.ok) {
            //     throw new Error(result.message || 'Failed to update station')
            // }

            toast.push(
                <Notification type="success">Station updated successfully!</Notification>,
                { placement: 'top-center' },
            )
            router.push('/administration/station')
        } catch (error) {
            console.error('Error updating station:', error)
            toast.push(
                <Notification type="danger">
                    {error instanceof Error ? error.message : 'Failed to update station'}
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
            <Notification type="success">Changes discarded!</Notification>,
            { placement: 'top-center' },
        )
        router.push('/administration/station')
    }

    const handleDiscard = () => {
        setDiscardConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDiscardConfirmationOpen(false)
    }

    const onSubmit = (values: StationFormSchema) => {
        handleFormSubmit(values)
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Loading station data...</p>
                </div>
            </div>
        )
    }

    return (
        <>
            <style jsx>{`
                .form-label:after {
                    content: ' *';
                    color: #ef4444; /* red */
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
                                <h4 className="mb-6">Station Overview</h4>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <FormItem
                                        label="Station Name"
                                        invalid={Boolean(errors.stationName)}
                                        errorMessage={errors.stationName?.message}
                                    >
                                        <Controller
                                            name="stationName"
                                            control={control}
                                            render={({ field }) => (
                                                <Input
                                                    type="text"
                                                    autoComplete="off"
                                                    placeholder="Station Name"
                                                    {...field}
                                                />
                                            )}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Station Code"
                                        invalid={Boolean(errors.stationCode)}
                                        errorMessage={errors.stationCode?.message}
                                    >
                                        <Controller
                                            name="stationCode"
                                            control={control}
                                            render={({ field }) => (
                                                <Input
                                                    type="text"
                                                    autoComplete="off"
                                                    placeholder="Station Code"
                                                    {...field}
                                                />
                                            )}
                                        />
                                    </FormItem>
                                </div>
                                <FormItem
                                    label="Display Name"
                                    invalid={Boolean(errors.displayName)}
                                    errorMessage={errors.displayName?.message}
                                >
                                    <Controller
                                        name="displayName"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                type="text"
                                                autoComplete="off"
                                                placeholder="Display Name"
                                                {...field}
                                            />
                                        )}
                                    />
                                </FormItem>
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
                                        label="Zip Code"
                                        invalid={Boolean(errors.zipCode)}
                                        errorMessage={errors.zipCode?.message}
                                    >
                                        <Controller
                                            name="zipCode"
                                            control={control}
                                            render={({ field }) => (
                                                <Input
                                                    type="text"
                                                    autoComplete="off"
                                                    placeholder="Zip Code"
                                                    {...field}
                                                />
                                            )}
                                        />
                                    </FormItem>
                                </div>
                            </Card>
                        </div>
                        <div className="md:w-[370px] gap-4 flex flex-col">
                            {/* Contact Section */}
                            <Card>
                                <h4 className="mb-6">Contact Information</h4>
                                <FormItem
                                    label="Contact Person"
                                    invalid={Boolean(errors.contactPerson)}
                                    errorMessage={errors.contactPerson?.message}
                                >
                                    <Controller
                                        name="contactPerson"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                type="text"
                                                autoComplete="off"
                                                placeholder="Contact Person"
                                                {...field}
                                            />
                                        )}
                                    />
                                </FormItem>
                            </Card>

                            {/* Activities Section */}
                            <Card>
                                <h4 className="mb-6">Station Activities</h4>
                                <div className="space-y-3">
                                    {[
                                        { name: 'activity1', label: 'Booking' },
                                        { name: 'activity2', label: 'Delivery' },
                                        { name: 'activity3', label: 'Transhipment' },
                                        { name: 'activity4', label: 'Cash Booking' },
                                        { name: 'activity5', label: 'Credit Booking' },
                                        { name: 'activity6', label: 'ToPayBooking' },
                                    ].map((activity) => (
                                        <Controller
                                            key={activity.name}
                                            name={activity.name as keyof ActivityFields}
                                            control={control}
                                            render={({ field }) => (
                                                <label className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={field.value}
                                                        onChange={field.onChange}
                                                        className="rounded"
                                                    />
                                                    <span>{activity.label}</span>
                                                </label>
                                            )}
                                        />
                                    ))}
                                </div>
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
                                    Update
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

export default StationEdit
