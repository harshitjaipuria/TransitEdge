import { StaticImageData } from 'next/image'

// Projects List
export interface Assignee {
  image: string | StaticImageData
  name: string
}

// Projects List
export interface ProjectList {
  id: number
  projectImage: string | StaticImageData
  image: string | StaticImageData
  projectName: string
  clientName: string
  dueDate: string
  totalAmount: string
  assignees: Assignee[]
  progress: string
  status: string
}
