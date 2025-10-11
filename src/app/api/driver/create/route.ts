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
        
        // Extract data from the request body
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
            licenseNumber,
            issueBy,
            licenseDate,
        } = body

        // Validate required fields
        if (!firstName || !lastName || !phoneNumber) {
            return NextResponse.json(
                { message: 'Missing required fields: firstName, lastName, and phoneNumber are required' },
                { status: 400 }
            )
        }

        // Convert phone number to BigInt for database storage (same as owner API)
        const fullPhoneNumber = dialCode ? `${dialCode}${phoneNumber}` : phoneNumber
        const phoneNumberBigInt = BigInt(fullPhoneNumber.replace(/\D/g, ''))

        // Convert tags array to string for database storage (same as owner API)
        const tagsString = tags && tags.length > 0 
            ? tags.map((tag: any) => tag.label || tag.value || tag).join(', ') 
            : null

        // Create driver in database
        const driver = await prisma.driverMaster.create({
            data: {
                UserID: session.user.id,
                DriverName: firstName,
                FathersName: lastName,
                Email: email || null,
                MobileNumber: phoneNumberBigInt,
                PhoneNumber: phoneNumberBigInt,
                Country: country || null,
                Address: address || null,
                City: city || null,
                PostalCode: postcode ? parseInt(postcode) : null,
                LicenseNumber: licenseNumber || null,
                IssuedBy: issueBy || null,
                LicenseDate: licenseDate || null,
                DriverTag: tagsString,
            },
        })

        // Convert BigInt fields to strings for JSON serialization
        const serializedDriver = {
            ...driver,
            MobileNumber: driver.MobileNumber?.toString() || null,
            PhoneNumber: driver.PhoneNumber?.toString() || null,
        }

        return NextResponse.json({
            success: true,
            message: 'Driver created successfully',
            data: serializedDriver,
        }, { status: 201 })

    } catch (error) {
        console.error('Error creating driver:', error)
        console.error('Error details:', {
            name: error instanceof Error ? error.name : 'Unknown',
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : 'No stack trace',
        })
        
        // Handle specific database errors
        if (error instanceof Error) {
            if (error.message.includes('Unique constraint')) {
                return NextResponse.json(
                    { message: 'Driver with this information already exists' },
                    { status: 409 }
                )
            }
            if (error.message.includes('Foreign key constraint')) {
                return NextResponse.json(
                    { message: 'Invalid user reference' },
                    { status: 400 }
                )
            }
        }
        
        return NextResponse.json(
            { 
                success: false,
                message: 'Failed to create driver',
                error: error instanceof Error ? error.message : 'Unknown error',
                details: process.env.NODE_ENV === 'development' ? error : undefined
            },
            { status: 500 }
        )
    } finally {
        await prisma.$disconnect()
    }
}
