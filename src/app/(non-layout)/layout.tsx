import NonLayoutWrapper from '@src/components/layout/NonLayoutWrapper'
import { ReactNode } from 'react'

interface DefaultLayoutProps {
  children: ReactNode
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return <NonLayoutWrapper>{children}</NonLayoutWrapper>
}
