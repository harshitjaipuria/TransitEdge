import { StaticImageData } from 'next/image'

// shop cart product
export interface ShopCartProduct {
  // id: number;
  // productId: string;
  // productName: string;
  // price: number;
  // count: number;
  // discount: number;
  // category: string;
  // colors: string[]; // array of available colors
  // size: string[];  // array of available sizes
  // image1: string;
  // activeColor: string;
  // activeSize: string;
  // stock : number,
  // wishlist: boolean
  id: number
  productId: string
  productName: string
  description: string
  category: string
  count: number
  price: number
  discount: number
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
