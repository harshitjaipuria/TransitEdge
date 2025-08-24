import { StaticImageData } from 'next/image'

export interface TeacherListList {
  id: number
  teacherId: string
  teacherName: string
  image: string | StaticImageData
  email: string
  phone: string
  salary: string
  experience: string
  title: string
  date: string
  lastSchool: string
}
