'use client'

import { useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { FormItem, Form } from '@/components/ui/Form'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { ZodType } from 'zod'
import type { CommonProps } from '@/@types/common'

type SignUpFormSchema = {
    userName: string
    phone: string
    password: string
    email: string
    branch: string
    confirmPassword: string
}

export type OnSignUpPayload = {
    values: SignUpFormSchema
    setSubmitting: (isSubmitting: boolean) => void
    setMessage: (message: string) => void
}

export type OnSignUp = (payload: OnSignUpPayload) => void

interface SignUpFormProps extends CommonProps {
    setMessage: (message: string) => void
    onSignUp?: OnSignUp
}

const validationSchema: ZodType<SignUpFormSchema> = z
    .object({
        email: z.string({ required_error: 'Please enter your email' }),
        userName: z
            .string({ required_error: 'Please enter your full name' })
            .min(1, 'Please enter your full name'),
        phone: z
            .string({ required_error: 'Please enter your mobile number' })
            .min(1, 'Please enter your mobile number')
            .length(10, { message: 'Phone number must be exactly 10 digits' })
            .regex(/^\d{10}$/, { message: 'Phone number must contain only digits' }),
        branch: z
            .string({ required_error: 'Please enter your branch' })
            .min(1, 'Please enter your branch'),
        password: z.string({ required_error: 'Password Required' }),
        confirmPassword: z.string({
            required_error: 'Confirm Password Required',
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Password not match',
        path: ['confirmPassword'],
    })

const SignUpForm = (props: SignUpFormProps) => {
    const { onSignUp, className, setMessage } = props

    const [isSubmitting, setSubmitting] = useState<boolean>(false)

    const {
        handleSubmit,
        control,
    } = useForm<SignUpFormSchema>({
        resolver: zodResolver(validationSchema),
    })

    const handleSignUp = async (values: SignUpFormSchema) => {
        if (onSignUp) {
            onSignUp({ values, setSubmitting, setMessage })
        }
    }

    return (
        <div className={className}>
            <Form onSubmit={handleSubmit(handleSignUp)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <FormItem
                        label="Full Name"
                        extra={<span className="text-red-500 ltr:ml-1">*</span>}
                    >
                        <Controller
                            name="userName"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    type="text"
                                    placeholder="Full Name"
                                    autoComplete="off"
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>
                    <FormItem
                        label="Mobile Number"
                        extra={<span className="text-red-500 ltr:ml-1">*</span>}
                    >
                        <Controller
                            name="phone"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    type="tel"
                                    placeholder="Mobile Number (10 digits)"
                                    autoComplete="tel"
                                    maxLength={10}
                                    {...field}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, '')
                                        field.onChange(value)
                                    }}
                                />
                            )}
                        />
                    </FormItem>
                    <FormItem
                        label="Email"
                        extra={<span className="text-red-500 ltr:ml-1">*</span>}
                    >
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    type="email"
                                    placeholder="Email"
                                    autoComplete="off"
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>
                    <FormItem
                        label="Branch"
                        extra={<span className="text-red-500 ltr:ml-1">*</span>}
                    >
                        <Controller
                            name="branch"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    type="text"
                                    placeholder="Branch"
                                    autoComplete="off"
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>
                    <FormItem
                        label="Password"
                        extra={<span className="text-red-500 ltr:ml-1">*</span>}
                    >
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    type="password"
                                    autoComplete="off"
                                    placeholder="Password"
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>
                    <FormItem
                        label="Confirm Password"
                        extra={<span className="text-red-500 ltr:ml-1">*</span>}
                    >
                        <Controller
                            name="confirmPassword"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    type="password"
                                    autoComplete="off"
                                    placeholder="Confirm Password"
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>
                    <div className="md:col-span-2">
                        <Button
                            block
                            loading={isSubmitting}
                            variant="solid"
                            type="submit"
                        >
                            {isSubmitting ? 'Creating Account...' : 'Sign Up'}
                        </Button>
                    </div>
                </div>
            </Form>
        </div>
    )
}

export default SignUpForm
