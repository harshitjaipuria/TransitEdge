import NextAuth from 'next-auth'
import appConfig from '@/configs/app.config'
import authConfig from '@/configs/auth.config'

const config = {
    ...authConfig,
    pages: {
        signIn: appConfig.authenticatedEntryPath,
        error: appConfig.authenticatedEntryPath,
    },
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const nextAuthInstance = (NextAuth as any)(config)
export const { handlers, signIn, signOut, auth } = nextAuthInstance
