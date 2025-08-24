import { StaticImageData } from 'next/image'

export interface LibraryBook {
  id: number
  title: string
  author: string
  price: string
  image: string | StaticImageData
  rating: number
  reviewCount: string // Change from string to number
  type: string
}
