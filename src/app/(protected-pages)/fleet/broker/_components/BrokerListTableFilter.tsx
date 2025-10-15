'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import { Form, FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Checkbox from '@/components/ui/Checkbox'
import { TbFilter } from 'react-icons/tb'
import { useBrokerListStore } from '../_store/brokerListStore'
import useAppendQueryParams from '@/utils/hooks/useAppendQueryParams'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { ZodType } from 'zod'

type FormSchema = {
    brokerName: string
    licenseStatus: Array<string>
}

const licenseStatusList = [
    'Active',
    'Expired',
    'Expiring Soon',
    'Suspended',
    'Renewed',
]

const validationSchema: ZodType<FormSchema> = z.object({
    brokerName: z.string(),
    licenseStatus: z.array(z.string()),
})

const BrokerListTableFilter = () => {
    const [dialogIsOpen, setIsOpen] = useState(false)

    const filterData = useBrokerListStore((state) => state.filterData)
    const setFilterData = useBrokerListStore((state) => state.setFilterData)

    const { onAppendQueryParams } = useAppendQueryParams()

    const openDialog = () => {
        setIsOpen(true)
    }

    const onDialogClose = () => {
        setIsOpen(false)
    }

    const { handleSubmit, reset, control } = useForm<FormSchema>({
        defaultValues: filterData,
        resolver: zodResolver(validationSchema),
    })

    const onSubmit = (values: FormSchema) => {
        onAppendQueryParams({
            brokerName: values.brokerName,
            licenseStatus: values.licenseStatus.join(','),
        })

        setFilterData(values)
        setIsOpen(false)
    }

    return (
        <>
            <Button icon={<TbFilter />} onClick={() => openDialog()}>
                Filter
            </Button>
            <Dialog
                isOpen={dialogIsOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <h4 className="mb-4">Filter</h4>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <FormItem label="Broker Name">
                        <Controller
                            name="brokerName"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    type="text"
                                    autoComplete="off"
                                    placeholder="Search by broker name"
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>
                    <FormItem label="License Status">
                        <Controller
                            name="licenseStatus"
                            control={control}
                            render={({ field }) => (
                                <Checkbox.Group
                                    vertical
                                    className="flex mt-4"
                                    {...field}
                                >
                                    {licenseStatusList.map((status, index) => (
                                        <Checkbox
                                            key={status + index}
                                            name={field.name}
                                            value={status}
                                            className="justify-between flex-row-reverse heading-text"
                                        >
                                            {status}
                                        </Checkbox>
                                    ))}
                                </Checkbox.Group>
                            )}
                        />
                    </FormItem>
                    <div className="flex justify-end items-center gap-2 mt-4">
                        <Button type="button" onClick={() => reset()}>
                            Reset
                        </Button>
                        <Button type="submit" variant="solid">
                            Apply
                        </Button>
                    </div>
                </Form>
            </Dialog>
        </>
    )
}

export default BrokerListTableFilter
