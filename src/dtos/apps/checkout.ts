// checkout product
// export interface CheckoutProduct {
//     id: number;
//     name : string;
//     image: string;
//     qty: number;
//     color: string;
//     size: string;
//     price: number;
//     discount: number;
// }

// checkout address
export interface CheckoutProductAddress {
  id: number
  type: string
  firstName: string
  lastName: string
  phone: string
  alternatePhone: string
  address: string
  city: string
  country: string
  zip: string
}
