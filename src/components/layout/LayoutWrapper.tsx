'use client'
import { useEffect, ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { routes } from '@src/components/common/DynmiceTitle'
import Layout from '@src/layout/Layout'

interface LayoutWrapperProps {
  children: ReactNode
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname()
  const route = routes.find((r) => r.path === pathname)

  useEffect(() => {
    document.title = route
      ? `${route.title} | Domiex - Premium Versatile Admin & Dashboard Template`
      : 'Domiex - Premium Versatile Admin & Dashboard Template'
  }, [route])
  return <Layout>{children}</Layout>
}
