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
                { status: 401 }
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
            tags,
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
            tags?: Array<{ value: string; label: string }>
            panNumber?: string
        } = body || {}

        // Validate required fields
        if (!firstName || !lastName || !phoneNumber) {
            return NextResponse.json(
                { message: 'Missing required fields: firstName, lastName, and phoneNumber are required' },
                { status: 400 }
            )
        }

        // Convert phone number to BigInt for database storage
        const fullPhoneNumber = dialCode ? `${dialCode}${phoneNumber}` : phoneNumber
        const phoneNumberBigInt = BigInt(fullPhoneNumber.replace(/\D/g, ''))

        // Convert tags array to string for database storage
        const tagsString = tags && tags.length > 0 
            ? tags.map(tag => tag.label).join(', ') 
            : null

        // Create owner record in database
        const owner = await prisma.owner_master.create({
            data: {
                user_id: session.user.id,
                Owner_name: firstName,
                father_name: lastName,
                email: email || null,
                phone_number: phoneNumberBigInt,
                pan_number: panNumber || null,
                country: country || null,
                address: address || null,
                city: city || null,
                postal_code: postcode ? parseInt(postcode) : null,
                tags: tagsString,
            },
        })

        return NextResponse.json(
            { 
                status: 'success', 
                message: 'Owner created successfully', 
                data: {
                    id: owner.sn_no,
                    ownerName: owner.Owner_name,
                    fatherName: owner.father_name,
                }
            },
            { status: 201 }
        )
    } catch (error) {
        console.error('Create owner error:', error)
        
        // Handle specific database errors
        if (error instanceof Error) {
            if (error.message.includes('Unique constraint')) {
                return NextResponse.json(
                    { message: 'Owner with this information already exists' },
                    { status: 409 }
                )
            }
        }
        
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        )
    } finally {
        await prisma.$disconnect()
    }
}
