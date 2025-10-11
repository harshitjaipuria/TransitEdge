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
        const sortBy = searchParams.get('sortBy') || 'sn_no'
        const sortOrder = searchParams.get('sortOrder') || 'desc'

        // Calculate offset for pagination
        const offset = (page - 1) * limit

        // Build where clause for search
        const whereClause: any = {
            user_id: session.user.id,
        }

        // Add search functionality
        if (search) {
            whereClause.OR = [
                { Owner_name: { contains: search, mode: 'insensitive' } },
                { father_name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
                { city: { contains: search, mode: 'insensitive' } },
                { country: { contains: search, mode: 'insensitive' } },
            ]
        }

        // Get total count for pagination
        const total = await prisma.owner_master.count({
            where: whereClause,
        })

        // Fetch owners with pagination and sorting
        const owners = await prisma.owner_master.findMany({
            where: whereClause,
            orderBy: {
                [sortBy]: sortOrder,
            },
            skip: offset,
            take: limit,
        })

        // Transform data to match frontend expectations
        const transformedOwners = owners.map((owner) => ({
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
        }))

        return NextResponse.json({
            status: 'success',
            data: {
                list: transformedOwners,
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        })
    } catch (error) {
        console.error('Fetch owners error:', error)
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        )
    } finally {
        await prisma.$disconnect()
    }
}
