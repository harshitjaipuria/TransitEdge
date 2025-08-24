'use client'
import { ReactNode, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { routes } from '@src/components/common/DynmiceTitle'
import Layout2 from '@src/layout/Layout2'

interface LayoutWrapperProps {
  children: ReactNode
}

export default function NonLayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname()
  const route = routes.find((r) => r.path === pathname)

  useEffect(() => {
    document.title = route
      ? `${route.title} | Domiex - Premium Versatile Admin & Dashboard Template`
      : 'Domiex - Premium Versatile Admin & Dashboard Template'
  }, [route])

  return <Layout2>{children}</Layout2>
}
