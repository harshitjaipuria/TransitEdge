export interface TreeData {
  id: string
  data: {
    imageURL: string
    name: string
    borderColor?: string
  }
  options?: {
    nodeBGColor: string
    nodeBGColorHover: string
  }
  children?: TreeData[]
}

export interface TreeOptions {
  contentKey: string
  width: string
  height: number
  nodeWidth: number
  nodeHeight: number
  fontColor: string
  fontSize?: string
  nodeBGColor?: string
  nodeBGColorHover?: string
  borderColor: string
  borderRadius?: number
  edgeColor: string
  edgeColorHover: string
  tooltipBorderColor: string
  childrenSpacing: number
  siblingSpacing: number
  direction: string
  enableExpandCollapse?: boolean
  nodeTemplate: (content: { imageURL: string; name: string; borderColor?: string }) => string
  enableToolbar: boolean
}
