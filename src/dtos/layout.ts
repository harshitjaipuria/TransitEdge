import { LAYOUT_LANGUAGES } from '@src/components/constants/layout'
import { StaticImageData } from 'next/image'
import { FC, ReactElement } from 'react'

// Define the type for pages that use a custom layout
export type NextPageWithLayout = FC & {
  getLayout?: (page: ReactElement) => ReactElement
}

export interface InterNationalization {
  id: number
  language: string
  code: LAYOUT_LANGUAGES
  flag: string | StaticImageData
}

export interface MegaMenu {
  title: string
  lang: string
  icon?: string
  link?: string
  separator: boolean
  dropdownPosition?: null | undefined
  children?: MainMenu[] //any[]
  megaMenu?: boolean
}

export interface MainMenu {
  title: string
  lang: string
  link: string
  dropdownPosition?: null | undefined
  children?: SubMenu[] //any[]
}

export interface SubMenu {
  title: string
  lang: string
  link: string
  dropdownPosition: null | undefined
  children: any
}
