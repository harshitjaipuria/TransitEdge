import { NextResponse } from 'next/server'
import { auth } from '@/auth'

export async function GET() {
    try {
        // Test authentication
        const session = await auth()
        console.log('Auth session:', session)
        
        return NextResponse.json({
            success: true,
            message: 'Auth test successful',
            session: session ? {
                user: session.user,
                hasUser: !!session.user,
                hasUserId: !!session.user?.id
            } : null
        })
    } catch (error) {
        console.error('Auth test error:', error)
        return NextResponse.json(
            { 
                success: false,
                message: 'Auth test failed',
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        )
    }
}
