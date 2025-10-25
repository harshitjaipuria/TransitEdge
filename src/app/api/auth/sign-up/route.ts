import { NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const {
            userName,
            phone,
            email,
            branch,
            password,
        }: {
            userName?: string
            phone?: string
            email?: string
            branch?: string
            password?: string
        } = body || {}

        if (!userName || !phone || !email || !password) {
            return NextResponse.json(
                { message: 'Missing required fields' },
                { status: 400 },
            )
        }

        const bcrypt = await import('bcryptjs')
        const passwordHash = await bcrypt.hash(password, 10)

        // Check unique constraints proactively to return 409 instead of 500
        const [existingByEmail, existingByPhone] = await Promise.all([
            prisma.users.findUnique({ where: { email_id: email } }),
            prisma.users.findUnique({ where: { phone_number: phone } }),
        ])

        if (existingByEmail) {
            return NextResponse.json(
                { message: 'Email already registered' },
                { status: 409 },
            )
        }

        if (existingByPhone) {
            return NextResponse.json(
                { message: 'Phone number already registered' },
                { status: 409 },
            )
        }

        const user = await prisma.users.create({
            data: {
                name: userName,
                phone_number: phone,
                email_id: email,
                password: passwordHash,
                branch: branch || null,
                office_type: 'default',
                role: 0, // Default role is 0 (user)
            },
        })

        return NextResponse.json(
            { status: 'success', message: 'User created', id: user.ID },
            { status: 201 },
        )
    } catch (error) {
        console.error('Sign-up error:', error)
        // Provide a safe error message
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 },
        )
    }
}
