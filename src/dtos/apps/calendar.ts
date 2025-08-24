interface ExtendedProps {
  guests: any[]
  location: string
}

// events
export interface EventItem {
  id: number
  title: string
  start: string
  eventTime: string
  end: string
  extendedProps?: ExtendedProps
  classNames?: string[]
}
