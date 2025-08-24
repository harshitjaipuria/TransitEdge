export interface StaffLeaves {
  id: number
  staffId: string
  leaveType: string
  startDate: string
  endDate: string
  days: number
  reason: string
  approvedBy: string
  dateRequested: string
  dateApproved: string
  status: string
}
