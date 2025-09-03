import { MegaMenu } from '@src/dtos'

const menu: MegaMenu[] = [
    {
        title: 'Master',
        lang: 'pe-master',
        icon: 'users-round',
        link: '#',
        separator: false,
        children: [
            {
                title: 'Broker Entry',
                lang: 'pe-broker-entry',
                link: '/master/broker-entry',
                dropdownPosition: null,
                children: [],
            },
            {
                title: 'Driver Entry',
                lang: 'pe-driver-entry',
                link: '/master/driver-entry',
                dropdownPosition: null,
                children: [],
            },
            {
                title: 'Owner Entry',
                lang: 'pe-owner-entry',
                link: '/master/owner-entry',
                dropdownPosition: null,
                children: [],
            },
            {
                title: 'Packing Method',
                lang: 'pe-packing-method',
                link: '/master/packing-method',
                dropdownPosition: null,
                children: [],
            },
            {
                title: 'Client',
                lang: 'pe-client',
                link: '/master/client',
                dropdownPosition: null,
                children: [],
            },
            {
                title: 'Consignee',
                lang: 'pe-consignee',
                link: '/master/consignee',
                dropdownPosition: null,
                children: [],
            },
            {
                title: 'Consignor',
                lang: 'pe-consignor',
                link: '/master/consignor',
                dropdownPosition: null,
                children: [],
            },
            {
                title: 'Goods Category',
                lang: 'pe-goods-category',
                link: '/master/goods-category',
                dropdownPosition: null,
                children: [],
            },
            {
                title: 'Goods',
                lang: 'pe-goods',
                link: '/master/goods',
                dropdownPosition: null,
                children: [],
            },
            {
                title: 'Lorry Master',
                lang: 'pe-lorry-master',
                link: '/master/lorry-master',
                dropdownPosition: null,
                children: [],
            },
            {
                title: 'Rate (Consignor)',
                lang: 'pe-rate-consignor',
                link: '/master/rate-consignor',
                dropdownPosition: null,
                children: [],
            },
            {
                title: 'Rate (General)',
                lang: 'pe-rate-general',
                link: '/master/rate-general',
                dropdownPosition: null,
                children: [],
            },
        ],
    },
]

export { menu }
