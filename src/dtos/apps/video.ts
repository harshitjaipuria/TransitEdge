import { StaticImageData } from 'next/image'

export interface GroupVideoCallMemberRecord {
  id: number
  name: string
  image: string
  isActive: boolean
}

export interface GroupKeyWordRecord {
  id: number
  time: string
  text: string
}

export interface GroupVideoCallChatRecord {
  id: number
  roomId: number
  avatar: string | StaticImageData
  name: string
  message: string
  time: string
}
