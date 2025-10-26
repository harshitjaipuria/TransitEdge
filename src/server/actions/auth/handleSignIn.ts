'use server'

import { signIn } from '@/auth'
import appConfig from '@/configs/app.config'
import type { SignInCredential } from '@/@types/auth'

export const onSignInWithCredentials = async (
    { email, password }: SignInCredential,
    callbackUrl?: string,
) => {
    try {
        await signIn('credentials', {
            email,
            password,
            redirectTo: callbackUrl || appConfig.authenticatedEntryPath,
        })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        // Handle authentication errors
        if (error?.message?.includes('CredentialsSignin') || error?.message?.includes('Invalid')) {
            return { error: 'Invalid credentials!' }
        }
        return { error: 'Something went wrong!' }
    }
}
