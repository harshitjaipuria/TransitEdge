export interface Contributor {
  image: string
  name: string
}

export interface EventGrid {
  id: number
  name: string
  username: string
  price: string
  day: string
  date: string
  time: string
  location: string
  image: string
  mainImage: string
  contributors: Contributor[]
  peopleSize: string
  eventType: string
  status: string
}
