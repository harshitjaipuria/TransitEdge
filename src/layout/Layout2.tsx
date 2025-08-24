'use client'
import Head from 'next/head'
import React, { useEffect } from 'react'

interface LayoutProps2 {
  children: React.ReactNode
  breadcrumbTitle?: string
}

const Layout2 = ({ children, breadcrumbTitle }: LayoutProps2) => {
  const title = breadcrumbTitle
    ? ` ${breadcrumbTitle} | Domiex - Admin & Dashboard Template `
    : 'Domiex - Admin & Dashboard Template'

  useEffect(() => {
    // Remove the attributes for excluded pages
    document.documentElement.setAttribute('class', 'scroll-smooth group')
    document.documentElement.setAttribute('data-mode', 'light')
    document.documentElement.setAttribute('data-colors', 'default')
    document.documentElement.removeAttribute('x-data')
    document.documentElement.removeAttribute('x-init')
    document.documentElement.setAttribute('data-layout', 'default')
    document.documentElement.removeAttribute('data-content-width')
    document.documentElement.removeAttribute('data-sidebar')
    document.documentElement.removeAttribute('data-sidebar-colors')
    document.documentElement.removeAttribute('data-nav-type')
    document.documentElement.setAttribute('dir', 'ltr')
  }, [])
  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
      </Head>

      <main>{children}</main>
    </React.Fragment>
  )
}

export default Layout2
