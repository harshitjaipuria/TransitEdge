import ConsigneeListSearch from './ConsigneeListSearch'
import ConsigneeListTableFilter from './ConsigneeListTableFilter'

const ConsigneesListTableTools = () => {
    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <ConsigneeListSearch />
            <div className="flex items-center gap-2">
                <ConsigneeListTableFilter />
            </div>
        </div>
    )
}

export default ConsigneesListTableTools
