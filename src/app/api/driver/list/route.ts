import { NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma'
import { auth } from '@/auth'

const prisma = new PrismaClient()

export async function GET(request: Request) {
    try {
        // Get the current user session
        const session = await auth()
        
        if (!session?.user?.id) {
            return NextResponse.json(
                { message: 'Unauthorized - Please log in' },
                { status: 401 }
            )
        }

        // Get query parameters for pagination
        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')
        const search = searchParams.get('search') || ''
        const sortBy = searchParams.get('sortBy') || 'ID'
        const sortOrder = searchParams.get('sortOrder') || 'desc'

        // Calculate offset for pagination
        const offset = (page - 1) * limit

        // Build where clause for search
        const whereClause: Record<string, unknown> = {
            UserID: session.user.id,
        }

        // Add search functionality
        if (search) {
            whereClause.OR = [
                { DriverName: { contains: search, mode: 'insensitive' } },
                { FathersName: { contains: search, mode: 'insensitive' } },
                { Email: { contains: search, mode: 'insensitive' } },
                { City: { contains: search, mode: 'insensitive' } },
                { Country: { contains: search, mode: 'insensitive' } },
                { LicenseNumber: { contains: search, mode: 'insensitive' } },
            ]
        }

        // Get total count for pagination
        const total = await prisma.driverMaster.count({
            where: whereClause,
        })

        // Fetch drivers with pagination and sorting
        const drivers = await prisma.driverMaster.findMany({
            where: whereClause,
            orderBy: {
                [sortBy]: sortOrder,
            },
            skip: offset,
            take: limit,
        })

        // Transform data to match frontend expectations
        const transformedDrivers = drivers.map((driver) => ({
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
        }))

        return NextResponse.json({
            success: true,
            data: {
                list: transformedDrivers,
                total: total,
                page: page,
                limit: limit,
            },
        })

    } catch (error) {
        console.error('Error fetching drivers:', error)
        return NextResponse.json(
            { 
                success: false,
                message: 'Failed to fetch drivers',
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        )
    } finally {
        await prisma.$disconnect()
    }
}
