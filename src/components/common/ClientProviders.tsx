'use client'
import { Provider } from 'react-redux'
import store from '@src/slices/reducer'
import '@src/utils/i18n'
import {

  changeLayoutMode,
  changeLayoutContentWidth,
  changeSidebarSize,
  changeDirection,
  changeLayout,
  changeSidebarColor,
  changeLayoutLanguage,
  changeDataColor,
  changeDarkModeClass,
  changeModernNavigation,
} from '@src/slices/thunk'
import { useEffect, ReactNode } from 'react'
import { initialState } from '@src/slices/layout/reducer'
import { getPreviousThemeData } from '@src/slices/layout/utils'
import { LAYOUT_LANGUAGES } from '../constants/layout'
interface ClientProvidersProps {
  children: ReactNode
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  useEffect(() => {
    const htmlElement = document.documentElement
    htmlElement.classList.add('scroll-smooth', 'group')
    return () => {
      htmlElement.classList.remove('scroll-smooth', 'group')
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const dispatch = store.dispatch


      dispatch(changeLayoutMode(getPreviousThemeData('dx-layout-mode') ?? initialState.layoutMode))
      dispatch(
        changeLayoutContentWidth(
          getPreviousThemeData('dx-layout-content-width') ?? initialState.layoutWidth,
        ),
      )
      dispatch(changeSidebarSize(getPreviousThemeData('dx-sidebar-size') ?? initialState.layoutSidebar))
      dispatch(changeDirection(getPreviousThemeData('dx-layout-direction') ?? initialState.layoutDirection))
      dispatch(changeLayout(getPreviousThemeData('dx-layout-type') ?? initialState.layoutType))
      dispatch(changeSidebarColor(getPreviousThemeData('dx-sidebar-colors') ?? initialState.layoutSidebarColor))
      dispatch(
        changeLayoutLanguage(
          getPreviousThemeData('dx-layout-language') ?? LAYOUT_LANGUAGES.ENGLISH,
        ),
      )
      dispatch(changeDataColor(getPreviousThemeData('dx-theme-color') ?? initialState.layoutDataColor))
      dispatch(changeDarkModeClass(getPreviousThemeData('dx-theme-dark-class') ?? initialState.layoutDarkModeClass))
      dispatch(
        changeModernNavigation(
          getPreviousThemeData('dx-theme-nav-type') ?? initialState.layoutNavigation,
        ),
      )
    }
  }, [])
  return <Provider store={store}>{children}</Provider>
}
