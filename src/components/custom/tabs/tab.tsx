'use client'
import { useRouter, usePathname } from 'next/navigation'
import React, { ReactElement, ReactNode, useEffect, useState } from 'react'

interface TabsProps {
  children: React.ReactNode
  ulProps?: string
  activeTabClass?: string
  inactiveTabClass?: string
  otherClass?: string
  contentProps?: string
  liprops?: string
  spanProps?: string
  onChange?: (tab: string) => void // Callback when tab changes
}

const Tabs: React.FC<TabsProps> = ({
  children,
  ulProps = '',
  activeTabClass = '',
  inactiveTabClass = '',
  otherClass = '',
  contentProps = '',
  liprops = '',
  spanProps = '',
  onChange,
}) => {
  const router = useRouter() // Use useRouter to get the router object
  const pathname = usePathname() // Get current pathname to set active tab based on path
  const [activeTab, setActiveTab] = useState<number>(0)

  // Extract tab labels and content from children
  const tabs = React.Children.toArray(children) as React.ReactElement<TabProps>[]

  // Set the active tab based on the current path
  useEffect(() => {
    const activeIndex = tabs.findIndex((tab) => tab.props.path === pathname)
    if (activeIndex !== -1) {
      setActiveTab(activeIndex)
    }
  }, [pathname, tabs])

  const handleTabClick = (index: number, path?: string) => {
    setActiveTab(index)
    // Only navigate if the path is provided
    if (path) {
      router.push(path) // Use router.push() to navigate
    }

    const label = tabs[index].props.label
    if (label && onChange) {
      // Convert the label to a string before passing it to onChange
      onChange(String(label)) // Ensuring label is always a string
    }
  }

  return (
    <>
      <ul className={`${ulProps}`}>
        {tabs.map((tab, index) => (
          <li
            key={index}
            onClick={() => handleTabClick(index, tab.props.path)} // Handle click even if path is undefined
            className={`${liprops}`}
            style={{ cursor: 'pointer' }}
          >
            <span
              className={`${activeTab === index ? activeTabClass : inactiveTabClass} ${otherClass}`}
            >
              {tab.props.icon}
              <span className={`${spanProps}`}>{tab.props.label}</span>
            </span>
          </li>
        ))}
      </ul>
      <div className={contentProps}>{tabs[activeTab].props.children}</div>
    </>
  )
}

interface TabProps {
  label: string | ReactNode // The label to display on the tab header (can be string or React element)
  icon?: ReactNode // Optional icon (can be string or React element)
  path?: string // The path to navigate to when the tab is clicked (optional)
  children?: ReactNode // The content to display when this tab is active
}

const Tab: React.FC<TabProps> = ({ label, icon, path, children }) => {
  return <>{children}</> // Only render children (content) for this tab
}

export { Tabs, Tab }
