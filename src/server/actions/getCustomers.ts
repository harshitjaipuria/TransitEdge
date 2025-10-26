import wildCardSearch from '@/utils/wildCardSearch'
import sortBy, { Primer } from '@/utils/sortBy'
import paginate from '@/utils/paginate'

const getCustomers = async (_queryParams: {
    [key: string]: string | string[] | undefined
}) => {
    const queryParams = _queryParams

    const {
        pageIndex = '1',
        pageSize = '10',
        sortKey = '',
        order,
        query,
    } = queryParams

    // TODO: Replace with actual database query
    // For now, returning empty data to remove mock data
    const customers: unknown[] = []

    let data = structuredClone(customers)
    let total = customers.length

    if (sortKey) {
        if (sortKey !== 'totalSpending') {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (data as any).sort(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                sortBy((sortKey || '') as string, order === 'desc', (a: any) =>
                    (a as string).toUpperCase(),
                ),
            )
        } else {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (data as any).sort(
                sortBy(sortKey as string, order === 'desc', parseInt as Primer),
            )
        }
    }

    if (query) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data = wildCardSearch(data as any, query as string)
        total = data.length
    }

    data = paginate(
        data,
        parseInt(pageSize as string),
        parseInt(pageIndex as string),
    )

    return {
        list: data,
        total: total,
    }
}

export default getCustomers
