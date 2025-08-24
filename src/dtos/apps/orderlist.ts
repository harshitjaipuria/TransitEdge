import { StaticImageData } from 'next/image'

export interface OrderListItem {
  id: number
  ordersDate: string
  ordersID: string
  deliveredDate: string
  customersName: string
  productName: string
  payment: string
  price: number
  total: number
  qty: number
  status: string
  image: string | StaticImageData
}
