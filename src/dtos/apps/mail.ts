import { StaticImageData } from 'next/image'

// email
export interface Replys {
  id: number
  sender: string
  email: string
  avatarImage?: any
  date: string
  subject: string
  message: string
}

export interface Email {
  id: number
  sender: string
  email: string
  date: string
  subject: string
  message: string
  avatarImage?: any
  avatarText?: string
  avatarColor?: string
  badges: string[]
  type: string
  replies?: Replys[] // Optional replies array
}
