import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_COLLAPSE,
} from '@/constants/navigation.constant'

import type { NavigationTree } from '@/@types/navigation'

const navigationConfig: NavigationTree[] = [
    {
        key: 'groupMenu',
        path: '',
        title: 'Group Menu',
        translateKey: 'Master',
        icon: 'groupMenu',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [],
        subMenu: [
            {
                key: 'groupMenu.fleet',
                path: '',
                title: 'Fleet',
                translateKey: 'nav.fleet',
                icon: 'fleet',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [],
                subMenu: [],
            },
        ],
    },
]

export default navigationConfig
