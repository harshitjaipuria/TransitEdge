import { StaticImageData } from 'next/image'

export interface Song {
  id: number
  title: string
  artist: string
  duration: string
  image: StaticImageData
}

export interface Singer {
  id: number
  name: string
  description: string
  image: StaticImageData
}
