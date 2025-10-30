import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_COLLAPSE,
} from '@/constants/navigation.constant'

import type { NavigationTree } from '@/@types/navigation'
import { ADMIN, USER } from '@/constants/roles.constant'

const navigationConfig: NavigationTree[] = [
    {
        key: 'administration',
        path: '',
        title: 'Administration',
        translateKey: 'Administration',
        icon: 'building',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [ADMIN],
        meta: {
            horizontalMenu: {
                layout: 'tabs',
                columns: 2,
            },
        },
        subMenu: [
            {
                key: 'administration.station',
                path: '/administration/station',
                title: 'Station Management',
                translateKey: 'nav.administration.station',
                icon: 'building',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [ADMIN],
                meta: {
                    description: {
                        translateKey: 'nav.administration.station.desc',
                        label: 'Manage stations and locations',
                    },
                },
                subMenu: [
                    {
                        key: 'administration.station.list',
                        path: '/administration/station',
                        title: 'Create Station',
                        translateKey: 'nav.administration.station.list',
                        icon: 'list',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN],
                        subMenu: [],
                    },
                ],
            },
        ],
    },
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
            {
                key: 'clientManagement.menu',
                path: '',
                title: 'Client Management',
                translateKey: 'Masters',
                icon: 'users',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [ADMIN, USER],
                subMenu: [
                    {
                        key: 'clientManagement.consignee',
                        path: '/client-management/consignee',
                        title: 'Consignee',
                        translateKey: 'nav.client.management.consignee',
                        icon: 'user',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        subMenu: [],
                    },
                    {
                        key: 'clientManagement.cosignor',
                        path: '/client-management/cosignor',
                        title: 'Cosignor',
                        translateKey: 'nav.client.management.cosignor',
                        icon: 'user',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        subMenu: [],
                    }
                ],
            },
        ],
    },
]

export default navigationConfig
