// crm deal --------------------------------
export interface DealItem {
  id: number
  image: string
  projectName: string
  createDate: string
  endDate: string
  amount: string
  company: string
  content: string
  status: string
  userimage: string
  messages: DealMessage[]
}

export interface DealMessage {
  id: number
  sender: 'agent' | 'user'
  text: string
}
