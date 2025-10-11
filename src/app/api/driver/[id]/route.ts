import { NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma'
import { auth } from '@/auth'

const prisma = new PrismaClient()

// GET single driver
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth()
        
        if (!session?.user?.id) {
            return NextResponse.json(
                { message: 'Unauthorized - Please log in' },
                { status: 401 }
            )
        }

        const { id } = await params
        const driverId = parseInt(id)

        if (isNaN(driverId)) {
            return NextResponse.json(
                { message: 'Invalid driver ID' },
                { status: 400 }
            )
        }

        const driver = await prisma.driverMaster.findFirst({
            where: {
                ID: driverId,
                UserID: session.user.id, // Ensure user can only access their own drivers
            },
        })

        if (!driver) {
            return NextResponse.json(
                { message: 'Driver not found' },
                { status: 404 }
            )
        }

        // Transform data to match frontend expectations
        const transformedDriver = {
            id: driver.ID.toString(),
            name: driver.DriverName || '',
            firstName: driver.DriverName || '',
            lastName: driver.FathersName || '',
            email: driver.Email || '',
            img: '', // Default empty image
            role: 'driver',
            lastOnline: Date.now(),
            status: 'active',
            personalInfo: {
                location: driver.City || '',
                title: '',
                birthday: '',
                phoneNumber: driver.MobileNumber?.toString() || '',
                dialCode: '',
                address: driver.Address || '',
                postcode: driver.PostalCode?.toString() || '',
                city: driver.City || '',
                country: driver.Country || '',
                facebook: '',
                twitter: '',
                pinterest: '',
                linkedIn: '',
            },
            orderHistory: [],
            paymentMethod: [],
            subscription: [],
            totalSpending: 0,
            licenseNumber: driver.LicenseNumber || '',
            licenseExpiry: driver.LicenseDate || '',
            experience: '',
            tags: driver.DriverTag || '',
        }

        return NextResponse.json({
            success: true,
            data: transformedDriver,
        })

    } catch (error) {
        console.error('Error fetching driver:', error)
        return NextResponse.json(
            { 
                success: false,
                message: 'Failed to fetch driver',
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        )
    } finally {
        await prisma.$disconnect()
    }
}

// UPDATE driver
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth()
        
        if (!session?.user?.id) {
            return NextResponse.json(
                { message: 'Unauthorized - Please log in' },
                { status: 401 }
            )
        }

        const { id } = await params
        const driverId = parseInt(id)

        if (isNaN(driverId)) {
            return NextResponse.json(
                { message: 'Invalid driver ID' },
                { status: 400 }
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

        // Check if driver exists and belongs to current user
        const existingDriver = await prisma.driverMaster.findFirst({
            where: {
                ID: driverId,
                UserID: session.user.id,
            },
        })

        if (!existingDriver) {
            return NextResponse.json(
                { message: 'Driver not found' },
                { status: 404 }
            )
        }

        // Combine dial code and phone number
        const fullPhoneNumber = dialCode ? `${dialCode}${phoneNumber}` : phoneNumber
        const phoneNumberBigInt = fullPhoneNumber ? BigInt(fullPhoneNumber.replace(/\D/g, '')) : null

        // Convert tags array to string
        const tagsString = tags && tags.length > 0 
            ? tags.map((tag: any) => tag.label || tag.value || tag).join(', ')
            : null

        // Update driver in database
        const updatedDriver = await prisma.driverMaster.update({
            where: {
                ID: driverId,
            },
            data: {
                DriverName: firstName || null,
                FathersName: lastName || null,
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
                DriverTag: tagsString || null,
            },
        })

        return NextResponse.json({
            success: true,
            message: 'Driver updated successfully',
            data: updatedDriver,
        })

    } catch (error) {
        console.error('Error updating driver:', error)
        return NextResponse.json(
            { 
                success: false,
                message: 'Failed to update driver',
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        )
    } finally {
        await prisma.$disconnect()
    }
}

// DELETE driver
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth()
        
        if (!session?.user?.id) {
            return NextResponse.json(
                { message: 'Unauthorized - Please log in' },
                { status: 401 }
            )
        }

        const { id } = await params
        const driverId = parseInt(id)

        if (isNaN(driverId)) {
            return NextResponse.json(
                { message: 'Invalid driver ID' },
                { status: 400 }
            )
        }

        // Check if driver exists and belongs to current user
        const existingDriver = await prisma.driverMaster.findFirst({
            where: {
                ID: driverId,
                UserID: session.user.id,
            },
        })

        if (!existingDriver) {
            return NextResponse.json(
                { message: 'Driver not found' },
                { status: 404 }
            )
        }

        // Delete driver from database
        await prisma.driverMaster.delete({
            where: {
                ID: driverId,
            },
        })

        return NextResponse.json({
            success: true,
            message: 'Driver deleted successfully',
        })

    } catch (error) {
        console.error('Error deleting driver:', error)
        return NextResponse.json(
            { 
                success: false,
                message: 'Failed to delete driver',
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        )
    } finally {
        await prisma.$disconnect()
    }
}
