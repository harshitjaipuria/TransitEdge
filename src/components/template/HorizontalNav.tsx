'use client'

import HorizontalMenuContent from './HorizontalMenuContent'
import useCurrentSession from '@/utils/hooks/useCurrentSession'
import useNavigation from '@/utils/hooks/useNavigation'
import queryRoute from '@/utils/queryRoute'
import appConfig from '@/configs/app.config'
import { usePathname } from 'next/navigation'

const HorizontalNav = ({
    translationSetup = appConfig.activeNavTranslation,
}: {
    translationSetup?: boolean
}) => {
    const pathname = usePathname()

    const route = queryRoute(pathname)

    const currentRouteKey = route?.key || ''

    const { session } = useCurrentSession()

    const { navigationTree } = useNavigation()

    // Debug logging
    console.log('HorizontalNav - session:', session)
    console.log('HorizontalNav - session.user:', session?.user)
    console.log('HorizontalNav - session.user.authority:', session?.user?.authority)
    console.log('HorizontalNav - (session.user as { authority: string[] }).authority:', (session?.user as { authority: string[] })?.authority)

    return (
        <HorizontalMenuContent
            navigationTree={navigationTree}
            routeKey={currentRouteKey}
            userAuthority={(session?.user as { authority: string[] })?.authority || []}
            translationSetup={translationSetup}
        />
    )
}

export default HorizontalNav
