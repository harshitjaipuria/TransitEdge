type LeaveType = 'casual' | 'sick' | 'maternity' | 'emergency' | 'vacation'

// leave from
export interface LeaveForm {
  leaveType: LeaveType
  contactNumber: string
  emergencyNumber: string
  startDate: Date | null
  endDate: Date | null
  reason: string
  totalDays: number
}

// staff-leave-add
export interface Leaves {
  casual: number
  sick: number
  maternity: number
  emergency: number
  vacation: number
}
