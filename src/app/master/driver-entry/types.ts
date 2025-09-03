// Driver Entry Types
export interface Driver {
  id: string
  name: string
  contactNumber: string
  fatherName: string
  address: string
  licenseNumber: string
  validUpto: string
  issuedBy: string
  createdAt: Date
  updatedAt: Date
  isActive: boolean
}

export interface DriverFormData {
  name: string
  contactNumber: string
  fatherName: string
  address: string
  licenseNumber: string
  validUpto: string
  issuedBy: string
}

export interface DriverListProps {
  drivers: Driver[]
  onEdit: (driver: Driver) => void
  onDelete: (id: string) => void
  onView: (driver: Driver) => void
}

export interface DriverFormProps {
  onSubmit: (data: DriverFormData) => void
  onCancel: () => void
  initialData?: Partial<DriverFormData>
  isLoading?: boolean
}

export interface DriverSearchProps {
  onSearch: (query: string) => void
  placeholder?: string
}

export interface DriverFilterProps {
  onFilter: (filters: DriverFilters) => void
  filters: DriverFilters
}

export interface DriverFilters {
  status: 'all' | 'active' | 'inactive'
  searchTerm: string
  sortBy: 'name' | 'email' | 'createdAt'
  sortOrder: 'asc' | 'desc'
}

export interface DriverTableProps {
  drivers: Driver[]
  onEdit: (driver: Driver) => void
  onDelete: (id: string) => void
  onView: (driver: Driver) => void
  isLoading?: boolean
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export interface DriverModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export interface DriverStats {
  totalDrivers: number
  activeDrivers: number
  inactiveDrivers: number
  recentDrivers: number
}

export interface DriverDashboardProps {
  stats: DriverStats
  recentDrivers: Driver[]
  onViewAll: () => void
}

// API Response Types
export interface DriverApiResponse {
  success: boolean
  data: Driver | Driver[]
  message: string
  error?: string
}

export interface DriverCreateRequest {
  name: string
  contactNumber: string
  email: string
  address: string
  licenseNumber: string
  vehicleNumber: string
}

export interface DriverUpdateRequest extends Partial<DriverCreateRequest> {
  id: string
}

export interface DriverDeleteRequest {
  id: string
}

// Form Validation Types
export interface DriverFormErrors {
  name?: string
  contactNumber?: string
  fatherName?: string
  address?: string
  licenseNumber?: string
  validUpto?: string
  issuedBy?: string
}

export interface DriverFormState {
  data: DriverFormData
  errors: DriverFormErrors
  isSubmitting: boolean
  isValid: boolean
}

// Component Props Types
export interface DriverCardProps {
  driver: Driver
  onEdit: (driver: Driver) => void
  onDelete: (id: string) => void
  onView: (driver: Driver) => void
}

export interface DriverHeaderProps {
  title: string
  subtitle?: string
  onAddNew: () => void
  showAddButton?: boolean
}

export interface DriverSidebarProps {
  drivers: Driver[]
  selectedDriver?: Driver
  onSelect: (driver: Driver) => void
  onAddNew: () => void
}

// Utility Types
export type DriverSortField = 'name' | 'email' | 'contactNumber' | 'createdAt'
export type DriverStatus = 'active' | 'inactive'
export type DriverViewMode = 'grid' | 'list' | 'table'

// Event Types
export interface DriverEvent {
  type: 'create' | 'update' | 'delete' | 'view'
  driver: Driver
  timestamp: Date
}

export interface DriverEventHandler {
  (event: DriverEvent): void
}
