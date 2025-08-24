// products list

import { StaticImageData } from 'next/image'

export interface ProductListItem {
  id: number
  productId: string
  productName: string
  description: string
  category: string
  price: number
  discount: number
  count: number
  selling_price: number
  revenue: any
  color: string
  size: string[]
  colors: string[]
  gender: string
  stock: number
  qty: number
  image1: string
  image2: string | StaticImageData
  image3: string | StaticImageData
  status: string
  payment_method: string
  brand: string
  activeColor: string
  activeSize: string
}

// product category
export interface ProductCategory {
  id: number
  CategoryId: string
  category: string
  products: number
  image: string
  status: string
  description: string
}

export interface CategoryItems {
  id: number
  categoryID?: string
  category: string
  products: number
  image: string
  status: string
  description: string
}
