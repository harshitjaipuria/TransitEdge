import { NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma'
import { auth } from '@/auth'

const prisma = new PrismaClient()

export async function GET(request: Request) {
    try {
        const session = await auth()
        if (!session?.user?.id) {
            return NextResponse.json(
                { message: 'Unauthorized - Please log in' },
                { status: 401 },
            )
        }

        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')
        const sortByParam = searchParams.get('sortBy') || 'id'
        const sortOrder = (searchParams.get('sortOrder') || 'desc') as 'asc' | 'desc'

        // Normalize and whitelist sort field to prevent Prisma runtime errors
        const sortByNormalized = sortByParam.toLowerCase()
        const allowedSortFields = new Set(['id', 'broker_name', 'city', 'phone_number'])
        const sortBy: 'id' | 'broker_name' | 'city' | 'phone_number' =
            (allowedSortFields.has(sortByNormalized)
                ? (sortByNormalized as any)
                : 'id')

        const userId = Number(session.user.id)
        if (Number.isNaN(userId)) {
            return NextResponse.json(
                { message: 'Invalid user id in session' },
                { status: 400 },
            )
        }

        const skip = (page - 1) * limit

        const [total, rows] = await Promise.all([
            prisma.broker_master.count({ where: { user_id: userId } }),
            prisma.broker_master.findMany({
                where: { user_id: userId },
                orderBy: { [sortBy]: sortOrder },
                skip,
                take: limit,
            }),
        ])

        // Map DB rows to UI shape used by BrokerListTable/types as needed
        const list = rows.map((row) => ({
            id: row.id,
            name: row.broker_name || '-',
            personalInfo: {
                phoneNumber: row.phone_number ? row.phone_number.toString() : '',
                city: row.city || '',
            },
        }))

        return NextResponse.json(
            {
                success: true,
                data: { list, total },
            },
            { status: 200 },
        )
    } catch (error) {
        console.error('Error fetching brokers:', error)
        return NextResponse.json(
            { message: 'Failed to fetch brokers' },
            { status: 500 },
        )
    }
}
