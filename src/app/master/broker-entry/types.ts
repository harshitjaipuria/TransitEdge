// Broker Entry Types
export interface Broker {
  id: string
  name: string
  contactNumber: string
  email: string
  address: string
  createdAt: Date
  updatedAt: Date
  isActive: boolean
}

export interface BrokerFormData {
  name: string
  contactNumber: string
  email: string
  address: string
  panNo: string
  gstIn: string
}

export interface BrokerListProps {
  brokers: Broker[]
  onEdit: (broker: Broker) => void
  onDelete: (id: string) => void
  onView: (broker: Broker) => void
}

export interface BrokerFormProps {
  onSubmit: (data: BrokerFormData) => void
  onCancel: () => void
  initialData?: Partial<BrokerFormData>
  isLoading?: boolean
}

export interface BrokerSearchProps {
  onSearch: (query: string) => void
  placeholder?: string
}

export interface BrokerFilterProps {
  onFilter: (filters: BrokerFilters) => void
  filters: BrokerFilters
}

export interface BrokerFilters {
  status: 'all' | 'active' | 'inactive'
  searchTerm: string
  sortBy: 'name' | 'email' | 'createdAt'
  sortOrder: 'asc' | 'desc'
}

export interface BrokerTableProps {
  brokers: Broker[]
  onEdit: (broker: Broker) => void
  onDelete: (id: string) => void
  onView: (broker: Broker) => void
  isLoading?: boolean
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export interface BrokerModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export interface BrokerStats {
  totalBrokers: number
  activeBrokers: number
  inactiveBrokers: number
  recentBrokers: number
}

export interface BrokerDashboardProps {
  stats: BrokerStats
  recentBrokers: Broker[]
  onViewAll: () => void
}

// API Response Types
export interface BrokerApiResponse {
  success: boolean
  data: Broker | Broker[]
  message: string
  error?: string
}

export interface BrokerCreateRequest {
  name: string
  contactNumber: string
  email: string
  address: string
  panNo: string
  gstIn: string
}

export interface BrokerUpdateRequest extends Partial<BrokerCreateRequest> {
  id: string
}

export interface BrokerDeleteRequest {
  id: string
}

// Form Validation Types
export interface BrokerFormErrors {
  name?: string
  contactNumber?: string
  email?: string
  address?: string
  panNo?: string
  gstIn?: string
}

export interface BrokerFormState {
  data: BrokerFormData
  errors: BrokerFormErrors
  isSubmitting: boolean
  isValid: boolean
}

// Component Props Types
export interface BrokerCardProps {
  broker: Broker
  onEdit: (broker: Broker) => void
  onDelete: (id: string) => void
  onView: (broker: Broker) => void
}

export interface BrokerHeaderProps {
  title: string
  subtitle?: string
  onAddNew: () => void
  showAddButton?: boolean
}

export interface BrokerSidebarProps {
  brokers: Broker[]
  selectedBroker?: Broker
  onSelect: (broker: Broker) => void
  onAddNew: () => void
}

// Utility Types
export type BrokerSortField = 'name' | 'email' | 'contactNumber' | 'createdAt'
export type BrokerStatus = 'active' | 'inactive'
export type BrokerViewMode = 'grid' | 'list' | 'table'

// Event Types
export interface BrokerEvent {
  type: 'create' | 'update' | 'delete' | 'view'
  broker: Broker
  timestamp: Date
}

export interface BrokerEventHandler {
  (event: BrokerEvent): void
}
