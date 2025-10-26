import { NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma'
import { auth } from '@/auth'

const prisma = new PrismaClient()

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const session = await auth()
        if (!session?.user?.id) {
            return NextResponse.json(
                { message: 'Unauthorized - Please log in' },
                { status: 401 },
            )
        }

        const { id } = await params
        const brokerId = parseInt(id)
        if (Number.isNaN(brokerId)) {
            return NextResponse.json(
                { message: 'Invalid broker id' },
                { status: 400 },
            )
        }

        const userId = Number(session.user.id)
        if (Number.isNaN(userId)) {
            return NextResponse.json(
                { message: 'Invalid user id in session' },
                { status: 400 },
            )
        }

        const body = await request.json()
        const {
            firstName,
            lastName,
            email,
            dialCode,
            phoneNumber,
            country,
            address,
            city,
            postcode,
            panNumber,
        }: {
            firstName?: string
            lastName?: string
            email?: string
            dialCode?: string
            phoneNumber?: string
            country?: string
            address?: string
            city?: string
            postcode?: string
            panNumber?: string
        } = body || {}

        // Ensure the broker exists and belongs to current user
        const existing = await prisma.broker_master.findFirst({
            where: { id: brokerId, user_id: userId },
        })
        if (!existing) {
            return NextResponse.json(
                { message: 'Broker not found' },
                { status: 404 },
            )
        }

        // Build update payload from provided fields
        const data: Record<string, string | null> = {}
        if (typeof firstName !== 'undefined') data.broker_name = firstName
        if (typeof lastName !== 'undefined') data.fathers_name = lastName
        if (typeof email !== 'undefined') data.email = email || null
        if (typeof panNumber !== 'undefined') data.pan_number = panNumber || null
        if (typeof country !== 'undefined') data.country = country || null
        if (typeof address !== 'undefined') data.address = address || null
        if (typeof city !== 'undefined') data.city = city || null
        if (typeof postcode !== 'undefined') data.postal_code = postcode ? parseInt(postcode).toString() : null

        if (typeof phoneNumber !== 'undefined' || typeof dialCode !== 'undefined') {
            const phoneStr =
                (typeof dialCode !== 'undefined' ? dialCode : '') +
                (typeof phoneNumber !== 'undefined' ? phoneNumber || '' : '')
            if (phoneStr) {
                const phoneNumberBigInt = BigInt(phoneStr.replace(/\D/g, ''))
                data.phone_number = phoneNumberBigInt.toString()
            } else {
                data.phone_number = null
            }
        }

        const updated = await prisma.broker_master.update({
            where: { id: brokerId },
            data,
        })

        const serialized = {
            ...updated,
            phone_number: updated.phone_number?.toString() || null,
        }

        return NextResponse.json(
            { success: true, message: 'Broker updated successfully', data: serialized },
            { status: 200 },
        )
    } catch (error) {
        console.error('Error updating broker:', error)
        return NextResponse.json(
            { message: 'Failed to update broker' },
            { status: 500 },
        )
    }
}






