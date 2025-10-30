import ConsignorListSearch from './ConsignorListSearch'
import ConsignorListTableFilter from './ConsignorListTableFilter'

const ConsignorsListTableTools = () => {
    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <ConsignorListSearch />
            <div className="flex items-center gap-2">
                <ConsignorListTableFilter />
            </div>
        </div>
    )
}

export default ConsignorsListTableTools
