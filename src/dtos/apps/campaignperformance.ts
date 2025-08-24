export interface Campaign {
  campaignTitle: string
  clickRate: string
  deliveredRate: string
  impressions: string
  cpc: string
  cr: string
  revenue: string
}

export interface Transaction {
  name: string
  status: 'Success' | 'Cancel'
  date: string
  price: string
}
