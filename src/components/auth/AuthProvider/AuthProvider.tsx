'use client'

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react'
import SessionContext from './SessionContext'
import type { Session as NextAuthSession } from 'next-auth'

type Session = NextAuthSession | null

type AuthProviderProps = {
    session: Session | null
    children: React.ReactNode
}

const AuthProvider = (props: AuthProviderProps) => {
    const { session, children } = props

    // Debug logging
        console.log('AuthProvider - session:', session?.user ? {
            id: session.user.id,
            authority: (session.user as { authority: string[] }).authority,
            role: (session.user as { role: number }).role
        } : 'No session')

    return (
        /** since the next auth useSession hook was triggering mutliple re-renders, hence we are using the our custom session provider and we still included the next auth session provider, incase we need to use any client hooks from next auth */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <NextAuthSessionProvider session={session as any} refetchOnWindowFocus={false}>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <SessionContext.Provider value={session as any}>
                {children}
            </SessionContext.Provider>
        </NextAuthSessionProvider>
    )
}

export default AuthProvider
