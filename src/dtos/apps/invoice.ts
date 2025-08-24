import { StaticImageData } from 'next/image'

// product info invoice
export interface ProductInfo {
  id: number
  productId: string
  productImage: string
  productName: string
  category: string
  qty: number
  stock: number
  unitPrice: number
  unitDiscount: number
  unitTotal: number
  size: string
  color: string
}

// invoice
export interface InvoiceList {
  id: number
  invoiceId: string
  companyName: string
  companyEmail: string
  companyPhoneNumber: string
  clientImage: string | StaticImageData
  clientName: string
  clientPhoneNumber: string
  clientEmail: string
  clientAddress: string
  sellerName: string
  sellerEmail: string
  sellerPhoneNumber: string
  sellerAddress: string
  content: string
  country: string
  invoiceDate: string
  dueDate: string
  status: string
  productInfo: ProductInfo[]
  subTotal: number
  vatAmount: number
  discount: number
  shippingCharge: number
  totalAmount: number
  accountHolderName: string
  accountNumber: string
  expiryDate: string
  cvv: string
  termAndCondition: string
}
