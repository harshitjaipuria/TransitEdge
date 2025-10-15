import { NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma'
import { auth } from '@/auth'

const prisma = new PrismaClient()

export async function POST(request: Request) {
    try {
        // Get the current user session
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json(
                { message: 'Unauthorized - Please log in' },
                { status: 401 },
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

        // Validate required fields
        if (!firstName || !lastName || !phoneNumber || !panNumber) {
            return NextResponse.json(
                { message: 'Missing required fields: firstName, lastName, phoneNumber and panNumber are required' },
                { status: 400 },
            )
        }

        // Normalize user id (broker_master.user_id is Int)
        const userId = Number(session.user.id)
        if (Number.isNaN(userId)) {
            return NextResponse.json(
                { message: 'Invalid user id in session' },
                { status: 400 },
            )
        }

        // Convert phone number to BigInt for database storage
        const fullPhoneNumber = dialCode ? `${dialCode}${phoneNumber}` : phoneNumber
        const phoneNumberBigInt = BigInt(fullPhoneNumber.replace(/\D/g, ''))

        // Create broker record in database
        const broker = await prisma.broker_master.create({
            data: {
                user_id: userId,
                broker_name: firstName,
                fathers_name: lastName,
                email: email || null,
                phone_number: phoneNumberBigInt,
                pan_number: panNumber,
                country: country || null,
                address: address || null,
                city: city || null,
                postal_code: postcode ? parseInt(postcode) : null,
            },
        })

        // Convert BigInt fields to strings for JSON serialization
        const serialized = {
            ...broker,
            phone_number: broker.phone_number?.toString() || null,
        }

        return NextResponse.json(
            {
                success: true,
                message: 'Broker created successfully',
                data: serialized,
            },
            { status: 201 },
        )
    } catch (error) {
        console.error('Error creating broker:', error)
        return NextResponse.json(
            { message: 'Failed to create broker' },
            { status: 500 },
        )
    }
}


