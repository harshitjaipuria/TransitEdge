'use client'

import { useMemo } from 'react'
import isEmpty from 'lodash/isEmpty'

function useAuthority(
    userAuthority: string[] = [],
    authority: string[] = [],
    emptyCheck = false,
) {
    const roleMatched = useMemo(() => {
        const result = authority.some((role) => userAuthority.includes(role))
        console.log('useAuthority - userAuthority:', userAuthority, 'authority:', authority, 'roleMatched:', result)
        return result
    }, [authority, userAuthority])

    if (
        isEmpty(authority) ||
        isEmpty(userAuthority) ||
        typeof authority === 'undefined'
    ) {
        return !emptyCheck
    }

    return roleMatched
}

export default useAuthority
