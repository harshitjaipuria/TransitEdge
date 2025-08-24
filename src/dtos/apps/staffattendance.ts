// attendance
export interface Attendance {
  id: number
  date: string
  checkInTime: string
  checkOutTime: string
  workedTime?: string
  Difference?: string
  status: string
  shiftTime: string
}
