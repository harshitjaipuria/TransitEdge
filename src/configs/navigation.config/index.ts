import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_COLLAPSE,
} from '@/constants/navigation.constant'

import type { NavigationTree } from '@/@types/navigation'
import { ADMIN, USER } from '@/constants/roles.constant'

const navigationConfig: NavigationTree[] = [
    {
        key: 'fleet',
        path: '',
        title: 'Fleet',
        translateKey: 'Masters',
        icon: 'fleet',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [ADMIN, USER],
        meta: {
            horizontalMenu: {
                layout: 'tabs',
                columns: 2,
            },
        },
        subMenu: [
            {
                key: 'fleet.management',
                path: '',
                title: 'Fleet Management',
                translateKey: 'nav.fleet.management',
                icon: 'fleet',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [ADMIN, USER],
                meta: {
                    description: {
                        translateKey: 'nav.fleet.management.desc',
                        label: 'Manage vehicles and drivers',
                    },
                },
                subMenu: [
                    {
                        key: 'fleet.management.owner',
                        path: '/fleet/owner',
                        title: 'Owner',
                        translateKey: 'nav.fleet.owner',
                        icon: 'user',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        subMenu: [],
                    },
                    {
                        key: 'fleet.management.driver',
                        path: '/fleet/driver',
                        title: 'Driver',
                        translateKey: 'nav.fleet.driver',
                        icon: 'id-badge',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        subMenu: [],
                    },
                    {
                        key: 'fleet.management.lorry',
                        path: '/fleet/lorry',
                        title: 'Lorry',
                        translateKey: 'nav.fleet.lorry',
                        icon: 'truck',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        subMenu: [],
                    },
                    {
                        key: 'fleet.management.broker',
                        path: '/fleet/broker',
                        title: 'Broker',
                        translateKey: 'nav.fleet.broker',
                        icon: 'handshake',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        subMenu: [],
                    },
                ],
            },
        ],
    },
]

export default navigationConfig
