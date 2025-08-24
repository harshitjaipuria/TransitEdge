import { StaticImageData } from 'next/image'

// user chat
export interface UserChatMessageRecord {
  id: number
  sender: string
  time: string
  text?: string
  avatar?: string | StaticImageData
  avatarName?: string
  type: string
  images?: (string | StaticImageData)[]
  extraImagesCount?: number
  contentType?: string
  replyText?: any
}

export interface UserChatRecord {
  id: number
  roomId: number
  name: string
  receiverImage?: string | StaticImageData
  senderImage?: string | StaticImageData
  receiverName?: string
  status: 'online' | 'offline'
  lastMessage: string
  timestamp: string
  unread: number
  lastSeen: string
  messages: UserChatMessageRecord[]
}

export interface MenuChatSidebarRecord {
  id: number
  roomId: number
  name?: string
  image?: string | StaticImageData
  isOpenCompanyChat: boolean
}

// group chat
export interface GroupChatMember {
  id: number
  name: string
  role: string
  avatar: string | StaticImageData
}

export interface GroupChatMessage {
  id: number
  user: {
    name: string
    avatar: string | StaticImageData
    status: 'online' | 'offline'
  }
  timestamp: string
  message: string
  type: 'sent' | 'received'
  images?: (string | StaticImageData)[]
  contentType?: string
  replyText?: any
}

export interface GroupChatRecord {
  id: number
  roomId: number
  name: string
  image: string | StaticImageData
  message: string
  time: string
  badge: number
  unread: boolean
  active: boolean
  members: GroupChatMember[]
  messages: GroupChatMessage[]
}

export interface GroupChatMemberRecord {
  id: number
  roomId: number
  avatar: string | StaticImageData
  name: string
  value: string
  role: string
}

// contact chat
export interface ContactChatRecord {
  id: number
  roomId: number
  name: string
  avatar: string | StaticImageData
}
