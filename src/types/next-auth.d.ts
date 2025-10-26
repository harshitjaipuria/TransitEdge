declare module 'next-auth' {
    interface User {
        authority?: string[]
        role?: number
    }

    interface Session {
        user: {
            id: string
            name?: string | null
            email?: string | null
            image?: string | null
            authority?: string[]
            role?: number
        }
    }
}
