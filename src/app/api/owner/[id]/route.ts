import { NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma'
import { auth } from '@/auth'

const prisma = new PrismaClient()

// GET - Fetch single owner by ID
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Get the current user session
        const session = await auth()
        
        if (!session?.user?.id) {
            return NextResponse.json(
                { message: 'Unauthorized - Please log in' },
                { status: 401 }
            )
        }

        const { id } = await params

        // Fetch owner by ID and user_id
        const owner = await prisma.owner_master.findFirst({
            where: {
                sn_no: parseInt(id),
                user_id: session.user.id,
            },
        })

        if (!owner) {
            return NextResponse.json(
                { message: 'Owner not found' },
                { status: 404 }
            )
        }

        // Transform data to match frontend expectations
        const transformedOwner = {
            id: owner.sn_no.toString(),
            name: owner.Owner_name || '',
            firstName: owner.Owner_name || '',
            lastName: owner.father_name || '',
            email: owner.email || '',
            img: '', // No image field in owner_master
            role: 'Owner',
            lastOnline: Date.now(),
            status: 'active', // Default status
            personalInfo: {
                location: `${owner.city || ''}, ${owner.country || ''}`.trim().replace(/^,\s*|,\s*$/g, ''),
                title: 'Owner',
                birthday: '',
                phoneNumber: owner.phone_number?.toString() || '',
                dialCode: '',
                address: owner.address || '',
                postcode: owner.postal_code?.toString() || '',
                city: owner.city || '',
                country: owner.country || '',
                facebook: '',
                twitter: '',
                pinterest: '',
                linkedIn: '',
            },
            orderHistory: [],
            paymentMethod: [],
            subscription: [],
            totalSpending: 0,
            // Additional owner-specific fields
            panNumber: owner.pan_number || '',
            tags: owner.tags || '',
        }

        return NextResponse.json({
            status: 'success',
            data: transformedOwner,
        })
    } catch (error) {
        console.error('Fetch owner error:', error)
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        )
    } finally {
        await prisma.$disconnect()
    }
}

// PUT - Update owner
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Get the current user session
        const session = await auth()
        
        if (!session?.user?.id) {
            return NextResponse.json(
                { message: 'Unauthorized - Please log in' },
                { status: 401 }
            )
        }

        const { id } = await params
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

        // Check if owner exists and belongs to current user
        const existingOwner = await prisma.owner_master.findFirst({
            where: {
                sn_no: parseInt(id),
                user_id: session.user.id,
            },
        })

        if (!existingOwner) {
            return NextResponse.json(
                { message: 'Owner not found' },
                { status: 404 }
            )
        }

        // Convert phone number to BigInt for database storage
        const fullPhoneNumber = dialCode ? `${dialCode}${phoneNumber}` : phoneNumber
        const phoneNumberBigInt = BigInt(fullPhoneNumber.replace(/\D/g, ''))

        // Convert tags array to string for database storage
        const tagsString = tags && tags.length > 0 
            ? tags.map(tag => tag.label).join(', ') 
            : null

        // Update owner record in database
        const updatedOwner = await prisma.owner_master.update({
            where: {
                sn_no: parseInt(id),
            },
            data: {
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

        return NextResponse.json({
            status: 'success',
            message: 'Owner updated successfully',
            data: {
                id: updatedOwner.sn_no,
                ownerName: updatedOwner.Owner_name,
                fatherName: updatedOwner.father_name,
            },
        })
    } catch (error) {
        console.error('Update owner error:', error)
        
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

// DELETE - Delete owner
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Get the current user session
        const session = await auth()
        
        if (!session?.user?.id) {
            return NextResponse.json(
                { message: 'Unauthorized - Please log in' },
                { status: 401 }
            )
        }

        const { id } = await params

        // Check if owner exists and belongs to current user
        const existingOwner = await prisma.owner_master.findFirst({
            where: {
                sn_no: parseInt(id),
                user_id: session.user.id,
            },
        })

        if (!existingOwner) {
            return NextResponse.json(
                { message: 'Owner not found' },
                { status: 404 }
            )
        }

        // Delete owner record
        await prisma.owner_master.delete({
            where: {
                sn_no: parseInt(id),
            },
        })

        return NextResponse.json({
            status: 'success',
            message: 'Owner deleted successfully',
        })
    } catch (error) {
        console.error('Delete owner error:', error)
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        )
    } finally {
        await prisma.$disconnect()
    }
}
