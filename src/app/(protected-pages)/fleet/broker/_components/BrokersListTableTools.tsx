'use client'

import BrokerListSearch from './BrokerListSearch'
import BrokerListTableFilter from './BrokerListTableFilter'

const BrokersListTableTools = () => {
    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <BrokerListSearch />
            <div className="flex items-center gap-2">
                <BrokerListTableFilter />
            </div>
        </div>
    )
}

export default BrokersListTableTools

