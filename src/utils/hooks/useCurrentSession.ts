import { useContext } from 'react'
import SessionContext from '@/components/auth/AuthProvider/SessionContext'

const useCurrentSession = () => {
    const context = useContext(SessionContext)

    // Debug logging
    console.log('useCurrentSession - context:', context?.user ? {
        id: context.user.id,
        authority: (context.user as any).authority,
        role: (context.user as any).role
    } : 'No context')

    return {
        session: context || {
            expires: '',
            user: {},
        },
    }
}

export default useCurrentSession
