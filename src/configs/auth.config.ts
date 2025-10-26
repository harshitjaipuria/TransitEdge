import Credentials from 'next-auth/providers/credentials'

import type { SignInCredential } from '@/@types/auth'

// eslint-disable-next-line import/no-anonymous-default-export
const authConfig = {
    providers: [
        Credentials({
            async authorize(credentials) {
                /** validate credentials from backend here */
                const { default: validateCredential } = await import(
                    '@/server/actions/user/validateCredential'
                )
                const user = await validateCredential(credentials as SignInCredential)
                if (!user) {
                    return null
                }

                return {
                    id: user.id,
                    name: user.userName,
                    email: user.email,
                    image: user.avatar,
                    role: user.role,
                }
            },
        }),
    ],
    callbacks: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async jwt({ token, user }: { token: any; user: any }) {
            if (user && 'role' in user) {
                token.role = (user as { role: number }).role
                console.log('JWT callback - user role:', (user as { role: number }).role, 'token role:', token.role)
            }
            return token
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async session(payload: any) {
            /** apply extra user attributes here, for example, we add 'authority' & 'id' in this section */
            const userRole = payload.token.role as number
            const authority = userRole === 1 ? ['admin'] : ['user']
            
            // Debug logging
            console.log('Session callback - userRole:', userRole, 'authority:', authority)
            
            return {
                ...payload.session,
                user: {
                    ...payload.session.user,
                    id: payload.token.sub,
                    authority: authority,
                    role: userRole,
                },
            }
        },
    },
}

export default authConfig
