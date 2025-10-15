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

type PanFields = {
    panNumber: string
}

type AccountField = {
    banAccount?: boolean
    accountVerified?: boolean
}

type BrokerFormSchema = OverviewFields &
    AddressFields &
    PanFields &
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
    // tags removed
    panNumber: z
        .string()
        .length(10, { message: 'PAN number must be exactly 10 characters' })
        .refine((val) => /^[A-Z0-9]{10}$/.test(val), {
            message: 'PAN number must contain only uppercase letters and numbers',
        }),
})

type CountryOption = {
    label: string
    dialCode: string
    value: string
}

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
        <components.Control {...props}>
            {selected && (
                <Avatar
                    className="ltr:ml-4 rtl:mr-4"
                    shape="circle"
                    size={20}
                    src={`/img/countries/${selected.value}.png`}
                />
            )}
            {children}
        </components.Control>
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
        <components.Control {...props}>
            {selected && (
                <Avatar
                    className="ltr:ml-4 rtl:mr-4"
                    shape="circle"
                    size={20}
                    src={`/img/countries/${selected.value}.png`}
                />
            )}
            {children}
        </components.Control>
    )
}

const BrokerCreate = () => {
    const router = useRouter()

    const [discardConfirmationOpen, setDiscardConfirmationOpen] = useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)

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
        panNumber: '',
        banAccount: false,
        accountVerified: true,
    }

    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<BrokerFormSchema>({
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

    // tags removed

    const handleFormSubmit = async (values: BrokerFormSchema) => {
        console.log('Submitted values', values)
        setIsSubmiting(true)
        
        try {
            const response = await fetch('/api/broker/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.message || 'Failed to create broker')
            }

            toast.push(
                <Notification type="success">Broker created successfully!</Notification>,
                { placement: 'top-center' },
            )
            router.push('/fleet/broker')
        } catch (error) {
            console.error('Error creating broker:', error)
            toast.push(
                <Notification type="danger">
                    {error instanceof Error ? error.message : 'Failed to create broker'}
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

    return (
        <>
            <Form
                className="flex w-full h-full"
                containerClassName="flex flex-col w-full justify-between"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Container>
                    <style jsx>{`
                        .form-label:after {
                            content: ' *';
                            color: #ef4444;
                        }
                    `}</style>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="gap-4 flex flex-col flex-auto">
                            {/* Overview Section */}
                            <Card>
                                <h4 className="mb-6">Overview</h4>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <FormItem
                                        invalid={Boolean(errors.firstName)}
                                        errorMessage={errors.firstName?.message}
                                    >
                                        <label className="form-label mb-2">Broker Name</label>
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
                                        invalid={Boolean(errors.lastName)}
                                        errorMessage={errors.lastName?.message}
                                    >
                                        <label className="form-label mb-2">Father's Name</label>
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
                                    invalid={Boolean(errors.country)}
                                    errorMessage={errors.country?.message}
                                >
                                    <label className="form-label mb-2">Country</label>
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
                                    invalid={Boolean(errors.address)}
                                    errorMessage={errors.address?.message}
                                >
                                    <label className="form-label mb-2">Address</label>
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
                                        invalid={Boolean(errors.city)}
                                        errorMessage={errors.city?.message}
                                    >
                                        <label className="form-label mb-2">City</label>
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
                                        invalid={Boolean(errors.postcode)}
                                        errorMessage={errors.postcode?.message}
                                    >
                                        <label className="form-label mb-2">Postal Code</label>
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

                        </div>
                        <div className="md:w-[370px] gap-4 flex flex-col">
                            {/* PAN Details Section */}
                            <Card>
                                <h4 className="mb-6">PAN Details</h4>
                                <FormItem
                                    invalid={Boolean((errors as any).panNumber)}
                                    errorMessage={(errors as any).panNumber?.message}
                                >
                                    <label className="form-label mb-2">PAN Number</label>
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
                                                    const value = e.target.value
                                                        .toUpperCase()
                                                        .replace(/[^A-Z0-9]/g, '')
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

export default BrokerCreate
