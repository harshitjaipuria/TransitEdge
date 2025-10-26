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

        // Get query parameters
        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')
        const search = searchParams.get('search') || ''
        const sortBy = searchParams.get('sortBy') || 'id'
        const sortOrder = searchParams.get('sortOrder') || 'desc'

        // Calculate offset
        const offset = (page - 1) * limit

        // Build where clause for search
        const whereClause = search ? {
            OR: [
                { station_name: { contains: search } },
                { station_code: { contains: search } },
                { city: { contains: search } },
                { contact_person: { contains: search } },
                { email_id: { contains: search } }
            ]
        } : {}

        // Build order by clause
        const orderBy: Record<string, string> = {}
        orderBy[sortBy] = sortOrder

        // Get total count for pagination
        const total = await prisma.station.count({
            where: whereClause
        })

        // Fetch stations with pagination
        const stations = await prisma.station.findMany({
            where: whereClause,
            orderBy: orderBy,
            skip: offset,
            take: limit
        })

        // Transform data for frontend
        const transformedStations = stations.map(station => ({
            id: station.id,
            station_code: station.station_code,
            station_name: station.station_name,
            address: station.address,
            city: station.city,
            zip_code: station.zip_code,
            country: station.country,
            display_name: station.display_name,
            telephone: station.telephone ? station.telephone.toString() : null,
            email_id: station.email_id,
            contact_person: station.contact_person,
            activity_1: station.activity_1,
            activity_2: station.activity_2,
            activity_3: station.activity_3,
            activity_4: station.activity_4,
            activity_5: station.activity_5,
            activity_6: station.activity_6,
            created_at: station.created_at?.toISOString()
        }))

        return NextResponse.json({
            status: 'success',
            data: transformedStations,
            total: total,
            page: page,
            limit: limit,
            totalPages: Math.ceil(total / limit)
        })

    } catch (error) {
        console.error('Get stations list error:', error)
        
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        )
    } finally {
        await prisma.$disconnect()
    }
}
