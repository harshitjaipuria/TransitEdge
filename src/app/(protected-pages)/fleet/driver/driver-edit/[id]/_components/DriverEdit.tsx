'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'

// UI Components
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Select, { Option as DefaultOption } from '@/components/ui/Select'
import { Form, FormItem } from '@/components/ui/Form'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'

// Utils
import { countryList } from '@/constants/countries.constant'

// Types
import type { Driver } from '../../types'

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

type DriverSpecificFields = {
    licenseNumber: string
    licenseExpiry: string
    experience: string
    tags: string
}

type DriverFormSchema = OverviewFields & AddressFields & DriverSpecificFields

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
    licenseNumber: z.string().min(1, { message: 'License number required' }),
    licenseExpiry: z.string().min(1, { message: 'License expiry date required' }),
    experience: z.string().min(1, { message: 'Experience required' }),
    tags: z.string().optional(),
})

type CountryOption = {
    label: string
    dialCode: string
    value: string
}

interface DriverEditProps {
    data: Driver
}

const DriverEdit = ({ data }: DriverEditProps) => {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<DriverFormSchema>({
        resolver: zodResolver(validationSchema),
        defaultValues: {
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            email: data.email || '',
            dialCode: data.personalInfo?.dialCode || '+91',
            phoneNumber: data.personalInfo?.phoneNumber || '',
            country: data.personalInfo?.country || 'IN',
            address: data.personalInfo?.address || '',
            postcode: data.personalInfo?.postcode || '',
            city: data.personalInfo?.city || '',
            licenseNumber: data.licenseNumber || '',
            licenseExpiry: data.licenseExpiry || '',
            experience: data.experience || '',
            tags: data.tags || '',
        },
    })

    const countryOptions: CountryOption[] = countryList.map((country) => ({
        label: country.name,
        dialCode: country.dialCode,
        value: country.code,
    }))

    const experienceOptions = [
        { value: '0-1', label: '0-1 years' },
        { value: '1-3', label: '1-3 years' },
        { value: '3-5', label: '3-5 years' },
        { value: '5-10', label: '5-10 years' },
        { value: '10+', label: '10+ years' },
    ]

    const onSubmit = async (formData: DriverFormSchema) => {
        setIsSubmitting(true)
        try {
            // TODO: Replace with actual API call
            const response = await fetch(`/api/driver/${data.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                toast.push(
                    <Notification type="success">Driver updated successfully!</Notification>,
                    { placement: 'top-center' }
                )
                router.push('/fleet/driver')
            } else {
                throw new Error('Failed to update driver')
            }
        } catch (error) {
            console.error('Error updating driver:', error)
            toast.push(
                <Notification type="danger">Failed to update driver. Please try again.</Notification>,
                { placement: 'top-center' }
            )
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleCancel = () => {
        router.push('/fleet/driver')
    }

    return (
        <Container>
            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <h3>Edit Driver</h3>
                </div>

                <Form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Basic Information */}
                        <Card>
                            <div className="p-6">
                                <h4 className="mb-4">Basic Information</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormItem
                                        label="Driver Name"
                                        invalid={!!errors.firstName}
                                        errorMessage={errors.firstName?.message}
                                    >
                                        <Controller
                                            name="firstName"
                                            control={control}
                                            render={({ field }) => (
                                                <Input {...field} placeholder="Enter driver name" />
                                            )}
                                        />
                                    </FormItem>

                                    <FormItem
                                        label="Father Name"
                                        invalid={!!errors.lastName}
                                        errorMessage={errors.lastName?.message}
                                    >
                                        <Controller
                                            name="lastName"
                                            control={control}
                                            render={({ field }) => (
                                                <Input {...field} placeholder="Enter father name" />
                                            )}
                                        />
                                    </FormItem>

                                    <FormItem
                                        label="Email"
                                        invalid={!!errors.email}
                                        errorMessage={errors.email?.message}
                                    >
                                        <Controller
                                            name="email"
                                            control={control}
                                            render={({ field }) => (
                                                <Input {...field} placeholder="Enter email address" />
                                            )}
                                        />
                                    </FormItem>

                                    <FormItem
                                        label="Phone Number"
                                        invalid={!!errors.phoneNumber}
                                        errorMessage={errors.phoneNumber?.message}
                                    >
                                        <div className="flex gap-2">
                                            <Controller
                                                name="dialCode"
                                                control={control}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        className="w-24"
                                                        placeholder="Code"
                                                    >
                                                        {countryOptions.map((option) => (
                                                            <DefaultOption
                                                                key={option.value}
                                                                value={option.value}
                                                            >
                                                                {option.dialCode}
                                                            </DefaultOption>
                                                        ))}
                                                    </Select>
                                                )}
                                            />
                                            <Controller
                                                name="phoneNumber"
                                                control={control}
                                                render={({ field }) => (
                                                    <Input
                                                        {...field}
                                                        placeholder="Phone number"
                                                        className="flex-1"
                                                    />
                                                )}
                                            />
                                        </div>
                                    </FormItem>
                                </div>
                            </div>
                        </Card>

                        {/* Driver Specific Information */}
                        <Card>
                            <div className="p-6">
                                <h4 className="mb-4">Driver Information</h4>
                                <div className="grid grid-cols-1 gap-4">
                                    <FormItem
                                        label="License Number"
                                        invalid={!!errors.licenseNumber}
                                        errorMessage={errors.licenseNumber?.message}
                                    >
                                        <Controller
                                            name="licenseNumber"
                                            control={control}
                                            render={({ field }) => (
                                                <Input {...field} placeholder="Enter license number" />
                                            )}
                                        />
                                    </FormItem>

                                    <FormItem
                                        label="License Expiry Date"
                                        invalid={!!errors.licenseExpiry}
                                        errorMessage={errors.licenseExpiry?.message}
                                    >
                                        <Controller
                                            name="licenseExpiry"
                                            control={control}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    type="date"
                                                    placeholder="Select expiry date"
                                                />
                                            )}
                                        />
                                    </FormItem>

                                    <FormItem
                                        label="Experience"
                                        invalid={!!errors.experience}
                                        errorMessage={errors.experience?.message}
                                    >
                                        <Controller
                                            name="experience"
                                            control={control}
                                            render={({ field }) => (
                                                <Select {...field} placeholder="Select experience">
                                                    {experienceOptions.map((option) => (
                                                        <DefaultOption
                                                            key={option.value}
                                                            value={option.value}
                                                        >
                                                            {option.label}
                                                        </DefaultOption>
                                                    ))}
                                                </Select>
                                            )}
                                        />
                                    </FormItem>

                                    <FormItem
                                        label="Tags"
                                        invalid={!!errors.tags}
                                        errorMessage={errors.tags?.message}
                                    >
                                        <Controller
                                            name="tags"
                                            control={control}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    placeholder="Enter tags (comma separated)"
                                                />
                                            )}
                                        />
                                    </FormItem>
                                </div>
                            </div>
                        </Card>

                        {/* Address Information */}
                        <Card className="lg:col-span-2">
                            <div className="p-6">
                                <h4 className="mb-4">Address Information</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <FormItem
                                        label="Country"
                                        invalid={!!errors.country}
                                        errorMessage={errors.country?.message}
                                    >
                                        <Controller
                                            name="country"
                                            control={control}
                                            render={({ field }) => (
                                                <Select {...field} placeholder="Select country">
                                                    {countryOptions.map((option) => (
                                                        <DefaultOption
                                                            key={option.value}
                                                            value={option.value}
                                                        >
                                                            {option.label}
                                                        </DefaultOption>
                                                    ))}
                                                </Select>
                                            )}
                                        />
                                    </FormItem>

                                    <FormItem
                                        label="City"
                                        invalid={!!errors.city}
                                        errorMessage={errors.city?.message}
                                    >
                                        <Controller
                                            name="city"
                                            control={control}
                                            render={({ field }) => (
                                                <Input {...field} placeholder="Enter city" />
                                            )}
                                        />
                                    </FormItem>

                                    <FormItem
                                        label="Postcode"
                                        invalid={!!errors.postcode}
                                        errorMessage={errors.postcode?.message}
                                    >
                                        <Controller
                                            name="postcode"
                                            control={control}
                                            render={({ field }) => (
                                                <Input {...field} placeholder="Enter postcode" />
                                            )}
                                        />
                                    </FormItem>

                                    <FormItem
                                        label="Address"
                                        invalid={!!errors.address}
                                        errorMessage={errors.address?.message}
                                        className="md:col-span-2 lg:col-span-4"
                                    >
                                        <Controller
                                            name="address"
                                            control={control}
                                            render={({ field }) => (
                                                <Input {...field} placeholder="Enter full address" />
                                            )}
                                        />
                                    </FormItem>
                                </div>
                            </div>
                        </Card>
                    </div>
                </Form>
            </div>

            <BottomStickyBar className="py-4 px-8 flex items-center justify-between">
                <Button onClick={handleCancel}>Cancel</Button>
                <Button
                    variant="solid"
                    loading={isSubmitting}
                    onClick={handleSubmit(onSubmit)}
                >
                    Update Driver
                </Button>
            </BottomStickyBar>
        </Container>
    )
}

export default DriverEdit
