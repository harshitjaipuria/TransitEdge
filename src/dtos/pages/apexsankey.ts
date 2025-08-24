export interface BarChartsProps {
  chartColors: string
  chartDarkColors: string
}

export interface NodeData {
  id: string
  title: string
}

export interface Edge {
  source: string
  target: string
  value: number
  color?: string
}
export interface option {
  order: string[][][]
}
export interface DataType {
  nodes: NodeData[]
  edges: Edge[]
  options?: option
}

export interface Node {
  color: string
  title: string
}

export interface GraphOptions {
  nodeWidth: number
  fontWeight: number
  fontSize: string
  height: number
  fontColor: string
  canvasStyle: string
  tooltipBGColor: string
  nodeBorderColor?: string
  tooltipBorderColor: string
  edgeGradientFill?: boolean
  edgeOpacity?: number
  fontFamily?: string
  nodeTemplate: (source: Node, target: Node, value: number) => string
}
